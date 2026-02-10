"""
Arquivo Principal da Aplicação (Entrypoint).

Este arquivo configura e inicializa a aplicação FastAPI, incluindo middlewares (CORS),
rotas e eventos de ciclo de vida (startup/shutdown).
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine
from app.db.base_class import Base

# Imports dos Models para garantir que sejam registrados no SQLAlchemy
from app.models.user import User
from app.models.client import Client
from app.models.charge import Charge

# Modelos do SaaS de Salão de Beleza
from app.models.service import Service
from app.models.professional import Professional
from app.models.appointment import Appointment

# Modelos do SaaS de Academia
from app.models.gym_member import GymMember
from app.models.membership_plan import MembershipPlan
from app.models.check_in import CheckIn
from app.models.gym_payment import GymPayment

# Import do Scheduler para automações
from app.automations.scheduler import start_scheduler, shutdown_scheduler

# Cria as tabelas no banco de dados se não existirem
Base.metadata.create_all(bind=engine)


# --- CICLO DE VIDA (LIFESPAN) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gerenciador de contexto para o ciclo de vida da aplicação.

    Executa ações na inicialização (startup) e no encerramento (shutdown) da API.
    """
    # Ocorre ao iniciar (Startup)
    start_scheduler()
    yield
    # Ocorre ao desligar (Shutdown)
    shutdown_scheduler()


app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

# --- CORS ---
# Configuração de Cross-Origin Resource Sharing para permitir requisições do frontend
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ROTAS ---
from app.api.v1.api import api_router

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
def read_root():
    """
    Rota raiz para verificação de saúde da API.
    """
    return {"message": "Boilerplate Backend Operacional", "status": "active"}
