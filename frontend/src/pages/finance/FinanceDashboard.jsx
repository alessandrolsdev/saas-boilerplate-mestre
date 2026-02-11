import { Link } from 'react-router-dom';
import {
    DollarSign,
    TrendingUp,
    Users,
    CreditCard,
    ArrowUpRight,
    Calendar,
    AlertCircle,
    CheckCircle2,
    Plus,
    FileText,
    Activity,
    Wallet
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';
import { InfoTooltip } from '../../components/ui/Tooltip';

/**
 * FinanceDashboard Component
 * 
 * Dashboard profissional para gestão financeira com tema azul/índigo.
 * Mostra MRR, clientes, cobranças e métricas de crescimento.
 */
export default function FinanceDashboard() {
    // Mock data - em produção viria da API
    const stats = {
        mrr: 24850,
        mrrGrowth: 12.5,
        totalClients: 142,
        activeClients: 124,
        pendingCharges: 8,
        paidThisMonth: 35,
        totalRevenue: 67320,
        avgTicket: 175
    };

    const recentCharges = [
        { id: 1, client: 'Tech Solutions LTDA', amount: 890, status: 'paid', date: 'Hoje, 10:30', plan: 'Enterprise' },
        { id: 2, client: 'Startup Innovate', amount: 450, status: 'pending', date: 'Hoje, 09:15', plan: 'Professional' },
        { id: 3, client: 'Marketing Pro', amount: 290, status: 'paid', date: 'Ontem, 16:45', plan: 'Basic' },
        { id: 4, client: 'Design Studio', amount: 650, status: 'paid', date: 'Ontem, 14:20', plan: 'Professional' },
        { id: 5, client: 'Consulting Group', amount: 1200, status: 'overdue', date: '08 Fev', plan: 'Enterprise' },
    ];

    const topClients = [
        { name: 'Tech Solutions LTDA', mrr: 890, ltv: 21360 },
        { name: 'Consulting Group', mrr: 1200, ltv: 28800 },
        { name: 'Enterprise Corp', mrr: 750, ltv: 18000 },
    ];

    const financialStats = [
        {
            label: 'MRR (Recorrente)',
            value: `R$ ${(stats.mrr / 1000).toFixed(1)}k`,
            icon: TrendingUp,
            color: 'text-indigo-400',
            bg: 'bg-indigo-500/10',
            border: 'hover:border-indigo-500/30',
            trend: `+${stats.mrrGrowth}% este mês`
        },
        {
            label: 'Receita Total',
            value: `R$ ${(stats.totalRevenue / 1000).toFixed(1)}k`,
            icon: Wallet,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'hover:border-emerald-500/30',
            trend: 'Acumulado anual'
        },
        {
            label: 'Clientes Ativos',
            value: `${stats.activeClients}/${stats.totalClients}`,
            icon: Users,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'hover:border-blue-500/30',
            trend: 'Taxa de Ativação: 87%'
        },
        {
            label: 'Pendentes',
            value: stats.pendingCharges,
            icon: AlertCircle,
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/10',
            border: 'hover:border-yellow-500/30',
            trend: 'Aguardando pagamento'
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden p-8">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight uppercase italic relative inline-block">
                            Financeiro
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
                        </h1>
                        <p className="text-zinc-400 mt-2 font-medium">Gestão de Receita e Cobranças</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link to="/finance/charges">
                        <button className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all font-bold uppercase text-sm flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Ver Cobranças
                        </button>
                    </Link>
                    <Link to="/finance/clients">
                        <AnimatedButton className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-black uppercase hover:shadow-lg hover:shadow-indigo-500/25 transition-all inline-flex items-center gap-2 border border-white/10">
                            <Plus className="w-5 h-5" />
                            Novo Cliente
                        </AnimatedButton>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
                {financialStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <AnimatedCard
                            key={index}
                            delay={index * 0.1}
                            className={`bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/5 transition-all group ${stat.border}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <InfoTooltip content={stat.trend} />
                            </div>
                            <div className="text-3xl font-black text-white mb-1 tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-sm text-zinc-400 font-bold uppercase tracking-wide flex items-center gap-2">
                                {stat.label}
                            </div>
                        </AnimatedCard>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                {/* Recent Activity / Charges */}
                <AnimatedCard delay={0.4} className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black uppercase text-white tracking-tight">Atividade Recente</h2>
                                <p className="text-sm text-zinc-400 font-bold">Últimas transações e cobranças</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <AnimatePresence>
                            {recentCharges.map((charge, i) => (
                                <motion.div
                                    key={charge.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/30 border border-white/5 hover:bg-zinc-900/50 hover:border-indigo-500/20 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border-2 border-zinc-800 group-hover:border-indigo-500/50 transition-colors">
                                        <CreditCard className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <div className="font-bold text-white truncate">{charge.client}</div>
                                            <div className="text-sm font-black text-white">R$ {charge.amount}</div>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <div className="text-xs text-zinc-500 font-bold uppercase">
                                                {charge.plan} • {charge.date}
                                            </div>
                                            <div>
                                                {charge.status === 'paid' && (
                                                    <span className="text-xs font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Pago</span>
                                                )}
                                                {charge.status === 'pending' && (
                                                    <span className="text-xs font-black uppercase text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">Pendente</span>
                                                )}
                                                {charge.status === 'overdue' && (
                                                    <span className="text-xs font-black uppercase text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">Atrasado</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </AnimatedCard>

                {/* Top Clients */}
                <AnimatedCard delay={0.5} className="lg:col-span-1 bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-black uppercase text-white tracking-tight">Top Clientes</h2>
                    </div>

                    <div className="space-y-4">
                        {topClients.map((client, idx) => (
                            <div key={idx} className="relative p-4 rounded-xl bg-zinc-950/30 border border-white/5 group hover:border-purple-500/30 transition-all">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="font-bold text-white text-sm mb-1">{client.name}</div>
                                        <div className="text-xs text-zinc-500 font-bold uppercase">MRR: R$ {client.mrr}</div>
                                    </div>
                                    <div className="text-2xl font-black text-purple-500/10 group-hover:text-purple-500/20 transition-colors">
                                        #{idx + 1}
                                    </div>
                                </div>
                                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                                    <div className="text-xs text-zinc-600 font-bold uppercase">LTV Estimado</div>
                                    <div className="text-sm font-black text-emerald-400">
                                        R$ {(client.ltv / 1000).toFixed(1)}k
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <Link to="/finance/clients">
                            <button className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-2">
                                Gerenciar Clientes <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </AnimatedCard>
            </div>
        </div>
    );
}
