from pydantic import BaseModel


class LoginResp(BaseModel):
    message: str
    id: int
    name: str
    email: str
    class Config:
        from_attributes = True
