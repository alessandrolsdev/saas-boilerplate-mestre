import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Sparkles,
    Calendar,
    Star,
    Heart,
    ArrowRight,
    Clock,
    Users2,
    BadgeCheck
} from 'lucide-react';

/**
 * BeautySalonLP Component
 * 
 * Landing page premium para SaaS de Salão de Beleza com tema elegante rosa/dourado.
 */
export default function BeautySalonLP() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 text-gray-900 font-sans">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-rose-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-2 rounded-full">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 tracking-wide">
                                Beauty<span className="font-light">Flow</span>
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8 font-medium text-sm">
                            <a href="#funcionalidades" className="text-gray-600 hover:text-rose-600 transition-colors">
                                Funcionalidades
                            </a>
                            <a href="#beneficios" className="text-gray-600 hover:text-rose-600 transition-colors">
                                Benefícios
                            </a>
                            <a href="#precos" className="text-gray-600 hover:text-rose-600 transition-colors">
                                Preços
                            </a>
                            <Link to="/beauty/dashboard">
                                <Button
                                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:shadow-rose-200 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 font-medium px-6"
                                >
                                    Entrar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-20 right-10 w-64 h-64 bg-rose-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-20"></div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 border border-rose-200">
                            <BadgeCheck className="w-4 h-4 text-rose-600" />
                            <span className="text-sm font-semibold text-rose-700 tracking-wide">
                                #1 em Gestão de Salões no Brasil
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-serif leading-tight">
                            Transforme seu{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500">
                                Salão de Beleza
                            </span>{' '}
                            em uma Experiência Premium
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                            Agendamento online, gestão de profissionais e análise de desempenho. Tudo em uma plataforma elegante e intuitiva.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/beauty/dashboard">
                                <Button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-6 text-lg font-semibold rounded-xl hover:shadow-2xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105 hover:-translate-y-1 inline-flex items-center gap-2">
                                    Começar Agora Grátis <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Button className="border-2 border-rose-300 text-rose-700 px-8 py-6 text-lg font-semibold rounded-xl bg-white hover:bg-rose-50 transition-all">
                                Agendar Demo
                            </Button>
                        </div>

                        <div className="flex items-center gap-8 pt-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-200 to-pink-300 border-2 border-white flex items-center justify-center text-rose-600 font-serif"
                                    >
                                        ✨
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Mais de 2.500 salões confiam</p>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-rose-400 to-pink-400 rounded-3xl opacity-20 blur-2xl"></div>
                        <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-rose-100">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-rose-100">
                                <h3 className="text-lg font-serif text-rose-900">Agendamentos Hoje</h3>
                                <Calendar className="w-6 h-6 text-rose-500" />
                            </div>

                            <div className="space-y-4">
                                {[
                                    { time: '09:00', client: 'Ana Silva', service: 'Corte + Escova', prof: 'Carla' },
                                    { time: '10:30', client: 'Beatriz Costa', service: 'Manicure', prof: 'Paula' },
                                    { time: '14:00', client: 'Camila Souza', service: 'Hidratação', prof: 'Júlia' },
                                ].map((appointment, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold">
                                            {appointment.time}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">{appointment.client}</div>
                                            <div className="text-sm text-gray-600">{appointment.service}</div>
                                        </div>
                                        <div className="text-xs font-medium text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                                            {appointment.prof}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl text-white">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-sm opacity-90">Receita Hoje</div>
                                        <div className="text-3xl font-bold">R$ 3.240</div>
                                    </div>
                                    <Heart className="w-12 h-12 opacity-80" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="funcionalidades" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-4">
                            Tudo que você precisa em um só lugar
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Simplifique a gestão e encante suas clientes com uma experiência impecável.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center group hover:scale-105 transition-transform">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow">
                                <Calendar className="w-10 h-10 text-rose-600" />
                            </div>
                            <h3 className="text-2xl font-serif text-gray-900 mb-3">Agendamento Online</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Suas clientes agendam direto pelo app. Redução de 80% no no-show com lembretes automáticos.
                            </p>
                        </div>

                        <div className="text-center group hover:scale-105 transition-transform">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow">
                                <Users2 className="w-10 h-10 text-rose-600" />
                            </div>
                            <h3 className="text-2xl font-serif text-gray-900 mb-3">Gestão de Equipe</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Controle de agenda, comissões e desempenho de cada profissional em tempo real.
                            </p>
                        </div>

                        <div className="text-center group hover:scale-105 transition-transform">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow">
                                <Clock className="w-10 h-10 text-rose-600" />
                            </div>
                            <h3 className="text-2xl font-serif text-gray-900 mb-3">Relatórios Inteligentes</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Veja os serviços mais rentáveis, horários de pico e fidelização de clientes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-gradient-to-br from-rose-600 via-pink-500 to-amber-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl lg:text-6xl font-serif mb-8 leading-tight">
                        Pronta para elevar seu salão a outro nível?
                    </h2>
                    <p className="text-xl opacity-95 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Teste grátis por 14 dias. Sem cartão de crédito. Suporte VIP em português.
                    </p>
                    <Link to="/beauty/dashboard">
                        <Button className="bg-white text-rose-600 px-12 py-6 text-xl font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-3">
                            Iniciar Teste Gratuito <Sparkles className="w-6 h-6" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-12 text-center text-gray-400">
                <p className="font-serif">© 2025 BeautyFlow. Elevar a beleza através da tecnologia.</p>
            </footer>
        </div>
    );
}
