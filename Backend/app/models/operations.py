from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..db.session import Base


class Operation(Base):
    __tablename__ = "operations"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    file_name = Column(String(100), nullable=False)
    bank = Column(String(100), nullable=False)

    pdf = Column(String(100), server_default="")
    xlsx = Column(String(100), server_default="")
    comma_separated_values = Column(String(100), server_default="")
    xml_tally = Column(String(100), server_default="")

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationship
    user = relationship("User", back_populates="operations")