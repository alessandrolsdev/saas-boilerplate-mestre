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
    Users,
    Zap,
    Trophy,
    Crown,
    CheckCircle2
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import Modal from '../../components/ui/Modal';
import { AnimatedButton } from '../../components/ui/AnimatedCard';
import AnimatedCard from '../../components/ui/AnimatedCard';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { useToast } from '../../components/ui/Toast';
import EmptyState from '../../components/ui/EmptyState';
import { InfoTooltip } from '../../components/ui/Tooltip';

export default function MembershipPlans() {
    const { addToast } = useToast();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    const [plans, setPlans] = useState([
        { id: 1, name: 'Bronze', price: 99, period: 'Mensal', benefits: ['Acesso à musculação', 'Horário livre'], members: 145, icon: Zap, color: 'text-orange-400', gradient: 'from-orange-500/10 to-transparent' },
        { id: 2, name: 'Silver', price: 159, period: 'Mensal', benefits: ['Musculação + Aulas', 'Horário livre', 'Sem taxa de matricula'], members: 230, popular: true, icon: Star, color: 'text-slate-300', gradient: 'from-slate-500/10 to-transparent' },
        { id: 3, name: 'Gold', price: 199, period: 'Mensal', benefits: ['Tudo incluso', 'Acesso 24h', 'Personal Trainer 1x/mês', 'Convidados ilimitados'], members: 89, icon: Crown, color: 'text-yellow-400', gradient: 'from-yellow-500/10 to-transparent' },
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
            icon: Zap, // Default icon
            color: 'text-white', // Default color
            gradient: 'from-slate-500/10 to-transparent'
        };

        if (selectedPlan) {
            setPlans(plans.map(p => p.id === selectedPlan.id ? { ...p, ...planData, id: p.id, icon: p.icon, color: p.color, gradient: p.gradient } : p));
            addToast('Plano atualizado!', 'success');
        } else {
            setPlans([...plans, { ...planData, id: Date.now() }]);
            addToast('Novo plano criado!', 'success');
        }
        setIsEditModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-orange-950/20 to-zinc-950 text-white relative overflow-hidden p-8">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase italic relative inline-block">
                        Planos
                        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full" />
                    </h1>
                    <p className="text-zinc-400 mt-2 font-medium">Configure as assinaturas e benefícios</p>
                </div>
                <AnimatedButton
                    onClick={handleAdd}
                    className="bg-zinc-900 border border-white/10 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-zinc-800 transition-colors font-bold shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Novo Plano
                </AnimatedButton>
            </div>

            {plans.length === 0 ? (
                <EmptyState icon={Trophy} title="Nenhum plano ativo" actionLabel="Criar Plano" onAction={handleAdd} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    <AnimatePresence>
                        {plans.map((plan, index) => {
                            const Icon = plan.icon;
                            return (
                                <AnimatedCard
                                    key={plan.id}
                                    delay={index * 0.1}
                                    className={`relative bg-zinc-900/50 backdrop-blur-xl border-2 rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300 group overflow-hidden ${plan.popular ? 'border-orange-500 shadow-2xl shadow-orange-500/20' : 'border-white/5 shadow-xl'}`}
                                >
                                    {/* Gradient Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                                    {plan.popular && (
                                        <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-red-600 text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-bl-xl shadow-lg flex items-center gap-1 z-20">
                                            <Star className="w-3 h-3 fill-current" />
                                            Popular
                                        </div>
                                    )}

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`p-3 rounded-2xl bg-zinc-950/50 border border-white/10 ${plan.color}`}>
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-black text-white">R$ {plan.price}</div>
                                                <div className="text-xs text-zinc-500 uppercase font-bold tracking-wide">/ {plan.period}</div>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">{plan.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-zinc-400 mt-2 bg-zinc-950/30 w-fit px-3 py-1 rounded-full border border-white/5">
                                                <Users className="w-4 h-4" />
                                                <span className="font-bold">{plan.members}</span> assinantes ativos
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-8 min-h-[160px]">
                                            {plan.benefits.map((benefit, i) => (
                                                <div key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                                    <div className="mt-0.5 p-0.5 rounded-full bg-green-500/20 text-green-400 shrink-0">
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                    <span className="font-medium">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-4 gap-2 pt-6 border-t border-white/5">
                                            <button
                                                onClick={() => handleEdit(plan)}
                                                className="col-span-3 py-3 text-sm font-bold text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/5 uppercase tracking-wide group-hover:border-white/20"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Editar Plano
                                            </button>
                                            <button
                                                onClick={() => handleDelete(plan)}
                                                className="col-span-1 p-3 text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors flex items-center justify-center border border-red-500/20"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </AnimatedCard>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title={selectedPlan ? 'Editar Plano' : 'Novo Plano'}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1">Nome do Plano</label>
                        <input {...register('name', { required: true })} className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 bg-zinc-50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-1">Preço (R$)</label>
                            <input type="number" {...register('price', { required: true })} className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 bg-zinc-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-1">Período</label>
                            <select {...register('period')} className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 bg-zinc-50">
                                <option value="Mensal">Mensal</option>
                                <option value="Trimestral">Trimestral</option>
                                <option value="Anual">Anual</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1">Benefícios (um por linha)</label>
                        <textarea {...register('benefits')} rows={4} className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-orange-500 bg-zinc-50" placeholder="Acesso total..." />
                    </div>

                    <div className="flex justify-end pt-4 border-t border-zinc-100 mt-4">
                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-zinc-600 font-bold hover:bg-zinc-100 rounded-lg mr-2">Cancelar</button>
                        <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-700 shadow-lg shadow-orange-500/30">Salvar</button>
                    </div>
                </form>
            </Modal>

            <ConfirmDialog
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Excluir Plano"
                description="Tem certeza? Membros neste plano precisarão ser migrados."
                variant="danger"
            />
        </div>
    );
}
