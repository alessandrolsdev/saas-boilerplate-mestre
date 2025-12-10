"""
Schemas de Cliente.

Define os modelos Pydantic para validação e serialização de dados de clientes.
"""
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ClientBase(BaseModel):
    """
    Base para atributos compartilhados de Cliente.
    """
    full_name: str
    email: Optional[EmailStr] = None
    phone: str
    document: Optional[str] = None
    notes: Optional[str] = None
    
    # NOVOS CAMPOS (Essenciais para o Dashboard)
    plan: Optional[str] = "Basic"
    status: Optional[str] = "Ativo"
    mrr: Optional[float] = 0.0
    ltv: Optional[float] = 0.0

class ClientCreate(ClientBase):
    """
    Schema para criação de cliente.
    """
    pass

class ClientUpdate(ClientBase):
    """
    Schema para atualização de cliente.
    """
    pass

class Client(ClientBase):
    """
    Schema para resposta de dados de cliente.
    """
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True