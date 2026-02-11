import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
    LayoutDashboard, Users, LogOut, Bell, Search,
    Menu, PieChart, Calendar, Scissors, Dumbbell,
    CreditCard, QrCode, CheckCircle2, DollarSign
} from 'lucide-react'
import { useAuth } from '@/stores/useAuth'
import { cn } from '@/lib/utils'
import ProductSwitcher from '../layout/ProductSwitcher'
import Breadcrumbs from './Breadcrumbs'

export default function MainLayout() {
    const navigate = useNavigate()
    const location = useLocation()
    const logout = useAuth((state) => state.logout)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    // Dynamic Menu Items based on Route
    const getMenuItems = () => {
        const path = location.pathname;

        if (path.includes('/beauty')) {
            return [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/beauty/dashboard' },
                { icon: Calendar, label: 'Agenda', path: '/beauty/appointments' },
                { icon: Users, label: 'Profissionais', path: '/beauty/professionals' },
                { icon: Scissors, label: 'Serviços', path: '/beauty/services' },
            ];
        } else if (path.includes('/gym')) {
            return [
                { icon: LayoutDashboard, label: 'Dashboard', path: '/gym/dashboard' },
                { icon: Users, label: 'Membros', path: '/gym/members' },
                { icon: QrCode, label: 'Check-ins', path: '/gym/check-ins' },
                { icon: CheckCircle2, label: 'Planos', path: '/gym/plans' },
                { icon: DollarSign, label: 'Pagamentos', path: '/gym/payments' },
            ];
        } else {
            // Default (Finance)
            return [
                { icon: LayoutDashboard, label: 'Visão Geral', path: '/finance-dashboard' },
                { icon: Users, label: 'Clientes', path: '/finance/clients' },
                { icon: CreditCard, label: 'Cobranças', path: '/finance/charges' },
            ];
        }
    };

    // Dynamic Theme based on Route
    const getTheme = () => {
        const path = location.pathname;
        if (path.includes('/beauty')) {
            return {
                name: 'beauty',
                gradient: 'from-rose-500 to-pink-500',
                sidebarBorder: 'border-rose-900/20',
                activeItem: 'bg-rose-600 text-white shadow-lg shadow-rose-500/20',
                ambient: 'bg-rose-600/10',
                accent: 'text-rose-500',
                logo: <>Beauty<span className="text-rose-500">Flow</span></>
            };
        } else if (path.includes('/gym')) {
            return {
                name: 'gym',
                gradient: 'from-orange-500 to-red-500',
                sidebarBorder: 'border-orange-900/20',
                activeItem: 'bg-orange-600 text-white shadow-lg shadow-orange-500/20',
                ambient: 'bg-orange-600/10',
                accent: 'text-orange-500',
                logo: <>Gym<span className="text-orange-500">Flow</span></>
            };
        } else {
            return {
                name: 'finance',
                gradient: 'from-indigo-500 to-purple-500',
                sidebarBorder: 'border-slate-800',
                activeItem: 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20',
                ambient: 'bg-indigo-600/10',
                accent: 'text-indigo-500',
                logo: <>SaaS<span className="text-indigo-500">Mestre</span></>
            };
        }
    };

    const menuItems = getMenuItems();
    const theme = getTheme();

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">

            {/* Sidebar Desktop */}
            <aside className={cn(
                "fixed h-screen border-r bg-slate-950 z-50 transition-all duration-300 flex flex-col",
                sidebarOpen ? "w-64" : "w-20",
                theme.sidebarBorder
            )}>
                <div className={cn("h-20 flex items-center justify-center border-b", theme.sidebarBorder)}>
                    <div className="flex items-center gap-2 font-bold text-xl text-white">
                        {sidebarOpen ? theme.logo : <span className={theme.accent}>SM</span>}
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group",
                                    isActive ? theme.activeItem : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                )}
                            >
                                <item.icon size={20} />
                                {sidebarOpen && <span>{item.label}</span>}

                                {!sidebarOpen && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                                        {item.label}
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </nav>

                <div className={cn("p-4 border-t", theme.sidebarBorder)}>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span>Sair</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "flex-1 min-h-screen transition-all duration-300 relative",
                sidebarOpen ? "ml-64" : "ml-20"
            )}>
                {/* Ambient Light */}
                <div className={cn(
                    "absolute top-0 left-0 w-[600px] h-[400px] blur-[120px] pointer-events-none rounded-full mix-blend-screen z-0",
                    theme.ambient
                )} />

                <header className={cn(
                    "sticky top-0 z-40 px-8 h-20 flex items-center justify-between backdrop-blur-xl bg-slate-950/80 border-b",
                    theme.sidebarBorder
                )}>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg lg:hidden">
                            <Menu size={20} />
                        </button>

                        {/* Product Switcher - NEW */}
                        <div className={cn("border-r pr-4 mr-2", theme.sidebarBorder)}>
                            <ProductSwitcher />
                        </div>

                        <div className={cn("hidden md:flex items-center gap-2 text-slate-400 bg-slate-900/50 px-3 py-1.5 rounded-lg border", theme.sidebarBorder)}>
                            <Search size={14} />
                            <input className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-slate-600" placeholder="Buscar..." />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                            <Bell size={20} />
                            <span className={cn("absolute top-2 right-2 w-2 h-2 rounded-full", theme.activeItem.split(' ')[0])}></span>
                        </button>
                        <div className={cn("w-8 h-8 rounded-full bg-gradient-to-tr border border-white/10", theme.gradient)}></div>
                    </div>
                </header>

                <div className="p-8 relative z-10 max-w-[1600px] mx-auto">
                    <Breadcrumbs />
                    <Outlet />
                </div>
            </main>

        </div>
    )
}
