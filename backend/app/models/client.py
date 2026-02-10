"""
Modelo de Cliente.

Este módulo define a estrutura da tabela de clientes e seus relacionamentos.
"""

from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base_class import Base


class Client(Base):
    """
    Modelo de Cliente (Tabela 'clients').

    Representa um cliente ou empresa que utiliza os serviços do SaaS.
    """

    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True, doc="Nome completo ou Razão Social.")
    email = Column(String, unique=True, index=True, doc="Email de contato.")
    phone = Column(String, doc="Telefone de contato.")

    # Dados de Negócio
    plan = Column(String, default="Basic", doc="Plano de assinatura contratado.")
    status = Column(
        String, default="Pendente", doc="Status do cliente (Ativo, Inadimplente, etc)."
    )
    mrr = Column(
        Float, default=0.0, doc="Receita Recorrente Mensal gerada pelo cliente."
    )
    ltv = Column(
        Float, default=0.0, doc="Lifetime Value (Valor total gerado pelo cliente)."
    )

    # Foreign Keys
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Datas
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relacionamentos
    owner = relationship("User", back_populates="clients")
    appointments = relationship(
        "Appointment",
        back_populates="client",
        doc="Agendamentos deste cliente no salão.",
    )
