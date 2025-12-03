from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Se estiver usando SQLite para teste rápido, precisa de um check aqui.
# Mas como focamos em Postgres (Supabase/Render), segue o padrão:
engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)