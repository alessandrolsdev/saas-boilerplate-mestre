import { Link } from 'react-router-dom';
import {
    Calendar,
    Sparkles,
    TrendingUp,
    Users,
    DollarSign,
    Clock,
    Star,
    ArrowRight,
    Plus
} from 'lucide-react';

/**
 * BeautyDashboard Component
 * 
 * Dashboard elegante para salão de beleza com tema rosa/dourado.
 * Mostra agendamentos do dia, receita e métricas de performance.
 */
export default function BeautyDashboard() {
    // Mock data - em produção viria da API
    const todayAppointments = [
        { id: 1, time: '09:00', client: 'Maria Silva', service: 'Corte + Escova', professional: 'Ana Costa', status: 'confirmed' },
        { id: 2, time: '10:30', client: 'Julia Santos', service: 'Manicure', professional: 'Carla Souza', status: 'confirmed' },
        { id: 3, time: '11:00', client: 'Fernanda Lima', service: 'Coloração', professional: 'Ana Costa', status: 'pending' },
        { id: 4, time: '14:00', client: 'Patricia Alves', service: 'Massagem Relaxante', professional: 'Beatriz Martins', status: 'confirmed' },
        { id: 5, time: '15:30', client: 'Camila Rocha', service: 'Unha em Gel', professional: 'Carla Souza', status: 'confirmed' },
    ];

    const stats = {
        todayRevenue: 1240,
        todayAppointments: 12,
        weeklyRevenue: 8900,
        activeClients: 247
    };

    const topServices = [
        { name: 'Corte + Escova', count: 34, revenue: 3400 },
        { name: 'Manicure + Pedicure', count: 28, revenue: 2240 },
        { name: 'Coloração Completa', count: 15, revenue: 3750 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
            {/* Header */}
            <header className="bg-white border-b border-rose-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                <Sparkles className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Beauty<span className="font-light text-rose-600">Flow</span>
                                </h1>
                                <p className="text-xs text-gray-500 font-medium">Gestão Premium de Salão</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                                <Link to="/beauty/dashboard" className="text-rose-600 border-b-2 border-rose-600 pb-1">
                                    Dashboard
                                </Link>
                                <Link to="/beauty/appointments" className="text-gray-600 hover:text-rose-600 transition-colors">
                                    Agendamentos
                                </Link>
                                <Link to="/beauty/professionals" className="text-gray-600 hover:text-rose-600 transition-colors">
                                    Profissionais
                                </Link>
                                <Link to="/beauty/services" className="text-gray-600 hover:text-rose-600 transition-colors">
                                    Serviços
                                </Link>
                            </nav>

                            <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-200 transition-all inline-flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                Novo Agendamento
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border-2 border-rose-100 hover:shadow-lg hover:shadow-rose-100 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-rose-600" />
                            </div>
                            <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                +12%
                            </span>
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">
                            R$ {stats.todayRevenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Receita Hoje</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border-2 border-pink-100 hover:shadow-lg hover:shadow-pink-100 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-pink-600" />
                            </div>
                            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                {todayAppointments.length}/{stats.todayAppointments}
                            </span>
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">
                            {todayAppointments.length}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Agendamentos Hoje</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border-2 border-orange-100 hover:shadow-lg hover:shadow-orange-100 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-orange-600" />
                            </div>
                            <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                Semana
                            </span>
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">
                            R$ {(stats.weeklyRevenue / 1000).toFixed(1)}k
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Receita Semanal</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border-2 border-yellow-100 hover:shadow-lg hover:shadow-yellow-100 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-yellow-600" />
                            </div>
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">
                            {stats.activeClients}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Clientes Ativos</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Today's Schedule */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-8 border-2 border-rose-100 shadow-lg shadow-rose-50">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Agenda de Hoje</h2>
                                        <p className="text-sm text-gray-500">
                                            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    to="/beauty/appointments"
                                    className="text-rose-600 font-semibold text-sm hover:text-rose-700 inline-flex items-center gap-1"
                                >
                                    Ver Calendário <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {todayAppointments.map((apt) => (
                                    <div
                                        key={apt.id}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100 hover:shadow-md hover:scale-102 transition-all cursor-pointer"
                                    >
                                        <div className="flex-shrink-0 text-center">
                                            <div className="text-lg font-black text-rose-600">{apt.time}</div>
                                            <div className="text-xs text-gray-500 font-semibold">
                                                {apt.status === 'confirmed' ? '✓ Confirmado' : '⏱ Pendente'}
                                            </div>
                                        </div>

                                        <div className="w-px h-12 bg-rose-200"></div>

                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-gray-900 truncate">{apt.client}</div>
                                            <div className="text-sm text-gray-600">{apt.service}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Com <span className="font-semibold">{apt.professional}</span>
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <span className={`w-3 h-3 rounded-full ${apt.status === 'confirmed' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {todayAppointments.length === 0 && (
                                <div className="text-center py-12">
                                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 font-medium">Nenhum agendamento para hoje</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Top Services */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-8 border-2 border-pink-100 shadow-lg shadow-pink-50">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                                    <Star className="w-5 h-5 text-white fill-current" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Top Serviços</h2>
                            </div>

                            <div className="space-y-4">
                                {topServices.map((service, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-900">{service.name}</div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    {service.count} agendamentos
                                                </div>
                                            </div>
                                            <div className="text-2xl font-black text-rose-600">
                                                #{idx + 1}
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="text-sm text-gray-500">Receita</div>
                                            <div className="text-lg font-bold text-green-600">
                                                R$ {service.revenue.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-pink-100">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 font-medium">Receita Total (Top 3)</span>
                                    <span className="text-xl font-black text-gray-900">
                                        R$ {topServices.reduce((sum, s) => sum + s.revenue, 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 rounded-3xl p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Pronto para gerenciar seu salão?</h3>
                            <p className="text-rose-100">Acesse todas as funcionalidades de agendamento e gestão</p>
                        </div>
                        <div className="flex gap-4">
                            <Link to="/beauty/appointments">
                                <button className="bg-white text-rose-600 px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all">
                                    Ver Calendário
                                </button>
                            </Link>
                            <Link to="/beauty/services">
                                <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-rose-600 transition-all">
                                    Gerenciar Serviços
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
