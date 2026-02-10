import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Scale,
    Gavel,
    ShieldCheck,
    FileText,
    Clock,
    ChevronRight,
    Search,
    Users,
    TrendingUp,
    Bell,
    Calendar,
    CheckCircle2,
    Star,
    Award,
    Lock,
    Zap,
    BarChart3,
    ArrowRight
} from 'lucide-react';

/**
 * LegalLP Component - EXPANDIDA
 * 
 * Landing Page PREMIUM para escritórios jurídicos (LexFlow).
 * Tema: Azul escuro/Dourado autoritário e profissional.
 * Completamente expandida com múltiplas seções de alta conversão.
 */
export default function LegalLP() {
    const features = [
        {
            icon: <Bell className="w-8 h-8" />,
            title: 'Intimações Automáticas',
            description: 'Robô monitora 100% dos diários oficiais (DJe, DOE, DOU) e envia alertas inteligentes antes da publicação oficial. Zero processos perdidos.'
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: 'Gestão Documental IA',
            description: 'OCR avançado lê seus PDFs, extrai dados e organiza automaticamente por cliente, processo e instância. Busca instantânea em milhões de páginas.'
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: 'Prazos Fatais Inteligentes',
            description: 'Sistema calcula automaticamente todos os prazos (simples, dobrado, em dobro) com base no tipo de processo. Alertas escalonados antes do vencimento.'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'CRM Jurídico Completo',
            description: 'Gestão completa de clientes com histórico de processos, comunicação integrada (email/WhatsApp) e portal do cliente para consultas 24/7.'
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: 'Financeiro + Honorários',
            description: 'Controle total de honorários, sucumbência, acordos e emissão automática de boletos/PIX. Relatórios gerenciais para sócios.'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Automação de Petições',
            description: 'Biblioteca de modelos personalizáveis com IA generativa para minutar petições. Integração direta com PJe e eSAJ para protocolização.'
        }
    ];

    const testimonials = [
        {
            name: 'Dr. Roberto Almeida',
            role: 'Sócio, Almeida & Associados',
            stars: 5,
            text: 'O LexFlow transformou nossa banca. Reduzimos 40% do tempo em tarefas administrativas e aumentamos em 60% nossa capacidade de processos ativos sem contratar novos advogados.'
        },
        {
            name: 'Dra. Mariana Costa',
            role: 'Advogada Trabalhista, São Paulo/SP',
            stars: 5,
            text: 'Antes perdia horas organizando intimações manualmente. Agora tudo é automático. Consigo focar 100% na estratégia jurídica e meus clientes adoram o portal de acompanhamento.'
        },
        {
            name: 'Dr. Fernando Silva',
            role: 'Diretor Jurídico, FinTech Brasil',
            stars: 5,
            text: 'Gerenciamos 800+ processos simultâneos sem estresse. O dashboard executivo me dá total visibilidade e os relatórios financeiros facilitam muito a gestão do departamento.'
        }
    ];

    const plans = [
        { name: 'Solo', price: 'R$ 197', processes: 'Até 100 processos', users: '1 usuário' },
        { name: 'Escritório', price: 'R$ 497', processes: 'Até 500 processos', users: 'Até 5 usuários', popular: true },
        { name: 'Banca', price: 'R$ 997', processes: 'Processos ilimitados', users: 'Usuários ilimitados' }
    ];

    const stats = [
        { value: '500+', label: 'Escritórios Ativos' },
        { value: '45.000+', label: 'Processos Gerenciados' },
        { value: '99.9%', label: 'Uptime Garantido' },
        { value: '4.9/5', label: 'Avaliação Capterra' }
    ];

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-[#C5A059] selection:text-white">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#C5A059] p-1.5 rounded-sm">
                                <Scale className="h-6 w-6 text-slate-900" />
                            </div>
                            <span className="text-2xl font-serif text-white tracking-wide">
                                Lex<span className="text-[#C5A059]">Flow</span>
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-sm text-slate-300 hover:text-[#C5A059] transition-colors uppercase tracking-widest">
                                Soluções
                            </a>
                            <a href="#pricing" className="text-sm text-slate-300 hover:text-[#C5A059] transition-colors uppercase tracking-widest">
                                Planos
                            </a>
                            <a href="#testimonials" className="text-sm text-slate-300 hover:text-[#C5A059] transition-colors uppercase tracking-widest">
                                Depoimentos
                            </a>
                            <Link to="/login">
                                <Button variant="outline" className="border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-slate-900">
                                    Área do Cliente
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-[#C5A059] text-slate-900 hover:bg-[#E5D09D] font-bold">
                                    Teste 14 Dias Grátis
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1e293b] to-transparent opacity-20 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#C5A059]/30 rounded-full bg-[#C5A059]/10">
                                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
                                <span className="text-xs font-medium text-[#C5A059] tracking-widest uppercase">
                                    Software Jurídico #1 do Brasil
                                </span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-serif text-white leading-tight">
                                Domine seus <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5D09D]">
                                    Prazos e Processos
                                </span>
                            </h1>

                            <p className="text-lg text-slate-400 max-w-lg leading-relaxed border-l-2 border-[#C5A059] pl-6">
                                A inteligência definitiva para escritórios que não admitem erros.
                                <span className="text-[#C5A059] font-semibold"> Elimine 40 horas/mês</span> de trabalho manual,
                                automatize intimações e foque na estratégia jurídica de alto valor.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/register">
                                    <Button className="bg-[#C5A059] text-slate-900 hover:bg-[#E5D09D] px-8 py-6 text-lg font-bold rounded-xl inline-flex items-center gap-2">
                                        Começar Teste Gratuito <ChevronRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                                <Button variant="outline" className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg font-semibold rounded-xl">
                                    Ver Demonstração
                                </Button>
                            </div>

                            <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full bg-slate-700 border-2 border-[#0F172A] flex items-center justify-center text-lg"
                                        >
                                            ⚖️
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">
                                        <span className="text-white font-bold">+500 Escritórios</span> gerenciam 45 mil processos com LexFlow
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-[#C5A059] fill-current" />
                                        ))}
                                        <span className="text-xs text-slate-400 ml-2">4.9/5 no Capterra</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#C5A059] to-blue-600 rounded-lg blur opacity-20"></div>
                            <div className="relative bg-slate-800/50 border border-slate-700 backdrop-blur-xl rounded-lg p-6 shadow-2xl">
                                <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-xs text-slate-400 uppercase tracking-widest">
                                        Dashboard Executivo
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded border border-slate-700/50">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-green-900/30 text-green-400 rounded">
                                                <ShieldCheck className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-slate-400">Processos Ativos</div>
                                                <div className="text-xl font-serif text-white">1.248</div>
                                            </div>
                                        </div>
                                        <div className="text-green-400 text-sm font-medium">+12% este mês</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded border border-slate-700/50">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-red-900/30 text-red-400 rounded">
                                                <Clock className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-slate-400">Prazos Fatais (Hoje)</div>
                                                <div className="text-xl font-serif text-white">03</div>
                                            </div>
                                        </div>
                                        <div className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs animate-pulse">
                                            Atenção
                                        </div>
                                    </div>

                                    <div className="h-32 bg-slate-900/60 rounded border border-slate-700/50 flex items-end p-4 gap-2">
                                        {[40, 70, 45, 90, 60, 80, 55].map((h, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 bg-gradient-to-t from-[#C5A059] to-[#C5A059]/20 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                                                style={{ height: `${h}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-gradient-to-r from-[#1e293b] via-[#0F172A] to-[#1e293b] py-16 border-y border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5D09D] mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-slate-400 font-semibold uppercase tracking-wider text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-[#0B1120]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-6xl font-serif text-white mb-6">
                            Tecnologia que Impõe{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5D09D]">
                                Respeito
                            </span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            Funcionalidades desenhadas especificamente para a rotina da advocacia de elite.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-8 bg-slate-800/30 border border-slate-800 hover:border-[#C5A059]/50 transition-all group rounded-xl"
                            >
                                <div className="w-16 h-16 bg-[#C5A059]/10 rounded-xl flex items-center justify-center text-[#C5A059] mb-6 group-hover:scale-110 group-hover:bg-[#C5A059]/20 transition-all">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-serif text-white mb-4">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-[#0F172A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-6xl font-serif text-white mb-6">
                            Planos que Crescem com Seu{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5D09D]">
                                Escritório
                            </span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            Teste 14 dias grátis. Sem cartão de crédito. Cancele quando quiser.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`relative rounded-3xl p-8 border-2 transition-all ${plan.popular
                                        ? 'bg-gradient-to-br from-[#C5A059] to-[#8B7042] border-[#C5A059] scale-105 shadow-2xl shadow-[#C5A059]/50'
                                        : 'bg-slate-800/30 border-slate-700 hover:border-[#C5A059]/50'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="px-4 py-1 bg-white text-slate-900 rounded-full text-xs font-black uppercase">
                                            Mais Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className={`text-2xl font-serif mb-2 ${plan.popular ? 'text-slate-900' : 'text-white'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className={`text-5xl font-black mb-2 ${plan.popular ? 'text-slate-900' : 'text-white'}`}>
                                        {plan.price}
                                    </div>
                                    <div className={`text-sm ${plan.popular ? 'text-slate-800' : 'text-slate-400'}`}>/mês</div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-slate-900' : 'text-[#C5A059]'} flex-shrink-0`} />
                                        <span className={plan.popular ? 'text-slate-900' : 'text-slate-300'}>{plan.processes}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-slate-900' : 'text-[#C5A059]'} flex-shrink-0`} />
                                        <span className={plan.popular ? 'text-slate-900' : 'text-slate-300'}>{plan.users}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-slate-900' : 'text-[#C5A059]'} flex-shrink-0`} />
                                        <span className={plan.popular ? 'text-slate-900' : 'text-slate-300'}>Intimações automáticas</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-slate-900' : 'text-[#C5A059]'} flex-shrink-0`} />
                                        <span className={plan.popular ? 'text-slate-900' : 'text-slate-300'}>Gestão documental IA</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-slate-900' : 'text-[#C5A059]'} flex-shrink-0`} />
                                        <span className={plan.popular ? 'text-slate-900' : 'text-slate-300'}>Controle financeiro</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-slate-900' : 'text-[#C5A059]'} flex-shrink-0`} />
                                        <span className={plan.popular ? 'text-slate-900' : 'text-slate-300'}>Suporte prioritário</span>
                                    </div>
                                </div>

                                <Button
                                    className={`w-full py-6 text-lg font-bold rounded-xl transition-all ${plan.popular
                                            ? 'bg-slate-900 text-white hover:bg-slate-800'
                                            : 'bg-[#C5A059] text-slate-900 hover:bg-[#E5D09D]'
                                        }`}
                                >
                                    Começar Agora
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-24 bg-[#0B1120]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-6xl font-serif text-white mb-6">
                            O Que Advogados{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5D09D]">
                                de Elite
                            </span>{' '}
                            Dizem
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="p-8 bg-slate-800/30 border border-slate-800 rounded-xl hover:border-[#C5A059]/50 transition-all"
                            >
                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(testimonial.stars)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-[#C5A059] fill-current" />
                                    ))}
                                </div>

                                <p className="text-slate-300 leading-relaxed mb-6 italic">
                                    "{testimonial.text}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-slate-700">
                                    <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] font-bold text-lg border-2 border-[#C5A059]">
                                        {testimonial.name.split(' ')[0].charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-serif font-bold text-white text-lg">{testimonial.name}</div>
                                        <div className="text-sm text-slate-400">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-gradient-to-r from-[#C5A059] via-[#E5D09D] to-[#C5A059]">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-6">
                        Transforme Seu Escritório Hoje
                    </h2>
                    <p className="text-xl text-slate-800 mb-8 max-w-2xl mx-auto">
                        Junte-se a 500+ escritórios que eliminaram a papelada e escalaram sua advocacia com LexFlow.
                    </p>
                    <Link to="/register">
                        <Button className="bg-slate-900 text-white px-10 py-6 text-lg font-bold rounded-xl hover:bg-slate-800 hover:shadow-2xl transition-all inline-flex items-center gap-3">
                            Começar Teste de 14 Dias Grátis <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                    <p className="text-sm text-slate-700 mt-6">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Sem cartão de crédito • Cancele quando quiser • Suporte em português
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-800 bg-[#0F172A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <div className="bg-[#C5A059] p-1.5 rounded-sm">
                                <Scale className="h-5 w-5 text-slate-900" />
                            </div>
                            <span className="text-xl font-serif text-white">
                                Lex<span className="text-[#C5A059]">Flow</span>
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm text-center md:text-left">
                            © 2025 LexFlow Tecnologias Jurídicas. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
