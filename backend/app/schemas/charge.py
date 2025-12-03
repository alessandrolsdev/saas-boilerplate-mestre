from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChargeBase(BaseModel):
    description: str
    value: float
    due_date: datetime
    client_id: int

class ChargeCreate(ChargeBase):
    pass

class Charge(ChargeBase):
    id: int
    status: str
    invoice_url: Optional[str] = None
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True