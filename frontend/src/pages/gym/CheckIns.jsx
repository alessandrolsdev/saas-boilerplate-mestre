import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Activity,
    Clock,
    Calendar,
    TrendingUp,
    Filter,
    Search,
    Download,
    ChevronLeft,
    ChevronRight,
    Users,
    Zap
} from 'lucide-react';

/**
 * CheckIns Component - GymMaster
 * 
 * Histórico completo de check-ins da academia.
 * Timeline reversa com filtros por data, membro e plano.
 * Analytics de frequência por horário e dia da semana.
 */
export default function CheckIns() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock check-ins data
    const checkIns = [
        { id: 1, member: 'Carlos Mendes', plan: 'Premium', time: '18:45', duration: 90, status: 'active' },
        { id: 2, member: 'Ana Silva', plan: 'Básico', time: '18:30', duration: 60, status: 'completed' },
        { id: 3, member: 'Roberto Costa', plan: 'VIP', time: '18:15', duration: 120, status: 'completed' },
        { id: 4, member: 'Juliana Oliveira', plan: 'Premium', time: '18:00', duration: 75, status: 'completed' },
        { id: 5, member: 'Paula Rocha', plan: 'VIP', time: '17:45', duration: 90, status: 'completed' },
        { id: 6, member: 'Fernando Alves', plan: 'Básico', time: '17:30', duration: 60, status: 'completed' },
        { id: 7, member: 'Beatriz Lima', plan: 'Premium', time: '17:15', duration: 90, status: 'completed' },
        { id: 8, member: 'Marcos Silva', plan: 'Básico', time: '17:00', duration: 60, status: 'completed' },
        { id: 9, member: 'Carla Santos', plan: 'VIP', time: '16:45', duration: 120, status: 'completed' },
        { id: 10, member: 'Ricardo Mendes', plan: 'Premium', time: '16:30', duration: 90, status: 'completed' },
        { id: 11, member: 'Patrícia Costa', plan: 'Básico', time: '16:15', duration: 60, status: 'completed' },
        { id: 12, member: 'Diego Oliveira', plan: 'Premium', time: '16:00', duration: 75, status: 'completed' },
        { id: 13, member: 'Mariana Rocha', plan: 'VIP', time: '15:45', duration: 120, status: 'completed' },
        { id: 14, member: 'Lucas Alves', plan: 'Básico', time: '15:30', duration: 60, status: 'completed' },
        { id: 15, member: 'Amanda Lima', plan: 'Premium', time: '15:15', duration: 90, status: 'completed' }
    ];

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

    const filteredCheckIns = checkIns.filter((checkIn) =>
        checkIn.member.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Analytics data
    const peakHours = ['17:00', '18:00', '19:00'];
    const totalToday = checkIns.length;
    const avgDuration = checkIns.reduce((sum, c) => sum + c.duration, 0) / checkIns.length;
    const activeNow = checkIns.filter((c) => c.status === 'active').length;

    // Hourly distribution for chart
    const hourlyData = Array.from({ length: 14 }, (_, i) => {
        const hour = 6 + i;
        const count = checkIns.filter((c) => parseInt(c.time.split(':')[0]) === hour).length;
        return { hour: `${hour}:00`, count };
    });

    const maxCount = Math.max(...hourlyData.map((d) => d.count));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-950 to-black p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">Check-ins</h1>
                        <p className="text-gray-400 font-semibold">Histórico completo de presença na academia</p>
                    </div>
                    <Link to="/gym/dashboard">
                        <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-bold">
                            ← Voltar ao Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border-2 border-orange-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-orange-500/20 rounded-xl border-2 border-orange-500">
                                <Activity className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 font-bold uppercase">Hoje</div>
                                <div className="text-3xl font-black text-white">{totalToday}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border-2 border-green-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-500/20 rounded-xl border-2 border-green-500 relative">
                                <Zap className="w-6 h-6 text-green-400" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 font-bold uppercase">Ativos Agora</div>
                                <div className="text-3xl font-black text-white">{activeNow}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border-2 border-blue-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/20 rounded-xl border-2 border-blue-500">
                                <Clock className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 font-bold uppercase">Tempo Médio</div>
                                <div className="text-3xl font-black text-white">{Math.round(avgDuration)} min</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border-2 border-purple-500/30 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-500/20 rounded-xl border-2 border-purple-500">
                                <TrendingUp className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 font-bold uppercase">Pico</div>
                                <div className="text-3xl font-black text-white">18:00</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border-2 border-orange-500/30 p-6 mb-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 font-bold">
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-black">
                                <Calendar className="w-4 h-4" />
                                {new Date(selectedDate).toLocaleDateString('pt-BR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 font-bold">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
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
                            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg font-bold uppercase">
                                <Download className="w-4 h-4 mr-2" />
                                Exportar
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Frequency Chart */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border-2 border-orange-500/30 p-6">
                    <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-orange-400" />
                        Frequência por Horário
                    </h2>
                    <div className="flex items-end gap-2 h-48">
                        {hourlyData.map((data, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                <div className="flex-1 w-full flex items-end justify-center">
                                    <div
                                        className={`w-full rounded-t-lg transition-all ${data.count > 0
                                                ? 'bg-gradient-to-t from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400'
                                                : 'bg-gray-700'
                                            }`}
                                        style={{ height: `${(data.count / maxCount) * 100}%` }}
                                    >
                                        {data.count > 0 && (
                                            <div className="text-white font-black text-xs text-center pt-2">{data.count}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400 font-bold transform -rotate-45 origin-top-left">
                                    {data.hour}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Check-ins Timeline */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border-2 border-orange-500/30 p-8">
                    <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                        <Clock className="w-7 h-7 text-orange-400" />
                        Timeline de Hoje
                    </h2>

                    <div className="space-y-3">
                        {filteredCheckIns.map((checkIn, idx) => {
                            const planColor = getPlanColor(checkIn.plan);
                            const isActive = checkIn.status === 'active';

                            return (
                                <div
                                    key={checkIn.id}
                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${isActive
                                            ? 'bg-green-500/10 border-green-500 shadow-lg shadow-green-500/20'
                                            : 'bg-gray-700/30 border-gray-600 hover:border-orange-500/50'
                                        }`}
                                >
                                    {/* Time */}
                                    <div className="w-20 text-center">
                                        <div className={`text-2xl font-black ${isActive ? 'text-green-400' : 'text-white'}`}>
                                            {checkIn.time}
                                        </div>
                                        {isActive && (
                                            <div className="text-xs text-green-400 font-bold uppercase mt-1 flex items-center justify-center gap-1">
                                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                                Ativo
                                            </div>
                                        )}
                                    </div>

                                    {/* Member Info */}
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${planColor} flex items-center justify-center text-white font-black text-lg border-2 ${isActive ? 'border-green-400' : 'border-white/30'}`}>
                                            {checkIn.member.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className={`text-lg font-black ${isActive ? 'text-white' : 'text-gray-200'} uppercase`}>
                                                {checkIn.member}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm font-bold px-2 py-1 bg-gradient-to-r ${planColor} rounded text-white`}>
                                                    {checkIn.plan}
                                                </span>
                                                <span className="text-sm text-gray-400 font-semibold">
                                                    <Clock className="w-3 h-3 inline mr-1" />
                                                    {checkIn.duration} min
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {isActive && (
                                        <div>
                                            <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg font-bold uppercase">
                                                Finalizar
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {filteredCheckIns.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 font-semibold">Nenhum check-in encontrado</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
