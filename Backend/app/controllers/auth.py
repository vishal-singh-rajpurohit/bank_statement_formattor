from fastapi import status, Request, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from ..schema.user import CreateUser, LoginUserSchema
from ..schema.req import VerificationMode
from ..db.session import get_db
from ..models.user import User
from ..utils.tokens import genrate_token, TokenPayload
from ..utils.hash import hash_password, verify_password
from ..schema.resp import LoginResp
from ..utils.tokens import decrypt_token
from ..utils.mail.mail import send_opt_mail
from ..utils.constants import COOKIE_OPTIONS, ACCESS_TOKEN_EXPIRE_SECONDS, REFRESH_TOKEN_EXPIRE_SECONDS
from ..models.otps import Otps
import os
import random
from dotenv import load_dotenv


load_dotenv()

ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET")
REFRESH_TOKEN_SECRET = os.getenv("REFRESH_TOKEN_SECRET")


def genrate_otp() -> int:
    return random.randint(100000, 999999)


async def register_user( req: Request, resp: Response, payload: CreateUser, db: Session = Depends(get_db)):
    
    """
        1. VALIDATE DATA 👍👍👍👍👍

        2. CHECK IF THE USER ALREADY EXISTED 👍👍👍👍👍

        3. CREATED NEW USER 👍👍👍👍👍
            3.1 HASH DATA 👍👍👍👍👍

        4. CREATE TOKENS AND UPDATE THE USER 👍👍👍👍👍

        5 SET COOKIES 👍👍👍👍👍

        6 RESP 👍👍👍👍👍
    """

    if not payload.name or not payload.email or not payload.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={'message': 'All Data Required'}
        )
    
    existing_user = db.query(User).filter(User.mail == payload.email).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={'message': 'User already existed'}
        )
    
    try:
        new_user = User(name=payload.name, mail=payload.email, password=hash_password(payload.password), credits_token=5)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        refresh_token = genrate_token(TokenPayload(id=new_user.id, email=new_user.mail), secret_key=REFRESH_TOKEN_SECRET)

        access_token = genrate_token(TokenPayload(id=new_user.id, email=new_user.mail), secret_key=ACCESS_TOKEN_SECRET)

        if not refresh_token or not access_token:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,  detail={
                'message': 'Token not found'
            })
        
        user = db.query(User).filter(User.id == new_user.id).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={
                'message': 'User not found but created'
            })
        
        user.access_token = access_token
        user.refresh_token = refresh_token
        db.commit()

        resp.set_cookie(
            key='ACCESS_TOKEN',
            value=access_token,
            httponly=COOKIE_OPTIONS['httponly'],
            secure=COOKIE_OPTIONS['secure'],
            samesite=COOKIE_OPTIONS['samesite']
            )
        resp.set_cookie(
            key='REFRESH_TOKEN',
            value=refresh_token,
            httponly=COOKIE_OPTIONS['httponly'],
            secure=COOKIE_OPTIONS['secure'],
            samesite=COOKIE_OPTIONS['samesite']
            )

        otp = genrate_otp()

        db_opt = Otps(user_id=user.id, otp=otp)

        db.add(db_opt)
        db.commit()
        db.refresh(db_opt)

        try:
            await send_opt_mail(user.mail, otp)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    'message': 'Error in sending Mail'
                })


        return LoginResp(
            message="Verify You Account 🤷‍♂️",
            id=user.id,
            name = user.name,
            email= user.mail,
            is_verified = user.is_verified,
            credits_token=user.credits_token,
            is_permium_user=user.is_permium_user
        )
        
    except Exception as e:
        db.rollback()
        print(f'error in {e}')
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={
            'messag': 'Error in save to DB',
        })
    
async def logout(req: Request, resp: Response, db: Session = Depends(get_db)):
    try:
        auth_user = req.state.user

        if not auth_user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail={
                'message': 'Unautharized Access'
            })

        user = db.query(User).filter(User.id == auth_user.id).first()

        user.access_token = ""
        user.refresh_token = ""

        db.commit()

        resp.delete_cookie("ACCESS_TOKEN")
        resp.delete_cookie("REFRESH_TOKEN")

        return {
            'message': 'User Logged Out'
        }

    except Exception as e:
        db.rollback()
        print(f'error in: {e}')
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail={
                'message': 'Unautharized access'
            })

