"""
Schemas de Cobrança.

Define os modelos Pydantic para validação e serialização de dados de cobranças.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChargeBase(BaseModel):
    """
    Base para atributos compartilhados de Cobrança.
    """
    description: str
    value: float
    due_date: datetime
    client_id: int

class ChargeCreate(ChargeBase):
    """
    Schema para criação de cobrança.
    """
    pass

class Charge(ChargeBase):
    """
    Schema para resposta de dados de cobrança.
    """
    id: int
    status: str
    invoice_url: Optional[str] = None
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True