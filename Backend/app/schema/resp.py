from pydantic import BaseModel


class LoginResp(BaseModel):
    message: str
    id: int
    name: str
    email: str
    is_verified: bool
    is_permium_user: bool
    credits_token: int

    class Config:
        from_attributes = True


class CreateOrderOut(BaseModel):
    order_db_id: int
    receipt: str
    razorpay_order_id: str
    amount: int
    currency: str
    key: str

    class Config:
        from_attributes = True


class VerifyPaymentOut(BaseModel):
    success: bool
    message: str
    class Config:
        from_attributes = True