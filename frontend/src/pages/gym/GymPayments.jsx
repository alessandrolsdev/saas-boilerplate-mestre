import { useState, useEffect } from 'react';
import {
    CreditCard,
    DollarSign,
    Calendar,
    ArrowUpRight,
    Search,
    Filter,
    Download,
    MoreVertical,
    CheckCircle2,
    Clock,
    XCircle,
    ArrowUpDown
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import AnimatedCard from '../../components/ui/AnimatedCard';
import { useToast } from '../../components/ui/Toast';
import SkeletonCard from '../../components/ui/SkeletonCard';
import EmptyState from '../../components/ui/EmptyState';
import { InfoTooltip } from '../../components/ui/Tooltip';

export default function GymPayments() {
    const { addToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [loading, setLoading] = useState(true);

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Simulate API fetch
        const loadData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            setTransactions([
                { id: 1, member: 'João Silva', amount: 199.00, date: '2024-02-10T10:30:00', status: 'Completed', type: 'Mensalidade', method: 'Credit Card' },
                { id: 2, member: 'Maria Souza', amount: 89.90, date: '2024-02-09T15:20:00', status: 'Completed', type: 'Produto', method: 'PIX' },
                { id: 3, member: 'Pedro Santos', amount: 199.00, date: '2024-02-08T09:15:00', status: 'Pending', type: 'Mensalidade', method: 'Boleto' },
                { id: 4, member: 'Ana Costa', amount: 159.00, date: '2024-02-08T14:00:00', status: 'Failed', type: 'Mensalidade', method: 'Credit Card' },
                { id: 5, member: 'Lucas Lima', amount: 45.00, date: '2024-02-07T18:45:00', status: 'Completed', type: 'Produto', method: 'Debit Card' },
                { id: 6, member: 'Carla Dias', amount: 1199.00, date: '2024-02-06T11:00:00', status: 'Completed', type: 'Anual', method: 'Credit Card' },
            ]);
            setLoading(false);
        };
        loadData();
    }, []);

    const stats = {
        revenue: transactions.filter(t => t.status === 'Completed').reduce((acc, t) => acc + t.amount, 0),
        pending: transactions.filter(t => t.status === 'Pending').reduce((acc, t) => acc + t.amount, 0),
        count: transactions.length
    };

    const filteredTransactions = transactions
        .filter(t => {
            const matchesSearch = t.member.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = statusFilter === 'Todos' || t.status === statusFilter;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];
            return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
        });

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'Pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'Failed': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <CheckCircle2 className="w-4 h-4" />;
            case 'Pending': return <Clock className="w-4 h-4" />;
            case 'Failed': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-orange-950/20 to-zinc-950 text-white relative overflow-hidden p-8">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase italic relative inline-block">
                        Financeiro
                        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full" />
                    </h1>
                    <p className="text-zinc-400 mt-2 font-medium">Controle de receitas e transações</p>
                </div>
                <button
                    onClick={() => addToast('Relatório exportado!', 'success')}
                    className="bg-zinc-900 border border-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-zinc-800 transition-colors font-bold shadow-lg"
                >
                    <Download className="w-4 h-4" />
                    Exportar
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                <AnimatedCard className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 group">
                    <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl group-hover:scale-110 transition-transform">
                        <DollarSign className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">Receita Total</p>
                            <InfoTooltip content="Total recebido no período (Completed)" />
                        </div>
                        <h3 className="text-3xl font-black text-white">R$ {stats.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 group" delay={0.1}>
                    <div className="p-4 bg-yellow-500/10 text-yellow-400 rounded-2xl group-hover:scale-110 transition-transform">
                        <Clock className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">Pendente</p>
                            <InfoTooltip content="Valores a receber (Pending)" />
                        </div>
                        <h3 className="text-3xl font-black text-white">R$ {stats.pending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 group" delay={0.2}>
                    <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">Transações</p>
                        <h3 className="text-3xl font-black text-white">{stats.count}</h3>
                    </div>
                </AnimatedCard>
            </div>

            {/* Main Content */}
            <div className="relative z-10 bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl overflow-hidden flex flex-col">
                {/* Filters */}
                <div className="p-6 border-b border-white/5 flex flex-col lg:flex-row gap-4 justify-between items-center">
                    <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar transação..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-950/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder-zinc-600"
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                            <Filter className="w-5 h-5 text-zinc-500 hidden md:block" />
                            {['Todos', 'Completed', 'Pending', 'Failed'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${statusFilter === status
                                            ? 'bg-orange-600 text-white border-orange-500'
                                            : 'bg-zinc-950/50 text-zinc-400 border-white/10 hover:bg-zinc-900'
                                        }`}
                                >
                                    {status === 'Todos' ? 'Todos' : status === 'Completed' ? 'Recebido' : status === 'Pending' ? 'Pendente' : 'Falha'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="p-2 bg-zinc-950/50 border border-white/10 rounded-xl hover:bg-zinc-900 text-zinc-300 transition-colors self-end lg:self-center"
                    >
                        <ArrowUpDown className="w-5 h-5" />
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto custom-scrollbar">
                    {loading ? (
                        <div className="p-6">
                            <SkeletonCard count={5} height="h-16" />
                        </div>
                    ) : filteredTransactions.length === 0 ? (
                        <div className="p-8">
                            <EmptyState
                                icon={CreditCard}
                                title="Nenhuma transação encontrada"
                                description="Ajuste os filtros para ver o histórico financeiro."
                                className="text-zinc-400"
                            />
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 text-zinc-400 text-sm font-bold uppercase tracking-wider">
                                    <th className="p-6 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('member')}>Membro</th>
                                    <th className="p-6 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('type')}>Tipo</th>
                                    <th className="p-6 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('date')}>Data</th>
                                    <th className="p-6 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('status')}>Status</th>
                                    <th className="p-6 font-bold text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('amount')}>Valor</th>
                                    <th className="p-6 font-bold text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <AnimatePresence mode="popLayout">
                                    {filteredTransactions.map((tx) => (
                                        <motion.tr
                                            key={tx.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="group hover:bg-white/5 transition-colors"
                                        >
                                            <td className="p-6">
                                                <div className="font-bold text-white text-lg">{tx.member}</div>
                                                <div className="text-sm text-zinc-500 font-mono">{tx.method}</div>
                                            </td>
                                            <td className="p-6">
                                                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold uppercase border border-white/5">
                                                    {tx.type}
                                                </span>
                                            </td>
                                            <td className="p-6 text-zinc-400 font-medium">
                                                {new Date(tx.date).toLocaleDateString('pt-BR')} <br />
                                                <span className="text-xs text-zinc-600">{new Date(tx.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </td>
                                            <td className="p-6">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase ${getStatusStyle(tx.status)}`}>
                                                    {getStatusIcon(tx.status)}
                                                    {tx.status}
                                                </div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="font-black text-white text-lg">
                                                    R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </div>
                                            </td>
                                            <td className="p-6 text-center">
                                                <button className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
