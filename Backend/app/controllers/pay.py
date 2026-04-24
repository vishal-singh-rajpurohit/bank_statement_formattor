from fastapi import Depends, HTTPException, status, Request, Header
from uuid import uuid4
import json
import hmac
import hashlib
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..models.user import User
from ..models.purchase import Purchase
from ..models.payment import Order, Payment

from ..schema.req import PayOrderPayload, CreateOrderIn,  VerifyOrderPayload
from ..schema.resp import CreateOrderOut, VerifyPaymentOut

from ..utils.pay import client
from ..utils.hash import verify_webhook_signature

load_dotenv()

async def create_payment_order(req: Request, payload: PayOrderPayload, db:Session = Depends(get_db)):

    auth_users = req.state.user

    if not auth_users:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail={
                'message': 'Unautharized User'
            })

    if not payload.amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail={
                'message': 'Ammount Required'
            })
    
    receipt_id = f"rcpt_{uuid4().hex[:12]}"

    order = client.order.create({
        "amount": payload.amount * 100,
        "currency": "INR",
        "receipt": receipt_id,
        "payment_capture": 1
    })

    try:
        db_order = Order(
            receipt = order["receipt"],
            user_id = auth_users.id,
            amount = payload.amount * 100,
            currency = "INR",
            status = order["status"],
            razorpay_order_id = order["id"],
        )

        db.add(db_order)
        db.commit()
        db.refresh(db_order)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail={
                'message': 'Cannot Save to Data Base'
        })

    return CreateOrderOut(
        order_db_id=str(db_order.id),
        receipt=receipt_id,
        razorpay_order_id=order["id"],
        key=os.getenv("RAZORPAY_KEY_ID"),
        amount=order["amount"],
        currency=order["currency"],
        status=order["status"]
    )

async def verify_payment(
    req: Request,
    payload: VerifyOrderPayload,
    db: Session = Depends(get_db)
):
    auth_user = req.state.user

    if not auth_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"message": "Unauthorized Access"}
        )

    order_id = payload.order_id
    payment_id = payload.payment_id
    signature = payload.signature


    if not order_id or not payment_id or not signature:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": "order_id, payment_id and signature are required"}
        )

    secret = os.getenv("RAZORPAY_KEY_SECRET")
    if not secret:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"message": "Missing Razorpay secret"}
        )


    generated_signature = hmac.new(
        secret.encode("utf-8"),
        f"{order_id}|{payment_id}".encode("utf-8"),
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(generated_signature, signature):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": "Invalid Signature"}
        )
    

    try:
        db_order = (
            db.query(Order)
            .filter(Order.razorpay_order_id == order_id)
            .first()
        )

        if not db_order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"message": "Order not found"}
            )
        
        # Prevent one order from being credited more than once
        if db_order.status == "paid":
            return VerifyPaymentOut(
                status="success",
                message="Payment already verified"
            )

        # Make sure the order belongs to the logged-in user
        if int(db_order.user_id) != auth_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={"message": "You cannot verify this order"}
            )

        db_user = db.query(User).filter(User.id == auth_user.id).first()
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"message": "User not found"}
            )
        
        credits_to_add = db_order.amount / 100

        db_user.credits_token = (db_user.credits_token or 0) + credits_to_add

        db_order.status = "paid"

        # Optional: save payment record
        db_payment = Payment(
            order_id=db_order.id,
            razorpay_payment_id=payment_id,
            razorpay_order_id=order_id,
            razorpay_signature=signature,
            amount=db_order.amount,
            status="paid"
        )

        db.add(db_payment)

        db.commit()
        db.refresh(db_user)
        db.refresh(db_order)


        return VerifyPaymentOut(
            success=True,
            message="Payment verified and credits added"
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"message": "Cannot update order/payment"}
        )