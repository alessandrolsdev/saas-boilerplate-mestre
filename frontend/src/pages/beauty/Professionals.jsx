import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    User,
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
    Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';
import { useToast } from '../../components/ui/Toast';

export default function Professionals() {
    const { addToast } = useToast();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Mock Data
    const [professionals, setProfessionals] = useState([
        { id: 1, name: 'Ana Silva', specialty: 'Hairstylist', rating: 4.9, appointments: 124, status: 'Active' },
        { id: 2, name: 'Beatriz Costa', specialty: 'Manicure', rating: 4.8, appointments: 98, status: 'Active' },
        { id: 3, name: 'Carla Dias', specialty: 'Colorista', rating: 5.0, appointments: 156, status: 'Active' },
        { id: 4, name: 'Daniela Lima', specialty: 'Esteticista', rating: 4.7, appointments: 87, status: 'Away' },
    ]);

    // Stats
    const stats = {
        total: professionals.length,
        active: professionals.filter(p => p.status === 'Active').length,
        avgRating: 4.85
    };

    const filteredProfessionals = professionals.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    const handleDeleteClick = (prof) => {
        setSelectedProfessional(prof);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setProfessionals(prev => prev.filter(p => p.id !== selectedProfessional.id));
        setIsDeleteModalOpen(false);
        addToast('Profissional removido com sucesso!', 'success');
    };

    const onSubmit = (data) => {
        if (selectedProfessional) {
            setProfessionals(prev => prev.map(p => p.id === selectedProfessional.id ? { ...p, ...data } : p));
            addToast('Perfil atualizado com sucesso!', 'success');
        } else {
            setProfessionals(prev => [...prev, { ...data, id: Date.now(), rating: 5.0, appointments: 0 }]);
            addToast('Profissional adicionado!', 'success');
        }
        setIsEditModalOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Equipe</h1>
                    <p className="text-gray-500 mt-1">Gerencie seus profissionais e especialistas</p>
                </div>
                <AnimatedButton
                    onClick={handleAdd}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-rose-500/30"
                >
                    <Plus className="w-5 h-5" />
                    Adicionar Profissional
                </AnimatedButton>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou especialidade..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-96 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredProfessionals.map((prof, index) => (
                            <AnimatedCard
                                key={prof.id}
                                className="border border-gray-100 rounded-xl p-6 flex flex-col gap-4 hover:border-rose-200 transition-all bg-gradient-to-br from-white to-gray-50/50"
                                delay={index * 0.1}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-lg">
                                            {prof.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{prof.name}</h3>
                                            <p className="text-sm text-gray-500">{prof.specialty}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${prof.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {prof.status === 'Active' ? 'Disponível' : 'Ausente'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="text-gray-900 font-bold">{prof.rating}</span>
                                        </div>
                                        <p className="text-xs text-gray-400">Avaliação</p>
                                    </div>
                                    <div className="text-center border-l border-gray-100">
                                        <div className="flex items-center justify-center gap-1 text-rose-500 mb-1">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-gray-900 font-bold">{prof.appointments}</span>
                                        </div>
                                        <p className="text-xs text-gray-400">Agendamentos</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-auto">
                                    <button
                                        onClick={() => handleEdit(prof)}
                                        className="flex-1 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Editar Perfil
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(prof)}
                                        className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </AnimatedCard>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title={selectedProfessional ? "Editar Profissional" : "Novo Profissional"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                        <input {...register('name', { required: true })} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                            <input {...register('specialty', { required: true })} className="w-full p-2 border rounded-lg" placeholder="Ex: Manicure" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select {...register('status')} className="w-full p-2 border rounded-lg">
                                <option value="Active">Disponível</option>
                                <option value="Away">Ausente/Férias</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700">Salvar</button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Remover Profissional"
                description="Tem certeza? Isso não pode ser desfeito."
            />
        </div>
    );
}
