import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
    ChevronRight
} from 'lucide-react';

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
                return { icon: <CheckCircle2 className="w-4 h-4" />, color: 'bg-green-500/20 text-green-400 border-green-500', label: 'Pago' };
            case 'pending':
                return { icon: <Clock className="w-4 h-4" />, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500', label: 'Pendente' };
            case 'late':
                return { icon: <AlertCircle className="w-4 h-4" />, color: 'bg-red-500/20 text-red-400 border-red-500', label: 'Atrasado' };
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Cobranças e Faturas</h1>
                        <p className="text-slate-400">Gestão completa de cobranças recorrentes e histórico de pagamentos</p>
                    </div>
                    <Link to="/finance-dashboard">
                        <Button variant="outline" className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all">
                            ← Voltar ao Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-green-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-500/20 rounded-xl">
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400 font-semibold">Pagas</div>
                                <div className="text-3xl font-black text-white">R$ {(paidTotal / 1000).toFixed(1)}k</div>
                                <div className="text-xs text-slate-500 font-semibold">{paidCount} cobranças</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-yellow-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-yellow-500/20 rounded-xl">
                                <Clock className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400 font-semibold">Pendentes</div>
                                <div className="text-3xl font-black text-white">R$ {(pendingTotal / 1000).toFixed(1)}k</div>
                                <div className="text-xs text-slate-500 font-semibold">
                                    {charges.filter((c) => c.status === 'pending').length} cobranças
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-red-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-500/20 rounded-xl">
                                <AlertCircle className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400 font-semibold">Atrasadas</div>
                                <div className="text-3xl font-black text-white">R$ {(lateTotal / 1000).toFixed(1)}k</div>
                                <div className="text-xs text-slate-500 font-semibold">
                                    {charges.filter((c) => c.status === 'late').length} cobranças
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border-2 border-indigo-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-500/20 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400 font-semibold">Taxa de Sucesso</div>
                                <div className="text-3xl font-black text-white">
                                    {((paidCount / charges.length) * 100).toFixed(0)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl border border-indigo-500/30 p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-slate-400" />
                            {['Todos', 'Paid', 'Pending', 'Late'].map((status) => (
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
                                    placeholder="Buscar cobrança..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                                />
                            </div>
                            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg transition-all">
                                <Download className="w-4 h-4 mr-2" />
                                Exportar
                            </Button>
                            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg transition-all">
                                <Plus className="w-4 h-4 mr-2" />
                                Nova Cobrança
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charges Table */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl border border-indigo-500/30 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-indigo-600 to-blue-600">
                                    <th className="text-left p-4 text-white font-bold">Fatura</th>
                                    <th className="text-left p-4 text-white font-bold">Cliente</th>
                                    <th className="text-left p-4 text-white font-bold">Plano</th>
                                    <th className="text-left p-4 text-white font-bold">Valor</th>
                                    <th className="text-left p-4 text-white font-bold">Vencimento</th>
                                    <th className="text-left p-4 text-white font-bold">Pagamento</th>
                                    <th className="text-left p-4 text-white font-bold">Método</th>
                                    <th className="text-left p-4 text-white font-bold">Status</th>
                                    <th className="text-left p-4 text-white font-bold">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCharges.map((charge, idx) => {
                                    const statusDetails = getStatusDetails(charge.status);
                                    return (
                                        <tr
                                            key={charge.id}
                                            className={`border-b border-slate-700 hover:bg-slate-700/50 transition-colors ${idx % 2 === 0 ? 'bg-slate-800/30' : ''
                                                }`}
                                        >
                                            <td className="p-4">
                                                <div className="font-bold text-white">{charge.invoice}</div>
                                                <div className="text-xs text-slate-400">ID: #{charge.id}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-semibold text-white">{charge.client}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-sm font-bold">
                                                    {charge.plan}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-lg font-black text-green-400">R$ {charge.amount}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(charge.dueDate).toLocaleDateString('pt-BR')}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {charge.paidDate ? (
                                                    <div className="text-slate-300">
                                                        {new Date(charge.paidDate).toLocaleDateString('pt-BR')}
                                                    </div>
                                                ) : (
                                                    <div className="text-slate-500">-</div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <CreditCard className="w-4 h-4" />
                                                    {charge.method}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className={`${statusDetails.color} rounded-full px-3 py-1 border font-bold text-xs flex items-center gap-1 w-fit`}>
                                                    {statusDetails.icon}
                                                    {statusDetails.label}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    {charge.status !== 'paid' && (
                                                        <Button
                                                            size="sm"
                                                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg text-xs"
                                                        >
                                                            Confirmar
                                                        </Button>
                                                    )}
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
                                                    >
                                                        Detalhes
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
