from sqlalchemy import Column, Integer, String, Boolean, Enum
from ..db.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    full