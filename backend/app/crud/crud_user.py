"""
CRUD de Usuário.

Este módulo contém as funções para criar e buscar usuários no banco de dados.
"""
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash

def get_user_by_email(db: Session, email: str):
    """
    Busca um usuário pelo email.
    
    Args:
        db (Session): Sessão do banco de dados.
        email (str): Email do usuário.
        
    Returns:
        User: O usuário encontrado ou None.
    """
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    """
    Cria um novo usuário no banco de dados.
    
    Esta função realiza o hash da senha antes de salvar o usuário.
    
    Args:
        db (Session): Sessão do banco de dados.
        user (UserCreate): Dados do usuário para criação.
        
    Returns:
        User: O usuário criado.
    """
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password,
        is_active=True,
        is_superuser=False,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user