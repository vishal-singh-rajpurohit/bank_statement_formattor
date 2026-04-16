from fastapi import status, Request, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from ..schema.user import CreateUser, LoginUser
from ..db.session import get_db
from ..models.user import User
from ..utils.tokens import genrate_token, TokenPayload
from ..utils.hash import hash_password
from ..schema.resp import LoginResp
from ..utils.tokens import decrypt_token
import os
from dotenv import load_dotenv


load_dotenv()

ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET")
REFRESH_TOKEN_SECRET = os.getenv("REFRESH_TOKEN_SECRET")


def register_user( req: Request, resp: Response, payload: CreateUser, db: Session = Depends(get_db)):
    
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
        new_user = User(name=payload.name, mail=payload.email, password=hash_password(payload.password))
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

        resp.set_cookie('REFRESH_TOKEN', access_token)
        resp.set_cookie('ACCESS_TOKEN', refresh_token)

        return LoginResp(
            message="Login Success 👍",
            id=user.id,
            name = user.name,
            email= user.mail
        )
        
    except Exception as e:
        db.rollback()
        print(f'error in {e}')
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={
            'messag': 'Error in save to DB',
        })
    
async def logout(req: Request, resp: Response, db: Session = Depends(get_db)):
    print('entered Logout')
    try:
        is_logged_in = req.state.is_authenticted

        if not is_logged_in:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail={
                'message': 'Unautharized access'
            })
        
        access_token = req.cookies.get("ACCESS_TOKEN")

        if not access_token:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={
                'message': 'Token not found'
            })
        
        decoded_data = decrypt_token(token=access_token, secret_key=ACCESS_TOKEN_SECRET)
    
        if not decoded_data:
            req.state.is_authenticted = False
            return req.state.is_authenticted

        user = db.query(User).filter(User.id == decoded_data.id).first()

        user.access_token = ""
        user.refresh_token = ""

        db.commit()

        return {
            'message': 'User Logged Out'
        }

    except Exception as e:
        db.rollback()
        print(f'error in: {e}')
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail={
                'message': 'Unautharized access'
            })


def check_already(req: Request, resp: Response, db:Session = Depends(get_db)):
    
    if req.state.is_authenticted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharized Acccess'
            }
        )
    
    user = req.state.user

    access_token = genrate_token(TokenPayload(id=user.id, email=user.mail), ACCESS_TOKEN_SECRET)
    refresh_token = genrate_token(TokenPayload(id=user.id, email=user.mail), REFRESH_TOKEN_SECRET)

    if not refresh_token or not access_token:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,  detail={
                'message': 'Token not found'
            })

    user = db.query(User).filter(User.id == user.id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
            'message': 'User not found but created'
        })
    
    user.access_token = access_token
    user.refresh_token = refresh_token
    db.commit()

    resp.set_cookie('REFRESH_TOKEN', access_token)
    resp.set_cookie('ACCESS_TOKEN', refresh_token)

    return LoginResp(
        message="Login Success 👍",
        id=user.id,
        name = user.name,
        email= user.mail
    )


def login(resp: Response, payload: LoginUser, db:Session = Depends(get_db)):
    if not payload.email or not payload.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'All Data Required'
            }
        )
    
    user = db.query(User).filter(User.mail == payload.email).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,  detail={
                'message': 'User not found'
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

        resp.set_cookie('REFRESH_TOKEN', access_token)
        resp.set_cookie('ACCESS_TOKEN', refresh_token)
    except Exception as e:
        print('error: {e}')
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                'message': 'Database Error'
            })
    

    return LoginResp(
        message="Login Success 👍",
        id=user.id,
        name = user.name,
        email= user.mail
    )