import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Scissors,
    Sparkles,
    Clock,
    DollarSign,
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    TrendingUp,
    Star,
    Palette
} from 'lucide-react';

/**
 * Services Component - BeautyFlow  
 * 
 * Gestão completa de serviços do salão.
 * CRUD de serviços com categorias, preços, duração.
 * Analytics de serviços mais populares e rentáveis.
 */
export default function Services() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    // Mock services data
    const services = [
        {
            id: 1,
            name: 'Corte Feminino',
            category: 'Cabelo',
            icon: <Scissors className="w-5 h-5" />,
            price: 80,
            duration: 45,
            popularity: 95,
            monthlyBookings: 124,
            revenue: 9920,
            color: 'from-pink-500 to-rose-500'
        },
        {
            id: 2,
            name: 'Coloração Completa',
            category: 'Cabelo',
            icon: <Palette className="w-5 h-5" />,
            price: 280,
            duration: 120,
            popularity: 78,
            monthlyBookings: 45,
            revenue: 12600,
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 3,
            name: 'Hidratação Profunda',
            category: 'Cabelo',
            icon: <Sparkles className="w-5 h-5" />,
            price: 150,
            duration: 90,
            popularity: 82,
            monthlyBookings: 67,
            revenue: 10050,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 4,
            name: 'Manicure',
            category: 'Unhas',
            icon: <Sparkles className="w-5 h-5" />,
            price: 45,
            duration: 30,
            popularity: 92,
            monthlyBookings: 156,
            revenue: 7020,
            color: 'from-rose-500 to-pink-500'
        },
        {
            id: 5,
            name: 'Pedicure',
            category: 'Unhas',
            icon: <Sparkles className="w-5 h-5" />,
            price: 50,
            duration: 40,
            popularity: 88,
            monthlyBookings: 142,
            revenue: 7100,
            color: 'from-pink-500 to-rose-500'
        },
        {
            id: 6,
            name: 'Design de Sobrancelhas',
            category: 'Estética',
            icon: <Star className="w-5 h-5" />,
            price: 60,
            duration: 30,
            popularity: 85,
            monthlyBookings: 98,
            revenue: 5880,
            color: 'from-amber-500 to-orange-500'
        },
        {
            id: 7,
            name: 'Alongamento de Cílios',
            category: 'Estética',
            icon: <Star className="w-5 h-5" />,
            price: 200,
            duration: 90,
            popularity: 70,
            monthlyBookings: 34,
            revenue: 6800,
            color: 'from-violet-500 to-purple-500'
        },
        {
            id: 8,
            name: 'Limpeza de Pele',
            category: 'Estética',
            icon: <Sparkles className="w-5 h-5" />,
            price: 120,
            duration: 60,
            popularity: 75,
            monthlyBookings: 56,
            revenue: 6720,
            color: 'from-green-500 to-emerald-500'
        }
    ];

    const categories = ['Todos', 'Cabelo', 'Unhas', 'Estética', 'Spa'];

    const filteredServices = services.filter((service) => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalRevenue = services.reduce((sum, s) => sum + s.revenue, 0);
    const totalBookings = services.reduce((sum, s) => sum + s.monthlyBookings, 0);
    const avgPrice = totalRevenue / totalBookings;

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Catálogo de Serviços</h1>
                        <p className="text-gray-600">Gerencie todos os serviços oferecidos pelo salão</p>
                    </div>
                    <Link to="/beauty/dashboard">
                        <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                            ← Voltar ao Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-5 border-2 border-rose-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl">
                                <Scissors className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 font-semibold">Total de Serviços</div>
                                <div className="text-3xl font-black text-gray-900">{services.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border-2 border-green-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 font-semibold">Receita Mensal</div>
                                <div className="text-3xl font-black text-gray-900">R$ {(totalRevenue / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 font-semibold">Agendamentos/Mês</div>
                                <div className="text-3xl font-black text-gray-900">{totalBookings}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border-2 border-purple-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                                <Star className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 font-semibold">Ticket Médio</div>
                                <div className="text-3xl font-black text-gray-900">R$ {avgPrice.toFixed(0)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-6">
                    <div className="flex items-center justify-between gap-4">
                        {/* Category Filters */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-500" />
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${selectedCategory === cat
                                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar serviço..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 w-64"
                                />
                            </div>
                            <Button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg">
                                <Plus className="w-4 h-4 mr-2" />
                                Novo Serviço
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-2xl shadow-lg border-2 border-rose-100 hover:border-rose-300 transition-all overflow-hidden group"
                        >
                            {/* Header with Gradient */}
                            <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                        {service.icon}
                                    </div>
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                                        {service.category}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black mb-2">{service.name}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black">R$ {service.price}</span>
                                    <span className="text-white/80">/ {service.duration} min</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="p-6">
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="text-gray-600 font-semibold">Popularidade</span>
                                            <span className="font-bold text-rose-600">{service.popularity}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all"
                                                style={{ width: `${service.popularity}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-rose-50 rounded-xl p-3">
                                            <div className="text-xs text-gray-600 font-semibold mb-1">Agendamentos</div>
                                            <div className="text-2xl font-black text-gray-900">{service.monthlyBookings}</div>
                                            <div className="text-xs text-gray-500">este mês</div>
                                        </div>
                                        <div className="bg-green-50 rounded-xl p-3">
                                            <div className="text-xs text-gray-600 font-semibold mb-1">Receita</div>
                                            <div className="text-2xl font-black text-green-600">
                                                R$ {(service.revenue / 1000).toFixed(1)}k
                                            </div>
                                            <div className="text-xs text-gray-500">este mês</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-rose-300 text-rose-600 hover:bg-rose-50"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-red-300 text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Services Section */}
            <div className="max-w-7xl mx-auto mt-8">
                <div className="bg-white rounded-2xl shadow-xl border-2 border-rose-200 p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <Star className="w-7 h-7 text-yellow-500 fill-current" />
                        Top 3 Serviços Mais Rentáveis
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {services
                            .sort((a, b) => b.revenue - a.revenue)
                            .slice(0, 3)
                            .map((service, idx) => (
                                <div
                                    key={service.id}
                                    className="relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border-2 border-rose-200"
                                >
                                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                                        #{idx + 1}
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
                                        <p className="text-sm text-gray-600">{service.category}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-gray-600 font-semibold">Receita Mensal</div>
                                            <div className="text-3xl font-black text-green-600">
                                                R$ {(service.revenue / 1000).toFixed(1)}k
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-600 font-semibold">Agendamentos</div>
                                            <div className="text-3xl font-black text-blue-600">{service.monthlyBookings}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
