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
    Calendar,
    DollarSign,
    Activity,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Phone,
    Mail,
    CreditCard,
    Dumbbell
} from 'lucide-react';

/**
 * Members Component - GymMaster
 * 
 * Diretório completo de membros da academia.
 * Gestão de planos, status de pagamento e histórico.
 */
export default function Members() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');

    // Mock members data
    const members = [
        {
            id: 1,
            name: 'Carlos Mendes',
            email: 'carlos@email.com',
            phone: '(11) 98765-4321',
            plan: 'Premium',
            status: 'active',
            dueDate: '2025-02-28',
            monthlyFee: 180,
            joinDate: '2023-05-10',
            lastCheckIn: '2025-02-09',
            totalCheckIns: 156,
            avatar: null
        },
        {
            id: 2,
            name: 'Ana Silva',
            email: 'ana@email.com',
            phone: '(11) 91234-5678',
            plan: 'Básico',
            status: 'active',
            dueDate: '2025-02-15',
            monthlyFee: 120,
            joinDate: '2024-01-15',
            lastCheckIn: '2025-02-08',
            totalCheckIns: 89,
            avatar: null
        },
        {
            id: 3,
            name: 'Roberto Costa',
            email: 'roberto@email.com',
            phone: '(11) 99876-5432',
            plan: 'VIP',
            status: 'expiring',
            dueDate: '2025-02-12',
            monthlyFee: 200,
            joinDate: '2022-11-20',
            lastCheckIn: '2025-02-07',
            totalCheckIns: 234,
            avatar: null
        },
        {
            id: 4,
            name: 'Juliana Oliveira',
            email: 'juliana@email.com',
            phone: '(11) 97654-3210',
            plan: 'Premium',
            status: 'active',
            dueDate: '2025-03-05',
            monthlyFee: 180,
            joinDate: '2024-06-01',
            lastCheckIn: '2025-02-09',
            totalCheckIns: 67,
            avatar: null
        },
        {
            id: 5,
            name: 'Fernando Alves',
            email: 'fernando@email.com',
            phone: '(11) 96543-2109',
            plan: 'Básico',
            status: 'expired',
            dueDate: '2025-01-30',
            monthlyFee: 120,
            joinDate: '2024-08-12',
            lastCheckIn: '2025-01-28',
            totalCheckIns: 45,
            avatar: null
        },
        {
            id: 6,
            name: 'Paula Rocha',
            email: 'paula@email.com',
            phone: '(11) 95432-1098',
            plan: 'VIP',
            status: 'active',
            dueDate: '2025-02-20',
            monthlyFee: 200,
            joinDate: '2023-03-15',
            lastCheckIn: '2025-02-09',
            totalCheckIns: 198,
            avatar: null
        }
    ];

    const getStatusDetails = (status) => {
        switch (status) {
            case 'active':
                return { icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-green-400 bg-green-500/20', label: 'Ativo', border: 'border-green-500' };
            case 'expiring':
                return { icon: <AlertCircle className="w-4 h-4" />, color: 'text-yellow-400 bg-yellow-500/20', label: 'Vencendo', border: 'border-yellow-500' };
            case 'expired':
                return { icon: <XCircle className="w-4 h-4" />, color: 'text-red-400 bg-red-500/20', label: 'Vencido', border: 'border-red-500' };
            default:
                return { icon: null, color: '', label: '', border: '' };
        }
    };

    const getPlanColor = (plan) => {
        switch (plan) {
            case 'VIP':
                return 'from-purple-500 to-pink-500';
            case 'Premium':
                return 'from-orange-500 to-red-500';
            case 'Básico':
                return 'from-gray-600 to-gray-700';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const filteredMembers = members.filter((member) => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'Todos' || member.status === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const activeCount = members.filter((m) => m.status === 'active').length;
    const expiringCount = members.filter((m) => m.status === 'expiring').length;
    const expiredCount = members.filter((m) => m.status === 'expired').length;
    const totalRevenue = members.reduce((sum, m) => sum + m.monthlyFee, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-950 to-black p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">Membros</h1>
                        <p className="text-gray-400 font-semibold">Diretório completo de todos os membros da academia</p>
                    </div>
                    <Link to="/gym/dashboard">
                        <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-bold">
                            ← Voltar ao Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border-2 border-green-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-500/20 rounded-xl border-2 border-green-500">
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 font-bold uppercase">Ativos</div>
                                <div className="text-3xl font-black text-white">{activeCount}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border-2 border-yellow-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-yellow-500/20 rounded-xl border-2 border-yellow-500">
                                <AlertCircle className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 font-bold uppercase">Vencendo</div>
                                <div className="text-3xl font-black text-white">{expiringCount}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border-2 border-red-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-500/20 rounded-xl border-2 border-red-500">
                                <XCircle className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 font-bold uppercase">Vencidos</div>
                                <div className="text-3xl font-black text-white">{expiredCount}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border-2 border-orange-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-orange-500/20 rounded-xl border-2 border-orange-500">
                                <DollarSign className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 font-bold uppercase">Receita/Mês</div>
                                <div className="text-3xl font-black text-white">R$ {(totalRevenue / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border-2 border-orange-500/30 p-6">
                    <div className="flex items-center justify-between gap-4">
                        {/* Status Filters */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-400" />
                            {['Todos', 'Active', 'Expiring', 'Expired'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-black text-sm uppercase tracking-wide transition-all ${statusFilter === status
                                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar membro..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                                />
                            </div>
                            <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg font-black uppercase">
                                <Plus className="w-4 h-4 mr-2" />
                                Novo Membro
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Members Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMembers.map((member) => {
                        const statusDetails = getStatusDetails(member.status);
                        const planColor = getPlanColor(member.plan);

                        return (
                            <div
                                key={member.id}
                                className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border-2 ${statusDetails.border} hover:scale-105 transition-all overflow-hidden`}
                            >
                                {/* Header with Plan Badge */}
                                <div className={`bg-gradient-to-r ${planColor} p-4`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-white font-black text-2xl">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-white uppercase tracking-tight">{member.name}</h3>
                                                <p className="text-white/80 text-sm font-bold">ID: #{member.id.toString().padStart(4, '0')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-5">
                                    {/* Plan and Status */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`px-3 py-1 bg-gradient-to-r ${planColor} rounded-lg text-white font-black text-sm uppercase`}>
                                            {member.plan}
                                        </div>
                                        <div className={`${statusDetails.color} rounded-full px-3 py-1 font-bold text-sm uppercase flex items-center gap-2`}>
                                            {statusDetails.icon}
                                            {statusDetails.label}
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                                            <div className="text-xs text-gray-400 font-bold uppercase mb-1">Check-ins</div>
                                            <div className="text-2xl font-black text-white">{member.totalCheckIns}</div>
                                        </div>
                                        <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                                            <div className="text-xs text-gray-400 font-bold uppercase mb-1">Mensalidade</div>
                                            <div className="text-2xl font-black text-orange-400">R$ {member.monthlyFee}</div>
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="space-y-2 mb-4 text-sm">
                                        <div className="flex items-center justify-between bg-gray-700/30 rounded-lg p-2">
                                            <span className="text-gray-400 font-semibold flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Vencimento
                                            </span>
                                            <span className="text-white font-bold">{new Date(member.dueDate).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                        <div className="flex items-center justify-between bg-gray-700/30 rounded-lg p-2">
                                            <span className="text-gray-400 font-semibold flex items-center gap-2">
                                                <Activity className="w-4 h-4" />
                                                Último Check-in
                                            </span>
                                            <span className="text-white font-bold">{new Date(member.lastCheckIn).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div className="space-y-2 mb-4 text-sm">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Phone className="w-4 h-4" />
                                            <span className="font-semibold">{member.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Mail className="w-4 h-4" />
                                            <span className="font-semibold truncate">{member.email}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg font-bold uppercase">
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            Renovar
                                        </Button>
                                        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 font-bold">
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
