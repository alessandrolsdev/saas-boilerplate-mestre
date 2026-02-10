"""
Modelo de Profissional do Salão de Beleza.

Representa os profissionais que trabalham no salão (cabeleireiros, manicures, esteticistas).
"""

from sqlalchemy import Column, Integer, String, Boolean, Enum as SQLEnum, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base
import enum


class ProfessionalSpecialty(str, enum.Enum):
    """Especialidades dos profissionais."""

    HAIR_STYLIST = "HAIR_STYLIST"  # Cabeleireiro
    MANICURIST = "MANICURIST"  # Manicure
    SPA_THERAPIST = "SPA_THERAPIST"  # Terapeuta de Spa
    ESTHETICIAN = "ESTHETICIAN"  # Esteticista


class Professional(Base):
    """
    Modelo de Profissional.

    Armazena informações dos profissionais que atendem no salão,
    incluindo especialidade e perfil.
    """

    __tablename__ = "professional"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False, index=True)
    specialty = Column(SQLEnum(ProfessionalSpecialty), nullable=False)
    bio = Column(String(500), nullable=True)  # Biografia/descrição
    avatar_url = Column(String(255), nullable=True)  # URL da foto
    is_active = Column(Boolean, default=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Para login

    # Relacionamentos
    user = relationship("User", back_populates="professional_profile")
