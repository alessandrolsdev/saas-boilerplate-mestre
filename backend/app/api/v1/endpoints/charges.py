from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import charge as charge_schema
from app.crud import crud_charge, crud_client
from app.models.user import User
from app.api import deps # <--- Usando a refatoração aqui

router = APIRouter()

@router.get("/", response_model=List[charge_schema.Charge])
def read_charges(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    return crud_charge.get_charges_by_owner(db, owner_id=current_user.id, skip=skip, limit=limit)

@router.post("/", response_model=charge_schema.Charge)
def create_charge(
    charge_in: charge_schema.ChargeCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    # Valida se o cliente existe e pertence ao usuário
    client = crud_client.get_client(db, client_id=charge_in.client_id, owner_id=current_user.id)
    if not client:
        raise HTTPException(status_code=404, detail="Cliente não encontrado ou não pertence a você.")
        
    return crud_charge.create_charge(db=db, charge=charge_in, owner_id=current_user.id)