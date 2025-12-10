"""
Módulo Base de Banco de Dados.

Este arquivo é responsável por importar todos os modelos e a classe Base do SQLAlchemy.
Isso é crucial para que o Alembic possa detectar automaticamente as tabelas para gerar migrações.
"""
from app.db.base_class import Base # noqa

# Importação de todos os modelos para registro no metadata do SQLAlchemy
from app.models.user import User # noqa
from app.models.client import Client # noqa
from app.models.charge import Charge # noqa