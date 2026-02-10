import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
    CheckCircle2
} from 'lucide-react';

/**
 * Clients Component - FinanceFlow (SaaS Financeiro)
 * 
 * Gestão completa de clientes com métricas de MRR, LTV e Churn.
 * Específico para SaaS de receita recorrente.
 */
export default function Clients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');

    // Mock clients data - specific for SaaS business
    const clients = [
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
            totalPaid: 24000
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
            totalPaid: 4970
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
            totalPaid: 0
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
            totalPaid: 5467
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
            totalPaid: 33600
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
            totalPaid: 291
        }
    ];

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
            case 'low':
                return 'text-green-400';
            case 'medium':
                return 'text-yellow-400';
            case 'high':
                return 'text-red-400';
            default:
                return 'text-gray-400';
        }
    };

    const getPlanColor = (plan) => {
        switch (plan) {
            case 'Enterprise':
                return 'from-purple-600 to-indigo-600';
            case 'Professional':
                return 'from-blue-600 to-cyan-600';
            case 'Starter':
                return 'from-slate-600 to-gray-600';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const filteredClients = clients.filter((client) => {
        const matchesSearch =
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'Todos' || client.status === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const totalMRR = clients.reduce((sum, c) => sum + c.mrr, 0);
    const avgLTV = clients.reduce((sum, c) => sum + c.ltv, 0) / clients.length;
    const activeCount = clients.filter((c) => c.status === 'active').length;
    const trialCount = clients.filter((c) => c.status === 'trial').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Base de Clientes</h1>
                        <p className="text-slate-400">Gestão completa de clientes e métricas de receita recorrente</p>
                    </div>
                    <Link to="/finance-dashboard">
                        <Button variant="outline" className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all">
                            ← Voltar ao Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-indigo-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-500/20 rounded-xl">
                                <Users className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400 font-semibold">Total de Clientes</div>
                                <div className="text-3xl font-black text-white">{clients.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-green-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-500/20 rounded-xl">
                                <DollarSign className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400 font-semibold">MRR Total</div>
                                <div className="text-3xl font-black text-white">R$ {(totalMRR / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-purple-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-500/20 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400 font-semibold">LTV Médio</div>
                                <div className="text-3xl font-black text-white">R$ {(avgLTV / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-blue-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <Star className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400 font-semibold">Ativos</div>
                                <div className="text-3xl font-black text-white">{activeCount}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl border border-indigo-500/30 p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-slate-400" />
                            {['Todos', 'Active', 'Trial', 'Late'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${statusFilter === status
                                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
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
                            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg transition-all">
                                <Plus className="w-4 h-4 mr-2" />
                                Novo Cliente
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Clients Grid */}
            <div className="max-w-7xl mx-auto">
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
                                            </div>
                                            <div className="text-2xl font-black text-green-400">R$ {client.mrr}</div>
                                        </div>
                                        <div className="bg-slate-700/50 rounded-lg p-3">
                                            <div className="text-xs text-slate-400 font-semibold mb-1 flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3" />
                                                LTV
                                            </div>
                                            <div className="text-2xl font-black text-purple-400">
                                                R$ {(client.ltv / 1000).toFixed(1)}k
                                            </div>
                                        </div>
                                    </div>

                                    {/* Churn Risk */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="text-slate-400 font-semibold">Risco de Churn</span>
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
                                    <div className="flex gap-2">
                                        <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg transition-all">
                                            <DollarSign className="w-4 h-4 mr-2" />
                                            Cobrar
                                        </Button>
                                        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
