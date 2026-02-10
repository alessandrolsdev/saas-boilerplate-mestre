"""Script temporário para criar tabelas do banco"""

from app.db.session import engine
from app.db.base import Base

Base.metadata.create_all(bind=engine)
print("✅ Tabelas criadas com sucesso!")
