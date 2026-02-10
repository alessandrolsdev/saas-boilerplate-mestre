"""
Modelo de Check-in da Academia.

Representa as entradas/saídas dos membros na academia.
"""

from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base
from datetime import datetime


class CheckIn(Base):
    """
    Modelo de Check-in.

    Rastreia quando os membros entram e saem da academia,
    permitindo controle de presença e frequência.
    """

    __tablename__ = "check_in"

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("gym_member.id"), nullable=False)
    check_in_time = Column(
        DateTime, default=datetime.utcnow, nullable=False, index=True
    )
    check_out_time = Column(
        DateTime, nullable=True
    )  # Pode ser nulo se ainda está na academia

    # Relacionamentos
    member = relationship("GymMember", back_populates="check_ins")
