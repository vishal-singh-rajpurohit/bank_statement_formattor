from pydantic import BaseModel


class CreateUser(BaseModel):
    name: str
    email: str
    password: str

class LoginUserSchema(BaseModel):
    email: str
    password: str


class CreateOperation(BaseModel):
    user_id: str
    bank: str
    pdf: str
    file_name: str