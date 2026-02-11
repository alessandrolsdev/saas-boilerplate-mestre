import { Link } from 'react-router-dom';
import {
    Dumbbell,
    TrendingUp,
    Users,
    Activity,
    DollarSign,
    Calendar,
    CheckCircle2,
    AlertCircle,
    Clock,
    Flame,
    Plus,
    ArrowUpRight,
    MoreVertical
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';
import { InfoTooltip } from '../../components/ui/Tooltip';

/**
 * GymDashboard Component
 * 
 * Dashboard energético para academia com tema laranja/vermelho.
 * Mostra check-ins em tempo real, membros ativos e métricas de performance.
 */
export default function GymDashboard() {
    // Mock data
    const recentCheckIns = [
        { id: 1, member: 'Carlos Silva', plan: 'Premium', time: '2 min atrás', photo: null, status: 'success' },
        { id: 2, member: 'João Pedro', plan: 'Básico', time: '5 min atrás', photo: null, status: 'success' },
        { id: 3, member: 'Marina Costa', plan: 'VIP', time: '8 min atrás', photo: null, status: 'success' },
        { id: 4, member: 'Rafael Santos', plan: 'Premium', time: '12 min atrás', photo: null, status: 'success' },
        { id: 5, member: 'Amanda Oliveira', plan: 'Básico', time: '15 min atrás', photo: null, status: 'pending' },
    ];

    const stats = [
        {
            label: 'Membros Ativos',
            value: 342,
            icon: Users,
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
            border: 'hover:border-orange-500/30',
            trend: '+12% este mês'
        },
        {
            label: 'Check-ins Hoje',
            value: 87,
            icon: Activity,
            color: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'hover:border-green-500/30',
            trend: 'Pico às 18h'
        },
        {
            label: 'Receita Mensal',
            value: 'R$ 48.5k',
            icon: DollarSign,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'hover:border-blue-500/30',
            trend: '+5% vs mês anterior'
        },
        {
            label: 'Vencendo (7 dias)',
            value: 12,
            icon: AlertCircle,
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/10',
            border: 'hover:border-yellow-500/30',
            trend: 'Ação necessária'
        }
    ];

    const topPlans = [
        { name: 'Premium', members: 156, revenue: 28080, trend: 'up' },
        { name: 'Básico', members: 134, revenue: 16080, trend: 'down' },
        { name: 'VIP', members: 52, revenue: 10400, trend: 'up' },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden p-8">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Dumbbell className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight uppercase italic relative inline-block">
                            Dashboard
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full" />
                        </h1>
                        <p className="text-zinc-400 mt-2 font-medium">Visão geral do GymMaster</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link to="/gym/check-ins">
                        <button className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all font-bold uppercase text-sm">
                            Ver Check-ins
                        </button>
                    </Link>
                    <Link to="/gym/members">
                        <AnimatedButton className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2.5 rounded-xl font-black uppercase hover:shadow-lg hover:shadow-orange-500/25 transition-all inline-flex items-center gap-2 border border-white/10">
                            <Plus className="w-5 h-5" />
                            Novo Membro
                        </AnimatedButton>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
                {stats.map((stat, index) => {
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
                {/* Live Check-ins */}
                <AnimatedCard delay={0.4} className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 animate-pulse-slow">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black uppercase text-white tracking-tight">Check-ins em Tempo Real</h2>
                                <p className="text-sm text-zinc-400 font-bold">Últimas atividades na catraca</p>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-black text-green-500 uppercase tracking-widest">Ao Vivo</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <AnimatePresence>
                            {recentCheckIns.map((checkIn, i) => (
                                <motion.div
                                    key={checkIn.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/30 border border-white/5 hover:bg-zinc-900/50 hover:border-orange-500/20 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border-2 border-zinc-800 group-hover:border-orange-500/50 transition-colors text-lg font-black text-zinc-500 group-hover:text-white">
                                        {checkIn.member.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-white uppercase tracking-tight group-hover:text-orange-400 transition-colors">
                                            {checkIn.member}
                                        </div>
                                        <div className="text-xs text-zinc-500 font-bold uppercase mt-0.5">
                                            {checkIn.plan} • <span className="text-zinc-600">{checkIn.time}</span>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${checkIn.status === 'success'
                                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                            : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                        }`}>
                                        {checkIn.status === 'success' ? 'Liberado' : 'Analisando'}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </AnimatedCard>

                {/* Top Plans */}
                <AnimatedCard delay={0.5} className="lg:col-span-1 bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Flame className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-black uppercase text-white tracking-tight">Performance</h2>
                    </div>

                    <div className="space-y-4">
                        {topPlans.map((plan, idx) => (
                            <div key={idx} className="relative p-4 rounded-xl bg-zinc-950/30 border border-white/5 group hover:border-blue-500/30 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-black text-white uppercase tracking-wider text-sm">{plan.name}</span>
                                    {plan.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                                </div>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <div className="text-2xl font-black text-white">R$ {(plan.revenue / 1000).toFixed(1)}k</div>
                                        <div className="text-xs text-zinc-500 font-bold uppercase mt-1">{plan.members} ativos</div>
                                    </div>
                                    <div className="text-4xl font-black text-blue-500/10 group-hover:text-blue-500/20 transition-colors">
                                        #{idx + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <Link to="/gym/plans">
                            <button className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-2">
                                Gerenciar Planos <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </AnimatedCard>
            </div>
        </div>
    );
}
