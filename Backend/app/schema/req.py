from pydantic import BaseModel, EmailStr
from typing import Optional

class ActionPayload(BaseModel):
    tally_name: str
    bank_name: str
    voucher_name: str
    password: str

class VerificationMode(BaseModel):
    otp: str

class ContactPayload(BaseModel):
    message: str
    mobile: str

class PayOrderPayload(BaseModel):
    amount: float


class VerifyOrderPayload(BaseModel):
    order_id: str
    payment_id: str
    signature: str


class CreateOrderIn(BaseModel):
    user_id: str
    amount: int   # rupees from frontend or paise? here we accept rupees
    currency: str = "INR"
    email: Optional[EmailStr] = None
    contact: Optional[str] = None
    name: Optional[str] = None

# class VerifyPaymentIn(BaseModel):
#     razorpay_payment_id: str
#     razorpay_order_id: str
#     razorpay_signature: str