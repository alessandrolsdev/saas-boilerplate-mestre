import { useState, useEffect } from 'react';
import {
    CheckCircle2,
    Clock,
    User,
    Search,
    Filter,
    MoreVertical,
    MapPin,
    Calendar,
    ArrowUpDown,
    RefreshCw,
    XCircle
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';
import { useToast } from '../../components/ui/Toast';
import SkeletonCard from '../../components/ui/SkeletonCard';
import EmptyState from '../../components/ui/EmptyState';
import { InfoTooltip } from '../../components/ui/Tooltip';

export default function CheckIns() {
    const { addToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [loading, setLoading] = useState(true);
    const [checkIns, setCheckIns] = useState([]);

    const refreshData = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setCheckIns([
            { id: 1, user: 'João Silva', time: '09:30', status: 'Success', plan: 'Gold', location: 'Musculação' },
            { id: 2, user: 'Maria Souza', time: '09:32', status: 'Success', plan: 'Silver', location: 'Pilates' },
            { id: 3, user: 'Pedro Santos', time: '09:45', status: 'Denied', plan: 'Bronze', location: 'Catraca Principal', reason: 'Pagamento Pendente' },
            { id: 4, user: 'Ana Costa', time: '10:00', status: 'Success', plan: 'Platinum', location: 'Natação' },
            { id: 5, user: 'Lucas Lima', time: '10:15', status: 'Success', plan: 'Gold', location: 'Musculação' },
            { id: 6, user: 'Carla Dias', time: '10:20', status: 'Denied', plan: 'Silver', location: 'Catraca Principal', reason: 'Horário não permitido' },
        ]);
        setLoading(false);
    };

    useEffect(() => {
        refreshData();
    }, []);

    const stats = {
        total: checkIns.length,
        success: checkIns.filter(c => c.status === 'Success').length,
        denied: checkIns.filter(c => c.status === 'Denied').length
    };

    const filteredCheckIns = checkIns.filter(c => {
        const matchesSearch = c.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'Todos' ||
            (filterStatus === 'Success' && c.status === 'Success') ||
            (filterStatus === 'Denied' && c.status === 'Denied');
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-orange-950/20 to-zinc-950 text-white relative overflow-hidden p-8">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase italic relative inline-block">
                        Acesso
                        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full" />
                    </h1>
                    <p className="text-zinc-400 mt-2 font-medium">Controle de entrada em tempo real</p>
                </div>
                <button
                    onClick={refreshData}
                    className="bg-zinc-900 border border-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-zinc-800 transition-colors font-bold shadow-lg group"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`} />
                    Atualizar
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                <AnimatedCard className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 group">
                    <div className="p-4 bg-orange-500/10 text-orange-400 rounded-2xl group-hover:scale-110 transition-transform">
                        <User className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">Total Hoje</p>
                            <InfoTooltip content="Total de tentativas de acesso hoje" />
                        </div>
                        <h3 className="text-3xl font-black text-white">{stats.total}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 group" delay={0.1}>
                    <div className="p-4 bg-green-500/10 text-green-400 rounded-2xl group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">Liberados</p>
                            <InfoTooltip content="Acessos permitidos" />
                        </div>
                        <h3 className="text-3xl font-black text-green-400">{stats.success}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 group" delay={0.2}>
                    <div className="p-4 bg-red-500/10 text-red-500 rounded-2xl group-hover:scale-110 transition-transform">
                        <XCircle className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">Bloqueados</p>
                            <InfoTooltip content="Acessos negados por pendências ou regras" />
                        </div>
                        <h3 className="text-3xl font-black text-red-400">{stats.denied}</h3>
                    </div>
                </AnimatedCard>
            </div>

            {/* Live Feed */}
            <div className="relative z-10 bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl p-6 md:p-8 flex flex-col">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar acesso..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-950/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder-zinc-600"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        {['Todos', 'Success', 'Denied'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${filterStatus === status
                                        ? 'bg-orange-600 text-white border-orange-500'
                                        : 'bg-zinc-950/50 text-zinc-400 border-white/10 hover:bg-zinc-900'
                                    }`}
                            >
                                {status === 'Todos' ? 'Todos' : status === 'Success' ? 'Liberados' : 'Bloqueados'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <SkeletonCard count={4} height="h-24" />
                    ) : filteredCheckIns.length === 0 ? (
                        <EmptyState
                            icon={Clock}
                            title="Nenhum registro hoje"
                            description="Os check-ins dos alunos aparecerão aqui em tempo real."
                            className="text-zinc-400"
                        />
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredCheckIns.map((checkIn, index) => (
                                <AnimatedCard
                                    key={checkIn.id}
                                    delay={index * 0.05}
                                    className={`relative overflow-hidden rounded-2xl border p-4 flex items-center justify-between group transition-all ${checkIn.status === 'Success'
                                            ? 'bg-zinc-900/80 border-white/5 hover:border-green-500/30'
                                            : 'bg-red-950/10 border-red-500/10 hover:border-red-500/30'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${checkIn.status === 'Success'
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {checkIn.status === 'Success' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{checkIn.user}</h3>
                                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${checkIn.plan === 'Gold' ? 'bg-yellow-500/10 text-yellow-500' :
                                                        checkIn.plan === 'Platinum' ? 'bg-cyan-500/10 text-cyan-500' :
                                                            'bg-zinc-800 text-zinc-400'
                                                    }`}>
                                                    {checkIn.plan}
                                                </span>
                                                <span>•</span>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {checkIn.location}
                                                </div>
                                            </div>
                                            {checkIn.reason && (
                                                <p className="text-red-400 text-sm mt-1 font-medium">{checkIn.reason}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="font-mono text-2xl font-black text-white">{checkIn.time}</div>
                                        <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Horário</div>
                                    </div>
                                </AnimatedCard>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
}
