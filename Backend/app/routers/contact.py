from fastapi import APIRouter, Depends, UploadFile, Request, Response, status
from sqlalchemy.orm import Session
from ..middleware.auth_middleware import is_loggedin
from ..db.session import get_db
from ..controllers.contact import send_message
from ..schema.req import ContactPayload


contact_router = APIRouter(prefix='/contact', dependencies=[Depends(is_loggedin)])

@contact_router.post('/message', status_code=status.HTTP_201_CREATED)
async def root(req: Request, payload: ContactPayload, db: Session = Depends(get_db)):
    return await send_message(req, payload, db)