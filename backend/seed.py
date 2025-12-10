"""
Script de Seed (Povoamento Inicial do Banco de Dados).

Este script popula o banco de dados com dados iniciais para desenvolvimento e testes.
Cria um usuário administrador padrão e gera um ecossistema simulado de clientes e transações.
"""
import random
from datetime import datetime, timedelta, timezone
from app.db.session import SessionLocal
from app.models.user import User
from app.models.client import Client
from app.models.charge import Charge
from app.core.security import get_password_hash

# Configurações de Simulação
COMPANIES = [
    "TechSolutions", "Advocacia Silva", "Construtora Ideal", 
    "Clinica Vida", "Solar Energy", "AgroTop", "Logistica Express", 
    "Mkt Digital", "Soft House", "Padaria Central", "Retail Corp", 
    "Law Firm X", "Engenharia Sul"
]
PLANS = [
    {"name": "Basic", "price": 150.0},
    {"name": "Pro", "price": 450.0},
    {"name": "Enterprise", "price": 2500.0}
]
STATUS_OPTS = ["Ativo", "Ativo", "Ativo", "Pendente", "Inadimplente", "Cancelado"]

def init_db():
    """
    Função principal para inicializar o banco de dados.
    """
    db = SessionLocal()
    
    # Data de referência em UTC
    now_utc = datetime.now(timezone.utc)
    
    # 1. Criação/Verificação do Usuário Admin
    user = db.query(User).filter(User.email == "admin@saasmestre.com").first()
    if not user:
        print("[SEED] Criando Usuário Admin...")
        user = User(
            full_name="Admin Master", 
            email="admin@saasmestre.com", 
            hashed_password=get_password_hash("123456"), 
            is_active=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # 2. Reset de Dados (Limpeza)
    print("[SEED] Limpando dados existentes de clientes e cobranças...")
    db.query(Charge).delete()
    db.query(Client).delete()
    db.commit()

    # 3. Geração de Clientes e Histórico Financeiro
    print("[SEED] Gerando dados simulados...")
    
    total_clients = 50
    
    for i in range(total_clients):
        plan_data = random.choice(PLANS)
        
        # Simula entrada do cliente nos últimos 18 meses
        days_ago = random.randint(0, 540)
        created_date = now_utc - timedelta(days=days_ago)
        
        client = Client(
            full_name=f"{random.choice(COMPANIES)} {i+1}",
            email=f"contato{i}@empresa.com",
            phone=f"1199999{i:04d}",
            owner_id=user.id,
            plan=plan_data["name"],
            mrr=plan_data["price"],
            status=random.choice(STATUS_OPTS),
            created_at=created_date,
            ltv=0.0 # Será calculado baseado nas cobranças
        )
        db.add(client)
        db.flush() # Necessário para obter o ID do cliente

        # Gera histórico de cobranças baseado no tempo de vida do cliente
        months_active = int(days_ago / 30)
        client_ltv = 0.0
        
        for m in range(months_active + 1):
            charge_date = created_date + timedelta(days=m * 30)
            
            # Não gera cobranças futuras
            if charge_date > now_utc: 
                continue
            
            # Lógica de simulação de status de pagamento
            charge_status = "PAID"
            days_diff = (now_utc - charge_date).days
            
            # Recentes podem estar pendentes
            if days_diff < 10:
                charge_status = random.choice(["PAID", "PENDING"])
            # Clientes inadimplentes falham na última fatura
            elif client.status == "Inadimplente" and m == months_active:
                charge_status = "OVERDUE"
            
            if charge_status == "PAID":
                client_ltv += plan_data["price"]

            charge = Charge(
                description=f"Mensalidade {client.plan} - {charge_date.strftime('%b/%Y')}",
                value=plan_data["price"],
                due_date=charge_date,
                status=charge_status,
                owner_id=user.id,
                client_id=client.id,
                created_at=charge_date 
            )
            db.add(charge)
        
        # Atualiza o LTV calculado
        client.ltv = client_ltv
        db.add(client)

    db.commit()
    print(f"[SEED] Concluído! {total_clients} clientes e histórico financeiro gerados.")
    db.close()

if __name__ == "__main__":
    init_db()