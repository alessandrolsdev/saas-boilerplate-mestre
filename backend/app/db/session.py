"""
Sessão do Banco de Dados.

Configura a engine do SQLAlchemy e a fábrica de sessões.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Cria a engine do banco de dados.
# pool_pre_ping=True ajuda a evitar erros de conexão perdida.
engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

# Fábrica de sessões para criar novas sessões de banco de dados.
# autocommit=False e autoflush=False são boas práticas para controle transacional explícito.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)