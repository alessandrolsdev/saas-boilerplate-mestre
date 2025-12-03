from fastapi import APIRouter
from app.api.v1.endpoints import auth

api_router = APIRouter()
# Incluindo as rotas de auth
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])