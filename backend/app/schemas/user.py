from pydantic import BaseModel, EmailStr
from typing import Optional

# Base para atributos compartilhados
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: Optional[bool] = True

# O que precisamos para criar um usuario (vem do Front)
class UserCreate(UserBase):
    password: str

# O que devolvemos para o Front (NUNCA devolva a senha)
class User(UserBase):
    id: int
    is_superuser: bool

    class Config:
        from_attributes = True

# Schema para o Token JWT
class Token(BaseModel):
    access_token: str
    token_type: str