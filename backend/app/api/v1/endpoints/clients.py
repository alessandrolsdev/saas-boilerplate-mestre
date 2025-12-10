"""
Endpoints de Clientes.

Este módulo contém as rotas para gerenciamento de clientes (CRUD).
"""
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import client as client_schema
from app.crud import crud_client
from app.models.user import User
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[client_schema.Client])
def read_clients(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """
    Lista os clientes do usuário atual.
    
    Args:
        skip (int): Número de registros para pular (paginação).
        limit (int): Número máximo de registros para retornar.
        db (Session): Sessão do banco de dados.
        current_user (User): Usuário autenticado.
        
    Returns:
        List[client_schema.Client]: Lista de clientes encontrados.
    """
    return crud_client.get_clients_by_owner(db, owner_id=current_user.id, skip=skip, limit=limit)

@router.post("/", response_model=client_schema.Client)
def create_client(
    client_in: client_schema.ClientCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """
    Cria um novo cliente para o usuário atual.
    
    Args:
        client_in (client_schema.ClientCreate): Dados do novo cliente.
        db (Session): Sessão do banco de dados.
        current_user (User): Usuário autenticado.
        
    Returns:
        client_schema.Client: O cliente criado.
    """
    return crud_client.create_owner_client(db=db, client=client_in, owner_id=current_user.id)