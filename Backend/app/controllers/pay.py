from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..models.user import User
from ..models.purchase import Purchase

from ..schema.req import PayOrderPayload

from ..utils.pay import client 



async def create_payment_order(req: Request, payload: PayOrderPayload, db:Session = Depends(get_db)):
    if not req.state.user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharized Access'
            }
        )
    
    amount = payload.ammount

    if not amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'message': 'Amount Not Found'
            })
    

    user = db.query(User).filter(User.id == req.state.user.id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                'message': 'Unautharized Access'
            })
    
    try:
        pay_order = client.order.create({
            "amount": amount * 100,
            "currency": "INR",
            "payment_capture": 1
        })

        return pay_order
    except Exception as e:
        print('error in e: ', e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                'message': 'Unable to create Pay Order'
            })


