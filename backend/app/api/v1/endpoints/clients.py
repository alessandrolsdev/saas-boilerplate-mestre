from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import client as client_schema
from app.crud import crud_client
from app.models.user import User
from app.api import deps # <--- Refatorado

router = APIRouter()

@router.get("/", response_model=List[client_schema.Client])
def read_clients(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    return crud_client.get_clients_by_owner(db, owner_id=current_user.id, skip=skip, limit=limit)

@router.post("/", response_model=client_schema.Client)
def create_client(
    client_in: client_schema.ClientCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    return crud_client.create_owner_client(db=db, client=client_in, owner_id=current_user.id)