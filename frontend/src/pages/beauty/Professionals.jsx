import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Users,
    Star,
    Calendar,
    DollarSign,
    TrendingUp,
    Phone,
    Mail,
    Plus,
    Edit,
    Trash2,
    Search,
    Award,
    Filter,
    ArrowUpDown,
    Eye,
    CheckCircle2,
    XCircle,
    Clock,
    MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';
import { useToast } from '../../components/ui/Toast';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { InfoTooltip } from '../../components/ui/Tooltip';

export default function Professionals() {
    const { addToast } = useToast();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [detailsModal, setDetailsModal] = useState({ open: false, prof: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, prof: null });

    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Mock Data
    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {
        // Simulate API fetch
        const loadData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setProfessionals([
                { id: 1, name: 'Ana Silva', specialty: 'Hairstylist', rating: 4.9, appointments: 124, status: 'Active', email: 'ana@beauty.com', phone: '(11) 99999-1001', since: '2022-03-10' },
                { id: 2, name: 'Beatriz Costa', specialty: 'Manicure', rating: 4.8, appointments: 98, status: 'Active', email: 'bia@beauty.com', phone: '(11) 99999-1002', since: '2023-01-15' },
                { id: 3, name: 'Carla Dias', specialty: 'Colorista', rating: 5.0, appointments: 156, status: 'Active', email: 'carla@beauty.com', phone: '(11) 99999-1003', since: '2021-11-20' },
                { id: 4, name: 'Daniela Lima', specialty: 'Esteticista', rating: 4.7, appointments: 87, status: 'Away', email: 'dani@beauty.com', phone: '(11) 99999-1004', since: '2023-05-05' },
            ]);
            setLoading(false);
        };
        loadData();
    }, []);

    // Stats
    const stats = {
        total: professionals.length,
        active: professionals.filter(p => p.status === 'Active').length,
        avgRating: 4.85
    };

    const filteredProfessionals = professionals
        .filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.specialty.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === 'Todos' || p.status === filterStatus;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];
            return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
        });

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleAdd = () => {
        setSelectedProfessional(null);
        reset({ name: '', specialty: '', status: 'Active', email: '', phone: '' });
        setIsEditModalOpen(true);
    };

    const handleEdit = (prof) => {
        setSelectedProfessional(prof);
        reset(prof);
        setIsEditModalOpen(true);
    };

    const handleDelete = (prof) => {
        setDeleteModal({ open: true, prof });
    };

    const confirmDelete = () => {
        setLoading(true);
        setTimeout(() => {
            setProfessionals(prev => prev.filter(p => p.id !== deleteModal.prof.id));
            setDeleteModal({ open: false, prof: null });
            setLoading(false);
            addToast('Profissional removido com sucesso!', 'success');
        }, 500);
    };

    const onSubmit = (data) => {
        setLoading(true);
        setTimeout(() => {
            if (selectedProfessional) {
                setProfessionals(prev => prev.map(p => p.id === selectedProfessional.id ? { ...p, ...data } : p));
                addToast('Perfil atualizado com sucesso!', 'success');
            } else {
                setProfessionals(prev => [...prev, { ...data, id: Date.now(), rating: 5.0, appointments: 0, since: new Date().toISOString().split('T')[0] }]);
                addToast('Profissional adicionado!', 'success');
            }
            setIsEditModalOpen(false);
            setLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-950/20 to-slate-950 text-white relative overflow-hidden p-8">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase italic relative inline-block">
                        Equipe
                        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full" />
                    </h1>
                    <p className="text-slate-400 mt-2 font-medium">Gerencie seus especialistas de beleza</p>
                </div>
                <AnimatedButton
                    onClick={handleAdd}
                    className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-rose-500/30 border border-white/10 font-bold uppercase tracking-wide group"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    Novo Profissional
                </AnimatedButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                <AnimatedCard className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 group">
                    <div className="p-4 bg-rose-500/10 text-rose-400 rounded-2xl group-hover:scale-110 transition-transform">
                        <Users className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Total</p>
                            <InfoTooltip content="Total de profissionais cadastrados" />
                        </div>
                        <h3 className="text-3xl font-black text-white">{stats.total}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 group" delay={0.1}>
                    <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Disponíveis</p>
                            <InfoTooltip content="Profissionais ativos no momento" />
                        </div>
                        <h3 className="text-3xl font-black text-white">{stats.active}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 group" delay={0.2}>
                    <div className="p-4 bg-amber-500/10 text-amber-400 rounded-2xl group-hover:scale-110 transition-transform">
                        <Star className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Média Avaliação</p>
                            <InfoTooltip content="Nota média da equipe" />
                        </div>
                        <h3 className="text-3xl font-black text-white">{stats.avgRating}</h3>
                    </div>
                </AnimatedCard>
            </div>

            {/* Content */}
            <div className="relative z-10 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl p-6 md:p-8">
                {/* Filters */}
                <div className="flex flex-col xl:flex-row gap-4 justify-between items-center mb-8">
                    <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-rose-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar por nome, especialidade..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all placeholder-slate-600"
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                            <Filter className="w-5 h-5 text-slate-500 hidden md:block" />
                            {['Todos', 'Active', 'Away'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${filterStatus === status
                                            ? 'bg-rose-600 text-white border-rose-500'
                                            : 'bg-slate-950/50 text-slate-400 border-white/10 hover:bg-slate-900'
                                        }`}
                                >
                                    {status === 'Todos' ? 'Todos' : status === 'Active' ? 'Disponíveis' : 'Ausentes'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full xl:w-auto justify-end">
                        <select
                            value={sortBy}
                            onChange={(e) => handleSort(e.target.value)}
                            className="px-4 py-2 bg-slate-950/50 border border-white/10 text-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                        >
                            <option value="name">Nome</option>
                            <option value="specialty">Especialidade</option>
                            <option value="rating">Avaliação</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="p-2 bg-slate-950/50 border border-white/10 rounded-xl hover:bg-slate-900 text-slate-300 transition-colors"
                        >
                            <ArrowUpDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SkeletonCard count={6} height="h-72" />
                    </div>
                ) : filteredProfessionals.length === 0 ? (
                    <EmptyState
                        icon={Users}
                        title="Nenhum profissional encontrado"
                        description="Tente ajustar os filtros ou adicione um novo profissional."
                        actionLabel="Novo Profissional"
                        onAction={handleAdd}
                        className="text-slate-400"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredProfessionals.map((prof, index) => (
                                <AnimatedCard
                                    key={prof.id}
                                    className="border border-white/5 rounded-2xl p-0 flex flex-col hover:border-rose-500/30 transition-all bg-slate-900 relative overflow-hidden group"
                                    delay={index * 0.1}
                                >
                                    {/* Header Gradient */}
                                    <div className="h-24 bg-gradient-to-br from-rose-900/50 to-slate-900/50 relative">
                                        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1 text-amber-400 text-xs font-bold">
                                            <Star className="w-3 h-3 fill-current" />
                                            {prof.rating}
                                        </div>
                                    </div>

                                    <div className="px-6 pb-6 -mt-12 flex-1 flex flex-col">
                                        <div className="flex items-end justify-between mb-4">
                                            <div className="relative">
                                                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl font-black text-white border-4 border-slate-900 shadow-xl">
                                                    {prof.name.charAt(0)}
                                                </div>
                                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-slate-900 ${prof.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                                                    }`} />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h3 className="font-bold text-white text-xl">{prof.name}</h3>
                                            <p className="text-rose-400 font-medium">{prof.specialty}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            <div className="bg-slate-950/50 p-2 rounded-lg border border-white/5 text-center">
                                                <div className="text-xs text-slate-500 font-bold uppercase">Agendamentos</div>
                                                <div className="text-white font-bold">{prof.appointments}</div>
                                            </div>
                                            <div className="bg-slate-950/50 p-2 rounded-lg border border-white/5 text-center">
                                                <div className="text-xs text-slate-500 font-bold uppercase">Status</div>
                                                <div className={`font-bold ${prof.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                    {prof.status === 'Active' ? 'Ativo' : 'Ausente'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 mt-auto">
                                            <button
                                                onClick={() => setDetailsModal({ open: true, prof })}
                                                className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center justify-center"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(prof)}
                                                className="py-2 rounded-xl bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-600/20 transition-colors flex items-center justify-center"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(prof)}
                                                className="py-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/20 transition-colors flex items-center justify-center"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </AnimatedCard>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title={selectedProfessional ? "Editar Profissional" : "Novo Profissional"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Nome Completo</label>
                        <input {...register('name', { required: true })} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 bg-slate-50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Especialidade</label>
                            <input {...register('specialty', { required: true })} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 bg-slate-50" placeholder="Ex: Manicure" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                            <select {...register('status')} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 bg-slate-50">
                                <option value="Active">Disponível</option>
                                <option value="Away">Ausente/Férias</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                            <input {...register('email')} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 bg-slate-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Telefone</label>
                            <input {...register('phone')} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 bg-slate-50" />
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-slate-100 mt-4">
                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg mr-2">Cancelar</button>
                        <button type="submit" className="bg-rose-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-rose-700 shadow-lg shadow-rose-500/30">Salvar</button>
                    </div>
                </form>
            </Modal>

            {/* Details Modal */}
            {detailsModal.prof && (
                <Modal
                    isOpen={detailsModal.open}
                    onClose={() => setDetailsModal({ open: false, prof: null })}
                    title={`Detalhes - ${detailsModal.prof.name}`}
                    size="lg"
                >
                    <div className="space-y-6 text-slate-800">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                                <div className="text-sm text-rose-600 font-bold mb-1">Avaliação</div>
                                <div className="text-xl font-black text-rose-700 flex items-center gap-1">
                                    {detailsModal.prof.rating} <Star className="w-4 h-4 fill-current" />
                                </div>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                <div className="text-sm text-emerald-600 font-bold mb-1">Status</div>
                                <div className="text-xl font-black text-emerald-700">{detailsModal.prof.status === 'Active' ? 'Disponível' : 'Ausente'}</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <div className="text-sm text-slate-600 font-bold mb-1">Desde</div>
                                <div className="text-xl font-black text-slate-700">{new Date(detailsModal.prof.since).toLocaleDateString('pt-BR')}</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                <span className="font-bold text-slate-600 flex items-center gap-2">
                                    <Award className="w-4 h-4" /> Especialidade
                                </span>
                                <span className="text-slate-900 bg-rose-100 px-3 py-1 rounded-full text-sm font-bold text-rose-700">{detailsModal.prof.specialty}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                <span className="font-bold text-slate-600 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Email
                                </span>
                                <span className="text-slate-900">{detailsModal.prof.email}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                <span className="font-bold text-slate-600 flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> Telefone
                                </span>
                                <span className="text-slate-900">{detailsModal.prof.phone}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 pt-4">
                                <span className="font-bold text-slate-600 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Total Agendamentos
                                </span>
                                <span className="text-slate-900 font-mono font-bold text-lg">{detailsModal.prof.appointments}</span>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            <ConfirmDialog
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, prof: null })}
                onConfirm={confirmDelete}
                title="Remover Profissional"
                description="Tem certeza? Isso não pode ser desfeito."
                variant="danger"
            />
        </div>
    );
}
