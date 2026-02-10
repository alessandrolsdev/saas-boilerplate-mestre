import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Calendar as CalendarIcon,
    Clock,
    User,
    Phone,
    Mail,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Plus,
    Filter,
    Search,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Scissors,
    Palette
} from 'lucide-react';

/**
 * Appointments Component - BeautyFlow
 * 
 * Calendário completo de agendamentos para salão de beleza.
 * Visão semanal com agendamentos por profissional e horário.
 * Funcionalidades: filtros, busca, confirmação, cancelamento.
 */
export default function Appointments() {
    const [currentWeek, setCurrentWeek] = useState(0);
    const [selectedDay, setSelectedDay] = useState(1);
    const [viewMode, setViewMode] = useState('week'); // week, day

    // Mock appointments data
    const appointments = [
        {
            id: 1,
            time: '09:00',
            duration: 60,
            client: 'Maria Silva',
            phone: '(11) 98765-4321',
            service: 'Corte + Escova',
            professional: 'Carla Santos',
            status: 'confirmed',
            value: 120
        },
        {
            id: 2,
            time: '10:30',
            duration: 90,
            client: 'Ana Costa',
            phone: '(11) 91234-5678',
            service: 'Coloração Completa',
            professional: 'Carla Santos',
            status: 'confirmed',
            value: 280
        },
        {
            id: 3,
            time: '09:30',
            duration: 45,
            client: 'Juliana Oliveira',
            phone: '(11) 99876-5432',
            service: 'Manicure + Pedicure',
            professional: 'Beatriz Lima',
            status: 'pending',
            value: 80
        },
        {
            id: 4,
            time: '11:00',
            duration: 120,
            client: 'Paula Mendes',
            phone: '(11) 97654-3210',
            service: 'Hidratação Profunda',
            professional: 'Beatriz Lima',
            status: 'confirmed',
            value: 150
        },
        {
            id: 5,
            time: '14:00',
            duration: 60,
            client: 'Roberta Alves',
            phone: '(11) 96543-2109',
            service: 'Design de Sobrancelhas',
            professional: 'Carla Santos',
            status: 'cancelled',
            value: 60
        },
        {
            id: 6,
            time: '15:30',
            duration: 90,
            client: 'Fernanda Rocha',
            phone: '(11) 95432-1098',
            service: 'Alongamento de Cílios',
            professional: 'Beatriz Lima',
            status: 'confirmed',
            value: 200
        }
    ];

    const professionals = ['Todas', 'Carla Santos', 'Beatriz Lima', 'Mariana Costa'];
    const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const timeSlots = Array.from({ length: 11 }, (_, i) => `${9 + i}:00`);

    const getStatusDetails = (status) => {
        switch (status) {
            case 'confirmed':
                return { icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-green-400 bg-green-500/20', label: 'Confirmado' };
            case 'pending':
                return { icon: <AlertCircle className="w-4 h-4" />, color: 'text-yellow-400 bg-yellow-500/20', label: 'Pendente' };
            case 'cancelled':
                return { icon: <XCircle className="w-4 h-4" />, color: 'text-red-400 bg-red-500/20', label: 'Cancelado' };
            default:
                return { icon: null, color: '', label: '' };
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Agenda de Atendimentos</h1>
                        <p className="text-gray-600">Gerencie todos os agendamentos do salão</p>
                    </div>
                    <Link to="/beauty/dashboard">
                        <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                            ← Voltar ao Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Week Navigation */}
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentWeek(currentWeek - 1)}
                                className="border-rose-300 text-rose-600 hover:bg-rose-50"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl text-white font-bold">
                                10 - 16 Fevereiro 2025
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentWeek(currentWeek + 1)}
                                className="border-rose-300 text-rose-600 hover:bg-rose-50"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar cliente..."
                                    className="pl-10 pr-4 py-2 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                                />
                            </div>
                            <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                                <Filter className="w-4 h-4 mr-2" />
                                Filtrar
                            </Button>
                            <Button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg">
                                <Plus className="w-4 h-4 mr-2" />
                                Novo Agendamento
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden">
                    {/* Days Header */}
                    <div className="grid grid-cols-7 bg-gradient-to-r from-rose-500 to-pink-500">
                        <div className="p-4 border-r border-rose-400/30">
                            <div className="text-white/80 text-xs font-semibold uppercase">Horário</div>
                        </div>
                        {weekDays.map((day, idx) => (
                            <div
                                key={idx}
                                className={`p-4 border-r border-rose-400/30 last:border-r-0 cursor-pointer transition-all ${selectedDay === idx ? 'bg-white/20' : 'hover:bg-white/10'
                                    }`}
                                onClick={() => setSelectedDay(idx)}
                            >
                                <div className="text-white font-bold text-center">{day}</div>
                                <div className="text-white/80 text-sm text-center">{10 + idx}/02</div>
                            </div>
                        ))}
                    </div>

                    {/* Time Slots */}
                    <div className="grid grid-cols-7">
                        {/* Time Column */}
                        <div className="bg-rose-50">
                            {timeSlots.map((time, idx) => (
                                <div
                                    key={idx}
                                    className="h-24 border-b border-rose-200 flex items-center justify-center text-sm font-semibold text-gray-600"
                                >
                                    {time}
                                </div>
                            ))}
                        </div>

                        {/* Day Columns */}
                        {weekDays.map((_, dayIdx) => (
                            <div key={dayIdx} className="border-l border-rose-100">
                                {timeSlots.map((time, slotIdx) => {
                                    // Find appointments for this time slot
                                    const dayAppointments = appointments.filter(
                                        (apt) => apt.time === time && dayIdx === 1 // Mock: showing appointments on Tuesday
                                    );

                                    return (
                                        <div
                                            key={slotIdx}
                                            className="h-24 border-b border-rose-100 p-2 hover:bg-rose-50/50 transition-colors relative group"
                                        >
                                            {dayAppointments.map((apt) => {
                                                const statusDetails = getStatusDetails(apt.status);
                                                return (
                                                    <div
                                                        key={apt.id}
                                                        className={`absolute inset-2 rounded-lg p-2 border-l-4 ${apt.status === 'confirmed'
                                                                ? 'bg-green-50 border-green-500'
                                                                : apt.status === 'pending'
                                                                    ? 'bg-yellow-50 border-yellow-500'
                                                                    : 'bg-red-50 border-red-500'
                                                            } cursor-pointer hover:shadow-lg transition-all z-10`}
                                                        style={{ height: `${(apt.duration / 60) * 96 - 16}px` }}
                                                    >
                                                        <div className="flex items-start justify-between mb-1">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-bold text-sm text-gray-900 truncate">{apt.client}</div>
                                                                <div className="text-xs text-gray-600 truncate">{apt.service}</div>
                                                            </div>
                                                            <div className={`${statusDetails.color} rounded-full p-1 ml-1 flex-shrink-0`}>
                                                                {statusDetails.icon}
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                                            <User className="w-3 h-3" />
                                                            {apt.professional}
                                                        </div>
                                                        <div className="text-xs font-bold text-rose-600 mt-1">
                                                            R$ {apt.value}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {/* Empty slot hint */}
                                            {dayAppointments.length === 0 && (
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center">
                                                    <Plus className="w-6 h-6 text-rose-300" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Footer */}
            <div className="max-w-7xl mx-auto mt-6 grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-gray-900">15</div>
                            <div className="text-sm text-gray-600">Confirmados</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-yellow-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/20 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-gray-900">3</div>
                            <div className="text-sm text-gray-600">Pendentes</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-rose-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-500/20 rounded-lg">
                            <Sparkles className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-gray-900">R$ 2.4k</div>
                            <div className="text-sm text-gray-600">Receita Prevista</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-gray-900">85%</div>
                            <div className="text-sm text-gray-600">Taxa de Ocupação</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
