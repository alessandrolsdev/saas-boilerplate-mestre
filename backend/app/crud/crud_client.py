from sqlalchemy.orm import Session
from app.models.client import Client
from app.schemas.client import ClientCreate, ClientUpdate

def get_clients_by_owner(db: Session, owner_id: int, skip: int = 0, limit: int = 100):
    # FILTRO DE SEGURANÇA: Só retorna clientes do dono
    return db.query(Client).filter(Client.owner_id == owner_id).offset(skip).limit(limit).all()

def create_owner_client(db: Session, client: ClientCreate, owner_id: int):
    db_client = Client(**client.dict(), owner_id=owner_id)
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def get_client(db: Session, client_id: int, owner_id: int):
    # Garante que só pode pegar um cliente se for dono dele
    return db.query(Client).filter(Client.id == client_id, Client.owner_id == owner_id).first()

def delete_client(db: Session, client_id: int, owner_id: int):
    client = db.query(Client).filter(Client.id == client_id, Client.owner_id == owner_id).first()
    if client:
        db.delete(client)
        db.commit()
    return client