import jwt
import datetime
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

class TokenPayload(BaseModel):
    id: int
    email:str

ALGO = os.getenv("ALGO")

def genrate_token(paylod:TokenPayload, secret_key:str, expiry: str = "30")->str:
    data = {
        "id": paylod.id,
        "email": paylod.email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=int(expiry)),
        "iat": datetime.datetime.utcnow()
    }

    encoded_jwt = jwt.encode(data, secret_key, algorithm=ALGO)

    return encoded_jwt

def decrypt_token(token:str, secret_key: str):
    print('decrypt token: ', token)
    print('decrypt token: ', secret_key)
    print('decrypt token: ', ALGO)

    decoded_data = jwt.decode(token, secret_key, algorithms=[ALGO])
    print('decrypt token')
    return decoded_data


    