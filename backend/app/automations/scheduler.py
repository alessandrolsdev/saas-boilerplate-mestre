"""
Scheduler de Automação.

Configura e gerencia o agendamento de tarefas em segundo plano usando `APScheduler`.
"""
import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.automations.tasks import task_check_overdue

# Configuração de Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()

def start_scheduler():
    """
    Inicia o agendador de tarefas em background.
    """
    # Adiciona jobs (Tarefas recorrentes)
    scheduler.add_job(
        task_check_overdue, 
        'interval', 
        minutes=1, 
        id='check_overdue', 
        replace_existing=True
    )
    
    scheduler.start()
    logger.info("Scheduler de Automação iniciado com sucesso.")

def shutdown_scheduler():
    """
    Desliga o agendador de tarefas.
    """
    scheduler.shutdown()
    logger.info("Scheduler de Automação finalizado.")