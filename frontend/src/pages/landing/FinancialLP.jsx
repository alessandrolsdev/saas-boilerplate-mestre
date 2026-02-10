import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    DollarSign,
    TrendingUp,
    BarChart3,
    Users,
    CreditCard,
    FileText,
    Shield,
    Zap,
    Clock,
    CheckCircle2,
    ArrowRight,
    Star,
    Target,
    PieChart,
    Repeat,
    Bell,
    Smartphone
} from 'lucide-react';

/**
 * FinancialLP Component
 * 
 * Landing Page premium para SaaS Financeiro.
 * Tema: Azul/Verde profissional, confiável e corporativo.
 * Foco: Gestão de receita recorrente, clientes e cobranças.
 */
export default function FinancialLP() {
    const features = [
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: 'Receita Recorrente (MRR)',
            description: 'Acompanhe seu MRR em tempo real com gráficos detalhados e previsões de crescimento. Entenda exatamente de onde vem sua receita.'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Gestão de Clientes',
            description: 'Base de clientes completa com histórico de pagamentos, LTV, churn e segmentação inteligente por plano e status.'
        },
        {
            icon: <CreditCard className="w-8 h-8" />,
            title: 'Cobranças Automatizadas',
            description: 'Faturamento recorrente automático com retry inteligente, múltiplos meios de pagamento e notificações personalizadas.'
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: 'Dashboards Analíticos',
            description: 'Métricas SaaS essenciais: MRR, ARR, Churn Rate, CAC, LTV. Tudo em um dashboard profissional e fácil de entender.'
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: 'Relatórios Financeiros',
            description: 'Relatórios gerenciais completos em PDF. DRE, fluxo de caixa, aging de recebíveis - tudo pronto para sua contabilidade.'
        },
        {
            icon: <Bell className="w-8 h-8" />,
            title: 'Notificações Inteligentes',
            description: 'Alertas automáticos de pagamentos vencidos, cartões recusados e oportunidades de upsell. Nunca perca uma cobrança.'
        }
    ];

    const plans = [
        { name: 'Starter', price: 'R$ 97', clients: 'Até 50 clientes', mrr: 'MRR até R$ 10k' },
        { name: 'Professional', price: 'R$ 197', clients: 'Até 200 clientes', mrr: 'MRR até R$ 50k', popular: true },
        { name: 'Enterprise', price: 'R$ 497', clients: 'Clientes ilimitados', mrr: 'MRR ilimitado' }
    ];

    const testimonials = [
        {
            name: 'Carlos Mendes',
            role: 'CEO, TechSolutions',
            photo: null,
            text: 'Aumentamos nosso MRR em 45% em 6 meses. O FinanceFlow nos deu visibilidade total da receita e identificamos oportunidades que estavam invisíveis antes.'
        },
        {
            name: 'Ana Paula Costa',
            role: 'CFO, Marketing Pro',
            photo: null,
            text: 'Economizamos 20 horas por mês em tarefas manuais. A automação de cobranças e relatórios transformou nossa operação financeira.'
        },
        {
            name: 'Roberto Silva',
            role: 'Founder, SaaS Inovação',
            photo: null,
            text: 'O controle de churn melhorou dramaticamente. Conseguimos reduzir em 30% identificando padrões de cancelamento antes que acontecessem.'
        }
    ];

    const stats = [
        { value: '5.000+', label: 'Empresas Ativas' },
        { value: 'R$ 450M+', label: 'MRR Gerenciado' },
        { value: '98.5%', label: 'Uptime SLA' },
        { value: '4.9/5', label: 'Avaliação Média' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
            {/* Header/Nav */}
            <header className="border-b border-blue-500/20 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                                <DollarSign className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    Finance<span className="font-light text-blue-400">Flow</span>
                                </h1>
                                <p className="text-xs text-gray-400 font-medium">Gestão Inteligente de Receita</p>
                            </div>
                        </div>

                        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
                            <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">Funcionalidades</a>
                            <a href="#pricing" className="text-gray-300 hover:text-blue-400 transition-colors">Preços</a>
                            <a href="#testimonials" className="text-gray-300 hover:text-blue-400 transition-colors">Depoimentos</a>
                            <Link to="/finance-dashboard">
                                <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
                                    Entrar
                                </Button>
                            </Link>
                            <Link to="/finance-dashboard">
                                <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
                                    Começar Grátis
                                </Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 px-6">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent"></div>
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block mb-6">
                                <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-bold uppercase tracking-wide">
                                    #1 em Gestão Financeira SaaS
                                </span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                                Controle Total da Sua{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                    Receita Recorrente
                                </span>
                            </h2>

                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                Gerencie clientes, automatize cobranças e acompanhe métricas SaaS em tempo real.
                                <span className="text-blue-400 font-semibold"> Aumente seu MRR em até 40%</span> com insights inteligentes.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link to="/finance-dashboard">
                                    <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-10 py-6 text-lg font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-3">
                                        Começar Gratuitamente <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Button variant="outline" className="border-2 border-blue-500 text-blue-400 px-10 py-6 text-lg font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 inline-flex items-center gap-3">
                                    <Smartphone className="w-5 h-5" />
                                    Agendar Demo
                                </Button>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-green-400" />
                                    <span className="text-sm text-gray-400 font-medium">Dados 100% Seguros</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    <span className="text-sm text-gray-400 font-medium">Sem Cartão de Crédito</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border-2 border-blue-500/30 shadow-2xl shadow-blue-500/20">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold">Dashboard MRR</h3>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-bold">
                                        +32% este mês
                                    </span>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {[
                                        { month: 'Jan', value: 85 },
                                        { month: 'Fev', value: 92 },
                                        { month: 'Mar', value: 88 },
                                        { month: 'Abr', value: 95 },
                                        { month: 'Mai', value: 100 },
                                    ].map((item) => (
                                        <div key={item.month} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400 font-semibold">{item.month}</span>
                                                <span className="text-white font-bold">R$ {item.value}k</span>
                                            </div>
                                            <div className="w-full bg-slate-700 rounded-full h-2">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all"
                                                    style={{ width: `${item.value}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-700">
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1">R$ 100k</div>
                                        <div className="text-sm text-gray-400">MRR Atual</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-emerald-400 mb-1">348</div>
                                        <div className="text-sm text-gray-400">Clientes Ativos</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 shadow-xl">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                    <div>
                                        <div className="text-2xl font-black text-white">+45%</div>
                                        <div className="text-xs text-blue-200">Crescimento</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-4 shadow-xl">
                                <div className="flex items-center gap-3">
                                    <Star className="w-8 h-8 text-white fill-current" />
                                    <div>
                                        <div className="text-2xl font-black text-white">4.9/5</div>
                                        <div className="text-xs text-emerald-200">Avaliação</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                                <div className="text-blue-100 font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            Tudo que Você Precisa para{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                Escalar
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Funcionalidades profissionais para gestão completa de receita recorrente.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border-2 border-blue-500/20 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-slate-900/50 to-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            Planos que{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                Crescem
                            </span>{' '}
                            com Você
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Escolha o plano ideal para o tamanho do seu negócio. Upgrade ou downgrade a qualquer momento.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`relative rounded-3xl p-8 border-2 transition-all ${plan.popular
                                    ? 'bg-gradient-to-br from-blue-600 to-emerald-600 border-blue-400 scale-105 shadow-2xl shadow-blue-500/50'
                                    : 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="px-4 py-1 bg-yellow-500 text-slate-900 rounded-full text-xs font-black uppercase">
                                            Mais Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                                    <div className="text-5xl font-black mb-2">{plan.price}</div>
                                    <div className="text-sm text-gray-300">/mês</div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <span className={plan.popular ? 'text-white' : 'text-gray-300'}>{plan.clients}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <span className={plan.popular ? 'text-white' : 'text-gray-300'}>{plan.mrr}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <span className={plan.popular ? 'text-white' : 'text-gray-300'}>Cobranças ilimitadas</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <span className={plan.popular ? 'text-white' : 'text-gray-300'}>Relatórios completos</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <span className={plan.popular ? 'text-white' : 'text-gray-300'}>Suporte prioritário</span>
                                    </div>
                                </div>

                                <Link to="/finance-dashboard" className="block">
                                    <Button
                                        className={`w-full py-6 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${plan.popular
                                            ? 'bg-white text-blue-600 hover:bg-gray-100 hover:shadow-xl'
                                            : 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                                            }`}
                                    >
                                        Começar Agora
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            O Que Nossos{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                Clientes
                            </span>{' '}
                            Dizem
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border-2 border-blue-500/20"
                            >
                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                                    ))}
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-6 italic">"{testimonial.text}"</p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{testimonial.name}</div>
                                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 px-6 bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        Pronto para Escalar Sua Receita?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Junte-se a 5.000+ empresas que já transformaram sua gestão financeira.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/finance-dashboard">
                            <Button className="bg-white text-blue-600 px-10 py-6 text-lg font-bold rounded-xl hover:bg-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 inline-flex items-center gap-3">
                                Começar Gratuitamente <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold">
                            Finance<span className="font-light text-blue-400">Flow</span>
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        © 2025 FinanceFlow. Gestão Inteligente de Receita Recorrente.
                    </p>
                </div>
            </footer>
        </div>
    );
}
