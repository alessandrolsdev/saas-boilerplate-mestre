import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    User,
    Users,
    Star,
    Calendar,
    DollarSign,
    TrendingUp,
    Phone,
    Mail,
    Clock,
    Award,
    Plus,
    Edit,
    BarChart3,
    Sparkles
} from 'lucide-react';

/**
 * Professionals Component - BeautyFlow
 * 
 * Gestão completa de profissionais do salão.
 * Perfis detalhados com especialidades, agenda e performance.
 */
export default function Professionals() {
    // Mock professionals data
    const professionals = [
        {
            id: 1,
            name: 'Carla Santos',
            role: 'Cabeleireira Master',
            avatar: null,
            specialties: ['Coloração', 'Cortes', 'Escova'],
            rating: 4.9,
            reviewsCount: 156,
            phone: '(11) 98765-4321',
            email: 'carla@belezaflow.com',
            appointmentsThisMonth: 124,
            revenueThisMonth: 18450,
            avgTicket: 148.79,
            availability: 85,
            yearsExperience: 12,
            status: 'active',
            color: 'from-rose-500 to-pink-500'
        },
        {
            id: 2,
            name: ' Beatriz Lima',
            role: 'Manicure & Designer de Sobrancelhas',
            avatar: null,
            specialties: ['Manicure', 'Pedicure', 'Design de Sobrancelhas'],
            rating: 4.8,
            reviewsCount: 98,
            phone: '(11) 91234-5678',
            email: 'beatriz@belezaflow.com',
            appointmentsThisMonth: 156,
            revenueThisMonth: 12480,
            avgTicket: 80,
            availability: 92,
            yearsExperience: 8,
            status: 'active',
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 3,
            name: 'Mariana Costa',
            role: 'Esteticista & Terapeuta',
            avatar: null,
            specialties: ['Limpeza de Pele', 'Massagem', 'Hidratação'],
            rating: 5.0,
            reviewsCount: 67,
            phone: '(11) 99876-5432',
            email: 'mariana@belezaflow.com',
            appointmentsThisMonth: 89,
            revenueThisMonth: 14230,
            avgTicket: 159.89,
            availability: 78,
            yearsExperience: 15,
            status: 'active',
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 4,
            name: 'Paula Mendes',
            role: 'Especialista em Cílios',
            avatar: null,
            specialties: ['Alongamento de Cílios', 'Volume Russo'],
            rating: 4.7,
            reviewsCount: 42,
            phone: '(11) 97654-3210',
            email: 'paula@belezaflow.com',
            appointmentsThisMonth: 34,
            revenueThisMonth: 6800,
            avgTicket: 200,
            availability: 65,
            yearsExperience: 5,
            status: 'active',
            color: 'from-violet-500 to-purple-500'
        }
    ];

    const totalRevenue = professionals.reduce((sum, p) => sum + p.revenueThisMonth, 0);
    const totalAppointments = professionals.reduce((sum, p) => sum + p.appointmentsThisMonth, 0);
    const avgRating = professionals.reduce((sum, p) => sum + p.rating, 0) / professionals.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Equipe de Profissionais</h1>
                        <p className="text-gray-600">Gerencie todos os profissionais do salão e suas performances</p>
                    </div>
                    <Link to="/beauty/dashboard">
                        <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                            ← Voltar ao Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-5 border-2 border-rose-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 font-semibold">Profissionais Ativos</div>
                                <div className="text-3xl font-black text-gray-900">{professionals.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border-2 border-green-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 font-semibold">Receita Total</div>
                                <div className="text-3xl font-black text-gray-900">R$ {(totalRevenue / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 font-semibold">Atendimentos</div>
                                <div className="text-3xl font-black text-gray-900">{totalAppointments}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border-2 border-yellow-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                                <Star className="w-6 h-6 text-white fill-current" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 font-semibold">Avaliação Média</div>
                                <div className="text-3xl font-black text-gray-900">{avgRating.toFixed(1)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Professional Button */}
                <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Expandir Equipe</h3>
                            <p className="text-sm text-gray-600">Adicione novos profissionais ao seu salão</p>
                        </div>
                        <Button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg">
                            <Plus className="w-4 h-4 mr-2" />
                            Novo Profissional
                        </Button>
                    </div>
                </div>
            </div>

            {/* Professionals Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {professionals.map((pro) => (
                        <div
                            key={pro.id}
                            className="bg-white rounded-2xl shadow-xl border-2 border-rose-100 hover:border-rose-300 transition-all overflow-hidden group"
                        >
                            {/* Header with Gradient */}
                            <div className={`bg-gradient-to-r ${pro.color} p-6 text-white relative`}>
                                <div className="flex items-start gap-4">
                                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-black border-4 border-white/30">
                                        {pro.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black mb-1">{pro.name}</h3>
                                        <p className="text-white/90 font-semibold mb-3">{pro.role}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="font-bold">{pro.rating}</span>
                                                <span className="text-xs text-white/80">({pro.reviewsCount})</span>
                                            </div>
                                            <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                                                {pro.yearsExperience} anos
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="px-3 py-1 bg-green-500 rounded-full text-xs font-black uppercase mb-2">
                                            Ativo
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                {/* Specialties */}
                                <div className="mb-6">
                                    <div className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        Especialidades
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {pro.specialties.map((spec, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-sm font-semibold"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Performance Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                                        <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                                        <div className="text-2xl font-black text-gray-900">{pro.appointmentsThisMonth}</div>
                                        <div className="text-xs text-gray-600 font-semibold">Atendimentos</div>
                                    </div>
                                    <div className="bg-green-50 rounded-xl p-3 text-center">
                                        <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
                                        <div className="text-2xl font-black text-green-600">
                                            {(pro.revenueThisMonth / 1000).toFixed(1)}k
                                        </div>
                                        <div className="text-xs text-gray-600 font-semibold">Receita</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-xl p-3 text-center">
                                        <TrendingUp className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                                        <div className="text-2xl font-black text-purple-600">{pro.avgTicket.toFixed(0)}</div>
                                        <div className="text-xs text-gray-600 font-semibold">Ticket Médio</div>
                                    </div>
                                </div>

                                {/* Availability Bar */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-gray-600 font-semibold flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Disponibilidade
                                        </span>
                                        <span className="font-bold text-rose-600">{pro.availability}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all"
                                            style={{ width: `${pro.availability}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="space-y-2 mb-6 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone className="w-4 h-4" />
                                        <span>{pro.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <span>{pro.email}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Ver Agenda
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-rose-300 text-rose-600 hover:bg-rose-50"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Editar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Top Performers */}
                <div className="bg-white rounded-2xl shadow-xl border-2 border-rose-200 p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <Award className="w-7 h-7 text-yellow-500 fill-current" />
                        Top Performers do Mês
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {professionals
                            .sort((a, b) => b.revenueThisMonth - a.revenueThisMonth)
                            .slice(0, 3)
                            .map((pro, idx) => (
                                <div
                                    key={pro.id}
                                    className="relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border-2 border-rose-200"
                                >
                                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                                        #{idx + 1}
                                    </div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white font-black text-2xl">
                                            {pro.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{pro.name}</h3>
                                            <p className="text-sm text-gray-600">{pro.role}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-gray-600 font-semibold mb-1">Receita</div>
                                            <div className="text-2xl font-black text-green-600">
                                                R$ {(pro.revenueThisMonth / 1000).toFixed(1)}k
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-600 font-semibold mb-1">Atendimentos</div>
                                            <div className="text-2xl font-black text-blue-600">{pro.appointmentsThisMonth}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
