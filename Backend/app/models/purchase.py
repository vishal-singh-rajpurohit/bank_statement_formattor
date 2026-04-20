from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..db.session import Base

class Purchase(Base):
    __tablename__ = "purchase" 

    id = Column(Integer, primary_key=True, index=True)
    
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )
    
    credits_token = Column(Integer, nullable=False, default=0)
    ammount = Column(Integer, nullable=False, default=0)

    is_failed = Column(Boolean, nullable=False, default=False)

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationship
    user = relationship(
        "User",
        back_populates="purchases"
    )

