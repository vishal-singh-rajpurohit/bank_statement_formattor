from fastapi import HTTPException, Depends, status, Request, Response, UploadFile
from pypdf import PdfReader
from  sqlalchemy.orm import Session
from dotenv import load_dotenv
from pathlib import Path
import shutil
import os

from ..schema.req import ActionPayload
from ..models.operations import Operation
from ..models.user import User
from ..db.session import get_db
from ..utils.tokens import genrate_session_token, SessionPayload, decrypt_token
from ..utils.formattors.au_bank import wrapper_convertor
from ..utils.formattors.kotak import katak_mahindra_formattor
from ..utils.decrypter import decrpt_pdf
from ..utils.mail.mail import send_mail, send_mail_error
from ..utils.constants import COOKIE_OPTIONS

# from ..utils.formattors.au_bank import 

load_dotenv()

SESSION_SECRET = os.getenv("SESSION_SECRET")


UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

SUPPORTED_BANKS = {"AU", "KOTAK"}

def safe_upload_filename(filename: str) -> str:
    return filename.replace("\\", "/").split("/")[-1]

async def upload_pdf(req: Request, resp: Response, file: UploadFile, db: Session = Depends(get_db)):
    
    """
            CREATE THE DOCUMENT && SAVE 👍👍👍
            SAVE FILE ON SERVER UPLOAD DIR 👍👍👍
            CHANGE NAME ON DOCUMENT 👍👍👍
            CREATE SESSION 👍👍👍
            SET COOKIES 👍👍👍
            RESP 👍👍👍
    """
    user = req.state.user

    if user == None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail={
                'message': 'Unautharized Access'
            })

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'File is not pdf'
            })
    
    safe_filename = safe_upload_filename(file.filename or "statement.pdf")

    if not safe_filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'File is not pdf'
            })
    
    try:
        operation = Operation(
            user_id = user.id
        )

        db.add(operation)
        db.commit()
        db.refresh(operation)

        temp_name = f"id-{operation.id}-{safe_filename}"
        file_path = UPLOAD_DIR / temp_name

        # Save file to disk
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        operation.temp_name = temp_name
        operation.pdf = str(file_path)

        db.commit()

        session_token = genrate_session_token(SessionPayload(id=operation.id))

        resp.set_cookie(
            key='SESSION_TOKEN',
            value=session_token,
            httponly=COOKIE_OPTIONS['httponly'],
            secure=COOKIE_OPTIONS['secure'],
            samesite=COOKIE_OPTIONS['samesite'],
            path='/'
        )

        return {
            "message": "Uploaded",
            "operation_id": operation.id,
            "filename": safe_filename,
            "temp_name": operation.temp_name
            }
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                'message': 'Error in file uploading'
            }
        )

async def initiate_action(req: Request, resp: Response, payload: ActionPayload, db: Session = Depends(get_db)):
    user = req.state.user

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharized Access'
            })
    
    
    session_token = req.cookies.get("SESSION_TOKEN")

    if not session_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Session Not Found of might be expired'
            })
    
    session = decrypt_token(token=session_token, secret_key=SESSION_SECRET)

    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Session Might be expired'
            })
    
    document = db.query(Operation).filter(Operation.id == session['id']).first()

    if not document:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                'message': 'Document not found in DB'
            })
    
    bank_name = payload.bank_name.strip().upper()
    tally_name = payload.tally_name.strip()
    voucher_name = payload.voucher_name.strip()
    password = payload.password.strip() if payload.password else ""

    if not bank_name or not tally_name or not voucher_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'All Data Required'
            })
    
    if bank_name not in SUPPORTED_BANKS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'Unsupported bank'
            })
    
    if "/" in voucher_name or "\\" in voucher_name or ".." in voucher_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'Ledger/output name cannot contain path characters'
            })
    
    reader = PdfReader(f'{UPLOAD_DIR}/{document.temp_name}')
    
    if reader.is_encrypted:
        if not password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    'message': 'Password is required for encrypted pdf'
                })
        try:
            decrpt_pdf(f'{UPLOAD_DIR}/{document.temp_name}', password)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    'message': 'Unable to decrypt pdf with provided password'
                })
        
    
    try:
        document.file_name = voucher_name
        document.bank = bank_name
        db.commit()

        session_token = genrate_session_token(SessionPayload(id=document.id))

        resp.set_cookie(
            key='SESSION_TOKEN',
            value=session_token,
            httponly=COOKIE_OPTIONS['httponly'],
            secure=COOKIE_OPTIONS['secure'],
            samesite=COOKIE_OPTIONS['samesite'],
            path='/'
        )

        return {
            'message': 'The Data Recived now Ready for action',
            'operation_id': document.id,
            'bank_name': document.bank,
            'tally_name': tally_name,
            'voucher_name': voucher_name
        }

    except:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                'message': 'cannot store to database'
            })
    
async def complete_action(req: Request, resp: Response, db: Session = Depends(get_db)):
    user = req.state.user

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharized Access'
            })
    
    session_token = req.cookies.get("SESSION_TOKEN")

    if not session_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Session Not Found of might be expired'
            })
    
    session = decrypt_token(token=session_token, secret_key=SESSION_SECRET)

    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Session Might be expired'
            })
    
    document = db.query(Operation).filter(Operation.id == session['id']).first()

    if not document:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                'message': 'Document not found in DB'
            })
    
    file_path = f"uploads/{document.temp_name}"
    xlsx_path = f'{OUTPUT_DIR}/id-{document.id}.xlsx'
    xml_path = f'{OUTPUT_DIR}/{document.file_name}.xml'

    if document.bank == "AU": 
        wrapper_convertor(
            file_name=file_path,
            excel_path= xlsx_path,
            party_ledger_name=document.file_name
        )
        document.xlsx = xlsx_path
        document.xml_tally = xml_path

    elif document.bank == "KOTAK":
        katak_mahindra_formattor(
            path = f'{file_path}',
            ledger_name=f'{document.file_name}',
            output_path= f'{xml_path}'
        )
        document.xml_tally = xml_path
     
    else:
        db_user = db.query(User).filter(User.id == user.id).first()
        
        await send_mail_error(
            to=db_user.mail,
            sub='We are Facing Some Proble While Processing Your Statement',
            bank_name=document.bank,
            file_name=document.file_name
        )
        
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message':'invalid bank'
            })
    
    # Upload files to cloud
    # Send the response to the mail

    db_user = db.query(User).filter(User.id == user.id).first()
    db_user.credits_token = db_user.credits_token - 1

    db.commit()

    mail_result = await send_mail(
        to= db_user.mail,
        sub="Your File is Ready sir",
        username= db_user.name,
        bank_name=document.bank,
        xml_path=f'{xml_path}',
        file_name=document.file_name
    )

    return {
        'message': 'The Response sent to the Mail',
        'operation_id': document.id,
        'bank_name': document.bank,
        'output_file': f'{document.file_name}.xml',
        'delivery': 'email'
    }
