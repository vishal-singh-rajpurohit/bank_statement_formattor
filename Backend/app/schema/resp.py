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
