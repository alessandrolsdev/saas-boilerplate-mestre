#!/bin/bash
# 1. Roda as migrações do banco (Cria tabelas se não existirem)
# Nota: Em produção real usaríamos Alembic, mas para MVP isso resolve:
python -c "from app.db.session import engine; from app.db.base_class import Base; Base.metadata.create_all(bind=engine)"

# 2. Inicia o servidor com Gunicorn (4 workers para aguentar tráfego)
exec gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:10000