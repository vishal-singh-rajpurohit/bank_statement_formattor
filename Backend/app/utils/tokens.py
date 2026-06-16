import jwt
import datetime
from pydantic import BaseModel
from fastapi import status, HTTPException
from ..settings import settings


SESSION_SECRET = settings.SESSION_SECRET

class TokenPayload(BaseModel):
    id: int
    email:str

class SessionPayload(BaseModel):
    id: int


ALGO = settings.ALGO

def genrate_token(paylod:TokenPayload, secret_key:str, expiry: str = "30")->str:
    data = {
        "id": paylod.id,
        "email": paylod.email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=int(expiry)),
        "iat": datetime.datetime.utcnow()
    }

    encoded_jwt = jwt.encode(data, secret_key, algorithm=ALGO)

    return encoded_jwt


def genrate_session_token(payload: SessionPayload):
    data = {
        "id": payload.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=int(60)),
        "iat": datetime.datetime.utcnow()
    }

    encoded_jwt = jwt.encode(data, SESSION_SECRET, algorithm=ALGO)
    return encoded_jwt


def decrypt_token(token:str, secret_key: str):
    try:
        decoded_data = jwt.decode(token, secret_key, algorithms=[ALGO])
        return decoded_data
    except Exception as e:
        print(f'error in Decoding: {e}')
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                'message': 'Cannot Decode the Message'
            }
        )


    