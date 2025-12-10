"""
Configurações da Aplicação.

Este módulo define as configurações globais da aplicação usando Pydantic BaseSettings.
As configurações são carregadas de variáveis de ambiente ou de um arquivo .env.
"""
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Classe de configurações da aplicação.
    
    Attributes:
        PROJECT_NAME (str): Nome do projeto.
        API_V1_STR (str): Prefixo da API V1.
        SECRET_KEY (str): Chave secreta para assinatura de tokens JWT.
        ALGORITHM (str): Algoritmo de criptografia usado nos tokens (ex: HS256).
        ACCESS_TOKEN_EXPIRE_MINUTES (int): Tempo de expiração do token de acesso em minutos.
        DATABASE_URL (str): URL de conexão com o banco de dados.
    """
    PROJECT_NAME: str
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    DATABASE_URL: str

    class Config:
        """Configurações do Pydantic."""
        env_file = ".env"

settings = Settings()