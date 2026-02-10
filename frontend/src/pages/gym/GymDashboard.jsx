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
    Plus
} from 'lucide-react';

/**
 * GymDashboard Component
 * 
 * Dashboard energético para academia com tema laranja/vermelho.
 * Mostra check-ins em tempo real, membros ativos e métricas de performance.
 */
export default function GymDashboard() {
    // Mock data - em produção viria da API
    const recentCheckIns = [
        { id: 1, member: 'Carlos Silva', plan: 'Premium', time: '2 min atrás', photo: null },
        { id: 2, member: 'João Pedro', plan: 'Básico', time: '5 min atrás', photo: null },
        { id: 3, member: 'Marina Costa', plan: 'VIP', time: '8 min atrás', photo: null },
        { id: 4, member: 'Rafael Santos', plan: 'Premium', time: '12 min atrás', photo: null },
        { id: 5, member: 'Amanda Oliveira', plan: 'Básico', time: '15 min atrás', photo: null },
        { id: 6, member: 'Lucas Ferreira', plan: 'Premium', time: '18 min atrás', photo: null },
    ];

    const stats = {
        activeMembers: 342,
        todayCheckIns: 87,
        monthlyRevenue: 48500,
        expiringThisWeek: 12
    };

    const membershipStatus = [
        { status: 'Ativos', count: 342, color: 'green', percentage: 85 },
        { status: 'Vencendo (7 dias)', count: 12, color: 'yellow', percentage: 3 },
        { status: 'Vencidos', count: 48, color: 'red', percentage: 12 },
    ];

    const topPlans = [
        { name: 'Premium', members: 156, revenue: 28080 },
        { name: 'Básico', members: 134, revenue: 16080 },
        { name: 'VIP', members: 52, revenue: 10400 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <header className="bg-gray-900/50 backdrop-blur-lg border-b border-orange-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                                <Dumbbell className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black uppercase tracking-tight">
                                    Gym<span className="font-light text-orange-500">Master</span>
                                </h1>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Gestão de Academia</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <nav className="hidden md:flex items-center space-x-6 text-sm font-bold uppercase">
                                <Link to="/gym/dashboard" className="text-orange-500 border-b-2 border-orange-500 pb-1">
                                    Dashboard
                                </Link>
                                <Link to="/gym/members" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Membros
                                </Link>
                                <Link to="/gym/check-ins" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Check-ins
                                </Link>
                                <Link to="/gym/plans" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Planos
                                </Link>
                            </nav>

                            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-xl font-black uppercase hover:shadow-lg hover:shadow-orange-500/50 transition-all inline-flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                Novo Membro
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-orange-500/30 hover:border-orange-500/60 hover:shadow-xl hover:shadow-orange-500/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-orange-400" />
                            </div>
                            <Flame className="w-6 h-6 text-orange-500" />
                        </div>
                        <div className="text-4xl font-black text-white mb-1">
                            {stats.activeMembers}
                        </div>
                        <div className="text-sm text-gray-400 font-bold uppercase tracking-wide">Membros Ativos</div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-green-500/30 hover:border-green-500/60 hover:shadow-xl hover:shadow-green-500/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6 text-green-400" />
                            </div>
                            <span className="text-xs font-black text-green-400 bg-green-500/20 px-3 py-1 rounded-full uppercase animate-pulse">
                                Ao Vivo
                            </span>
                        </div>
                        <div className="text-4xl font-black text-white mb-1">
                            {stats.todayCheckIns}
                        </div>
                        <div className="text-sm text-gray-400 font-bold uppercase tracking-wide">Check-ins Hoje</div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-blue-500/30 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-blue-400" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-4xl font-black text-white mb-1">
                            R$ {(stats.monthlyRevenue / 1000).toFixed(1)}k
                        </div>
                        <div className="text-sm text-gray-400 font-bold uppercase tracking-wide">Receita Mensal</div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-xl hover:shadow-yellow-500/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-yellow-400" />
                            </div>
                            <Calendar className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div className="text-4xl font-black text-white mb-1">
                            {stats.expiringThisWeek}
                        </div>
                        <div className="text-sm text-gray-400 font-bold uppercase tracking-wide">Vencendo (7 dias)</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Check-ins em Tempo Real */}
                    <div className="lg:col-span-2">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-green-500/20">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black uppercase text-white">Check-ins ao Vivo</h2>
                                        <p className="text-sm text-gray-400 font-semibold">
                                            Últimas entradas na academia
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    <span className="text-xs font-black text-green-400 uppercase">Live</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {recentCheckIns.map((checkIn) => (
                                    <div
                                        key={checkIn.id}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:border-green-500/60 hover:scale-102 transition-all"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-black text-lg">
                                                {checkIn.member.charAt(0)}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="font-black text-white truncate uppercase tracking-tight">
                                                {checkIn.member}
                                            </div>
                                            <div className="text-sm text-gray-400 font-semibold">
                                                Plano <span className="text-orange-400">{checkIn.plan}</span>
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0 text-right">
                                            <div className="text-xs text-gray-500 font-semibold">{checkIn.time}</div>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-700">
                                <Link
                                    to="/gym/check-ins"
                                    className="text-green-400 font-black uppercase text-sm hover:text-green-300 inline-flex items-center gap-2"
                                >
                                    Ver Todos os Check-ins <Activity className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Status de Membros */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Membership Status */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-orange-500/20">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-black uppercase text-white">Status</h2>
                            </div>

                            <div className="space-y-4">
                                {membershipStatus.map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-3 h-3 rounded-full bg-${item.color}-400`}></span>
                                                <span className="text-sm font-bold uppercase text-gray-300">{item.status}</span>
                                            </div>
                                            <span className="text-xl font-black text-white">{item.count}</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`h-full bg-${item.color}-400 transition-all`}
                                                style={{ width: `${item.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Plans */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-blue-500/20">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                    <Flame className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-black uppercase text-white">Top Planos</h2>
                            </div>

                            <div className="space-y-4">
                                {topPlans.map((plan, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-black text-white uppercase">{plan.name}</div>
                                            <div className="text-2xl font-black text-blue-400">#{idx + 1}</div>
                                        </div>
                                        <div className="text-sm text-gray-400 mb-2">{plan.members} membros</div>
                                        <div className="text-lg font-black text-green-400">
                                            R$ {plan.revenue.toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-3xl p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-3xl font-black uppercase mb-2">Turbine sua academia</h3>
                            <p className="text-orange-100 font-semibold">Gerencie membros, check-ins e receita em tempo real</p>
                        </div>
                        <div className="flex gap-4">
                            <Link to="/gym/members">
                                <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-black uppercase hover:shadow-xl transition-all">
                                    Ver Membros
                                </button>
                            </Link>
                            <Link to="/gym/check-ins">
                                <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-black uppercase hover:bg-white hover:text-orange-600 transition-all">
                                    Check-ins
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
