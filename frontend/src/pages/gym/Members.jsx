import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Users,
    Dumbbell,
    Calendar,
    Search,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Plus,
    Trophy,
    User,
    Filter,
    ArrowUpDown,
    Eye,
    Edit,
    Trash2,
    CreditCard,
    Phone,
    Mail,
    AlertCircle
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import Modal from '../../components/ui/Modal';
import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';
import { useToast } from '../../components/ui/Toast';
import SkeletonCard from '../../components/ui/SkeletonCard';
import EmptyState from '../../components/ui/EmptyState';
import { InfoTooltip } from '../../components/ui/Tooltip';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

export default function Members() {
    const { addToast } = useToast();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [detailsModal, setDetailsModal] = useState({ open: false, member: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, member: null });

    const [selectedMember, setSelectedMember] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Mock Data
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Simulate API fetch
        const loadData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMembers([
                { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-0001', plan: 'Gold', status: 'Active', lastCheckIn: 'Hoje, 09:30', payment: 'Paid', joinDate: '2023-05-15' },
                { id: 2, name: 'Maria Souza', email: 'maria@email.com', phone: '(11) 99999-0002', plan: 'Silver', status: 'Active', lastCheckIn: 'Ontem, 18:00', payment: 'Paid', joinDate: '2023-06-20' },
                { id: 3, name: 'Pedro Santos', email: 'pedro@email.com', phone: '(11) 99999-0003', plan: 'Bronze', status: 'Overdue', lastCheckIn: '3 dias atrás', payment: 'Overdue', joinDate: '2023-01-10' },
                { id: 4, name: 'Ana Costa', email: 'ana@email.com', phone: '(11) 99999-0004', plan: 'Gold', status: 'Inactive', lastCheckIn: '1 mês atrás', payment: 'Paid', joinDate: '2022-11-05' },
                { id: 5, name: 'Lucas Lima', email: 'lucas@email.com', phone: '(11) 99999-0005', plan: 'Platinum', status: 'Active', lastCheckIn: 'Agora', payment: 'Paid', joinDate: '2023-08-15' },
            ]);
            setLoading(false);
        };
        loadData();
    }, []);

    // Stats
    const stats = {
        total: members.length,
        active: members.filter(m => m.status === 'Active').length,
        overdue: members.filter(m => m.status === 'Overdue').length
    };

    const filteredMembers = members
        .filter(m => {
            const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === 'Todos' || m.status === filterStatus;
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
        setSelectedMember(null);
        reset({ name: '', email: '', phone: '', plan: 'Bronze', status: 'Active' });
        setIsEditModalOpen(true);
    };

    const handleEdit = (member) => {
        setSelectedMember(member);
        reset(member);
        setIsEditModalOpen(true);
    };

    const handleDelete = (member) => {
        setDeleteModal({ open: true, member });
    };

    const confirmDelete = () => {
        setLoading(true);
        setTimeout(() => {
            setMembers(prev => prev.filter(m => m.id !== deleteModal.member.id));
            setDeleteModal({ open: false, member: null });
            setLoading(false);
            addToast('Membro removido com sucesso!', 'success');
        }, 500);
    };

    const onSubmit = (data) => {
        setLoading(true);
        setTimeout(() => {
            if (selectedMember) {
                setMembers(prev => prev.map(m => m.id === selectedMember.id ? { ...m, ...data } : m));
                addToast('Membro atualizado!', 'success');
            } else {
                setMembers(prev => [...prev, { ...data, id: Date.now(), lastCheckIn: 'Nunca', payment: 'Paid', joinDate: new Date().toISOString().split('T')[0] }]);
                addToast('Novo membro matriculado!', 'success');
            }
            setIsEditModalOpen(false);
            setLoading(false);
        }, 500);
    };

    const getPlanColors = (plan) => {
        switch (plan) {
            case 'Platinum': return 'from-cyan-600 to-blue-600';
            case 'Gold': return 'from-yellow-500 to-amber-600';
            case 'Silver': return 'from-slate-400 to-slate-500';
            default: return 'from-orange-700 to-orange-800';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-orange-950/20 to-zinc-950 text-white relative overflow-hidden p-8">
            {/* Header */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase italic relative inline-block">
                        Membros
                        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full" />
                    </h1>
                    <p className="text-zinc-400 mt-2 font-medium">Gerencie o esquadrão da sua academia</p>
                </div>
                <AnimatedButton
                    onClick={handleAdd}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/30 border border-white/10 font-bold uppercase tracking-wide group"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    Novo Aluno
                </AnimatedButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                <AnimatedCard className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 hover:bg-zinc-800/50 transition-colors group">
                    <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
                        <Users className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">Total</p>
                            <InfoTooltip content="Total de alunos matriculados" />
                        </div>
                        <h3 className="text-3xl font-black text-white">{stats.total}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 hover:bg-zinc-800/50 transition-colors group" delay={0.1}>
                    <div className="p-4 bg-green-500/10 text-green-400 rounded-2xl group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">Ativos</p>
                            <InfoTooltip content="Alunos com matrícula regular" />
                        </div>
                        <h3 className="text-3xl font-black text-white">{stats.active}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-zinc-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 hover:bg-zinc-800/50 transition-colors group" delay={0.2}>
                    <div className="p-4 bg-red-500/10 text-red-500 rounded-2xl group-hover:scale-110 transition-transform">
                        <XCircle className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">Pendentes</p>
                            <InfoTooltip content="Alunos com pagamentos atrasados" />
                        </div>
                        <h3 className="text-3xl font-black text-white">{stats.overdue}</h3>
                    </div>
                </AnimatedCard>
            </div>

            {/* List */}
            <div className="relative z-10 bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl p-6 md:p-8">
                {/* Filters */}
                <div className="flex flex-col xl:flex-row gap-4 justify-between items-center mb-8">
                    <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar por nome, email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-950/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder-zinc-600"
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                            <Filter className="w-5 h-5 text-zinc-500 hidden md:block" />
                            {['Todos', 'Active', 'Overdue', 'Inactive'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${filterStatus === status
                                            ? 'bg-orange-600 text-white border-orange-500'
                                            : 'bg-zinc-950/50 text-zinc-400 border-white/10 hover:bg-zinc-900'
                                        }`}
                                >
                                    {status === 'Todos' ? 'Todos' : status === 'Active' ? 'Ativos' : status === 'Overdue' ? 'Pendentes' : 'Inativos'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full xl:w-auto justify-end">
                        <select
                            value={sortBy}
                            onChange={(e) => handleSort(e.target.value)}
                            className="px-4 py-2 bg-zinc-950/50 border border-white/10 text-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                        >
                            <option value="name">Nome</option>
                            <option value="plan">Plano</option>
                            <option value="status">Status</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="p-2 bg-zinc-950/50 border border-white/10 rounded-xl hover:bg-zinc-900 text-zinc-300 transition-colors"
                        >
                            <ArrowUpDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SkeletonCard count={6} height="h-64" />
                    </div>
                ) : filteredMembers.length === 0 ? (
                    <EmptyState
                        icon={Users}
                        title="Nenhum aluno encontrado"
                        description="Tente ajustar os filtros ou adicione um novo aluno."
                        actionLabel="Novo Aluno"
                        onAction={handleAdd}
                        className="text-zinc-400"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredMembers.map((member, index) => (
                                <AnimatedCard
                                    key={member.id}
                                    delay={index * 0.05}
                                    className="group relative overflow-hidden bg-zinc-900 border border-white/5 rounded-2xl hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all flex flex-col"
                                >
                                    {/* Card Header with Plan Gradient */}
                                    <div className={`h-2 w-full bg-gradient-to-r ${getPlanColors(member.plan)}`} />

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <div className="w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center text-xl font-black text-white border-2 border-white/5 group-hover:border-white/20 transition-colors">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-zinc-900 ${member.status === 'Active' ? 'bg-green-500' :
                                                            member.status === 'Overdue' ? 'bg-red-500' : 'bg-zinc-500'
                                                        }`} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-lg leading-tight group-hover:text-orange-400 transition-colors">{member.name}</h3>
                                                    <p className="text-zinc-500 text-sm mt-0.5">{member.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            <div className="bg-zinc-950/50 p-3 rounded-xl border border-white/5">
                                                <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Plano</div>
                                                <div className="font-bold text-white">{member.plan}</div>
                                            </div>
                                            <div className="bg-zinc-950/50 p-3 rounded-xl border border-white/5">
                                                <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Status</div>
                                                <div className={`font-bold ${member.status === 'Active' ? 'text-green-400' :
                                                        member.status === 'Overdue' ? 'text-red-400' : 'text-zinc-400'
                                                    }`}>
                                                    {member.status === 'Active' ? 'Ativo' : member.status === 'Overdue' ? 'Pendente' : 'Inativo'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mt-auto">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-zinc-500 flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" /> Último Treino
                                                </span>
                                                <span className="text-zinc-300 font-medium">{member.lastCheckIn}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/5">
                                            <button
                                                onClick={() => setDetailsModal({ open: true, member })}
                                                className="py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex items-center justify-center"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(member)}
                                                className="py-2 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-600/20 transition-colors flex items-center justify-center"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(member)}
                                                className="py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/20 transition-colors flex items-center justify-center"
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
                title={selectedMember ? 'Editar Guerreiro' : 'Novo Aluno'}
                size="md"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-zinc-800">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1">Nome Completo</label>
                        <input {...register('name', { required: true })} className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-zinc-50" placeholder="Ex: Carlos Silva" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-1">Email</label>
                            <input {...register('email')} className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 bg-zinc-50" placeholder="email@exemplo.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-1">Telefone</label>
                            <input {...register('phone')} className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 bg-zinc-50" placeholder="(00) 00000-0000" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-1">Plano</label>
                            <select {...register('plan')} className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-zinc-50">
                                <option value="Bronze">Bronze</option>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
                                <option value="Platinum">Platinum</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-1">Status</label>
                            <select {...register('status')} className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-zinc-50">
                                <option value="Active">Ativo</option>
                                <option value="Inactive">Inativo</option>
                                <option value="Overdue">Pendente</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-zinc-100 mt-4">
                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-zinc-600 font-bold hover:bg-zinc-100 rounded-lg mr-2">Cancelar</button>
                        <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-shadow">Salvar Alterações</button>
                    </div>
                </form>
            </Modal>

            {/* Details Modal */}
            {detailsModal.member && (
                <Modal
                    isOpen={detailsModal.open}
                    onClose={() => setDetailsModal({ open: false, member: null })}
                    title={`Detalhes - ${detailsModal.member.name}`}
                    size="lg"
                >
                    <div className="space-y-6 text-zinc-800">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                                <div className="text-sm text-orange-600 font-bold mb-1">Status</div>
                                <div className="text-xl font-black text-orange-700">{detailsModal.member.status}</div>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                <div className="text-sm text-blue-600 font-bold mb-1">Plano</div>
                                <div className="text-xl font-black text-blue-700">{detailsModal.member.plan}</div>
                            </div>
                            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                                <div className="text-sm text-zinc-600 font-bold mb-1">Desde</div>
                                <div className="text-xl font-black text-zinc-700">{new Date(detailsModal.member.joinDate).toLocaleDateString('pt-BR')}</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-3 border-b border-zinc-100">
                                <span className="font-bold text-zinc-600 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Email
                                </span>
                                <span className="text-zinc-900">{detailsModal.member.email}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-zinc-100">
                                <span className="font-bold text-zinc-600 flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> Telefone
                                </span>
                                <span className="text-zinc-900">{detailsModal.member.phone}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-zinc-100">
                                <span className="font-bold text-zinc-600 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" /> Pagamento
                                </span>
                                <span className="text-zinc-900">{detailsModal.member.payment}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 pt-4">
                                <span className="font-bold text-zinc-600 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Último Check-in
                                </span>
                                <span className="bg-zinc-100 px-3 py-1 rounded-lg font-mono text-sm text-zinc-600">{detailsModal.member.lastCheckIn}</span>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            <ConfirmDialog
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, member: null })}
                onConfirm={confirmDelete}
                title="Excluir Guerreiro"
                description={`Tem certeza que deseja remover ${deleteModal.member?.name}? Esta ação não pode ser desfeita.`}
                confirmLabel="Sim, Excluir"
                variant="danger"
            />
        </div>
    );
}
