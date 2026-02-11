import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    CreditCard,
    Calendar,
    Check,
    Plus,
    Edit,
    Trash2,
    Star,
    Users
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import Modal from '../../components/ui/Modal';
import { AnimatedButton } from '../../components/ui/AnimatedCard';
import AnimatedCard from '../../components/ui/AnimatedCard';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { useToast } from '../../components/ui/Toast';

export default function MembershipPlans() {
    const { addToast } = useToast();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    const [plans, setPlans] = useState([
        { id: 1, name: 'Bronze', price: 99, period: 'Mensal', benefits: ['Acesso à musculação', 'Horário livre'], members: 145, color: 'bg-orange-100 text-orange-700' },
        { id: 2, name: 'Silver', price: 159, period: 'Mensal', benefits: ['Musculação + Aulas', 'Horário livre', 'Sem taxa de matricula'], members: 230, popular: true, color: 'bg-gray-200 text-gray-700' },
        { id: 3, name: 'Gold', price: 199, period: 'Mensal', benefits: ['Tudo incluso', 'Acesso 24h', 'Personal Trainer 1x/mês', 'Convidados ilimitados'], members: 89, color: 'bg-yellow-100 text-yellow-700' },
    ]);

    const handleAdd = () => {
        setSelectedPlan(null);
        reset({ name: '', price: '', period: 'Mensal', benefits: '' });
        setIsEditModalOpen(true);
    };

    const handleEdit = (plan) => {
        setSelectedPlan(plan);
        reset({ ...plan, benefits: plan.benefits.join('\n') });
        setIsEditModalOpen(true);
    };

    const handleDelete = (plan) => {
        setSelectedPlan(plan);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setPlans(plans.filter(p => p.id !== selectedPlan.id));
        setIsDeleteModalOpen(false);
        addToast('Plano removido!', 'success');
    };

    const onSubmit = (data) => {
        const benefitsArray = data.benefits.split('\n').filter(b => b.trim());
        const planData = {
            ...data,
            price: Number(data.price),
            benefits: benefitsArray,
            members: selectedPlan ? selectedPlan.members : 0,
            color: 'bg-gray-100 text-gray-700'
        };

        if (selectedPlan) {
            setPlans(plans.map(p => p.id === selectedPlan.id ? { ...p, ...planData, id: p.id, color: p.color } : p));
            addToast('Plano atualizado!', 'success');
        } else {
            setPlans([...plans, { ...planData, id: Date.now() }]);
            addToast('Novo plano criado!', 'success');
        }
        setIsEditModalOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Planos</h1>
                    <p className="text-gray-500 mt-1">Configure as opções de assinatura</p>
                </div>
                <AnimatedButton
                    onClick={handleAdd}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-orange-500/30"
                >
                    <Plus className="w-5 h-5" />
                    Novo Plano
                </AnimatedButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {plans.map((plan, index) => (
                        <AnimatedCard
                            key={plan.id}
                            delay={index * 0.1}
                            className={`relative bg-white border-2 rounded-2xl p-6 hover:shadow-xl transition-all ${plan.popular ? 'border-orange-500 shadow-orange-100' : 'border-gray-100'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" />
                                    MAIS POPULAR
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                        <Users className="w-4 h-4" />
                                        {plan.members} assinantes
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-lg text-sm font-bold ${plan.color}`}>
                                    R$ {plan.price}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {plan.benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        {benefit}
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleEdit(plan)}
                                    className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(plan)}
                                    className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </AnimatedCard>
                    ))}
                </AnimatePresence>
            </div>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title={selectedPlan ? 'Editar Plano' : 'Novo Plano'}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Plano</label>
                        <input {...register('name', { required: true })} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                            <input type="number" {...register('price', { required: true })} className="w-full p-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                            <select {...register('period')} className="w-full p-2 border rounded-lg">
                                <option value="Mensal">Mensal</option>
                                <option value="Trimestral">Trimestral</option>
                                <option value="Anual">Anual</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Benefícios (um por linha)</label>
                        <textarea {...register('benefits')} rows={4} className="w-full p-2 border rounded-lg" placeholder="Acesso total..." />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">Salvar</button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Excluir Plano"
                description="Tem certeza? Membros neste plano precisarão ser migrados."
            />
        </div>
    );
}
