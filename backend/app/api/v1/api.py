"""
Módulo principal de rotas da API V1.

Este arquivo agrega todos os roteadores de endpoints da versão 1 da API,
organizando-os por funcionalidade (autenticação, clientes, cobranças, dashboard).
"""
from fastapi import APIRouter
from app.api.v1.endpoints import auth, clients, charges, dashboard

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(clients.router, prefix="/clients", tags=["clients"])
api_router.include_router(charges.router, prefix="/charges", tags=["charges"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])