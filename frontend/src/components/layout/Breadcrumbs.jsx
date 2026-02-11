import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeNames = {
    // Gym
    'gym': 'GymFlow',
    'dashboard': 'Dashboard',
    'members': 'Membros',
    'check-ins': 'Check-ins',
    'plans': 'Planos',
    'payments': 'Pagamentos',

    // Beauty
    'beauty': 'BeautyFlow',
    'appointments': 'Agenda',
    'services': 'Serviços',
    'professionals': 'Profissionais',

    // Finance
    'finance': 'FinanceFlow',
    'finance-dashboard': 'Visão Geral',
    'clients': 'Clientes',
    'charges': 'Cobranças'
};

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Don't show on main dashboard if it's the only item
    if (pathnames.length === 0) return null;

    return (
        <nav className="flex items-center text-sm text-zinc-500 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
            </Link>

            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const name = routeNames[value] || value;

                return (
                    <div key={to} className="flex items-center">
                        <ChevronRight className="w-4 h-4 mx-2 text-zinc-600" />
                        {isLast ? (
                            <span className="text-zinc-200 font-bold px-2 py-1 rounded-md bg-white/5 border border-white/5 cursor-default">
                                {name.charAt(0).toUpperCase() + name.slice(1)}
                            </span>
                        ) : (
                            <Link to={to} className="hover:text-white hover:underline underline-offset-4 transition-all">
                                {name.charAt(0).toUpperCase() + name.slice(1)}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
