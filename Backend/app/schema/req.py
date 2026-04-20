from pydantic import BaseModel

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