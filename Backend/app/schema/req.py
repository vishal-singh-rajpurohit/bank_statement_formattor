from pydantic import BaseModel

class ActionPayload(BaseModel):
    tally_name: str
    bank_name: str
    voucher_name: str