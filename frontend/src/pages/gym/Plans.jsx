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
    Star,
    ArrowRight
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
            color: 'from-zinc-700 to-zinc-900',
            borderColor: 'border-zinc-700',
            price: {
                monthly: 79,
                annual: 790
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
                annual: 1490
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
                annual: 2990
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
        <div className="min-h-screen bg-zinc-950 px-6 py-20 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">
                {/* Header */}
                <FadeInWhenVisible>
                    <div className="max-w-7xl mx-auto text-center mb-16">
                        <Link
                            to="/gym/dashboard"
                            className="inline-flex items-center gap-2 mb-8 text-orange-400 hover:text-orange-300 transition-colors font-bold uppercase tracking-wide text-sm"
                        >
                            ← Voltar ao Dashboard
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter">
                            Escolha Seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Poder</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
                            Desbloqueie seu potencial máximo com planos feitos para cada estágio da sua jornada.
                        </p>

                        {/* Billing Toggle */}
                        <div className="mt-10 inline-flex items-center gap-1 bg-zinc-900 border border-white/10 rounded-full p-1.5 shadow-xl">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-8 py-3 rounded-full font-bold transition-all uppercase text-sm ${billingCycle === 'monthly'
                                    ? 'bg-zinc-800 text-white shadow-lg'
                                    : 'text-zinc-500 hover:text-white'
                                    }`}
                            >
                                Mensal
                            </button>
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-8 py-3 rounded-full font-bold transition-all uppercase text-sm flex items-center gap-2 ${billingCycle === 'annual'
                                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                                    : 'text-zinc-500 hover:text-white'
                                    }`}
                            >
                                Anual
                                <span className="text-[10px] bg-white text-orange-600 px-2 py-0.5 rounded-full font-black">
                                    -16%
                                </span>
                            </button>
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Plans Grid */}
                <StaggerContainer>
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
                        {plans.map((plan) => {
                            const Icon = plan.icon;
                            const pricePerMonth = billingCycle === 'annual'
                                ? (plan.price.annual / 12).toFixed(0)
                                : plan.price.monthly;
                            const savings = calculateSavings(plan);

                            return (
                                <StaggerItem key={plan.id}>
                                    <div
                                        className={`relative bg-zinc-900/50 backdrop-blur-xl rounded-[2rem] border-2 ${plan.popular ? 'border-orange-500 shadow-2xl shadow-orange-500/20 z-10' : 'border-white/5 hover:border-white/10'
                                            } overflow-hidden transition-all duration-300 group hover:-translate-y-2`}
                                    >
                                        {/* Popular Badge */}
                                        {plan.popular && (
                                            <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-bl-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg z-20">
                                                <Zap className="w-4 h-4 fill-current" />
                                                Mais Popular
                                            </div>
                                        )}

                                        {/* Header */}
                                        <div className={`p-8 relative overflow-hidden`}>
                                            <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                                            <div className="relative z-10">
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 shadow-lg`}>
                                                    <Icon className="w-7 h-7 text-white" />
                                                </div>
                                                <h3 className="text-3xl font-black text-white uppercase italic">{plan.name}</h3>
                                                <p className="text-zinc-400 font-medium mt-1">{plan.tagline}</p>
                                            </div>
                                        </div>

                                        <div className="px-8 pb-8">
                                            {/* Price */}
                                            <div className="mb-8 p-4 bg-zinc-950/50 rounded-2xl border border-white/5">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-sm font-bold text-zinc-500">R$</span>
                                                    <span className="text-5xl font-black text-white">{pricePerMonth}</span>
                                                    <span className="text-zinc-500 font-bold">/mês</span>
                                                </div>
                                                {billingCycle === 'annual' && (
                                                    <div className="mt-2 text-xs font-bold text-green-500 flex items-center gap-1">
                                                        <Check className="w-3 h-3" />
                                                        Economize {savings.percentage}% no plano anual
                                                    </div>
                                                )}
                                            </div>

                                            {/* Features */}
                                            <div className="space-y-4 mb-8">
                                                {plan.features.map((feature, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        {feature.included ? (
                                                            <div className="mt-0.5 p-0.5 bg-green-500/20 rounded-full text-green-500 shrink-0">
                                                                <Check className="w-3 h-3" />
                                                            </div>
                                                        ) : (
                                                            <div className="mt-0.5 p-0.5 bg-zinc-800 rounded-full text-zinc-600 shrink-0">
                                                                <X className="w-3 h-3" />
                                                            </div>
                                                        )}
                                                        <span className={`text-sm font-medium ${feature.included ? 'text-zinc-300' : 'text-zinc-600 line-through'
                                                            }`}>
                                                            {feature.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            <button
                                                className={`w-full py-4 rounded-xl font-black uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${plan.popular
                                                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50'
                                                    : 'bg-white text-zinc-900 hover:bg-zinc-200'
                                                    }`}
                                            >
                                                {plan.cta} <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </div>
                </StaggerContainer>

                {/* Benefits Section */}
                <FadeInWhenVisible delay={0.3}>
                    <div className="max-w-7xl mx-auto mt-24">
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-red-600/5" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-16 uppercase italic">
                                    Por que escolher a <span className="text-orange-500">GymMaster</span>?
                                </h2>
                                <div className="grid md:grid-cols-4 gap-12">
                                    {[
                                        { icon: Users, title: 'Comunidade', desc: 'Faça parte de uma elite fitness engajada' },
                                        { icon: Calendar, title: 'Flexibilidade', desc: 'Treine no seu horário, sem desculpas' },
                                        { icon: TrendingUp, title: 'Resultados', desc: 'Metodologia comprovada por atletas' },
                                        { icon: Sparkles, title: 'Premium', desc: 'Equipamentos de última geração' }
                                    ].map((benefit, i) => {
                                        const BenefitIcon = benefit.icon;
                                        return (
                                            <div key={i} className="text-center group">
                                                <div className="inline-flex p-5 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl mb-6 shadow-lg border border-white/5 group-hover:border-orange-500/30 transition-colors">
                                                    <BenefitIcon className="w-8 h-8 text-orange-500" />
                                                </div>
                                                <h3 className="text-xl font-black text-white mb-3 uppercase">{benefit.title}</h3>
                                                <p className="text-zinc-400 text-sm font-medium leading-relaxed">{benefit.desc}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeInWhenVisible>
            </div>
        </div>
    );
}
