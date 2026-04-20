from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..models.user import User
from ..models.contact import Contact

from ..utils.mail.mail import send_new_message_mail

from dotenv import load_dotenv

from ..schema.req import ContactPayload

async def send_message(req: Request, payload: ContactPayload , db: Session = Depends(get_db)):
    auth_user = req.state.user

    if auth_user == None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail={
                'message': 'Unautharized Access'
            })
    
    user = db.query(User).filter(User.id == auth_user.id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
            'message': 'User not found but created'
        })
    
    if not payload.mobile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
            'message': 'Mobile Number Required'
        })
    

    try:
        new_message = Contact(user_id = user.id, mobile= payload.mobile, message= payload.message)
        db.add(new_message)
        db.commit()
        db.refresh(new_message)


        await send_new_message_mail(user.name, user.mail, new_message.mobile, new_message.message)

        return {
            'message': '👍👍👍👍'
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
            'message': 'Does not created contact in record'
        })
    