import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Pizza,
    Clock,
    MapPin,
    Phone,
    ShoppingCart,
    Star,
    ChefHat,
    Truck,
    CreditCard,
    Users,
    ArrowRight,
    Check
} from 'lucide-react';

/**
 * PizzariaLP Component
 * 
 * Landing page para Pizzaria com tema vermelho/amarelo appetizing.
 */
export default function PizzariaLP() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50 text-gray-900 font-sans">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-lg border-b border-red-100 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-red-500 to-orange-500 p-2.5 rounded-full">
                                <Pizza className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                                Bella<span className="font-light">Pizza</span>
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8 font-semibold text-sm">
                            <a href="#cardapio" className="text-gray-600 hover:text-red-600 transition-colors">
                                Cardápio
                            </a>
                            <a href="#delivery" className="text-gray-600 hover:text-red-600 transition-colors">
                                Delivery
                            </a>
                            <a href="#contato" className="text-gray-600 hover:text-red-600 transition-colors">
                                Contato
                            </a>
                            <Link to="/login">
                                <Button className="bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:shadow-red-200 transition-all font-bold px-6">
                                    Fazer Pedido
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-20 right-10 w-64 h-64 bg-red-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-200 rounded-full filter blur-3xl opacity-20"></div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border-2 border-red-300">
                            <ChefHat className="w-5 h-5 text-red-600" />
                            <span className="text-sm font-black uppercase tracking-wide text-red-700">
                                🔥 Receita Tradicional Italiana
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black leading-none uppercase tracking-tight">
                            A Melhor{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600">
                                Pizza
                            </span>{' '}
                            da Cidade
                        </h1>

                        <p className="text-xl text-gray-700 leading-relaxed max-w-xl font-medium">
                            Massa artesanal, ingredientes frescos e entrega rápida. Faça seu pedido online e receba quentinha em casa!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register">
                                <Button className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-black uppercase px-10 py-7 text-lg rounded-xl hover:shadow-2xl hover:shadow-red-300 hover:scale-105 transition-all inline-flex items-center gap-3">
                                    Pedir Agora <ShoppingCart className="w-6 h-6" />
                                </Button>
                            </Link>
                            <Button className="border-3 border-red-500 text-red-600 font-black uppercase px-10 py-7 text-lg rounded-xl bg-white hover:bg-red-50 transition-all">
                                Ver Cardápio
                            </Button>
                        </div>

                        <div className="flex items-center gap-8 pt-6">
                            <div>
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 font-bold mt-1">5.0 ★ de 1.234 avaliações</p>
                            </div>
                            <div className="w-px h-12 bg-gray-300"></div>
                            <div>
                                <div className="text-3xl font-black text-red-600">30min</div>
                                <div className="text-sm text-gray-600 font-semibold">Entrega média</div>
                            </div>
                        </div>
                    </div>

                    {/* Pizza Visual */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur opacity-30"></div>
                        <div className="relative bg-white rounded-3xl shadow-2xl p-8 border-4 border-red-100">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-red-100">
                                <h3 className="text-lg font-black uppercase text-red-900">Pizzas Mais Pedidas</h3>
                                <Pizza className="w-8 h-8 text-red-500" />
                            </div>

                            <div className="space-y-4">
                                {[
                                    { name: 'Margherita', desc: 'Mussarela, tomate, manjericão', price: 'R$ 42' },
                                    { name: 'Calabresa', desc: 'Calabresa, cebola, azeitona', price: 'R$ 45' },
                                    { name: 'Quatro Queijos', desc: 'Mussarela, gorgonzola, parmesão, provolone', price: 'R$ 52' },
                                ].map((pizza, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-100 hover:shadow-md hover:scale-102 transition-all cursor-pointer"
                                    >
                                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-black text-2xl">
                                            🍕
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-black text-gray-900 text-lg">{pizza.name}</div>
                                            <div className="text-sm text-gray-600">{pizza.desc}</div>
                                        </div>
                                        <div className="text-xl font-black text-red-600">{pizza.price}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-white">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-sm opacity-90 font-semibold">Promoção do Dia</div>
                                        <div className="text-3xl font-black">2 Pizzas = R$ 79</div>
                                    </div>
                                    <ShoppingCart className="w-12 h-12 opacity-80" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="delivery" className="py-24 bg-white border-y-4 border-red-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black uppercase text-gray-900 mb-4 tracking-tight">
                            Por que Escolher a BellaPizza?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                            Qualidade, sabor e praticidade em cada pedido.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center group hover:scale-105 transition-transform">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center border-3 border-red-200 group-hover:shadow-lg transition-shadow">
                                <Clock className="w-10 h-10 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-black uppercase text-gray-900 mb-3">Entrega Rápida</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Média de 30 minutos. Rastreie seu pedido em tempo real pelo app.
                            </p>
                        </div>

                        <div className="text-center group hover:scale-105 transition-transform">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center border-3 border-red-200 group-hover:shadow-lg transition-shadow">
                                <ChefHat className="w-10 h-10 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-black uppercase text-gray-900 mb-3">Massa Artesanal</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Prepare diariamente com fermento natural. Crocante por fora, macia por dentro.
                            </p>
                        </div>

                        <div className="text-center group hover:scale-105 transition-transform">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl flex items-center justify-center border-3 border-red-200 group-hover:shadow-lg transition-shadow">
                                <CreditCard className="w-10 h-10 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-black uppercase text-gray-900 mb-3">Pagamento Fácil</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Pix, cartão, dinheiro. Cashback de 5% em todos os pedidos online.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Highlight */}
            <section id="cardapio" className="py-24 bg-gradient-to-b from-red-50 to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black uppercase text-gray-900 mb-4 tracking-tight">
                            Nosso Cardápio
                        </h2>
                        <p className="text-xl text-gray-600">Mais de 30 sabores para você escolher</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            'Margherita 🧀',
                            'Calabresa 🌶️',
                            'Quatro Queijos 🧀',
                            'Portuguesa 🥚',
                            'Frango Catupiry 🍗',
                            'Pepperoni 🍕',
                        ].map((pizza, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-6 border-3 border-red-100 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-xl font-black text-gray-900">{pizza}</div>
                                    <Check className="w-6 h-6 text-green-500" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/register">
                            <Button className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-black uppercase px-12 py-6 text-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3">
                                Ver Cardápio Completo <ArrowRight className="w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contato" className="py-24 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <Pizza className="w-20 h-20 mx-auto mb-8 opacity-90" />
                    <h2 className="text-4xl lg:text-6xl font-black uppercase mb-8 leading-tight tracking-tight">
                        Está com Fome? Peça Agora!
                    </h2>
                    <p className="text-2xl opacity-95 mb-12 font-bold max-w-2xl mx-auto">
                        Delivery grátis para pedidos acima de R$ 60. Cupom: PIZZA2025
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                        <div className="flex items-center gap-3 justify-center">
                            <Phone className="w-6 h-6" />
                            <span className="text-xl font-bold">(11) 9 8765-4321</span>
                        </div>
                        <div className="flex items-center gap-3 justify-center">
                            <MapPin className="w-6 h-6" />
                            <span className="text-xl font-bold">Rua das Pizzas, 123</span>
                        </div>
                    </div>

                    <Link to="/register">
                        <Button className="bg-white text-red-600 px-14 py-7 text-xl font-black uppercase rounded-xl hover:shadow-2xl hover:scale-110 transition-all inline-flex items-center gap-3">
                            Fazer Pedido Online <Truck className="w-7 h-7" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-12 text-center text-gray-400 border-t-4 border-red-500">
                <p className="font-black uppercase text-sm tracking-widest">© 2025 BellaPizza. Sabor que Aquece o Coração.</p>
            </footer>
        </div>
    );
}
