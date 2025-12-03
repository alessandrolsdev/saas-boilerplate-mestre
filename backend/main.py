from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine
from app.db.base_class import Base

# Imports dos Models
from app.models.user import User
from app.models.client import Client
from app.models.charge import Charge

# Import do Scheduler
from app.automations.scheduler import start_scheduler, shutdown_scheduler

# Cria as tabelas
Base.metadata.create_all(bind=engine)

# --- CICLO DE VIDA (LIFESPAN) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ocorre ao iniciar (Startup)
    start_scheduler()
    yield
    # Ocorre ao desligar (Shutdown)
    shutdown_scheduler()

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

# --- CORS ---
origins = [
    "http://localhost:5173",
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
    return {"message": "Boilerplate Backend Operacional", "status": "active"}