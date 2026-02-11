import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    User,
    Users,
    Dumbbell,
    Calendar,
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Plus,
    CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Modal from '../../components/ui/Modal';
import { AnimatedButton } from '../../components/ui/AnimatedCard';
import AnimatedCard from '../../components/ui/AnimatedCard';
import { useToast } from '../../components/ui/Toast';
import MemberCard from '../../components/gym/MemberCard';

export default function Members() {
    const { addToast } = useToast();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');

    const { register, handleSubmit, reset } = useForm();

    // Mock Data
    const [members, setMembers] = useState([
        { id: 1, name: 'João Silva', plan: 'Gold', status: 'Active', lastCheckIn: 'Hoje, 09:30', payment: 'Paid' },
        { id: 2, name: 'Maria Souza', plan: 'Silver', status: 'Active', lastCheckIn: 'Ontem, 18:00', payment: 'Paid' },
        { id: 3, name: 'Pedro Santos', plan: 'Bronze', status: 'Overdue', lastCheckIn: '3 dias atrás', payment: 'Overdue' },
        { id: 4, name: 'Ana Costa', plan: 'Gold', status: 'Inactive', lastCheckIn: '1 mês atrás', payment: 'Paid' },
    ]);

    // Stats
    const stats = {
        total: members.length,
        active: members.filter(m => m.status === 'Active').length,
        overdue: members.filter(m => m.status === 'Overdue').length
    };

    const filteredMembers = members.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'Todos' || m.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const handleAdd = () => {
        setSelectedMember(null);
        reset({ name: '', plan: 'Bronze', status: 'Active' });
        setIsEditModalOpen(true);
    };

    const handleEdit = (member) => {
        setSelectedMember(member);
        reset(member);
        setIsEditModalOpen(true);
    };

    const onSubmit = (data) => {
        if (selectedMember) {
            setMembers(prev => prev.map(m => m.id === selectedMember.id ? { ...m, ...data } : m));
            addToast('Membro atualizado!', 'success');
        } else {
            setMembers(prev => [...prev, { ...data, id: Date.now(), lastCheckIn: 'Nunca', payment: 'Paid' }]);
            addToast('Novo membro matriculado!', 'success');
        }
        setIsEditModalOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Membros</h1>
                    <p className="text-gray-500 mt-1">Gerencie os alunos da academia</p>
                </div>
                <AnimatedButton
                    onClick={handleAdd}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-orange-500/30"
                >
                    <Plus className="w-5 h-5" />
                    Novo Aluno
                </AnimatedButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatedCard className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total de Alunos</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4" delay={0.1}>
                    <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Ativos</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4" delay={0.2}>
                    <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                        <XCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Inadimplentes</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.overdue}</h3>
                    </div>
                </AnimatedCard>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar alunos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="p-2 border rounded-lg bg-gray-50"
                    >
                        <option value="Todos">Todos os Status</option>
                        <option value="Active">Ativos</option>
                        <option value="Inactive">Inativos</option>
                        <option value="Overdue">Inadimplentes</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <AnimatePresence>
                        {filteredMembers.map((member, index) => (
                            <AnimatedCard
                                key={member.id}
                                delay={index * 0.05}
                                className="border border-gray-100 p-4 rounded-xl hover:border-orange-200 transition-all cursor-pointer group"
                                onClick={() => handleEdit(member)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                                {member.name}
                                            </h3>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${member.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                    member.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                                                        'bg-gray-100 text-gray-600'
                                                }`}>
                                                {member.status === 'Active' ? 'Ativo' : member.status === 'Overdue' ? 'Pendente' : 'Inativo'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Dumbbell className="w-3.5 h-3.5" />
                                                {member.plan}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                Último treino: {member.lastCheckIn}
                                            </span>
                                        </div>
                                    </div>
                                    <MoreVertical className="text-gray-400" />
                                </div>
                            </AnimatedCard>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title={selectedMember ? 'Editar Aluno' : 'Novo Aluno'}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                        <input {...register('name', { required: true })} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plano</label>
                            <select {...register('plan')} className="w-full p-2 border rounded-lg">
                                <option value="Bronze">Bronze</option>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select {...register('status')} className="w-full p-2 border rounded-lg">
                                <option value="Active">Ativo</option>
                                <option value="Inactive">Inativo</option>
                                <option value="Overdue">Pendente</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">Salvar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
