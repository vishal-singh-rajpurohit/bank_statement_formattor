from fastapi import APIRouter, Depends, Request, status, Header
from sqlalchemy.orm import Session
from ..middleware.auth_middleware import is_loggedin
from ..controllers.pay import create_payment_order, verify_payment
from ..schema.req import PayOrderPayload, CreateOrderIn, VerifyOrderPayload
from ..schema.resp import CreateOrderOut, VerifyPaymentOut
from ..db.session import get_db


pay_route = APIRouter(prefix='/pay', dependencies=[Depends(is_loggedin)])

@pay_route.post("/create-order")
async def root(req: Request, payload: PayOrderPayload, db: Session = Depends(get_db)):
    return await create_payment_order(req, payload, db)


@pay_route.post("/verify", response_model=VerifyPaymentOut)
async def root(req: Request, payload: VerifyOrderPayload, db: Session = Depends(get_db)):
    return await verify_payment(req, payload, db)


@pay_route.post("/webhook")
async def root(req: Request,x_razorpay_signature: str = Header(default=""), db: Session = Depends(get_db)):
    pass

