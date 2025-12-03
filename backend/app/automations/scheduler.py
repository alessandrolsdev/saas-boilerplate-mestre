from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.automations.tasks import task_check_overdue

scheduler = AsyncIOScheduler()

def start_scheduler():
    # Adiciona o job.
    # Exemplo: Rodar a cada 1 minuto para testes (em produção seria daily)
    scheduler.add_job(task_check_overdue, 'interval', minutes=1, id='check_overdue')
    
    # Inicia o motor
    scheduler.start()
    print("🚀 Scheduler de Automação Iniciado!")

def shutdown_scheduler():
    scheduler.shutdown()
    print("🛑 Scheduler Parado.")