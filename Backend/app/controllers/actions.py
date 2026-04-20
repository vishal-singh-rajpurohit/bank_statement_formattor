from fastapi import HTTPException, Depends, status, Request, Response, UploadFile
from pypdf import PdfReader, PdfWriter
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

# from ..utils.formattors.au_bank import 

load_dotenv()

SESSION_SECRET = os.getenv("SESSION_SECRET")


UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

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
    
    try:
        operation = Operation(
            user_id = user.id
        )

        db.add(operation)
        db.commit()
        db.refresh(operation)

        file_path = f"uploads/id-{operation.id}-{file.filename}"

        # Save file to disk
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        operation.temp_name = f"id-{operation.id}-{file.filename}"

        db.commit()

        session_token = genrate_session_token(SessionPayload(id=operation.id))

        resp.set_cookie('SESSION_TOKEN', session_token)

        return {
            "message": "Uploaded",
            "filename": file.filename
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
    
    if not payload.bank_name or not payload.tally_name or not payload.voucher_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'All Data Required'
            })
    
    reader = PdfReader(f'{UPLOAD_DIR}/{document.temp_name}')
    
    if reader.is_encrypted:
        decrpt_pdf(f'{UPLOAD_DIR}/{document.temp_name}', payload.password)
        
    
    try:
        document.file_name = payload.voucher_name
        document.bank = payload.bank_name
        db.commit()

        session_token = genrate_session_token(SessionPayload(id=document.id))

        resp.set_cookie('SESSION_TOKEN', session_token)

        return {
        'message': 'The Data Recived now Ready for action'
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

    elif document.bank == "KOTAK":
        katak_mahindra_formattor(
            path = f'{file_path}',
            ledger_name=f'{document.file_name}',
            output_path= f'{xml_path}'
        )
     
    else:
        db_user = db.query(User).filter(User.id == user.id).first()
        
        mail_result = await send_mail_error(
            to=db_user.mail,
            sub='We are Facing Some Proble While Processing Your Statement',
            bank_name=document.bank,
            xml_path=document.file_name
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

    print('mail result: ', mail_result)

    return {
        'message': 'The Response sent to the Mail'
    }