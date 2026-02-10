"""
Modelo de Agendamento do Salão de Beleza.

Representa os agendamentos/bookings dos clientes com profissionais e serviços.
"""

from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLEnum, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base
import enum


class AppointmentStatus(str, enum.Enum):
    """Status do agendamento."""

    PENDING = "PENDING"  # Aguardando confirmação
    CONFIRMED = "CONFIRMED"  # Confirmado
    COMPLETED = "COMPLETED"  # Concluído
    CANCELLED = "CANCELLED"  # Cancelado
    NO_SHOW = "NO_SHOW"  # Cliente não compareceu


class Appointment(Base):
    """
    Modelo de Agendamento.

    Armazena os agendamentos dos clientes com profissionais e serviços,
    incluindo horário e status.
    """

    __tablename__ = "appointment"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    professional_id = Column(Integer, ForeignKey("professional.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("service.id"), nullable=False)
    start_time = Column(DateTime, nullable=False, index=True)
    end_time = Column(DateTime, nullable=False)
    status = Column(
        SQLEnum(AppointmentStatus), default=AppointmentStatus.PENDING, nullable=False
    )
    notes = Column(String(500), nullable=True)  # Observações do agendamento

    # Relacionamentos
    client = relationship("Client", back_populates="appointments")
    professional = relationship("Professional")
    service = relationship("Service")
