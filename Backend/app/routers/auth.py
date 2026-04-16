from fastapi import APIRouter, status, Request, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from ..schema.user import CreateUser
from ..db.session import get_db
from ..models.user import User
from typing import Annotated
from ..utils.tokens import genrate_token, TokenPayload
from ..utils.hash import hash_password
from ..schema.resp import LoginResp

from ..controllers.auth import register_user
from ..middleware.auth_middleware import is_loggedin

import os
from dotenv import load_dotenv

load_dotenv()

auth_router = APIRouter(prefix='/auth')

ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET")
REFRESH_TOKEN_SECRET = os.getenv("REFRESH_TOKEN_SECRET")

db_depandency = Annotated[Session, Depends(get_db)]

@auth_router.post('/', response_model=LoginResp, status_code=status.HTTP_201_CREATED)
async def root(
    req: Request,
    resp: Response,
    payload: CreateUser,
    db: Session = Depends(get_db)
):
    return register_user(req, resp, payload, db)


@auth_router.get('/logout', status_code=status.HTTP_200_OK, dependencies=[Depends(is_loggedin)])
async def root(req: Request, resp: Response):
    pass