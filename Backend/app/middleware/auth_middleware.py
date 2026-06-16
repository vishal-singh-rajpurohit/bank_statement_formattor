from fastapi import Request, Depends
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..models.user import User
from ..utils.tokens import decrypt_token
from ..settings import settings

ACCESS_TOKEN_SECRET = settings.ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET = settings.REFRESH_TOKEN_SECRET

async def is_loggedin(req: Request, db: Session = Depends(get_db)):
    access_token = req.cookies.get("ACCESS_TOKEN")

    if not access_token:
        req.state.user = None
        return req.state.user

    decoded_data = decrypt_token(token=access_token, secret_key=ACCESS_TOKEN_SECRET)

    user = db.query(User).filter(User.id == decoded_data['id']).first()

    if not user:
        req.state.user = None
        return req.state.user

    req.state.user = user
    return req.state.user
