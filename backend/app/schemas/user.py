"""
Schemas de Usuário.

Define os modelos Pydantic para validação e serialização de dados de usuários.
"""
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    """
    Base para atributos compartilhados de Usuário.
    """
    email: EmailStr
    full_name: Optional[str] = None
    is_active: Optional[bool] = True

class UserCreate(UserBase):
    """
    Schema para criação de usuário (Sign Up).
    A senha é obrigatória neste estágio.
    """
    password: str

class User(UserBase):
    """
    Schema para resposta de dados de usuário.
    NUNCA deve conter a senha.
    """
    id: int
    is_superuser: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    """
    Schema para o Token JWT.
    """
    access_token: str
    token_type: str