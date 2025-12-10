"""
CRUD de Cliente.

Este módulo contém as funções para gerenciar clientes no banco de dados.
"""
from sqlalchemy.orm import Session
from app.models.client import Client
from app.schemas.client import ClientCreate, ClientUpdate

def get_clients_by_owner(db: Session, owner_id: int, skip: int = 0, limit: int = 100):
    """
    Busca clientes pertencentes a um usuário específico.
    
    Args:
        db (Session): Sessão do banco de dados.
        owner_id (int): ID do usuário proprietário.
        skip (int): Número de registros para pular.
        limit (int): Número máximo de registros para retornar.
        
    Returns:
        List[Client]: Lista de clientes encontrados.
    """
    # FILTRO DE SEGURANÇA: Só retorna clientes do dono
    return db.query(Client).filter(Client.owner_id == owner_id).offset(skip).limit(limit).all()

def create_owner_client(db: Session, client: ClientCreate, owner_id: int):
    """
    Cria um novo cliente associado a um usuário.
    
    Args:
        db (Session): Sessão do banco de dados.
        client (ClientCreate): Dados do cliente.
        owner_id (int): ID do usuário proprietário.
        
    Returns:
        Client: O cliente criado.
    """
    db_client = Client(**client.dict(), owner_id=owner_id)
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def get_client(db: Session, client_id: int, owner_id: int):
    """
    Busca um cliente específico, garantindo que pertença ao usuário.
    
    Args:
        db (Session): Sessão do banco de dados.
        client_id (int): ID do cliente.
        owner_id (int): ID do usuário proprietário.
        
    Returns:
        Client: O cliente encontrado ou None.
    """
    # Garante que só pode pegar um cliente se for dono dele
    return db.query(Client).filter(Client.id == client_id, Client.owner_id == owner_id).first()

def delete_client(db: Session, client_id: int, owner_id: int):
    """
    Remove um cliente, garantindo que pertença ao usuário.
    
    Args:
        db (Session): Sessão do banco de dados.
        client_id (int): ID do cliente.
        owner_id (int): ID do usuário proprietário.
        
    Returns:
        Client: O cliente removido ou None se não encontrado.
    """
    client = db.query(Client).filter(Client.id == client_id, Client.owner_id == owner_id).first()
    if client:
        db.delete(client)
        db.commit()
    return client