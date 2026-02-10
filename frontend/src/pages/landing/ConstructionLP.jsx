import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    HardHat,
    ArrowRight,
    Truck,
    Wrench,
    BarChart3,
    Fuel,
    MapPin,
    Clock,
    AlertTriangle,
    CheckCircle2,
    Star,
    Zap,
    Shield,
    TrendingUp
} from 'lucide-react';

/**
 * ConstructionLP Component - EXPANDIDA
 * 
 * Landing Page PREMIUM para terraplanagem/construção (TerraForce).
 * Tema: Amarelo/Preto brutalist e industrial de alto impacto.
 * Completamente expandida com múltiplas seções de conversão.
 */
export default function ConstructionLP() {
    const features = [
        {
            icon: <MapPin className="w-8 h-8" />,
            title: 'Rastreio GPS em Tempo Real',
            description: 'Localize cada máquina no mapa ao vivo. Cercas geográficas alertam se equipamento sair da obra. Histórico de rotas completo para análise.'
        },
        {
            icon: <Fuel className="w-8 h-8" />,
            title: 'Controle Total de Combustível',
            description: 'Monitore abastecimentos, consumo por máquina e identifique desperdícios. Reduza até 15% nos custos de diesel com alertas de anomalias.'
        },
        {
            icon: <Wrench className="w-8 h-8" />,
            title: 'Manutenção Preditiva Inteligente',
            description: 'Sistema programa automaticamente trocas de óleo, filtros e pneus baseado em horímetro. Evite quebras inesperadas que param a obra.'
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: 'Horímetro Automático',
            description: 'Controle preciso de horas trabalhadas de cada operador e equipamento. Relatórios por obra, por máquina e por turno em tempo real.'
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: 'Análise de Custos por Obra',
            description: 'Dashboards executivos com custo real de cada equipamento por projeto. Identifique máquinas paradas, ociosas ou com baixa produtividade.'
        },
        {
            icon: <AlertTriangle className="w-8 h-8" />,
            title: 'Alertas Críticos Instantâneos',
            description: 'Notificações via SMS/WhatsApp para manutenção vencida, máquina fora da geofence, consumo anormal ou operação fora do horário.'
        }
    ];

    const testimonials = [
        {
            name: 'Eng. Carlos Mendonça',
            role: 'Diretor, TerraPlana Construções',
            stars: 5,
            text: 'Cortamos 18% do custo operacional em 4 meses. O TerraForce identificou máquinas ociosas que estavam custando R$ 40 mil/mês paradas. Agora temos controle total.'
        },
        {
            name: 'João Pedro Silva',
            role: 'Gestor de Frota, MovTerra LTDA',
            stars: 5,
            text: 'Antes perdíamos tempo monitorando manualmente cada escavadeira. Agora tudo é automático. O sistema me avisa antes da máquina quebrar e economizamos 25 horas/semana.'
        },
        {
            name: 'Roberto Almeida',
            role: 'Proprietário, Almeida Terraplanagem',
            stars: 5,
            text: 'O ROI foi em 2 meses. Descobrimos desvio de diesel que custava R$ 15 mil/mês e identificamos operadores que deixavam máquinas ligadas fora do expediente. Brutal!'
        }
    ];

    const plans = [
        { name: 'Básico', price: 'R$ 247', machines: 'Até 5 máquinas', features: 'GPS + Horímetro' },
        { name: 'Pro', price: 'R$ 597', machines: 'Até 20 máquinas', features: 'GPS + Combustível + Alerts', popular: true },
        { name: 'Obras', price: 'R$ 1.497', machines: 'Máquinas ilimitadas', features: 'Tudo + API + Suporte Direto' }
    ];

    const stats = [
        { value: '200+', label: 'Construtoras Ativas' },
        { value: '1.500+', label: 'Máquinas Rastreadas' },
        { value: '15%', label: 'Economia Diesel Média' },
        { value: '99.8%', label: 'Precisão GPS' }
    ];

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans">
            {/* Warning Tape Border */}
            <div className="bg-yellow-400 h-3 w-full flex overflow-hidden">
                <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] opacity-10"></div>
            </div>

            {/* Navigation */}
            <nav className="border-b-4 border-zinc-900 bg-white sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-zinc-900 p-2">
                                <HardHat className="h-6 w-6 text-yellow-400" />
                            </div>
                            <span className="text-2xl font-black uppercase tracking-tighter italic">
                                Terra<span className="text-yellow-500">Force</span>
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-6 font-bold text-sm uppercase tracking-wide">
                            <a href="#features" className="hover:text-yellow-600 transition-colors">Recursos</a>
                            <a href="#pricing" className="hover:text-yellow-600 transition-colors">Planos</a>
                            <a href="#testimonials" className="hover:text-yellow-600 transition-colors">Clientes</a>
                            <Link to="/login">
                                <Button variant="outline" className="border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white font-black uppercase">
                                    Entrar
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-yellow-400 text-zinc-900 hover:bg-yellow-500 font-black uppercase shadow-lg">
                                    Testar 15 Dias
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden bg-zinc-50">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-block bg-zinc-900 text-yellow-400 font-black text-xs uppercase px-4 py-2 mb-6 tracking-widest">
                                ⚠ Sistema de Gestão de Maquinário Pesado v5.0
                            </div>
                            <h1 className="text-6xl lg:text-8xl font-black text-zinc-900 uppercase leading-[0.9] tracking-tighter mb-6">
                                Controle <br />
                                Total da <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
                                    Sua Obra.
                                </span>
                            </h1>
                            <p className="text-xl text-zinc-600 font-bold mb-8 max-w-md leading-tight">
                                Pare de perder dinheiro com máquinas paradas e diesel desviado.
                                <span className="text-yellow-600"> Reduza 15% nos custos operacionais</span> com rastreio GPS,
                                controle de combustível e manutenção preditiva.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <Link to="/register">
                                    <Button className="bg-yellow-400 text-zinc-900 hover:bg-yellow-500 px-10 py-7 text-lg font-black uppercase rounded-none inline-flex items-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                                        Iniciar Teste de Campo <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                                <Button variant="outline" className="border-4 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white px-10 py-7 text-lg font-black uppercase rounded-none">
                                    Ver Demonstração
                                </Button>
                            </div>

                            <div className="flex items-center gap-8 border-t-4 border-zinc-900 pt-6">
                                <div>
                                    <div className="text-4xl font-black text-yellow-500">15%</div>
                                    <div className="text-xs font-black uppercase text-zinc-500 tracking-wider">Redução de Diesel</div>
                                </div>
                                <div className="w-1 h-12 bg-zinc-900"></div>
                                <div>
                                    <div className="text-4xl font-black text-yellow-500">100%</div>
                                    <div className="text-xs font-black uppercase text-zinc-500 tracking-wider">Controle de Frota</div>
                                </div>
                                <div className="w-1 h-12 bg-zinc-900"></div>
                                <div>
                                    <div className="text-4xl font-black text-yellow-500">24/7</div>
                                    <div className="text-xs font-black uppercase text-zinc-500 tracking-wider">Monitoramento</div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image/Dashboard */}
                        <div className="order-1 lg:order-2 relative">
                            <div className="absolute top-10 -right-10 w-full h-full border-8 border-yellow-400 z-0"></div>
                            <div className="relative z-10 bg-zinc-900 aspect-[4/3] shadow-2xl flex items-center justify-center overflow-hidden group">
                                <div
                                    className="absolute inset-0 opacity-40 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
                                    style={{
                                        backgroundImage:
                                            "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')"
                                    }}
                                ></div>

                                <div className="absolute bottom-6 left-6 right-6 bg-white p-6 shadow-lg border-l-8 border-yellow-500">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-xs font-black text-zinc-500 uppercase tracking-wider">
                                                ESCAVADEIRA #04
                                            </div>
                                            <div className="text-xl font-black text-zinc-900 flex items-center gap-3 mt-2">
                                                <span className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></span>
                                                EM OPERAÇÃO
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs font-black text-zinc-500 uppercase">Horímetro</div>
                                            <div className="font-mono text-2xl text-yellow-500 font-black">12,450h</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Alert */}
                            <div className="absolute -top-6 -left-6 bg-yellow-400 border-4 border-zinc-900 p-4 shadow-xl rotate-3">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="w-8 h-8 text-zinc-900" />
                                    <div>
                                        <div className="text-xs font-black uppercase text-zinc-900">Manutenção em 12h</div>
                                        <div className="text-2xl font-black text-zinc-900">Trator #07</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-zinc-900 py-16 border-y-4 border-yellow-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-5xl md:text-6xl font-black text-yellow-400 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-zinc-400 font-black uppercase tracking-wider text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4">
                            Ferramentas{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
                                Pesadas
                            </span>
                        </h2>
                        <div className="w-32 h-2 bg-yellow-500"></div>
                        <p className="text-xl text-zinc-600 font-bold mt-6 max-w-3xl">
                            Tecnologia brutalmente eficiente para controle total de equipamentos e custos.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-zinc-50 p-8 border-4 border-zinc-900 hover:bg-yellow-50 hover:border-yellow-500 transition-all group cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div className="bg-yellow-400 w-16 h-16 flex items-center justify-center border-4 border-zinc-900 group-hover:bg-zinc-900 transition-all mb-6">
                                    <div className="text-zinc-900 group-hover:text-yellow-400 transition-colors">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black uppercase mb-4 leading-tight">{feature.title}</h3>
                                <p className="text-zinc-600 font-medium leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-zinc-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4">
                            Planos{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
                                Robustos
                            </span>
                        </h2>
                        <p className="text-xl text-zinc-600 font-bold max-w-3xl mx-auto">
                            Escolha o tamanho ideal para sua frota. Upgrade instantâneo conforme crescer.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`relative p-8 border-4 transition-all ${plan.popular
                                        ? 'bg-yellow-400 border-zinc-900 scale-105 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'
                                        : 'bg-white border-zinc-300 hover:border-yellow-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="px-4 py-1 bg-zinc-900 text-yellow-400 text-xs font-black uppercase border-2 border-zinc-900">
                                            ⚡ Mais Vendido
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className={`text-2xl font-black uppercase mb-4 ${plan.popular ? 'text-zinc-900' : 'text-zinc-900'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className={`text-6xl font-black mb-2 ${plan.popular ? 'text-zinc-900' : 'text-zinc-900'}`}>
                                        {plan.price}
                                    </div>
                                    <div className={`text-sm font-black uppercase ${plan.popular ? 'text-zinc-800' : 'text-zinc-500'}`}>
                                        /mês
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-zinc-900' : 'text-yellow-500'} flex-shrink-0`} />
                                        <span className={`font-bold ${plan.popular ? 'text-zinc-900' : 'text-zinc-900'}`}>{plan.machines}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-zinc-900' : 'text-yellow-500'} flex-shrink-0`} />
                                        <span className={`font-bold ${plan.popular ? 'text-zinc-900' : 'text-zinc-900'}`}>{plan.features}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-zinc-900' : 'text-yellow-500'} flex-shrink-0`} />
                                        <span className={`font-bold ${plan.popular ? 'text-zinc-900' : 'text-zinc-900'}`}>Relatórios ilimitados</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-zinc-900' : 'text-yellow-500'} flex-shrink-0`} />
                                        <span className={`font-bold ${plan.popular ? 'text-zinc-900' : 'text-zinc-900'}`}>Alertas automáticos</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-zinc-900' : 'text-yellow-500'} flex-shrink-0`} />
                                        <span className={`font-bold ${plan.popular ? 'text-zinc-900' : 'text-zinc-900'}`}>Suporte técnico</span>
                                    </div>
                                </div>

                                <Button
                                    className={`w-full py-6 text-lg font-black uppercase border-4 transition-all ${plan.popular
                                            ? 'bg-zinc-900 text-yellow-400 border-zinc-900 hover:bg-zinc-800'
                                            : 'bg-yellow-400 text-zinc-900 border-zinc-900 hover:bg-yellow-500'
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
            <section id="testimonials" className="py-24 bg-zinc-900 text-white">
                <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#EAB308,#EAB308_20px,#000_20px,#000_40px)]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4">
                            Quem Usa{' '}
                            <span className="text-yellow-400">
                                Confia
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="bg-zinc-800 p-8 border-4 border-zinc-700 hover:border-yellow-500 transition-all"
                            >
                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(testimonial.stars)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>

                                <p className="text-zinc-200 font-medium leading-relaxed mb-6 italic">
                                    "{testimonial.text}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t-2 border-zinc-700">
                                    <div className="w-12 h-12 bg-yellow-400 flex items-center justify-center font-black text-zinc-900 text-xl border-2 border-yellow-400">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-black text-white text-lg uppercase">{testimonial.name}</div>
                                        <div className="text-sm text-zinc-400 font-bold">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-yellow-400">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-5xl md:text-7xl font-black uppercase text-zinc-900 mb-6 tracking-tighter">
                        Domine Sua Obra. <br />Hoje.
                    </h2>
                    <p className="text-2xl text-zinc-800 font-bold mb-10">
                        15 dias grátis. Sem cartão. Sem compromisso. <br />
                        Implantação em 24 horas.
                    </p>
                    <Link to="/register">
                        <Button className="bg-zinc-900 text-yellow-400 px-12 py-8 text-xl font-black uppercase border-4 border-zinc-900 hover:bg-zinc-800 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all inline-flex items-center gap-4">
                            <HardHat className="w-8 h-8" />
                            Iniciar Teste Agora
                            <ArrowRight className="w-8 h-8" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-950 py-12 border-t-4 border-yellow-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center gap-3 mb-4 md:mb-0">
                            <div className="bg-yellow-400 p-2">
                                <HardHat className="h-6 w-6 text-zinc-900" />
                            </div>
                            <span className="text-2xl font-black uppercase text-white">
                                Terra<span className="text-yellow-400">Force</span>
                            </span>
                        </div>
                        <p className="font-mono text-xs uppercase text-zinc-600 text-center md:text-left">
                            © 2025 TerraForce Systems. Engenharia Bruta.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
