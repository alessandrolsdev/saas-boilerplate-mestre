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
    Plus,
    CheckCircle2
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';
import { InfoTooltip } from '../../components/ui/Tooltip';

/**
 * BeautyDashboard Component
 * 
 * Dashboard elegante para salão de beleza com tema rosa/dourado.
 */
export default function BeautyDashboard() {
    // Mock data
    const todayAppointments = [
        { id: 1, time: '09:00', client: 'Maria Silva', service: 'Corte + Escova', professional: 'Ana Costa', status: 'confirmed' },
        { id: 2, time: '10:30', client: 'Julia Santos', service: 'Manicure', professional: 'Carla Souza', status: 'confirmed' },
        { id: 3, time: '11:00', client: 'Fernanda Lima', service: 'Coloração', professional: 'Ana Costa', status: 'pending' },
        { id: 4, time: '14:00', client: 'Patricia Alves', service: 'Massagem', professional: 'Beatriz Martins', status: 'confirmed' },
    ];

    const stats = [
        {
            label: 'Receita Hoje',
            value: 'R$ 1.2k',
            icon: DollarSign,
            color: 'text-rose-400',
            bg: 'bg-rose-500/10',
            border: 'hover:border-rose-500/30'
        },
        {
            label: 'Agendamentos',
            value: '12',
            icon: Calendar,
            color: 'text-pink-400',
            bg: 'bg-pink-500/10',
            border: 'hover:border-pink-500/30'
        },
        {
            label: 'Receita Semanal',
            value: 'R$ 8.9k',
            icon: TrendingUp,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'hover:border-purple-500/30'
        },
        {
            label: 'Clientes Ativos',
            value: '247',
            icon: Users,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'hover:border-amber-500/30'
        }
    ];

    const topServices = [
        { name: 'Corte + Escova', count: 34, revenue: 3400 },
        { name: 'Manicure', count: 28, revenue: 2240 },
        { name: 'Coloração', count: 15, revenue: 3750 },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden p-8">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight uppercase italic relative inline-block">
                            Dashboard
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full" />
                        </h1>
                        <p className="text-slate-400 mt-2 font-medium">Gestão Premium do Salão</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link to="/beauty/appointments">
                        <AnimatedButton className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-2.5 rounded-xl font-bold uppercase hover:shadow-lg hover:shadow-rose-500/25 transition-all inline-flex items-center gap-2 border border-white/10">
                            <Plus className="w-5 h-5" />
                            Novo Agendamento
                        </AnimatedButton>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <AnimatedCard
                            key={index}
                            delay={index * 0.1}
                            className={`bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/5 transition-all group ${stat.border}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="text-3xl font-black text-white mb-1 tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-400 font-bold uppercase tracking-wide">
                                {stat.label}
                            </div>
                        </AnimatedCard>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                {/* Schedule */}
                <AnimatedCard delay={0.4} className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black uppercase text-white tracking-tight">Agenda Hoje</h2>
                                <p className="text-sm text-slate-400 font-medium">Próximos compromissos</p>
                            </div>
                        </div>
                        <Link to="/beauty/appointments" className="text-rose-400 font-bold text-sm hover:text-rose-300 flex items-center gap-1">
                            Ver tudo <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {todayAppointments.map((apt, i) => (
                            <motion.div
                                key={apt.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-rose-500/30 transition-all cursor-pointer group"
                            >
                                <div className="text-center w-16">
                                    <div className="text-lg font-black text-white group-hover:text-rose-400 transition-colors">{apt.time}</div>
                                </div>

                                <div className="w-px h-10 bg-white/10" />

                                <div className="flex-1">
                                    <div className="font-bold text-white text-lg">{apt.client}</div>
                                    <div className="text-sm text-slate-400">{apt.service} • {apt.professional}</div>
                                </div>

                                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${apt.status === 'confirmed'
                                        ? 'bg-emerald-500/10 text-emerald-500'
                                        : 'bg-amber-500/10 text-amber-500'
                                    }`}>
                                    {apt.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedCard>

                {/* Top Services */}
                <AnimatedCard delay={0.5} className="lg:col-span-1 bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Star className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-black uppercase text-white tracking-tight">Top Serviços</h2>
                    </div>

                    <div className="space-y-4">
                        {topServices.map((service, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="font-bold text-white">{service.name}</div>
                                    <div className="text-xl font-black text-rose-500/50">#{idx + 1}</div>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="text-sm text-slate-400">{service.count} agendamentos</div>
                                    <div className="text-emerald-400 font-bold">R$ {service.revenue}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <Link to="/beauty/services" className="block w-full text-center py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase tracking-wide transition-colors">
                            Gerenciar Catálogo
                        </Link>
                    </div>
                </AnimatedCard>
            </div>
        </div>
    );
}
