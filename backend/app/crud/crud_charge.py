from sqlalchemy.orm import Session
from app.models.charge import Charge
from app.schemas.charge import ChargeCreate

def get_charges_by_owner(db: Session, owner_id: int, skip: int = 0, limit: int = 100):
    return db.query(Charge).filter(Charge.owner_id == owner_id)\
             .order_by(Charge.created_at.desc())\
             .offset(skip).limit(limit).all()

def create_charge(db: Session, charge: ChargeCreate, owner_id: int):
    db_charge = Charge(
        **charge.dict(),
        owner_id=owner_id,
        status="PENDING"
    )
    db.add(db_charge)
    db.commit()
    db.refresh(db_charge)
    return db_charge