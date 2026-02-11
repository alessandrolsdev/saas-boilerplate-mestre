import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Users,
    Search,
    Filter,
    Plus,
    Edit,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Calendar,
    CreditCard,
    Mail,
    Phone,
    Building,
    Star,
    AlertCircle,
    CheckCircle2,
    Eye,
    Trash2,
    X,
    ArrowUpDown,
    Settings,
    MoreVertical
} from 'lucide-react';

// UI Components
import Modal from '../../components/ui/Modal';
import { InfoTooltip } from '../../components/ui/Tooltip';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import SkeletonCard from '../../components/ui/SkeletonCard';
import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';

// Charts
import PieChart from '../../components/charts/PieChart';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';

/**
 * Clients Component - FinanceFlow (SaaS Financeiro)
 * 
 * Gestão completa de clientes com métricas de MRR, LTV e Churn.
 * Totalmente interativo com modais, gráficos e filtros.
 */
export default function Clients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [planFilter, setPlanFilter] = useState('Todos');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);

    // Modals
    const [editModal, setEditModal] = useState({ open: false, client: null });
    const [detailsModal, setDetailsModal] = useState({ open: false, client: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, client: null });
    const [showCharts, setShowCharts] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Mock clients data
    const [clients, setClients] = useState([
        {
            id: 1,
            name: 'TechSolutions LTDA',
            email: 'contato@techsolutions.com',
            phone: '(11) 3456-7890',
            plan: 'Enterprise',
            mrr: 2400,
            status: 'active',
            ltv: 28800,
            joinDate: '2023-05-15',
            lastPayment: '2025-02-01',
            paymentMethod: 'Cartão',
            churnRisk: 'low',
            totalPaid: 24000,
            notes: 'Cliente premium, sempre em dia.',
            tags: ['VIP', 'High-Value']
        },
        {
            id: 2,
            name: 'Marketing Pro',
            email: 'financeiro@marketingpro.com',
            phone: '(11) 3789-0123',
            plan: 'Professional',
            mrr: 497,
            status: 'active',
            ltv: 5964,
            joinDate: '2024-03-10',
            lastPayment: '2025-02-05',
            paymentMethod: 'Boleto',
            churnRisk: 'low',
            totalPaid: 4970,
            notes: '',
            tags: []
        },
        {
            id: 3,
            name: 'Startup Inovação',
            email: 'admin@startupinovacao.com',
            phone: '(11) 3012-3456',
            plan: 'Starter',
            mrr: 97,
            status: 'trial',
            ltv: 1164,
            joinDate: '2025-01-20',
            lastPayment: null,
            paymentMethod: 'Trial',
            churnRisk: 'medium',
            totalPaid: 0,
            notes: 'Em período de trial, acompanhar conversão.',
            tags: ['Trial']
        },
        {
            id: 4,
            name: 'Consultoria Digital',
            email: 'contato@consultoriadigital.com',
            phone: '(11) 3234-5678',
            plan: 'Professional',
            mrr: 497,
            status: 'late',
            ltv: 5964,
            joinDate: '2024-01-05',
            lastPayment: '2025-01-05',
            paymentMethod: 'PIX',
            churnRisk: 'high',
            totalPaid: 5467,
            notes: 'Pagamento atrasado, entrar em contato.',
            tags: ['At-Risk']
        },
        {
            id: 5,
            name: 'E-commerce Brasil',
            email: 'financeiro@ecommercebrasil.com',
            phone: '(11) 3567-8901',
            plan: 'Enterprise',
            mrr: 2400,
            status: 'active',
            ltv: 28800,
            joinDate: '2023-08-20',
            lastPayment: '2025-02-03',
            paymentMethod: 'Cartão',
            churnRisk: 'low',
            totalPaid: 33600,
            notes: '',
            tags: ['VIP']
        },
        {
            id: 6,
            name: 'Agência Criativa',
            email: 'admin@agenciacriativa.com',
            phone: '(11) 3890-1234',
            plan: 'Starter',
            mrr: 97,
            status: 'active',
            ltv: 1164,
            joinDate: '2024-11-10',
            lastPayment: '2025-02-10',
            paymentMethod: 'Cartão',
            churnRisk: 'low',
            totalPaid: 291,
            notes: '',
            tags: []
        }
    ]);

    const getStatusDetails = (status) => {
        switch (status) {
            case 'active':
                return { icon: <CheckCircle2 className="w-4 h-4" />, color: 'bg-green-500/10 text-green-400 border-green-500/20', label: 'Ativo' };
            case 'trial':
                return { icon: <AlertCircle className="w-4 h-4" />, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', label: 'Trial' };
            case 'late':
                return { icon: <AlertCircle className="w-4 h-4" />, color: 'bg-red-500/10 text-red-500 border-red-500/20', label: 'Atrasado' };
            default:
                return { icon: null, color: '', label: '' };
        }
    };

    const getChurnRiskColor = (risk) => {
        switch (risk) {
            case 'low': return 'text-green-400';
            case 'medium': return 'text-yellow-400';
            case 'high': return 'text-red-400';
            default: return 'text-zinc-600';
        }
    };

    const getPlanColor = (plan) => {
        switch (plan) {
            case 'Enterprise': return 'from-purple-600 to-indigo-600';
            case 'Professional': return 'from-blue-600 to-cyan-600';
            case 'Starter': return 'from-slate-600 to-zinc-600';
            default: return 'from-zinc-500 to-zinc-600';
        }
    };

    // Filter & Sort
    const filteredClients = clients
        .filter((client) => {
            const matchesSearch =
                client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'Todos' || client.status === statusFilter.toLowerCase();
            const matchesPlan = planFilter === 'Todos' || client.plan === planFilter;
            return matchesSearch && matchesStatus && matchesPlan;
        })
        .sort((a, b) => {
            let aVal = a[sortBy];
            let bVal = b[sortBy];

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

    // Stats
    const totalMRR = clients.reduce((sum, c) => sum + c.mrr, 0);
    const avgLTV = clients.reduce((sum, c) => sum + c.ltv, 0) / clients.length;
    const activeCount = clients.filter((c) => c.status === 'active').length;
    const trialCount = clients.filter((c) => c.status === 'trial').length;

    // Chart Data
    const planDistribution = [
        { name: 'Enterprise', value: clients.filter(c => c.plan === 'Enterprise').length },
        { name: 'Professional', value: clients.filter(c => c.plan === 'Professional').length },
        { name: 'Starter', value: clients.filter(c => c.plan === 'Starter').length }
    ];

    const topClientsByMRR = [...clients]
        .sort((a, b) => b.mrr - a.mrr)
        .slice(0, 5)
        .map(c => ({ name: c.name.split(' ')[0], mrr: c.mrr }));

    const mrrEvolution = [
        { month: 'Set', mrr: 2800 },
        { month: 'Out', mrr: 3200 },
        { month: 'Nov', mrr: 3500 },
        { month: 'Dez', mrr: 4100 },
        { month: 'Jan', mrr: 4800 },
        { month: 'Fev', mrr: totalMRR }
    ];

    // Handlers
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleEditClient = (data) => {
        setLoading(true);
        setTimeout(() => {
            setClients(clients.map(c =>
                c.id === editModal.client.id ? { ...c, ...data } : c
            ));
            setEditModal({ open: false, client: null });
            setLoading(false);
            reset();
        }, 500);
    };

    const handleDeleteClient = () => {
        setLoading(true);
        setTimeout(() => {
            setClients(clients.filter(c => c.id !== deleteModal.client.id));
            setDeleteModal({ open: false, client: null });
            setLoading(false);
        }, 500);
    };

    const handleFilter = (type, value) => {
        setLoading(true);
        if (type === 'status') setStatusFilter(value);
        if (type === 'plan') setPlanFilter(value);
        setTimeout(() => setLoading(false), 300);
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase italic relative inline-block">
                            Clientes
                            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
                        </h1>
                        <p className="text-zinc-400 mt-2 font-medium">Gestão inteligente da carteira</p>
                    </div>
                    <AnimatedButton
                        onClick={() => setShowCharts(!showCharts)}
                        className="px-4 py-2 bg-zinc-900 border border-indigo-500/30 text-indigo-400 rounded-xl font-bold uppercase hover:bg-indigo-500/10 transition-all flex items-center gap-2"
                    >
                        {showCharts ? 'Ocultar Métricas' : 'Ver Métricas'} <TrendingUp className="w-4 h-4" />
                    </AnimatedButton>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <AnimatedCard delay={0.1} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-5 border border-indigo-500/30 shadow-lg group hover:bg-zinc-900 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-xs text-zinc-400 font-bold uppercase">Total Clientes</div>
                                </div>
                                <div className="text-2xl font-black text-white">{clients.length}</div>
                            </div>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard delay={0.2} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-5 border border-emerald-500/30 shadow-lg group hover:bg-zinc-900 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                <DollarSign className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-xs text-zinc-400 font-bold uppercase">MRR Total</div>
                                </div>
                                <div className="text-2xl font-black text-white">R$ {(totalMRR / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard delay={0.3} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-5 border border-purple-500/30 shadow-lg group hover:bg-zinc-900 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-xs text-zinc-400 font-bold uppercase">LTV Médio</div>
                                </div>
                                <div className="text-2xl font-black text-white">R$ {(avgLTV / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard delay={0.4} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-5 border border-blue-500/30 shadow-lg group hover:bg-zinc-900 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                <Star className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-xs text-zinc-400 font-bold uppercase">Clientes Ativos</div>
                                </div>
                                <div className="text-2xl font-black text-white">{activeCount}/{clients.length}</div>
                            </div>
                        </div>
                    </AnimatedCard>
                </div>

                {/* Charts Section */}
                {showCharts && (
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <AnimatedCard delay={0.5} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tight">Distribuição</h3>
                            <PieChart data={planDistribution} colors={['#8b5cf6', '#3b82f6', '#64748b']} height={250} />
                        </AnimatedCard>

                        <AnimatedCard delay={0.6} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tight">Top 5 Clientes</h3>
                            <BarChart data={topClientsByMRR} dataKey="mrr" xKey="name" color="#10b981" height={250} label="MRR (R$)" />
                        </AnimatedCard>

                        <AnimatedCard delay={0.7} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tight">Evolução MRR</h3>
                            <LineChart data={mrrEvolution} dataKey="mrr" xKey="month" color="#6366f1" height={250} label="MRR (R$)" />
                        </AnimatedCard>
                    </div>
                )}

                {/* Filters and Search */}
                <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/5 p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 rounded-lg border border-white/5">
                                <Filter className="w-4 h-4 text-zinc-500" />
                                <span className="text-xs text-zinc-500 font-bold uppercase">Filtros:</span>
                            </div>

                            {['Todos', 'Active', 'Trial', 'Late'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleFilter('status', status)}
                                    className={`px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all ${statusFilter === status
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                        }`}
                                >
                                    {status === 'Active' ? 'Ativos' : status === 'Late' ? 'Atrasados' : status}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:flex-none">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar cliente..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-600 font-medium"
                                />
                            </div>
                            <button
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                className="p-2 bg-zinc-900 border border-white/10 rounded-xl hover:bg-zinc-800 transition-colors"
                            >
                                <ArrowUpDown className="w-5 h-5 text-zinc-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Clients Grid */}
            <div className="max-w-7xl mx-auto">
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SkeletonCard count={6} height="h-96" />
                    </div>
                ) : filteredClients.length === 0 ? (
                    <EmptyState
                        title="Nenhum cliente encontrado"
                        description="Tente ajustar os filtros ou adicione um novo cliente."
                    />
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClients.map((client, idx) => {
                            const statusDetails = getStatusDetails(client.status);
                            const planColor = getPlanColor(client.plan);
                            const churnColor = getChurnRiskColor(client.churnRisk);

                            return (
                                <AnimatedCard
                                    key={client.id}
                                    delay={idx * 0.05}
                                    className="bg-zinc-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/5 hover:border-indigo-500/30 transition-all overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/10"
                                >
                                    {/* Header with Plan */}
                                    <div className={`bg-gradient-to-r ${planColor} p-1 h-2 w-full`} />

                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center border border-white/5 text-indigo-400 font-bold text-xl uppercase">
                                                    {client.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-white uppercase tracking-tight truncate w-40">{client.name}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-zinc-500 text-xs font-bold uppercase">{client.plan}</span>
                                                        <div className={`w-2 h-2 rounded-full ${client.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <button className="text-zinc-500 hover:text-white transition-colors">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* MRR & LTV */}
                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            <div className="bg-zinc-950/50 rounded-xl p-3 border border-white/5">
                                                <div className="text-xs text-zinc-500 font-bold uppercase mb-1 flex items-center gap-1">
                                                    MRR
                                                </div>
                                                <div className="text-xl font-black text-white">R$ {client.mrr}</div>
                                            </div>
                                            <div className="bg-zinc-950/50 rounded-xl p-3 border border-white/5">
                                                <div className="text-xs text-zinc-500 font-bold uppercase mb-1 flex items-center gap-1">
                                                    LTV Est.
                                                </div>
                                                <div className="text-xl font-black text-indigo-400">
                                                    {(client.ltv / 1000).toFixed(1)}k
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Bar */}
                                        <div className="mb-6 bg-zinc-950/50 rounded-lg p-3 border border-white/5">
                                            <div className="flex items-center justify-between text-xs mb-2">
                                                <span className="text-zinc-500 font-bold uppercase">Saúde da Conta</span>
                                                <span className={`font-black uppercase ${churnColor}`}>{client.churnRisk} Risk</span>
                                            </div>
                                            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${client.churnRisk === 'low' ? 'bg-green-500 w-[95%]' :
                                                            client.churnRisk === 'medium' ? 'bg-yellow-500 w-[50%]' : 'bg-red-500 w-[20%]'
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="grid grid-cols-2 gap-3 mt-auto">
                                            <button
                                                onClick={() => setDetailsModal({ open: true, client })}
                                                className="px-3 py-2.5 bg-zinc-800 text-zinc-300 rounded-xl hover:bg-zinc-700 hover:text-white transition-all font-bold text-xs uppercase flex items-center justify-center gap-2"
                                            >
                                                <Eye className="w-4 h-4" /> Detalhes
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditModal({ open: true, client });
                                                    reset(client);
                                                }}
                                                className="px-3 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                                            >
                                                <Edit className="w-4 h-4" /> Editar
                                            </button>
                                        </div>
                                    </div>
                                </AnimatedCard>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={editModal.open}
                onClose={() => {
                    setEditModal({ open: false, client: null });
                    reset();
                }}
                title="Editar Cliente"
                size="md"
            >
                <form onSubmit={handleSubmit(handleEditClient)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nome da Empresa</label>
                        <input
                            {...register('name', { required: 'Campo obrigatório' })}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            {...register('email', { required: 'Campo obrigatório' })}
                            type="email"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Plano</label>
                            <select
                                {...register('plan')}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="Enterprise">Enterprise</option>
                                <option value="Professional">Professional</option>
                                <option value="Starter">Starter</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                            <select
                                {...register('status')}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="active">Ativo</option>
                                <option value="trial">Trial</option>
                                <option value="late">Atrasado</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setEditModal({ open: false, client: null });
                                reset();
                            }}
                            className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Details Modal */}
            {detailsModal.client && (
                <Modal
                    isOpen={detailsModal.open}
                    onClose={() => setDetailsModal({ open: false, client: null })}
                    title={`Detalhes - ${detailsModal.client.name}`}
                    size="lg"
                >
                    <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                                <div className="text-xs text-green-600 font-bold uppercase mb-1">MRR</div>
                                <div className="text-2xl font-black text-green-700">R$ {detailsModal.client.mrr}</div>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                <div className="text-xs text-purple-600 font-bold uppercase mb-1">LTV Total</div>
                                <div className="text-2xl font-black text-purple-700">
                                    R$ {(detailsModal.client.ltv / 1000).toFixed(1)}k
                                </div>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                <div className="text-xs text-blue-600 font-bold uppercase mb-1">Total Pago</div>
                                <div className="text-2xl font-black text-blue-700">
                                    R$ {(detailsModal.client.totalPaid / 1000).toFixed(1)}k
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-600 text-sm">Email</span>
                                <span className="text-gray-900 font-medium">{detailsModal.client.email}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                <span className="font-semibold text-gray-600 text-sm">Telefone</span>
                                <span className="text-gray-900 font-medium">{detailsModal.client.phone}</span>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                                <span className="font-semibold text-gray-600 text-sm">Data Criação</span>
                                <span className="text-gray-900 font-medium">{detailsModal.client.joinDate}</span>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
