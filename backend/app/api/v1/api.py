from fastapi import APIRouter
from app.api.v1.endpoints import auth, clients, charges

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(clients.router, prefix="/clients", tags=["clients"])
api_router.include_router(charges.router, prefix="/charges", tags=["charges"])