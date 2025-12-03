from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db.base_class import Base

class ChargeStatus(str, enum.Enum):
    PENDING = "PENDING"
    PAID = "PAID"
    OVERDUE = "OVERDUE"
    CANCELED = "CANCELED"

class Charge(Base):
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    value = Column(Float, nullable=False)
    due_date = Column(DateTime(timezone=True), nullable=False)
    status = Column(String, default=ChargeStatus.PENDING.value, index=True)
    
    # Integração Asaas (Futuro)
    asaas_id = Column(String, nullable=True, index=True)
    invoice_url = Column(String, nullable=True)
    
    # Relacionamentos
    owner_id = Column(Integer, ForeignKey("user.id"))
    client_id = Column(Integer, ForeignKey("client.id"))
    
    owner = relationship("User")
    client = relationship("Client", back_populates="charges")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())