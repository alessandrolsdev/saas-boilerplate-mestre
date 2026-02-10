import { Link } from 'react-router-dom';
import {
    DollarSign,
    TrendingUp,
    Users,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    AlertCircle,
    CheckCircle2,
    Plus,
    FileText
} from 'lucide-react';

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
        { id: 1, client: 'Tech Solutions LTDA', amount: 890, status: 'paid', date: '2025-02-09', plan: 'Enterprise' },
        { id: 2, client: 'Startup Innovate', amount: 450, status: 'pending', date: '2025-02-09', plan: 'Professional' },
        { id: 3, client: 'Marketing Pro', amount: 290, status: 'paid', date: '2025-02-08', plan: 'Basic' },
        { id: 4, client: 'Design Studio', amount: 650, status: 'paid', date: '2025-02-08', plan: 'Professional' },
        { id: 5, client: 'Consulting Group', amount: 1200, status: 'overdue', date: '2025-02-05', plan: 'Enterprise' },
    ];

    const topClients = [
        { name: 'Tech Solutions LTDA', mrr: 890, ltv: 21360 },
        { name: 'Consulting Group', mrr: 1200, ltv: 28800 },
        { name: 'Enterprise Corp', mrr: 750, ltv: 18000 },
    ];

    const mrrHistory = [
        { month: 'Set', value: 18200 },
        { month: 'Out', value: 19500 },
        { month: 'Nov', value: 21300 },
        { month: 'Dez', value: 22100 },
        { month: 'Jan', value: 23800 },
        { month: 'Fev', value: 24850 },
    ];

    const maxMrr = Math.max(...mrrHistory.map(m => m.value));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
            {/* Header */}
            <header className="bg-slate-900/50 backdrop-blur-lg border-b border-indigo-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center">
                                <DollarSign className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    SaaS <span className="font-light text-indigo-400">Financeiro</span>
                                </h1>
                                <p className="text-xs text-gray-400 font-medium">Gestão de Receita Recorrente</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
                                <Link to="/dashboard" className="text-indigo-400 border-b-2 border-indigo-400 pb-1">
                                    Dashboard
                                </Link>
                                <Link to="/clients" className="text-gray-400 hover:text-indigo-400 transition-colors">
                                    Clientes
                                </Link>
                                <Link to="/finance" className="text-gray-400 hover:text-indigo-400 transition-colors">
                                    Cobranças
                                </Link>
                            </nav>

                            <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all inline-flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                Nova Cobrança
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-indigo-500/30 hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-500/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-indigo-400" />
                            </div>
                            <span className="text-sm font-bold text-green-400 bg-green-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1">
                                <ArrowUpRight className="w-3 h-3" />
                                +{stats.mrrGrowth}%
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            R$ {(stats.mrr / 1000).toFixed(1)}k
                        </div>
                        <div className="text-sm text-gray-400 font-medium">MRR (Receita Recorrente)</div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-blue-500/30 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-400" />
                            </div>
                            <span className="text-xs font-semibold text-blue-300 uppercase">{stats.activeClients}/{stats.totalClients}</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {stats.totalClients}
                        </div>
                        <div className="text-sm text-gray-400 font-medium">Clientes Totais</div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-green-500/30 hover:border-green-500/60 hover:shadow-xl hover:shadow-green-500/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-400" />
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {stats.paidThisMonth}
                        </div>
                        <div className="text-sm text-gray-400 font-medium">Pagos Este Mês</div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-xl hover:shadow-yellow-500/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-yellow-400" />
                            </div>
                            <Calendar className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {stats.pendingCharges}
                        </div>
                        <div className="text-sm text-gray-400 font-medium">Cobranças Pendentes</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* MRR Growth Chart */}
                    <div className="lg:col-span-2">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border-2 border-indigo-500/20">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Crescimento MRR</h2>
                                    <p className="text-sm text-gray-400">Últimos 6 meses</p>
                                </div>
                                <div className="flex items-center gap-2 text-green-400 font-semibold text-sm bg-green-500/10 px-4 py-2 rounded-lg">
                                    <ArrowUpRight className="w-4 h-4" />
                                    +{stats.mrrGrowth}% este mês
                                </div>
                            </div>

                            <div className="space-y-4">
                                {mrrHistory.map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-semibold text-gray-300">{item.month}</span>
                                            <span className="font-bold text-white">R$ {(item.value / 1000).toFixed(1)}k</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all rounded-full"
                                                style={{ width: `${(item.value / maxMrr) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Charges */}
                        <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border-2 border-blue-500/20">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Cobranças Recentes</h2>
                                <Link to="/finance" className="text-blue-400 font-semibold text-sm hover:text-blue-300">
                                    Ver Todas
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentCharges.map((charge) => (
                                    <div
                                        key={charge.id}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-slate-700/30 border border-slate-600/50 hover:border-blue-500/50 transition-all"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-white truncate">{charge.client}</div>
                                            <div className="text-sm text-gray-400">{charge.plan} • {charge.date}</div>
                                        </div>
                                        <div className="text-lg font-bold text-white">
                                            R$ {charge.amount}
                                        </div>
                                        <div>
                                            {charge.status === 'paid' && (
                                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                                                    Pago
                                                </span>
                                            )}
                                            {charge.status === 'pending' && (
                                                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold">
                                                    Pendente
                                                </span>
                                            )}
                                            {charge.status === 'overdue' && (
                                                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold">
                                                    Atrasado
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Top Clients */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border-2 border-purple-500/20">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Top Clientes</h2>
                            </div>

                            <div className="space-y-4">
                                {topClients.map((client, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <div className="font-semibold text-white text-sm mb-1">{client.name}</div>
                                                <div className="text-xs text-gray-400">MRR: R$ {client.mrr}</div>
                                            </div>
                                            <div className="text-2xl font-black text-purple-400">#{idx + 1}</div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-purple-500/20 flex items-center justify-between">
                                            <div className="text-xs text-gray-400">LTV</div>
                                            <div className="text-lg font-bold text-green-400">
                                                R$ {(client.ltv / 1000).toFixed(1)}k
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border-2 border-emerald-500/20">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400 font-medium">Receita Total</span>
                                    <span className="text-2xl font-bold text-white">
                                        R$ {(stats.totalRevenue / 1000).toFixed(1)}k
                                    </span>
                                </div>
                                <div className="w-full h-px bg-slate-700"></div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400 font-medium">Ticket Médio</span>
                                    <span className="text-2xl font-bold text-emerald-400">R$ {stats.avgTicket}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 rounded-3xl p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Gerencie suas finanças com inteligência</h3>
                            <p className="text-indigo-100">Controle total de clientes, cobranças e receita recorrente</p>
                        </div>
                        <div className="flex gap-4">
                            <Link to="/clients">
                                <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all">
                                    Ver Clientes
                                </button>
                            </Link>
                            <Link to="/finance">
                                <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-all inline-flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Cobranças
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
