"""
CRUD de Cobrança.

Este módulo contém as funções para gerenciar cobranças no banco de dados.
"""
from sqlalchemy.orm import Session
from app.models.charge import Charge
from app.schemas.charge import ChargeCreate

def get_charges_by_owner(db: Session, owner_id: int, skip: int = 0, limit: int = 100):
    """
    Busca cobranças pertencentes a um usuário específico.
    
    Args:
        db (Session): Sessão do banco de dados.
        owner_id (int): ID do usuário proprietário.
        skip (int): Número de registros para pular.
        limit (int): Número máximo de registros para retornar.
        
    Returns:
        List[Charge]: Lista de cobranças encontradas, ordenadas por data de criação decrescente.
    """
    return db.query(Charge).filter(Charge.owner_id == owner_id)\
             .order_by(Charge.created_at.desc())\
             .offset(skip).limit(limit).all()

def create_charge(db: Session, charge: ChargeCreate, owner_id: int):
    """
    Cria uma nova cobrança associada a um usuário.
    
    Args:
        db (Session): Sessão do banco de dados.
        charge (ChargeCreate): Dados da cobrança.
        owner_id (int): ID do usuário proprietário.
        
    Returns:
        Charge: A cobrança criada.
    """
    db_charge = Charge(
        **charge.dict(),
        owner_id=owner_id,
        status="PENDING"
    )
    db.add(db_charge)
    db.commit()
    db.refresh(db_charge)
    return db_charge