import { Navigate } from 'react-router-dom';

/**
 * Dashboard - Redirect inteligente para o dashboard principal
 * 
 * Como não temos autenticação ativa, redireciona para FinanceFlow por padrão.
 * Em produção, pode redirecionar baseado no último visitado ou preferência do usuário.
 */
export default function Dashboard() {
    // TODO: Em produção, ler localStorage ou preferência do usuário
    // const lastVisited = localStorage.getItem('lastDashboard') || '/finance-dashboard';
    // return <Navigate to={lastVisited} replace />;

    return <Navigate to="/finance-dashboard" replace />;
}
