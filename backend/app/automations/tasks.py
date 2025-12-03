from datetime import datetime
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.charge import Charge, ChargeStatus

# Função auxiliar para pegar sessão de banco em thread separada
def run_db_task(task_func):
    db = SessionLocal()
    try:
        task_func(db)
    except Exception as e:
        print(f"Erro na tarefa agendada: {e}")
    finally:
        db.close()

# A Tarefa Real (Lógica de Negócio)
def check_overdue_charges_logic(db: Session):
    now = datetime.now()
    # Busca cobranças PENDENTES que venceram antes de AGORA
    overdue_charges = db.query(Charge).filter(
        Charge.status == ChargeStatus.PENDING.value,
        Charge.due_date < now
    ).all()
    
    count = 0
    for charge in overdue_charges:
        charge.status = ChargeStatus.OVERDUE.value
        # AQUI entraria o disparo de email/whatsapp
        print(f"ALERTA: Cobrança #{charge.id} de {charge.value} venceu! Atualizando status...")
        count += 1
    
    if count > 0:
        db.commit()
        print(f"✅ Automação: {count} cobranças marcadas como atrasadas.")
    else:
        print("💤 Automação: Nenhuma cobrança atrasada encontrada.")

# Wrapper para o Scheduler chamar
def task_check_overdue():
    print("⏰ Rodando verificação diária...")
    run_db_task(check_overdue_charges_logic)