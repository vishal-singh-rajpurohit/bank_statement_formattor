from sqlalchemy import Column, Integer, String, BigInteger, DateTime, Text, ForeignKey, func
from sqlalchemy.orm import relationship
from ..db.session import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    receipt = Column(String(100), unique=True, nullable=False, index=True)
    user_id = Column(String(100), nullable=False, index=True)
    amount = Column(BigInteger, nullable=False)  # in paise
    currency = Column(String(10), default="INR")
    status = Column(String(30), default="created")  # created, paid, failed
    razorpay_order_id = Column(String(100), unique=True, nullable=False, index=True)
    notes_json = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    payments = relationship("Payment", back_populates="order")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    razorpay_payment_id = Column(String(100), unique=True, nullable=False, index=True)
    razorpay_order_id = Column(String(100), nullable=False, index=True)
    razorpay_signature = Column(String(255), nullable=True)

    amount = Column(BigInteger, nullable=True)
    currency = Column(String(10), default="INR")
    status = Column(String(30), default="created")  # created, captured, failed
    method = Column(String(50), nullable=True)
    email = Column(String(255), nullable=True)
    contact = Column(String(30), nullable=True)
    raw_response = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    order = relationship("Order", back_populates="payments")