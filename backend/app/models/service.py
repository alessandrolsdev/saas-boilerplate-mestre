"""
Modelo de Serviço do Salão de Beleza.

Representa os serviços oferecidos pelo salão (corte de cabelo, manicure, massagem, etc.).
"""

from sqlalchemy import Column, Integer, String, Float, Boolean, Enum as SQLEnum
from app.db.base_class import Base
import enum


class ServiceCategory(str, enum.Enum):
    """Categorias de serviços do salão."""

    HAIR = "HAIR"  # Cabelo
    NAILS = "NAILS"  # Unhas
    SPA = "SPA"  # Spa/Massagem
    AESTHETICS = "AESTHETICS"  # Estética


class Service(Base):
    """
    Modelo de Serviço.

    Armazena os serviços disponíveis no salão com nome, descrição,
    duração e preço.
    """

    __tablename__ = "service"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    description = Column(String(500), nullable=True)
    duration_minutes = Column(Integer, nullable=False)  # Duração em minutos
    price = Column(Float, nullable=False)
    category = Column(SQLEnum(ServiceCategory), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
