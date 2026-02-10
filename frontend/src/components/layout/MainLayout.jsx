import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
    LayoutDashboard, Users, LogOut, Bell, Search,
    Menu, PieChart
} from 'lucide-react'
import { useAuth } from '@/stores/useAuth'
import { cn } from '@/lib/utils'

export default function MainLayout() {
    const navigate = useNavigate()
    const location = useLocation()
    const logout = useAuth((state) => state.logout)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Users, label: 'Clientes', path: '/clients' },
        { icon: PieChart, label: 'Financeiro', path: '/finance' },
    ]

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">

            {/* Sidebar Desktop */}
            <aside className={cn(
                "fixed h-screen border-r border-slate-800 bg-slate-950 z-50 transition-all duration-300 flex flex-col",
                sidebarOpen ? "w-64" : "w-20"
            )}>
                <div className="h-20 flex items-center justify-center border-b border-slate-800/50">
                    <div className="flex items-center gap-2 font-bold text-xl text-white">
                        {sidebarOpen ? (
                            <>SaaS<span className="text-indigo-500">Mestre</span></>
                        ) : (
                            <span className="text-indigo-500">SM</span>
                        )}
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
                                    isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                )}
                            >
                                <item.icon size={20} />
                                {sidebarOpen && <span>{item.label}</span>}

                                {!sidebarOpen && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                                        {item.label}
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800/50">
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
                <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full mix-blend-screen z-0" />

                <header className="sticky top-0 z-40 px-8 h-20 flex items-center justify-between backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg lg:hidden">
                            <Menu size={20} />
                        </button>
                        <div className="flex items-center gap-2 text-slate-400 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800/50">
                            <Search size={14} />
                            <input className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-slate-600" placeholder="Buscar..." />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-indigo-400/30"></div>
                    </div>
                </header>

                <div className="p-8 relative z-10 max-w-[1600px] mx-auto">
                    <Outlet />
                </div>
            </main>

        </div>
    )
}