async def check_already(req: Request, resp: Response, db:Session = Depends(get_db), ):
    auth_user = req.state.user

    if not auth_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharized Acccess'
            })

    access_token = genrate_token(TokenPayload(id=auth_user.id, email=auth_user.mail), ACCESS_TOKEN_SECRET)
    refresh_token = genrate_token(TokenPayload(id=auth_user.id, email=auth_user.mail), REFRESH_TOKEN_SECRET)

    if not refresh_token or not access_token:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,  detail={
                'message': 'Token not found'
            })

    user = db.query(User).filter(User.id == auth_user.id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
            'message': 'User not found but created'
        })
    
    user.access_token = access_token
    user.refresh_token = refresh_token
    
    db.commit()

    resp.set_cookie(
            key='ACCESS_TOKEN',
            value=access_token,
            httponly=COOKIE_OPTIONS['httponly'],
            secure=COOKIE_OPTIONS['secure'],
            samesite=COOKIE_OPTIONS['samesite']
            )
    resp.set_cookie(
            key='REFRESH_TOKEN',
            value=refresh_token,
            httponly=COOKIE_OPTIONS['httponly'],
            secure=COOKIE_OPTIONS['secure'],
            samesite=COOKIE_OPTIONS['samesite']
            )

    return LoginResp(
        message="Login Success 👍",
        id=user.id,
        name = user.name,
        email= user.mail,
        is_verified = user.is_verified,
        credits_token=user.credits_token,
        is_permium_user=user.is_permium_user
    )

async def login(resp: Response, payload: LoginUserSchema, db:Session = Depends(get_db)):

    if not payload.email or not payload.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'All Data Required'
            })
    
    user = db.query(User).filter(User.mail == payload.email).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,  detail={
                'message': 'User not found'
            })
    
    if not verify_password(payload.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,  detail={
                    'message': 'Incorrect Password'
                })
    

    if not user.is_verified:
        otp = genrate_otp()

        db_opt = Otps(user_id=user.id, otp=otp)

        db.add(db_opt)
        db.commit()
        db.refresh(db_opt)

        try:
            await send_opt_mail(user.mail, otp)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    'message': 'Error in sending Mail'
                })

    try:
        access_token = genrate_token(TokenPayload(id=user.id, email=user.mail), ACCESS_TOKEN_SECRET)
        refresh_token = genrate_token(TokenPayload(id=user.id, email=user.mail), REFRESH_TOKEN_SECRET)

        if not refresh_token or not access_token:
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,  detail={
                    'message': 'Token not found'
                })
    
        user.access_token = access_token
        user.refresh_token = refresh_token
        db.commit()

        resp.set_cookie(
            key='ACCESS_TOKEN',
            value=access_token,
            httponly=COOKIE_OPTIONS['httponly'],
            secure=COOKIE_OPTIONS['secure'],
            samesite=COOKIE_OPTIONS['samesite'],
            path='/',
            max_age=ACCESS_TOKEN_EXPIRE_SECONDS
            )
        
        resp.set_cookie(
            key='REFRESH_TOKEN',
            value=refresh_token,
            httponly=COOKIE_OPTIONS['httponly'],
            secure=COOKIE_OPTIONS['secure'],
            samesite=COOKIE_OPTIONS['samesite'],
            path='/',
            max_age=REFRESH_TOKEN_EXPIRE_SECONDS
            )
        
    except Exception as e:
        print(f'error: {e}')
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                'message': 'Database Error'
            })

    return LoginResp(
        message="Verify You Account 🤷‍♂️👍",
        id=user.id,
        name = user.name,
        email= user.mail,
        is_verified = user.is_verified,
        credits_token=user.credits_token,
        is_permium_user=user.is_permium_user
    )

async def verify_account(req: Request, resp: Response, payload: VerificationMode, db:Session = Depends(get_db)):
    auth_user = req.state.user

    if not auth_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharized Acccess'
            })
    
    if not payload.otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'Muts Provide Otp'
            })

    access_token = genrate_token(TokenPayload(id=auth_user.id, email=auth_user.mail), ACCESS_TOKEN_SECRET)
    refresh_token = genrate_token(TokenPayload(id=auth_user.id, email=auth_user.mail), REFRESH_TOKEN_SECRET)

    if not refresh_token or not access_token:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,  detail={
                'message': 'Token not found'
            })

    user = db.query(User).filter(User.id == auth_user.id).first()
    new_otp = db.query(Otps).filter(Otps.user_id == user.id and Otps.otp == payload.otp).first()

    if not new_otp:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
            'message': 'Invalid OTP'
        })

    if not user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
            'message': 'User not found but created'
        })
    
    user.access_token = access_token
    user.refresh_token = refresh_token
    user.is_verified = True
    db.commit()

    resp.set_cookie(
            key='ACCESS_TOKEN',
            value=access_token,
            httponly=COOKIE_OPTIONS['httponly'],
            secure=COOKIE_OPTIONS['secure'],
            samesite=COOKIE_OPTIONS['samesite']
            )
    resp.set_cookie(
            key='REFRESH_TOKEN',
            value=refresh_token,
            httponly=COOKIE_OPTIONS['httponly'],
            secure=COOKIE_OPTIONS['secure'],
            samesite=COOKIE_OPTIONS['samesite']
            )

    new_otp = db.query(Otps).filter(Otps.user_id == user.id and Otps.otp == payload.otp).delete()
    db.commit()

    return LoginResp(
        message="Verified",
        id=user.id,
        name = user.name,
        email= user.mail,
        is_verified = user.is_verified,
        credits_token=user.credits_token,
        is_permium_user=user.is_permium_user
    )

