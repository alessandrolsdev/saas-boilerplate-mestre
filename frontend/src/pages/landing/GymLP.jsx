import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Dumbbell,
    Zap,
    Trophy,
    Users,
    ArrowRight,
    BarChart3,
    Clock,
    Target
} from 'lucide-react';

/**
 * GymLP Component
 * 
 * Landing page para SaaS de Academia com tema atlético laranja/vermelho.
 */
export default function GymLP() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-black text-white font-sans">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-zinc-900/90 backdrop-blur-lg border-b border-orange-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2.5 rounded-lg">
                                <Dumbbell className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-2xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                                Gym<span className="text-white">Master</span>
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8 font-bold text-sm uppercase tracking-wide">
                            <a href="#features" className="text-gray-400 hover:text-orange-500 transition-colors">
                                Recursos
                            </a>
                            <a href="#pricing" className="text-gray-400 hover:text-orange-500 transition-colors">
                                Planos
                            </a>
                            <a href="#contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                                Contato
                            </a>
                            <Link to="/gym/dashboard">
                                <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-black uppercase px-6 hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
                                    Entrar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/20 border-2 border-orange-500">
                            <Zap className="w-5 h-5 text-orange-400" />
                            <span className="text-sm font-black uppercase tracking-wider text-orange-400">
                                Potência Máxima
                            </span>
                        </div>

                        <h1 className="text-6xl lg:text-8xl font-black leading-none uppercase tracking-tighter">
                            Domine Sua{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600">
                                Academia
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed max-w-xl font-medium">
                            Gestão completa de membros, check-in inteligente e análise de performance. O sistema mais robusto para academias que querem crescer.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/gym/dashboard">
                                <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-black uppercase px-10 py-7 text-lg rounded-lg hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-3">
                                    Entrar no Sistema <ArrowRight className="w-6 h-6" />
                                </Button>
                            </Link>
                            <Button className="border-2 border-orange-500 text-orange-500 font-black uppercase px-10 py-7 text-lg rounded-lg bg-transparent hover:bg-orange-500/10 transition-all">
                                Ver Demo
                            </Button>
                        </div>

                        <div className="flex items-center gap-12 pt-8">
                            <div>
                                <div className="text-4xl font-black text-orange-500">15K+</div>
                                <div className="text-sm text-gray-400 font-bold uppercase">Membros Ativos</div>
                            </div>
                            <div className="w-px h-12 bg-gray-700"></div>
                            <div>
                                <div className="text-4xl font-black text-orange-500">500+</div>
                                <div className="text-sm text-gray-400 font-bold uppercase">Academias</div>
                            </div>
                            <div className="w-px h-12 bg-gray-700"></div>
                            <div>
                                <div className="text-4xl font-black text-orange-500">98%</div>
                                <div className="text-sm text-gray-400 font-bold uppercase">Satisfação</div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-30"></div>
                        <div className="relative bg-zinc-800 rounded-2xl border-2 border-orange-500/30 p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-700">
                                <h3 className="text-lg font-black uppercase text-orange-500">Check-ins Hoje</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-sm font-bold text-gray-400">AO VIVO</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { name: 'Carlos Silva', time: '07:45', plan: 'Premium' },
                                    { name: 'Ana Oliveira', time: '08:12', plan: 'Basic' },
                                    { name: 'Pedro Santos', time: '08:30', plan: 'VIP' },
                                    { name: 'Mariana Costa', time: '08:47', plan: 'Premium' },
                                ].map((member, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/60 border border-zinc-700 hover:border-orange-500/50 transition-all"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-black text-white text-lg">
                                            {member.name[0]}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-white">{member.name}</div>
                                            <div className="text-sm text-gray-400">{member.time}</div>
                                        </div>
                                        <div className={`text-xs font-black px-3 py-1 rounded-full uppercase ${member.plan === 'VIP' ? 'bg-orange-500 text-white' :
                                            member.plan === 'Premium' ? 'bg-zinc-700 text-orange-400' :
                                                'bg-zinc-700 text-gray-400'
                                            }`}>
                                            {member.plan}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
                                    <div className="text-3xl font-black text-orange-400">342</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase">Check-ins</div>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                                    <div className="text-3xl font-black text-green-400">R$ 42K</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase">Receita Mês</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-zinc-900/50 border-y border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black uppercase mb-4 tracking-tight">
                            Arsenal Completo
                        </h2>
                        <p className="text-xl text-gray-400 font-medium">
                            Tudo que você precisa para dominar o mercado fitness
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group p-8 bg-zinc-800/50 border-2 border-zinc-700 hover:border-orange-500 rounded-xl transition-all">
                            <div className="w-16 h-16 mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-3 text-white">Gestão de Membros</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Cadastro completo com foto, plano, histórico de pagamentos e acompanhamento de performance.
                            </p>
                        </div>

                        <div className="group p-8 bg-zinc-800/50 border-2 border-zinc-700 hover:border-orange-500 rounded-xl transition-all">
                            <div className="w-16 h-16 mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-3 text-white">Check-in Inteligente</h3>
                            <p className="text-gray-400 leading-relaxed">
                                QR Code, biometria ou reconhecimento facial. Entrada rápida e controle total de frequência.
                            </p>
                        </div>

                        <div className="group p-8 bg-zinc-800/50 border-2 border-zinc-700 hover:border-orange-500 rounded-xl transition-all">
                            <div className="w-16 h-16 mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Trophy className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-3 text-white">Análise de Performance</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Relatórios de horários de pico, retenção de membros e previsão de receita com IA.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <Target className="w-20 h-20 mx-auto mb-8 text-white opacity-90" />
                    <h2 className="text-5xl lg:text-7xl font-black uppercase mb-8 leading-tight tracking-tighter">
                        Está Pronto Para Transformar Sua Academia?
                    </h2>
                    <p className="text-2xl opacity-95 mb-12 font-bold max-w-2xl mx-auto">
                        14 dias grátis. Sem cartão. Suporte 24/7. Comece agora.
                    </p>
                    <Link to="/gym/dashboard">
                        <Button className="bg-white text-orange-600 font-black uppercase px-14 py-8 text-xl rounded-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-3">
                            Começar Agora <Zap className="w-7 h-7" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-950 py-12 text-center text-zinc-600 border-t border-zinc-800">
                <p className="font-black uppercase text-sm tracking-widest">© 2025 GymMaster. Powered by Passion.</p>
            </footer>
        </div>
    );
}
