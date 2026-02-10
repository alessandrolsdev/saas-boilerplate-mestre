"""
Modelo de Pagamento da Academia.

Representa os pagamentos de mensalidades dos membros.
"""

from sqlalchemy import (
    Column,
    Integer,
    Float,
    Date,
    DateTime,
    Enum as SQLEnum,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from app.db.base_class import Base
from datetime import datetime
import enum


class PaymentStatus(str, enum.Enum):
    """Status do pagamento."""

    PAID = "PAID"  # Pago
    PENDING = "PENDING"  # Pendente
    OVERDUE = "OVERDUE"  # Atrasado


class GymPayment(Base):
    """
    Modelo de Pagamento da Academia.

    Armazena o histórico de pagamentos dos membros, incluindo
    plano contratado, datas e status.
    """

    __tablename__ = "gym_payment"

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("gym_member.id"), nullable=False)
    plan_id = Column(Integer, ForeignKey("membership_plan.id"), nullable=False)
    amount = Column(Float, nullable=False)
    payment_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    start_date = Column(Date, nullable=False)  # Início da vigência
    end_date = Column(Date, nullable=False)  # Fim da vigência
    status = Column(
        SQLEnum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False
    )

    # Relacionamentos
    member = relationship("GymMember", back_populates="payments")
    plan = relationship("MembershipPlan")
