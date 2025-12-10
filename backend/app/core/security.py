"""
Utilitários de Segurança.

Este módulo fornece funções para hashing de senhas e geração de tokens JWT.
"""
from datetime import datetime, timedelta, timezone
from typing import Any, Union
from jose import jwt
from passlib.context import CryptContext
from app.core.config import settings

# Configuração do Hashing (Bcrypt é padrão ouro)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:
    """
    Cria um token de acesso JWT.
    
    Args:
        subject (Union[str, Any]): O assunto do token (geralmente o ID do usuário).
        expires_delta (timedelta, optional): Tempo de expiração do token. Se não fornecido, usa o padrão da configuração.
        
    Returns:
        str: O token JWT codificado.
    """
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica se uma senha em texto plano corresponde ao hash armazenado.
    
    Args:
        plain_password (str): Senha em texto plano.
        hashed_password (str): Hash da senha armazenada.
        
    Returns:
        bool: True se a senha estiver correta, False caso contrário.
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Gera o hash de uma senha.
    
    Args:
        password (str): Senha em texto plano.
        
    Returns:
        str: Hash da senha.
    """
    return pwd_context.hash(password)