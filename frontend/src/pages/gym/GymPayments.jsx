import { useState } from 'react';
import {
    CreditCard,
    ArrowUpRight,
    ArrowDownLeft,
    DollarSign,
    Calendar,
    Search,
    Download
} from 'lucide-react';
import { motion } from 'framer-motion';

import AnimatedCard from '../../components/ui/AnimatedCard';

export default function GymPayments() {
    const [searchTerm, setSearchTerm] = useState('');

    const transactions = [
        { id: 1, member: 'João Silva', amount: 199.00, date: 'Hoje, 10:30', status: 'Completed', type: 'Mensalidade' },
        { id: 2, member: 'Maria Souza', amount: 159.00, date: 'Ontem, 15:45', status: 'Completed', type: 'Mensalidade' },
        { id: 3, member: 'Carlos Oliveira', amount: 45.00, date: 'Ontem, 09:20', status: 'Completed', type: 'Produto' },
        { id: 4, member: 'Ana Costa', amount: 199.00, date: '12/03/2024', status: 'Failed', type: 'Mensalidade' },
    ];

    const stats = {
        revenue: 'R$ 12.450',
        pending: 'R$ 850',
        transactions: 145
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Financeiro</h1>
                    <p className="text-gray-500 mt-1">Histórico de pagamentos e receitas</p>
                </div>
                <button className="bg-white border text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                    Exportar Relatório
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatedCard className="bg-emerald-500 text-white p-6 rounded-2xl shadow-lg shadow-emerald-500/20">
                    <p className="text-emerald-100 text-sm font-medium mb-1">Receita Mensal</p>
                    <h3 className="text-3xl font-bold">{stats.revenue}</h3>
                    <div className="flex items-center gap-1 text-emerald-100 text-xs mt-2">
                        <ArrowUpRight className="w-3 h-3" />
                        +12% vs mês anterior
                    </div>
                </AnimatedCard>
                <AnimatedCard className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm" delay={0.1}>
                    <p className="text-gray-500 text-sm font-medium mb-1">Pendente</p>
                    <h3 className="text-3xl font-bold text-gray-900">{stats.pending}</h3>
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-2">
                        3 pagamentos atrasados
                    </div>
                </AnimatedCard>
                <AnimatedCard className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm" delay={0.2}>
                    <p className="text-gray-500 text-sm font-medium mb-1">Transações</p>
                    <h3 className="text-3xl font-bold text-gray-900">{stats.transactions}</h3>
                    <div className="flex items-center gap-1 text-green-500 text-xs mt-2">
                        <CheckCard className="w-3 h-3" />
                        Todas processadas
                    </div>
                </AnimatedCard>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar transação..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membro</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.member}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">R$ {tx.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {tx.status === 'Completed' ? 'Pago' : 'Falhou'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function CheckCard({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}
