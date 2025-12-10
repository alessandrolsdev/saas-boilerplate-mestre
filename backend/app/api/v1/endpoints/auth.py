"""
Endpoints de Autenticação.

Este módulo contém as rotas para registro de novos usuários e autenticação (Login/OAuth2).
"""
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.core import security
from app.core.config import settings
from app.crud import crud_user
from app.schemas import user as user_schemas

router = APIRouter()

def get_db():
    """Dependência para obter uma sessão de banco de dados por requisição."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=user_schemas.User)
def register_user(
    user_in: user_schemas.UserCreate,
    db: Session = Depends(get_db)
):
    """
    Registra um novo usuário no sistema.
    
    Verifica a unicidade do email antes de criar o registro.
    """
    user = crud_user.get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Opa! Esse email já está cadastrado no sistema."
        )
    user = crud_user.create_user(db, user=user_in)
    return user

@router.post("/login", response_model=user_schemas.Token)
def login_access_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    Realiza o login e retorna um token de acesso JWT.
    
    Valida as credenciais (email/senha) e o status do usuário.
    """
    # O OAuth2PasswordRequestForm usa 'username' para receber o email
    user = crud_user.get_user_by_email(db, email=form_data.username)
    
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
        )
    
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Usuário inativo")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }