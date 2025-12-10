"""
Modelo de Cobrança Financeira.

Este módulo define a estrutura da tabela de cobranças (charges) e seus relacionamentos.
"""
import enum
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class ChargeStatus(str, enum.Enum):
    """Enumerador para os status possíveis de uma cobrança."""
    PENDING = "PENDING"
    PAID = "PAID"
    OVERDUE = "OVERDUE"
    CANCELED = "CANCELED"

class Charge(Base):
    """
    Modelo de Cobrança (Tabela 'charges').
    
    Representa uma transação financeira ou fatura associada a um cliente.
    """
    __tablename__ = "charges"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, doc="Descrição da cobrança.")
    value = Column(Float, doc="Valor da cobrança.")
    
    # Datas
    due_date = Column(DateTime(timezone=True), doc="Data de vencimento.")
    paid_at = Column(DateTime(timezone=True), nullable=True, doc="Data do pagamento.")
    created_at = Column(DateTime(timezone=True), server_default=func.now(), doc="Data de criação do registro.")
    
    # Status
    status = Column(String, default=ChargeStatus.PENDING, index=True, doc="Status atual da cobrança.")

    # Relacionamentos
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Propriedades de navegação
    owner = relationship("User", back_populates="charges")
    # client = relationship("Client", back_populates="charges")