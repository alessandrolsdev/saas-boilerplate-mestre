import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Check,
    X,
    Zap,
    Crown,
    Dumbbell,
    Users,
    Calendar,
    TrendingUp,
    Sparkles,
    Star
} from 'lucide-react';
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '../../components/layout/PageTransition';

/**
 * Plans Component - GymMaster
 * 
 * Página de planos com comparação de features e call-to-action.
 */
export default function Plans() {
    const [billingCycle, setBillingCycle] = useState('monthly'); // monthly | annual

    const plans = [
        {
            id: 'basic',
            name: 'Básico',
            tagline: 'Para iniciantes',
            icon: Dumbbell,
            color: 'from-slate-600 to-gray-700',
            borderColor: 'border-slate-400',
            price: {
                monthly: 79,
                annual: 790 // ~67/mês
            },
            features: [
                { name: 'Acesso ilimitado à academia', included: true },
                { name: 'Treinos personalizados', included: true },
                { name: 'App de acompanhamento', included: true },
                { name: '1 aula coletiva por semana', included: true },
                { name: 'Avaliação física mensal', included: false },
                { name: 'Nutricionista', included: false },
                { name: 'Personal trainer', included: false },
                { name: 'Acesso a outras unidades', included: false }
            ],
            cta: 'Começar Agora',
            popular: false
        },
        {
            id: 'premium',
            name: 'Premium',
            tagline: 'O mais popular',
            icon: Star,
            color: 'from-orange-500 to-red-600',
            borderColor: 'border-orange-500',
            price: {
                monthly: 149,
                annual: 1490 // ~124/mês
            },
            features: [
                { name: 'Acesso ilimitado à academia', included: true },
                { name: 'Treinos personalizados', included: true },
                { name: 'App de acompanhamento', included: true },
                { name: 'Aulas coletivas ilimitadas', included: true },
                { name: 'Avaliação física mensal', included: true },
                { name: 'Consultoria nutricional', included: true },
                { name: '2 sessões de personal/mês', included: true },
                { name: 'Acesso a outras unidades', included: false }
            ],
            cta: 'Assinar Premium',
            popular: true
        },
        {
            id: 'vip',
            name: 'VIP Black',
            tagline: 'Experiência completa',
            icon: Crown,
            color: 'from-yellow-500 via-amber-500 to-orange-600',
            borderColor: 'border-yellow-500',
            price: {
                monthly: 299,
                annual: 2990 // ~249/mês
            },
            features: [
                { name: 'Acesso ilimitado à academia', included: true },
                { name: 'Treinos 100% personalizados', included: true },
                { name: 'App Premium + Wearables', included: true },
                { name: 'Todas as aulas coletivas', included: true },
                { name: 'Avaliação física semanal', included: true },
                { name: 'Nutricionista dedicado', included: true },
                { name: 'Personal trainer ilimitado', included: true },
                { name: 'Acesso global a todas unidades', included: true }
            ],
            cta: 'Ir para VIP',
            popular: false
        }
    ];

    const calculateSavings = (plan) => {
        const monthlyTotal = plan.price.monthly * 12;
        const annualTotal = plan.price.annual;
        const savings = monthlyTotal - annualTotal;
        const percentage = ((savings / monthlyTotal) * 100).toFixed(0);
        return { savings, percentage };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950 py-16 px-6">
            {/* Header */}
            <FadeInWhenVisible>
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <Link
                        to="/gym/dashboard"
                        className="inline-block mb-6 text-orange-400 hover:text-orange-300 transition-colors font-semibold"
                    >
                        ← Voltar ao Dashboard
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                        Escolha Seu Plano
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Transforme seu corpo e sua vida. Escolha o plano ideal para seus objetivos.
                    </p>

                    {/* Billing Toggle */}
                    <div className="mt-8 inline-flex items-center gap-4 bg-slate-900/50 border-2 border-orange-500/30 rounded-full p-2">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-3 rounded-full font-bold transition-all ${billingCycle === 'monthly'
                                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Mensal
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${billingCycle === 'annual'
                                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Anual
                            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                -16%
                            </span>
                        </button>
                    </div>
                </div>
            </FadeInWhenVisible>

            {/* Plans Grid */}
            <StaggerContainer>
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        const pricePerMonth = billingCycle === 'annual'
                            ? (plan.price.annual / 12).toFixed(0)
                            : plan.price.monthly;
                        const savings = calculateSavings(plan);

                        return (
                            <StaggerItem key={plan.id}>
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -10 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className={`relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border-2 ${plan.popular ? 'border-orange-500 shadow-2xl shadow-orange-500/20' : plan.borderColor
                                        } overflow-hidden ${plan.popular ? 'md:scale-105' : ''}`}
                                >
                                    {/* Popular Badge */}
                                    {plan.popular && (
                                        <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm flex items-center gap-2">
                                            <Zap className="w-4 h-4" />
                                            MAIS POPULAR
                                        </div>
                                    )}

                                    {/* Header */}
                                    <div className={`bg-gradient-to-r ${plan.color} p-8 text-white`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black">{plan.name}</h3>
                                                <p className="text-white/80 text-sm">{plan.tagline}</p>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="mt-6">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-5xl font-black">R$ {pricePerMonth}</span>
                                                <span className="text-white/80">/mês</span>
                                            </div>
                                            {billingCycle === 'annual' && (
                                                <div className="mt-2 text-sm">
                                                    <span className="text-white/80">Cobrança anual: </span>
                                                    <span className="font-bold">R$ {plan.price.annual}</span>
                                                    <span className="ml-2 text-green-300">
                                                        (economize {savings.percentage}%)
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="p-8">
                                        <div className="space-y-4 mb-8">
                                            {plan.features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    {feature.included ? (
                                                        <div className="p-1 bg-green-500/20 rounded-full">
                                                            <Check className="w-4 h-4 text-green-400" />
                                                        </div>
                                                    ) : (
                                                        <div className="p-1 bg-slate-700/50 rounded-full">
                                                            <X className="w-4 h-4 text-slate-600" />
                                                        </div>
                                                    )}
                                                    <span className={
                                                        feature.included ? 'text-white' : 'text-slate-600 line-through'
                                                    }>
                                                        {feature.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${plan.popular
                                                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30'
                                                : 'bg-slate-800 text-white hover:bg-slate-700 border-2 border-slate-700'
                                                }`}
                                        >
                                            {plan.cta}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </StaggerItem>
                        );
                    })}
                </div>
            </StaggerContainer>

            {/* Benefits Section */}
            <FadeInWhenVisible delay={0.3}>
                <div className="max-w-7xl mx-auto mt-20">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-orange-500/30 rounded-3xl p-12">
                        <h2 className="text-3xl font-black text-white text-center mb-12">
                            Por que escolher GymMaster?
                        </h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { icon: Users, title: 'Comunidade Ativa', desc: 'Faça parte de uma comunidade fitness engajada' },
                                { icon: Calendar, title: 'Flexibilidade Total', desc: 'Treine no seu horário, sem restrições' },
                                { icon: TrendingUp, title: 'Resultados Comprovados', desc: '95% dos alunos atingem suas metas' },
                                { icon: Sparkles, title: 'Equipamentos Premium', desc: 'Maquinário de última geração' }
                            ].map((benefit, i) => {
                                const BenefitIcon = benefit.icon;
                                return (
                                    <div key={i} className="text-center">
                                        <div className="inline-block p-4 bg-orange-500/20 rounded-xl mb-4">
                                            <BenefitIcon className="w-8 h-8 text-orange-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                                        <p className="text-slate-400 text-sm">{benefit.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </FadeInWhenVisible>

            {/* FAQ Teaser */}
            <FadeInWhenVisible delay={0.4}>
                <div className="max-w-4xl mx-auto mt-16 text-center">
                    <p className="text-slate-400 mb-4">
                        Ainda tem dúvidas? Entre em contato conosco ou visite uma de nossas unidades.
                    </p>
                    <div className="flex justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
                        >
                            Falar com Consultor
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 border-2 border-orange-500 text-orange-400 rounded-xl font-bold hover:bg-orange-500/10 transition-colors"
                        >
                            Agendar Visita
                        </motion.button>
                    </div>
                </div>
            </FadeInWhenVisible>
        </div>
    );
}
