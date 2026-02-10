"""
Modelo de Plano de Mensalidade da Academia.

Representa os planos de assinatura oferecidos pela academia.
"""

from sqlalchemy import Column, Integer, String, Float, Enum as SQLEnum
from app.db.base_class import Base
import enum


class AccessLevel(str, enum.Enum):
    """Níveis de acesso dos planos."""

    BASIC = "BASIC"  # Básico
    PREMIUM = "PREMIUM"  # Premium
    VIP = "VIP"  # VIP


class MembershipPlan(Base):
    """
    Modelo de Plano de Mensalidade.

    Armazena os diferentes planos de assinatura com preços,
    duração e benefícios.
    """

    __tablename__ = "membership_plan"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)  # Ex: "Mensal", "Trimestral", "Anual"
    description = Column(String(500), nullable=True)
    price = Column(Float, nullable=False)
    duration_days = Column(Integer, nullable=False)  # Duração em dias
    access_level = Column(
        SQLEnum(AccessLevel), default=AccessLevel.BASIC, nullable=False
    )
    benefits = Column(
        String(1000), nullable=True
    )  # JSON string com lista de benefícios
