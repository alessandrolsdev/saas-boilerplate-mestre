"""
Modelo de Membro da Academia.

Representa os membros/alunos matriculados na academia.
"""

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base


class GymMember(Base):
    """
    Modelo de Membro da Academia.

    Armazena informações dos membros, incluindo dados de contato,
    foto e informações médicas/emergenciais.
    """

    __tablename__ = "gym_member"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False, index=True)
    email = Column(String(100), nullable=False, unique=True, index=True)
    phone = Column(String(20), nullable=True)
    photo_url = Column(String(255), nullable=True)  # URL da foto
    emergency_contact = Column(String(200), nullable=True)  # Contato de emergência
    medical_notes = Column(String(500), nullable=True)  # Observações médicas
    user_id = Column(
        Integer, ForeignKey("users.id"), nullable=True
    )  # Para portal do membro

    # Relacionamentos
    user = relationship("User", back_populates="gym_member_profile")
    check_ins = relationship("CheckIn", back_populates="member")
    payments = relationship("GymPayment", back_populates="member")
