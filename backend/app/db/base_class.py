"""
Classe Base do SQLAlchemy.

Define a classe base declarativa para todos os modelos do banco de dados.
"""
from typing import Any
from sqlalchemy.ext.declarative import as_declarative, declared_attr

@as_declarative()
class Base:
    """
    Classe base para modelos SQLAlchemy.
    
    Fornece um ID padrão e gera automaticamente o nome da tabela com base no nome da classe.
    """
    id: Any
    __name__: str

    # Gera o nome da tabela com base no nome da classe (User -> user)
    @declared_attr
    def __tablename__(cls) -> str:
        """
        Retorna o nome da tabela em minúsculas.
        """
        return cls.__name__.lower()