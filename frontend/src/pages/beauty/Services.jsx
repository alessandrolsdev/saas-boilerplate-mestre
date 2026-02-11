import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Sparkles,
    Search,
    Filter,
    Clock,
    DollarSign,
    MoreVertical,
    Plus,
    Edit,
    Trash2,
    Eye,
    ArrowUpDown,
    CheckCircle2
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';
import { useToast } from '../../components/ui/Toast';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { InfoTooltip } from '../../components/ui/Tooltip';

export default function Services() {
    const { addToast } = useToast();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [detailsModal, setDetailsModal] = useState({ open: false, service: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, service: null });

    const [selectedService, setSelectedService] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, reset } = useForm();
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Simulate API
        const loadData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            setServices([
                { id: 1, name: 'Corte de Cabelo', duration: '60 min', price: 150.00, category: 'Cabelo', description: 'Corte completo com lavagem e finalização.' },
                { id: 2, name: 'Manicure', duration: '45 min', price: 60.00, category: 'Unhas', description: 'Cutilagem e esmaltação.' },
                { id: 3, name: 'Pedicure', duration: '45 min', price: 70.00, category: 'Unhas', description: 'Cutilagem e esmaltação dos pés.' },
                { id: 4, name: 'Hidratação Profunda', duration: '90 min', price: 200.00, category: 'Cabelo', description: 'Tratamento intensivo para recuperação dos fios.' },
                { id: 5, name: 'Massagem Relaxante', duration: '60 min', price: 180.00, category: 'Corporal', description: 'Massagem corporal completa com óleos essenciais.' },
            ]);
            setLoading(false);
        };
        loadData();
    }, []);

    const filteredServices = services
        .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.category.toLowerCase().includes(searchTerm.toLowerCase()))
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
        setSelectedService(null);
        reset({ name: '', duration: '', price: '', category: '', description: '' });
        setIsEditModalOpen(true);
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        reset(service);
        setIsEditModalOpen(true);
    };

    const handleDelete = (service) => {
        setDeleteModal({ open: true, service });
    };

    const confirmDelete = () => {
        setLoading(true);
        setTimeout(() => {
            setServices(prev => prev.filter(s => s.id !== deleteModal.service.id));
            setDeleteModal({ open: false, service: null });
            setLoading(false);
            addToast('Serviço removido com sucesso!', 'success');
        }, 500);
    };

    const onSubmit = (data) => {
        setLoading(true);
        setTimeout(() => {
            if (selectedService) {
                setServices(prev => prev.map(s => s.id === selectedService.id ? { ...s, ...data, price: parseFloat(data.price) } : s));
                addToast('Serviço atualizado!', 'success');
            } else {
                setServices(prev => [...prev, { ...data, id: Date.now(), price: parseFloat(data.price) }]);
                addToast('Novo serviço criado!', 'success');
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
                        Serviços
                        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full" />
                    </h1>
                    <p className="text-slate-400 mt-2 font-medium">Catálogo de procedimentos e tratamentos</p>
                </div>
                <AnimatedButton
                    onClick={handleAdd}
                    className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-rose-500/30 border border-white/10 font-bold uppercase tracking-wide group"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    Novo Serviço
                </AnimatedButton>
            </div>

            {/* List */}
            <div className="relative z-10 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl p-6 md:p-8">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-rose-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar serviços..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all placeholder-slate-600"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                        <select
                            value={sortBy}
                            onChange={(e) => handleSort(e.target.value)}
                            className="px-4 py-2 bg-slate-950/50 border border-white/10 text-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                        >
                            <option value="name">Nome</option>
                            <option value="price">Preço</option>
                            <option value="category">Categoria</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="p-2 bg-slate-950/50 border border-white/10 rounded-xl hover:bg-slate-900 text-slate-300 transition-colors"
                        >
                            <ArrowUpDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        <SkeletonCard count={5} height="h-20" />
                    </div>
                ) : filteredServices.length === 0 ? (
                    <EmptyState
                        icon={Sparkles}
                        title="Nenhum serviço encontrado"
                        description="Adicione serviços para começar a agendar."
                        actionLabel="Criar Serviço"
                        onAction={handleAdd}
                        className="text-slate-400"
                    />
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {filteredServices.map((service, index) => (
                                <AnimatedCard
                                    key={service.id}
                                    delay={index * 0.05}
                                    className="group relative overflow-hidden bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 hover:border-rose-500/30 transition-all"
                                >
                                    <div className="w-full md:w-auto flex items-center gap-4 flex-1">
                                        <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400 border border-rose-500/20 group-hover:bg-rose-500/20 transition-colors">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{service.name}</h3>
                                            <p className="text-slate-500 text-sm hidden md:block">{service.description}</p>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto flex items-center justify-between gap-8">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs text-slate-500 font-bold uppercase">Categoria</span>
                                            <span className="text-slate-300 font-medium px-2 py-0.5 rounded-full bg-slate-800 border border-white/5">{service.category}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs text-slate-500 font-bold uppercase">Duração</span>
                                            <span className="text-slate-300 font-medium flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {service.duration}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end min-w-[80px]">
                                            <span className="text-xs text-slate-500 font-bold uppercase">Valor</span>
                                            <span className="text-emerald-400 font-black text-lg">R$ {service.price.toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setDetailsModal({ open: true, service })}
                                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(service)}
                                                className="p-2 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-600/20 transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(service)}
                                                className="p-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/20 transition-colors"
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
                title={selectedService ? "Editar Serviço" : "Novo Serviço"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Nome do Serviço</label>
                        <input {...register('name', { required: true })} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 bg-slate-50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Preço (R$)</label>
                            <input {...register('price', { required: true })} type="number" step="0.01" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 bg-slate-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Duração</label>
                            <input {...register('duration', { required: true })} placeholder="Ex: 60 min" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 bg-slate-50" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Categoria</label>
                        <select {...register('category', { required: true })} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 bg-slate-50">
                            <option value="Cabelo">Cabelo</option>
                            <option value="Unhas">Unhas</option>
                            <option value="Maquiagem">Maquiagem</option>
                            <option value="Corporal">Corporal</option>
                            <option value="Depilação">Depilação</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Descrição</label>
                        <textarea {...register('description')} rows={3} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 bg-slate-50" />
                    </div>
                    <div className="flex justify-end pt-4 border-t border-slate-100 mt-4">
                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg mr-2">Cancelar</button>
                        <button type="submit" className="bg-rose-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-rose-700 shadow-lg shadow-rose-500/30">Salvar</button>
                    </div>
                </form>
            </Modal>

            {/* Details Modal */}
            {detailsModal.service && (
                <Modal
                    isOpen={detailsModal.open}
                    onClose={() => setDetailsModal({ open: false, service: null })}
                    title={`Detalhes - ${detailsModal.service.name}`}
                    size="md"
                >
                    <div className="space-y-6 text-slate-800">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                <div className="text-sm text-emerald-600 font-bold mb-1">Preço</div>
                                <div className="text-2xl font-black text-emerald-700">R$ {detailsModal.service.price.toFixed(2)}</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <div className="text-sm text-slate-600 font-bold mb-1">Duração</div>
                                <div className="text-2xl font-black text-slate-700">{detailsModal.service.duration}</div>
                            </div>
                        </div>

                        <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                            <span className="text-sm font-bold text-rose-600 block mb-1">Categoria</span>
                            <span className="text-lg font-bold text-rose-800">{detailsModal.service.category}</span>
                        </div>

                        <div>
                            <span className="text-sm font-bold text-slate-600 block mb-2">Descrição</span>
                            <p className="text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">{detailsModal.service.description}</p>
                        </div>
                    </div>
                </Modal>
            )}

            <ConfirmDialog
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, service: null })}
                onConfirm={confirmDelete}
                title="Remover Serviço"
                description="Tem certeza? Isso não pode ser desfeito."
                variant="danger"
            />
        </div>
    );
}
