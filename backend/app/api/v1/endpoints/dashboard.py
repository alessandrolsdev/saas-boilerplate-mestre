"""
Endpoints do Dashboard.

Este módulo fornece estatísticas agregadas correções de fuso horário e métricas de desempenho (KPIs).
"""
from datetime import datetime, timedelta, timezone
from dateutil.relativedelta import relativedelta
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.api import deps
from app.models.client import Client
from app.models.charge import Charge

router = APIRouter()

def calculate_growth(current: float, previous: float) -> float:
    """Calcula a porcentagem de crescimento entre dois valores."""
    if previous == 0:
        return 100.0 if current > 0 else 0.0
    return ((current - previous) / previous) * 100

@router.get("/stats")
def get_dashboard_stats(
    period: str = Query("6m", description="Período de análise: 7d, 30d, 6m, 12m"),
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    """
    Retorna estatísticas consolidadas para o dashboard.
    
    Inclui MRR, total de clientes, churn rate, ticket médio e dados históricos para gráficos.
    """
    # Define o tempo base em UTC para consistência com o banco de dados
    now = datetime.now(timezone.utc)
    
    # Configuração do intervalo de datas e passo de agregação
    if period == "7d":
        days = 7
        date_fmt = "%d/%m"
        delta_step = timedelta(days=1)
    elif period == "30d":
        days = 30
        date_fmt = "%d/%m"
        delta_step = timedelta(days=1)
    elif period == "12m":
        days = 365
        date_fmt = "%b" # Formato mês (Jan, Fev...)
        delta_step = relativedelta(months=1)
    else: # Default: 6m
        days = 180
        date_fmt = "%b"
        delta_step = relativedelta(months=1)
        
    start_date = now - timedelta(days=days)
    last_month_start = now - relativedelta(months=1)

    # Cálculo de KPIs (Key Performance Indicators)
    # MRR (Monthly Recurring Revenue)
    current_mrr = db.query(func.sum(Client.mrr)).filter(
        Client.owner_id == current_user.id, 
        Client.status == "Ativo"
    ).scalar() or 0.0

    prev_mrr = db.query(func.sum(Client.mrr)).filter(
        Client.owner_id == current_user.id,
        Client.status == "Ativo",
        Client.created_at < last_month_start
    ).scalar() or 0.0
    
    # Contagem de Clientes
    total_clients = db.query(Client).filter(Client.owner_id == current_user.id, Client.status == 'Ativo').count()
    prev_clients = db.query(Client).filter(Client.owner_id == current_user.id, Client.status == 'Ativo', Client.created_at < last_month_start).count()
    
    # Churn Rate (Taxa de Cancelamento)
    cancelled_last_30d = db.query(Client).filter(
        Client.owner_id == current_user.id,
        Client.status == 'Cancelado',
        Client.updated_at >= (now - timedelta(days=30))
    ).count()
    
    churn_rate = (cancelled_last_30d / total_clients * 100) if total_clients > 0 else 0.0
    avg_ticket = (current_mrr / total_clients) if total_clients > 0 else 0.0

    # Preparação dos Dados do Gráfico
    chart_data = {}
    
    # Inicializa todos os buckets temporais com zero para garantir continuidade no eixo X
    current_step = start_date
    while current_step <= now:
        key = current_step.strftime(date_fmt)
        if key not in chart_data:
            chart_data[key] = {"revenue": 0.0, "clients": 0}
        
        # Avança para o próximo bucket
        current_step += delta_step

    # Agregação de Receita (Cobranças Pagas)
    charges = db.query(Charge).filter(
        Charge.owner_id == current_user.id,
        Charge.status == "PAID",
        Charge.due_date >= start_date
    ).all()

    for c in charges:
        key = c.due_date.strftime(date_fmt)
        if key in chart_data:
            chart_data[key]["revenue"] += c.value

    # Agregação de Novos Clientes
    new_clients = db.query(Client).filter(
        Client.owner_id == current_user.id,
        Client.created_at >= start_date
    ).all()

    for c in new_clients:
        key = c.created_at.strftime(date_fmt)
        if key in chart_data:
            chart_data[key]["clients"] += 1

    # Distribuição por Plano
    plans = db.query(Client.plan, func.count(Client.id)).filter(Client.owner_id == current_user.id).group_by(Client.plan).all()
    plan_dist = {p[0]: p[1] for p in plans}

    return {
        "overview": { 
            "mrr": { "value": current_mrr, "trend": calculate_growth(current_mrr, prev_mrr) },
            "active_clients": { "value": total_clients, "trend": calculate_growth(total_clients, prev_clients) },
            "churn": { "value": churn_rate, "trend": -0.5 }, # Churn trend hardcoded como exemplo
            "avg_ticket": { "value": avg_ticket, "trend": 0 }
        },
        "distribution": plan_dist,
        "chart": chart_data
    }