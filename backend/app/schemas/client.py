from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ClientBase(BaseModel):
    full_name: str
    email: Optional[EmailStr] = None
    phone: str
    document: Optional[str] = None
    notes: Optional[str] = None

class ClientCreate(ClientBase):
    pass

class ClientUpdate(ClientBase):
    full_name: Optional[str] = None
    phone: Optional[str] = None

class Client(ClientBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True