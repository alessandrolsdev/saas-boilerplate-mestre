from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class Client(Base):
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(String)
    document = Column(String)
    notes = Column(String, nullable=True)
    
    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="clients")
    
    # RELAÇÃO NOVA ADICIONADA:
    charges = relationship("Charge", back_populates="client")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())