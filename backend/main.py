from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine
from app.db.base_class import Base
from app.models.user import User 
from app.api.v1.api import api_router

# Cria as tabelas no banco (se não existirem)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SaaS Master Boilerplate")

# Configuração de CORS (Crucial para o Vue falar com Python)
origins = [
    "http://localhost:5173", # Porta padrão do Vite
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"message": "Boilerplate Backend Operacional", "status": "active"}

# Exemplo de rota de automação (simulada)
@app.get("/run-automation")
def run_automation():
    return {"task": "Verificação de boletos atrasados iniciada (Simulação)"}