import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Scissors,
    Sparkles,
    Clock,
    DollarSign,
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    TrendingUp,
    Star,
    Palette,
    X,
    Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Modal from '../../components/ui/Modal';
import { InfoTooltip } from '../../components/ui/Tooltip';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import PieChart from '../../components/charts/PieChart';
import AnimatedCard, { AnimatedButton } from '../../components/ui/AnimatedCard';
import { useToast } from '../../components/ui/Toast';

export default function Services() {
    const { addToast } = useToast();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Todos');

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Mock Data
    const [services, setServices] = useState([
        { id: 1, name: 'Corte Feminino', category: 'Cabelo', price: 80, duration: 60, popular: true, description: 'Corte completo com lavagem e finalização.' },
        { id: 2, name: 'Manicure Completa', category: 'Unhas', price: 45, duration: 45, popular: true, description: 'Cutilagem e esmaltação.' },
        { id: 3, name: 'Coloração Global', category: 'Coloração', price: 250, duration: 120, popular: false, description: 'Tintura completa.' },
        { id: 4, name: 'Design de Sobrancelhas', category: 'Estética', price: 35, duration: 30, popular: true, description: 'Modelagem com pinça ou linha.' },
        { id: 5, name: 'Pedicure', category: 'Unhas', price: 45, duration: 45, popular: false, description: 'Cutilagem e esmaltação dos pés.' },
        { id: 6, name: 'Hidratação Profunda', category: 'Cabelo', price: 120, duration: 45, popular: false, description: 'Tratamento intensivo para fios danificados.' },
    ]);

    const categories = ['Todos', 'Cabelo', 'Unhas', 'Estética', 'Coloração'];

    // Stats
    const stats = {
        totalServices: services.length,
        mostPopular: services.filter(s => s.popular).length,
        avgPrice: (services.reduce((acc, curr) => acc + curr.price, 0) / services.length).toFixed(2)
    };

    // Filter Logic
    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'Todos' || service.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Handlers
    const handleAdd = () => {
        setSelectedService(null);
        reset({ name: '', category: 'Cabelo', price: '', duration: '' });
        setIsEditModalOpen(true);
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        reset(service);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (service) => {
        setSelectedService(service);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setServices(services.filter(s => s.id !== selectedService.id));
        setIsDeleteModalOpen(false);
        addToast('Serviço removido com sucesso!', 'success');
    };

    const onSubmit = (data) => {
        if (selectedService) {
            // Edit
            setServices(services.map(s => s.id === selectedService.id ? { ...s, ...data, price: Number(data.price), duration: Number(data.duration) } : s));
            addToast('Serviço atualizado!', 'success');
        } else {
            // Add
            setServices([...services, { ...data, id: Date.now(), price: Number(data.price), duration: Number(data.duration), popular: false }]);
            addToast('Novo serviço criado!', 'success');
        }
        setIsEditModalOpen(false);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Serviços</h1>
                    <p className="text-gray-500 mt-1">Gerencie o catálogo de serviços do seu salão</p>
                </div>
                <AnimatedButton
                    onClick={handleAdd}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-rose-500/30"
                >
                    <Plus className="w-5 h-5" />
                    Novo Serviço
                </AnimatedButton>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatedCard className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                        <Scissors className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total de Serviços</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.totalServices}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4" delay={0.1}>
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                        <Star className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Populares</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.mostPopular}</h3>
                    </div>
                </AnimatedCard>

                <AnimatedCard className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4" delay={0.2}>
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Preço Médio</p>
                        <h3 className="text-2xl font-bold text-gray-900">R$ {stats.avgPrice}</h3>
                    </div>
                </AnimatedCard>
            </div>

            {/* Filters & Content */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar serviços..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${categoryFilter === cat
                                        ? 'bg-rose-50 text-rose-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List */}
                <div className="p-6">
                    {filteredServices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredServices.map((service, index) => (
                                    <AnimatedCard
                                        key={service.id}
                                        className="group relative bg-white border border-gray-100 rounded-xl p-5 hover:border-rose-200 transition-colors"
                                        delay={index * 0.05}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-rose-50 transition-colors">
                                                <Palette className="w-5 h-5 text-gray-400 group-hover:text-rose-500" />
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleEdit(service)}
                                                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(service)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{service.category} • {service.description}</p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                            <div className="flex items-center gap-1.5 text-gray-600">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-sm font-medium">{service.duration} min</span>
                                            </div>
                                            <div className="text-lg font-bold text-rose-600">
                                                R$ {service.price}
                                            </div>
                                        </div>
                                    </AnimatedCard>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <EmptyState
                            icon={Scissors}
                            title="Nenhum serviço encontrado"
                            description="Tente ajustar sua busca ou filtros."
                            actionLabel="Criar Serviço"
                            onAction={handleAdd}
                        />
                    )}
                </div>
            </div>

            {/* Edit/Create Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title={selectedService ? `Editar ${selectedService.name}` : "Novo Serviço"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Serviço</label>
                        <input
                            {...register('name', { required: true })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="Ex: Corte Bordado"
                        />
                        {errors.name && <span className="text-xs text-red-500">Obrigatório</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                            <select
                                {...register('category')}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                            >
                                {categories.filter(c => c !== 'Todos').map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                            <input
                                type="number"
                                {...register('price', { required: true, min: 0 })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duração (min)</label>
                            <input
                                type="number"
                                {...register('duration', { required: true, min: 15, step: 15 })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                            />
                        </div>
                        <div className="flex items-center mt-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-rose-600 focus:ring-rose-500" {...register('popular')} />
                                <span className="text-sm font-medium text-gray-700">Destacar como Popular</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                            placeholder="Detalhes do serviço..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-rose-500/30"
                        >
                            {selectedService ? 'Salvar Alterações' : 'Criar Serviço'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Excluir serviço?"
                description={`Tem certeza que deseja excluir "${selectedService?.name}"? Esta ação não pode ser desfeita.`}
                confirmLabel="Sim, excluir"
                cancelLabel="Cancelar"
                variant="danger"
            />
        </div>
    );
}
