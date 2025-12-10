import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Chart from 'react-apexcharts'
import {
    TrendingUp, TrendingDown, Users, Wallet, Zap,
    MoreHorizontal, Plus
} from 'lucide-react'
import dashboardService from '@/services/dashboard'
import clientService from '@/services/clients'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Card de KPI Componentizado
const KpiCard = ({ label, value, trend, icon: Icon, isPositive }) => (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 p-6 rounded-2xl hover:border-slate-700 transition-all">
        <div className="flex justify-between mb-4">
            <div className="p-3 rounded-xl bg-slate-800 text-indigo-400 border border-slate-700">
                <Icon size={24} />
            </div>
            <div className={cn(
                "text-xs font-bold px-2 py-1 rounded-full flex gap-1 items-center h-fit",
                isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
            )}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {typeof trend === 'number' ? Math.abs(trend).toFixed(1) + '%' : trend}
            </div>
        </div>
        <div className="text-slate-400 text-sm">{label}</div>
        <div className="text-3xl font-bold text-white mt-1 font-mono tracking-tight">{value}</div>
    </div>
)

export default function Dashboard() {
    const [period, setPeriod] = useState('6m')

    // Queries (TanStack Query)
    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['dashboard', period],
        queryFn: () => dashboardService.getStats(period),
        keepPreviousData: true
    })

    // Formatadores
    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0)

    // Configuração do Gráfico (Chart Options)
    const chartOptions = {
        chart: {
            type: 'area',
            fontFamily: 'Inter, sans-serif',
            background: 'transparent',
            toolbar: { show: false },
            animations: { enabled: true, easing: 'easeinout', speed: 800 }
        },
        colors: ['#6366f1', '#10b981'],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 5] },
        xaxis: {
            categories: stats ? Object.keys(stats.chart) : [],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
            tooltip: { enabled: false },
            crosshairs: { show: true, stroke: { color: '#334155', dashArray: 4 } }
        },
        yaxis: [
            {
                labels: {
                    style: { colors: '#94a3b8' },
                    formatter: (value) => `R$ ${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`
                }
            },
            {
                opposite: true,
                labels: {
                    style: { colors: '#94a3b8' },
                    formatter: (value) => Math.floor(value)
                }
            }
        ],
        grid: { borderColor: '#334155', strokeDashArray: 4, yaxis: { lines: { show: true } } },
        theme: { mode: 'dark' },
        tooltip: { theme: 'dark' },
        legend: { show: true, position: 'top', horizontalAlign: 'right' }
    }

    const chartSeries = stats ? [
        { name: 'Receita (MRR)', type: 'area', data: Object.values(stats.chart).map(d => d.revenue) },
        { name: 'Novos Clientes', type: 'line', data: Object.values(stats.chart).map(d => d.clients) }
    ] : []

    // Donut Options
    const donutOptions = {
        chart: { type: 'donut', background: 'transparent' },
        labels: stats?.distribution ? Object.keys(stats.distribution) : [],
        colors: ['#3b82f6', '#a855f7', '#10b981'],
        stroke: { show: true, colors: ['#1e293b'], width: 2 },
        legend: { position: 'bottom', labels: { colors: '#94a3b8' } },
        plotOptions: { pie: { donut: { size: '70%', labels: { show: true, total: { show: true, label: 'Total', color: '#94a3b8' }, value: { color: '#fff' } } } } }
    }

    if (statsLoading && !stats) return <div className="text-white">Carregando Dashboard...</div>

    const ov = stats?.overview || {}

    return (
        <div className="space-y-6">

            {/* Header da Página */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Visão Geral</h1>
                    <p className="text-slate-400 mt-1">Bem-vindo de volta ao painel administrativo.</p>
                </div>
                <Button className="bg-white text-indigo-950 hover:bg-slate-200 font-bold">
                    <Plus size={18} className="mr-2" /> Nova Ação
                </Button>
            </div>

            {/* Grid de KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <KpiCard label="MRR (Receita)" value={formatCurrency(ov.mrr?.value)} trend={ov.mrr?.trend} isPositive={ov.mrr?.trend >= 0} icon={Wallet} />
                <KpiCard label="Clientes Ativos" value={ov.active_clients?.value} trend={ov.active_clients?.trend} isPositive={ov.active_clients?.trend >= 0} icon={Users} />
                <KpiCard label="Churn Rate" value={(ov.churn?.value || 0).toFixed(1) + '%'} trend={ov.churn?.trend} isPositive={ov.churn?.value < 2} icon={TrendingDown} />
                <KpiCard label="Ticket Médio" value={formatCurrency(ov.avg_ticket?.value)} trend={0} isPositive={true} icon={Zap} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="xl:col-span-2 bg-slate-900/50 backdrop-blur-md border border-slate-800/50 rounded-2xl p-6 relative">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Performance Financeira</h3>
                            <p className="text-sm text-slate-400">Receita vs Aquisição de Clientes</p>
                        </div>
                        <div className="bg-slate-950 border border-slate-800 p-1 rounded-lg flex text-xs">
                            {['7d', '30d', '6m', '12m'].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setPeriod(r)}
                                    className={cn(
                                        "px-3 py-1 rounded transition-all uppercase font-medium",
                                        period === r ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
                                    )}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-[350px]">
                        <Chart options={chartOptions} series={chartSeries} type="area" height={350} />
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Distribuição / Status</h3>
                    <div className="h-[250px] flex items-center justify-center">
                        <Chart options={donutOptions} series={stats?.distribution ? Object.values(stats.distribution) : []} type="donut" width={320} />
                    </div>
                </div>
            </div>

        </div>
    )
}
