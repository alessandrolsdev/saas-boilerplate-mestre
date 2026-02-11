import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    DollarSign,
    Search,
    Filter,
    Plus,
    Calendar,
    CreditCard,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Clock,
    TrendingUp,
    Download,
    ChevronLeft,
    ChevronRight,
    FileText,
    ArrowUpDown
} from 'lucide-react';

import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';
import { InfoTooltip } from '../../components/ui/Tooltip';
import EmptyState from '../../components/ui/EmptyState';

/**
 * Charges Component - FinanceFlow (SaaS Financeiro)
 * 
 * Gestão de cobranças com status, histórico e métricas.
 * Foco em receita recorrente e inadimplência.
 */
export default function Charges() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');

    // Mock charges data
    const charges = [
        {
            id: 1,
            client: 'TechSolutions LTDA',
            plan: 'Enterprise',
            amount: 2400,
            dueDate: '2025-02-28',
            paidDate: '2025-02-01',
            status: 'paid',
            method: 'Cartão',
            invoice: 'INV-2025-001'
        },
        {
            id: 2,
            client: 'Marketing Pro',
            plan: 'Professional',
            amount: 497,
            dueDate: '2025-02-15',
            paidDate: '2025-02-05',
            status: 'paid',
            method: 'Boleto',
            invoice: 'INV-2025-002'
        },
        {
            id: 3,
            client: 'Consultoria Digital',
            plan: 'Professional',
            amount: 497,
            dueDate: '2025-02-10',
            paidDate: null,
            status: 'late',
            method: 'PIX',
            invoice: 'INV-2025-003'
        },
        {
            id: 4,
            client: 'E-commerce Brasil',
            plan: 'Enterprise',
            amount: 2400,
            dueDate: '2025-02-25',
            paidDate: '2025-02-03',
            status: 'paid',
            method: 'Cartão',
            invoice: 'INV-2025-004'
        },
        {
            id: 5,
            client: 'Agência Criativa',
            plan: 'Starter',
            amount: 97,
            dueDate: '2025-02-20',
            paidDate: null,
            status: 'pending',
            method: 'Cartão',
            invoice: 'INV-2025-005'
        },
        {
            id: 6,
            client: 'Startup Inovação',
            plan: 'Starter',
            amount: 97,
            dueDate: '2025-02-18',
            paidDate: null,
            status: 'pending',
            method: 'Boleto',
            invoice: 'INV-2025-006'
        },
        {
            id: 7,
            client: 'Design Studio',
            plan: 'Professional',
            amount: 497,
            dueDate: '2025-02-05',
            paidDate: null,
            status: 'late',
            method: 'PIX',
            invoice: 'INV-2025-007'
        },
        {
            id: 8,
            client: 'Tech Ventures',
            plan: 'Enterprise',
            amount: 2400,
            dueDate: '2025-02-22',
            paidDate: null,
            status: 'pending',
            method: 'Cartão',
            invoice: 'INV-2025-008'
        }
    ];

    const getStatusDetails = (status) => {
        switch (status) {
            case 'paid':
                return { icon: <CheckCircle2 className="w-4 h-4" />, color: 'bg-green-500/10 text-green-400 border-green-500/20', label: 'Pago' };
            case 'pending':
                return { icon: <Clock className="w-4 h-4" />, color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', label: 'Pendente' };
            case 'late':
                return { icon: <AlertCircle className="w-4 h-4" />, color: 'bg-red-500/10 text-red-400 border-red-500/20', label: 'Atrasado' };
            default:
                return { icon: null, color: '', label: '' };
        }
    };

    const filteredCharges = charges.filter((charge) => {
        const matchesSearch =
            charge.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            charge.invoice.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'Todos' || charge.status === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const paidTotal = charges.filter((c) => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0);
    const pendingTotal = charges.filter((c) => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0);
    const lateTotal = charges.filter((c) => c.status === 'late').reduce((sum, c) => sum + c.amount, 0);
    const paidCount = charges.filter((c) => c.status === 'paid').length;

    return (
        <div className="min-h-screen bg-zinc-950 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase italic relative inline-block">
                            Cobranças
                            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" />
                        </h1>
                        <p className="text-zinc-400 mt-2 font-medium">Controle financeiro e faturamento</p>
                    </div>
                    <AnimatedButton className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold uppercase hover:shadow-lg hover:shadow-green-500/25 transition-all inline-flex items-center gap-2 border border-white/10">
                        <Plus className="w-5 h-5" />
                        Nova Cobrança
                    </AnimatedButton>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <AnimatedCard delay={0.1} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-5 border border-green-500/30 shadow-lg group hover:bg-zinc-900 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-xs text-zinc-400 font-bold uppercase">Pagas</div>
                                </div>
                                <div className="text-2xl font-black text-white">R$ {(paidTotal / 1000).toFixed(1)}k</div>
                                <div className="text-xs text-zinc-500 font-bold uppercase">{paidCount} faturas</div>
                            </div>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard delay={0.2} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-5 border border-yellow-500/30 shadow-lg group hover:bg-zinc-900 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-yellow-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                <Clock className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-xs text-zinc-400 font-bold uppercase">Pendentes</div>
                                </div>
                                <div className="text-2xl font-black text-white">R$ {(pendingTotal / 1000).toFixed(1)}k</div>
                                <div className="text-xs text-zinc-500 font-bold uppercase">Aguardando</div>
                            </div>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard delay={0.3} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-5 border border-red-500/30 shadow-lg group hover:bg-zinc-900 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                <AlertCircle className="w-6 h-6 text-red-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-xs text-zinc-400 font-bold uppercase">Atrasadas</div>
                                </div>
                                <div className="text-2xl font-black text-white">R$ {(lateTotal / 1000).toFixed(1)}k</div>
                                <div className="text-xs text-zinc-500 font-bold uppercase">Ação Necessária</div>
                            </div>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard delay={0.4} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-5 border border-blue-500/30 shadow-lg group hover:bg-zinc-900 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-xs text-zinc-400 font-bold uppercase">Taxa Sucesso</div>
                                </div>
                                <div className="text-2xl font-black text-white">{((paidCount / charges.length) * 100).toFixed(0)}%</div>
                                <div className="text-xs text-zinc-500 font-bold uppercase">Conversão</div>
                            </div>
                        </div>
                    </AnimatedCard>
                </div>

                {/* Filters and Search */}
                <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/5 p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 rounded-lg border border-white/5">
                                <Filter className="w-4 h-4 text-zinc-500" />
                                <span className="text-xs text-zinc-500 font-bold uppercase">Status:</span>
                            </div>
                            {['Todos', 'Paid', 'Pending', 'Late'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all ${statusFilter === status
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                        }`}
                                >
                                    {status === 'Paid' ? 'Pagas' : status === 'Late' ? 'Atrasadas' : status === 'Pending' ? 'Pendentes' : status}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:flex-none">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar fatura ou cliente..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-zinc-600 font-medium"
                                />
                            </div>
                            <button className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all flex items-center gap-2 text-sm font-bold uppercase">
                                <Download className="w-4 h-4" /> Exportar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charges Table */}
            <div className="max-w-7xl mx-auto">
                <AnimatedCard delay={0.5} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5 bg-zinc-900/50">
                                    <th className="text-left p-4 text-zinc-400 font-bold uppercase text-xs">Fatura</th>
                                    <th className="text-left p-4 text-zinc-400 font-bold uppercase text-xs">Cliente</th>
                                    <th className="text-left p-4 text-zinc-400 font-bold uppercase text-xs">Plano</th>
                                    <th className="text-left p-4 text-zinc-400 font-bold uppercase text-xs">Valor</th>
                                    <th className="text-left p-4 text-zinc-400 font-bold uppercase text-xs">Vencimento</th>
                                    <th className="text-left p-4 text-zinc-400 font-bold uppercase text-xs">Pagamento</th>
                                    <th className="text-left p-4 text-zinc-400 font-bold uppercase text-xs">Método</th>
                                    <th className="text-left p-4 text-zinc-400 font-bold uppercase text-xs">Status</th>
                                    <th className="text-left p-4 text-zinc-400 font-bold uppercase text-xs">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCharges.map((charge) => {
                                    const statusDetails = getStatusDetails(charge.status);
                                    return (
                                        <tr
                                            key={charge.id}
                                            className="border-b border-white/5 hover:bg-zinc-800/50 transition-colors group"
                                        >
                                            <td className="p-4">
                                                <div className="font-bold text-white flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                                                    {charge.invoice}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-semibold text-zinc-300">{charge.client}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded-md text-xs font-bold uppercase border border-white/5">
                                                    {charge.plan}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-black text-white">R$ {charge.amount}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                                                    {new Date(charge.dueDate).toLocaleDateString('pt-BR')}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {charge.paidDate ? (
                                                    <div className="text-zinc-400 text-sm font-medium">
                                                        {new Date(charge.paidDate).toLocaleDateString('pt-BR')}
                                                    </div>
                                                ) : (
                                                    <div className="text-zinc-600">-</div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                                    <CreditCard className="w-4 h-4" />
                                                    {charge.method}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className={`${statusDetails.color} rounded-md px-2 py-1 border font-bold text-xs uppercase flex items-center gap-1 w-fit`}>
                                                    {statusDetails.label}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <button className="text-zinc-500 hover:text-white transition-colors">
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {filteredCharges.length === 0 && (
                        <div className="p-12">
                            <EmptyState
                                title="Nenhuma cobrança encontrada"
                                description="Tente ajustar os filtros de busca."
                            />
                        </div>
                    )}
                </AnimatedCard>
            </div>
        </div>
    );
}
