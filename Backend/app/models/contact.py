from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..db.session import Base


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    mobile = Column(
        String(12),
        nullable=False,
    )

    message = Column(
        String(100),
        nullable=False,
        default="No Message"
    )

    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    # Relationship
    user = relationship("User", back_populates="contacts")
    