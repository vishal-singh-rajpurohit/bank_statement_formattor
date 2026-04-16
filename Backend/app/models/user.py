from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..db.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(30), nullable=False)
    mail = Column(String(60), nullable=False, unique=True, index=True)
    password = Column(String(200), nullable=False)

    refresh_token = Column(String(200), nullable=True, default=" ")
    access_token = Column(String(200), nullable=True, default=" ")

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationship
    operations = relationship(
    "Operation",
    back_populates="user",
    cascade="all, delete-orphan"
    )

