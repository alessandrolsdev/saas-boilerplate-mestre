from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.core import security
from app.core.config import settings
from app.db.session import SessionLocal
from app.models.user import User

# Configura o esquema de autenticação OAuth2 para apontar para o endpoint de login.
# Isso permite que o Swagger UI saiba onde obter o token.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

def get_db() -> Generator:
    """
    Cria uma sessão de banco de dados para cada requisição.
    
    Esta função é um gerador que cria uma nova sessão do SQLAlchemy e a fecha
    após o término da requisição, garantindo que as conexões sejam gerenciadas
    corretamente.
    
    Yields:
        Session: Uma sessão do banco de dados SQLAlchemy.
    """
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

async def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> User:
    """
    Obtém o usuário atual autenticado a partir do token JWT.
    
    Esta função decodifica o token JWT fornecido, valida sua assinatura e
    expiração, e recupera o usuário correspondente do banco de dados.
    
    Args:
        db (Session): Sessão do banco de dados.
        token (str): Token JWT fornecido no cabeçalho Authorization.
        
    Returns:
        User: O objeto do usuário autenticado.
        
    Raises:
        HTTPException: Se o token for inválido, expirado ou se o usuário não for encontrado.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except (JWTError, ValidationError):
        raise credentials_exception
        
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise credentials_exception
    return user