import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    Settings
} from 'lucide-react';

// UI Components
import Modal from '../components/ui/Modal';
import { InfoTooltip } from '../components/ui/Tooltip';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import EmptyState from '../components/ui/EmptyState';
import SkeletonCard from '../components/ui/SkeletonCard';

// Charts
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';

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
                return { icon: <CheckCircle2 className="w-4 h-4" />, color: 'bg-green-500/20 text-green-400 border-green-500', label: 'Ativo' };
            case 'trial':
                return { icon: <AlertCircle className="w-4 h-4" />, color: 'bg-blue-500/20 text-blue-400 border-blue-500', label: 'Trial' };
            case 'late':
                return { icon: <AlertCircle className="w-4 h-4" />, color: 'bg-red-500/20 text-red-400 border-red-500', label: 'Atrasado' };
            default:
                return { icon: null, color: '', label: '' };
        }
    };

    const getChurnRiskColor = (risk) => {
        switch (risk) {
            case 'low': return 'text-green-400';
            case 'medium': return 'text-yellow-400';
            case 'high': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getPlanColor = (plan) => {
        switch (plan) {
            case 'Enterprise': return 'from-purple-600 to-indigo-600';
            case 'Professional': return 'from-blue-600 to-cyan-600';
            case 'Starter': return 'from-slate-600 to-gray-600';
            default: return 'from-gray-500 to-gray-600';
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Base de Clientes</h1>
                        <p className="text-slate-400">Gestão completa de clientes e métricas de receita recorrente</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowCharts(!showCharts)}
                            className="px-4 py-2 bg-slate-800 border-2 border-indigo-500/30 text-indigo-400 rounded-xl font-semibold hover:bg-indigo-500/10 transition-all"
                        >
                            {showCharts ? '📊 Ocultar Gráficos' : '📊 Ver Gráficos'}
                        </button>
                        <Link to="/finance-dashboard">
                            <button className="px-4 py-2 border-2 border-indigo-500 text-indigo-400 rounded-xl font-semibold hover:bg-indigo-500 hover:text-white transition-all">
                                ← Voltar ao Dashboard
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-indigo-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-500/20 rounded-xl">
                                <Users className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-sm text-slate-400 font-semibold">Total de Clientes</div>
                                    <InfoTooltip content="Número total de clientes cadastrados no sistema" />
                                </div>
                                <div className="text-3xl font-black text-white">{clients.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-green-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-500/20 rounded-xl">
                                <DollarSign className="w-6 h-6 text-green-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-sm text-slate-400 font-semibold">MRR Total</div>
                                    <InfoTooltip content="Monthly Recurring Revenue - Receita recorrente mensal total" />
                                </div>
                                <div className="text-3xl font-black text-white">R$ {(totalMRR / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-purple-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-500/20 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-sm text-slate-400 font-semibold">LTV Médio</div>
                                    <InfoTooltip content="Lifetime Value - Valor total que um cliente gera durante toda sua vida útil" />
                                </div>
                                <div className="text-3xl font-black text-white">R$ {(avgLTV / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-blue-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <Star className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-sm text-slate-400 font-semibold">Clientes Ativos</div>
                                    <InfoTooltip content="Clientes com pagamentos em dia e conta ativa" />
                                </div>
                                <div className="text-3xl font-black text-white">{activeCount}/{clients.length}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                {showCharts && (
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-indigo-500/30">
                            <h3 className="text-lg font-bold text-white mb-4">Distribuição por Plano</h3>
                            <PieChart data={planDistribution} colors={['#8b5cf6', '#3b82f6', '#64748b']} height={250} />
                        </div>

                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-indigo-500/30">
                            <h3 className="text-lg font-bold text-white mb-4">Top 5 Clientes (MRR)</h3>
                            <BarChart data={topClientsByMRR} dataKey="mrr" xKey="name" color="#10b981" height={250} label="MRR (R$)" />
                        </div>

                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-indigo-500/30">
                            <h3 className="text-lg font-bold text-white mb-4">Evolução MRR (6 meses)</h3>
                            <LineChart data={mrrEvolution} dataKey="mrr" xKey="month" color="#6366f1" height={250} label="MRR (R$)" />
                        </div>
                    </div>
                )}

                {/* Filters and Search */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl border border-indigo-500/30 p-6">
                    <div className="flex flex-col gap-4">
                        {/* Status Filters */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-slate-400" />
                            <span className="text-sm text-slate-400 font-semibold">Status:</span>
                            {['Todos', 'Active', 'Trial', 'Late'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleFilter('status', status)}
                                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${statusFilter === status
                                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* Plan Filters + Search */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-400 font-semibold">Plano:</span>
                                {['Todos', 'Enterprise', 'Professional', 'Starter'].map((plan) => (
                                    <button
                                        key={plan}
                                        onClick={() => handleFilter('plan', plan)}
                                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${planFilter === plan
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                    >
                                        {plan}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Sort Dropdown */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => handleSort(e.target.value)}
                                    className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="name">Nome</option>
                                    <option value="mrr">MRR</option>
                                    <option value="ltv">LTV</option>
                                    <option value="joinDate">Data de Entrada</option>
                                </select>

                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="p-2 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                                >
                                    <ArrowUpDown className="w-5 h-5 text-slate-300" />
                                </button>

                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar cliente..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                                    />
                                </div>
                            </div>
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
                        description="Tente ajustar os filtros ou adicionar um novo cliente."
                    />
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClients.map((client) => {
                            const statusDetails = getStatusDetails(client.status);
                            const planColor = getPlanColor(client.plan);
                            const churnColor = getChurnRiskColor(client.churnRisk);

                            return (
                                <div
                                    key={client.id}
                                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl border-2 border-slate-700 hover:border-indigo-500 transition-all overflow-hidden group"
                                >
                                    {/* Header with Plan */}
                                    <div className={`bg-gradient-to-r ${planColor} p-5`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                                                    <Building className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">{client.name}</h3>
                                                    <p className="text-white/80 text-sm">ID: #{client.id.toString().padStart(4, '0')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white font-bold text-sm">
                                                {client.plan}
                                            </span>
                                            <div className={`${statusDetails.color} rounded-full px-3 py-1 border font-bold text-xs flex items-center gap-1`}>
                                                {statusDetails.icon}
                                                {statusDetails.label}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-5">
                                        {/* MRR & LTV */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-slate-700/50 rounded-lg p-3">
                                                <div className="text-xs text-slate-400 font-semibold mb-1 flex items-center gap-1">
                                                    <DollarSign className="w-3 h-3" />
                                                    MRR
                                                    <InfoTooltip content="Receita mensal recorrente" position="right" />
                                                </div>
                                                <div className="text-2xl font-black text-green-400">R$ {client.mrr}</div>
                                            </div>
                                            <div className="bg-slate-700/50 rounded-lg p-3">
                                                <div className="text-xs text-slate-400 font-semibold mb-1 flex items-center gap-1">
                                                    <TrendingUp className="w-3 h-3" />
                                                    LTV
                                                    <InfoTooltip content="Valor total do cliente" position="right" />
                                                </div>
                                                <div className="text-2xl font-black text-purple-400">
                                                    R$ {(client.ltv / 1000).toFixed(1)}k
                                                </div>
                                            </div>
                                        </div>

                                        {/* Churn Risk */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-slate-400 font-semibold">Risco de Churn</span>
                                                    <InfoTooltip content="Probabilidade do cliente cancelar a assinatura" />
                                                </div>
                                                <span className={`font-bold capitalize ${churnColor}`}>{client.churnRisk}</span>
                                            </div>
                                            <div className="w-full bg-slate-700 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all ${client.churnRisk === 'low'
                                                            ? 'bg-green-500 w-1/3'
                                                            : client.churnRisk === 'medium'
                                                                ? 'bg-yellow-500 w-2/3'
                                                                : 'bg-red-500 w-full'
                                                        }`}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Payment Info */}
                                        <div className="space-y-2 mb-4 text-sm">
                                            <div className="flex items-center justify-between bg-slate-700/30 rounded-lg p-2">
                                                <span className="text-slate-400 font-semibold flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4" />
                                                    Pagamento
                                                </span>
                                                <span className="text-white font-bold">{client.paymentMethod}</span>
                                            </div>
                                            <div className="flex items-center justify-between bg-slate-700/30 rounded-lg p-2">
                                                <span className="text-slate-400 font-semibold flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    Último
                                                </span>
                                                <span className="text-white font-bold">
                                                    {client.lastPayment ? new Date(client.lastPayment).toLocaleDateString('pt-BR') : 'N/A'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Contact */}
                                        <div className="space-y-2 mb-4 text-sm">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Mail className="w-4 h-4" />
                                                <span className="truncate">{client.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Phone className="w-4 h-4" />
                                                <span>{client.phone}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="grid grid-cols-3 gap-2">
                                            <button
                                                onClick={() => setDetailsModal({ open: true, client })}
                                                className="px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold text-sm flex items-center justify-center gap-1"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Ver
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditModal({ open: true, client });
                                                    reset(client);
                                                }}
                                                className="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold text-sm flex items-center justify-center gap-1"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => setDeleteModal({ open: true, client })}
                                                className="px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold text-sm flex items-center justify-center gap-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
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

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                        <input
                            {...register('phone')}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
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

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Notas</label>
                        <textarea
                            {...register('notes')}
                            rows={3}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
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
                            Salvar Alterações
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
                        {/* Summary Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-green-50 rounded-xl p-4">
                                <div className="text-sm text-green-600 font-semibold mb-1">MRR</div>
                                <div className="text-2xl font-black text-green-700">R$ {detailsModal.client.mrr}</div>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-4">
                                <div className="text-sm text-purple-600 font-semibold mb-1">LTV</div>
                                <div className="text-2xl font-black text-purple-700">
                                    R$ {(detailsModal.client.ltv / 1000).toFixed(1)}k
                                </div>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-4">
                                <div className="text-sm text-blue-600 font-semibold mb-1">Total Pago</div>
                                <div className="text-2xl font-black text-blue-700">
                                    R$ {(detailsModal.client.totalPaid / 1000).toFixed(1)}k
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <span className="font-semibold text-gray-600">Email</span>
                                <span className="text-gray-900">{detailsModal.client.email}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <span className="font-semibold text-gray-600">Telefone</span>
                                <span className="text-gray-900">{detailsModal.client.phone}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <span className="font-semibold text-gray-600">Plano</span>
                                <span className="text-gray-900 font-bold">{detailsModal.client.plan}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <span className="font-semibold text-gray-600">Data de Entrada</span>
                                <span className="text-gray-900">
                                    {new Date(detailsModal.client.joinDate).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <span className="font-semibold text-gray-600">Método de Pagamento</span>
                                <span className="text-gray-900">{detailsModal.client.paymentMethod}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <span className="font-semibold text-gray-600">Risco de Churn</span>
                                <span className={`font-bold capitalize ${getChurnRiskColor(detailsModal.client.churnRisk)}`}>
                                    {detailsModal.client.churnRisk}
                                </span>
                            </div>
                        </div>

                        {/* Notes */}
                        {detailsModal.client.notes && (
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="font-semibold text-gray-700 mb-2">Notas</div>
                                <p className="text-gray-600">{detailsModal.client.notes}</p>
                            </div>
                        )}

                        {/* Tags */}
                        {detailsModal.client.tags.length > 0 && (
                            <div>
                                <div className="font-semibold text-gray-700 mb-2">Tags</div>
                                <div className="flex gap-2">
                                    {detailsModal.client.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Modal>
            )}

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, client: null })}
                onConfirm={handleDeleteClient}
                title="Excluir Cliente?"
                message={`Tem certeza que deseja excluir ${deleteModal.client?.name}? Esta ação não pode ser desfeita.`}
                confirmText="Sim, Excluir"
                variant="danger"
            />
        </div>
    );
}
