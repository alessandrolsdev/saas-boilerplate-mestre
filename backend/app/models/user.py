"""
Modelo de Usuário.

Define a tabela de usuários no banco de dados.
"""
from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class User(Base):
    """
    Modelo de Usuário (Tabela 'users').
    Representa um usuário do sistema, com credenciais de acesso e informações de perfil.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True, doc="Nome completo do usuário.")
    email = Column(String, unique=True, index=True, nullable=False, doc="Email único para login.")
    hashed_password = Column(String, nullable=False, doc="Hash da senha (bcrypt).")
    
    # Controles de Acesso
    is_active = Column(Boolean(), default=True, doc="Indica se o usuário está ativo.")
    is_superuser = Column(Boolean(), default=False, doc="Indica se o usuário é administrador.")
    
    # Auditoria
    created_at = Column(DateTime(timezone=True), server_default=func.now(), doc="Data de criação do registro.")
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), doc="Data da última atualização.")

    # Relacionamentos
    clients = relationship("Client", back_populates="owner", doc="Lista de clientes deste usuário.")
    charges = relationship("Charge", back_populates="owner", doc="Lista de cobranças deste usuário.")