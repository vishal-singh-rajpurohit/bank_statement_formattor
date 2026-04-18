from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..db.session import Base


class Otps(Base):
    __tablename__ = "otps"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    otp = Column(
        String(6),
        nullable=False,
        unique=True
    )

    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    # Relationship
    user = relationship("User", back_populates="otps")
    