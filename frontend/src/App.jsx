import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth } from './stores/useAuth'

// Pages & Layouts
import MainLayout from './components/layout/MainLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Charges from './pages/Charges'

// Dashboards Personalizados
import BeautyDashboard from './pages/beauty/BeautyDashboard'
import GymDashboard from './pages/gym/GymDashboard'
import FinanceDashboard from './pages/finance/FinanceDashboard'

// Landing Pages
import MasterHome from './pages/landing/MasterHome'
import LegalLP from './pages/landing/LegalLP'
import ConstructionLP from './pages/landing/ConstructionLP'
import BeautySalonLP from './pages/landing/BeautySalonLP'
import GymLP from './pages/landing/GymLP'
import PizzariaLP from './pages/landing/PizzariaLP'
import FinancialLP from './pages/landing/FinancialLP'

// React Query Client
const queryClient = new QueryClient()

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated)
  return isAuthenticated ? (children || <Outlet />) : <Navigate to="/login" />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Pages */}
          <Route path="/" element={<MasterHome />} />
          <Route path="/beleza" element={<BeautySalonLP />} />
          <Route path="/academia" element={<GymLP />} />
          <Route path="/financeiro" element={<FinancialLP />} />

          {/* Landing Pages de Alta Conversão (Nichos) */}
          <Route path="/advogado" element={<LegalLP />} />
          <Route path="/terraplanagem" element={<ConstructionLP />} />
          <Route path="/pizzaria" element={<PizzariaLP />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Main Dashboard (pode redirecionar para um dos 3 produtos) */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Financial SaaS Dashboard */}
            <Route path="/finance-dashboard" element={<FinanceDashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/finance" element={<Charges />} />

            {/* Beauty SaaS Dashboard */}
            <Route path="/beauty/dashboard" element={<BeautyDashboard />} />
            {/* TODO: Adicionar rotas /beauty/appointments, /beauty/services, /beauty/professionals */}

            {/* Gym SaaS Dashboard */}
            <Route path="/gym/dashboard" element={<GymDashboard />} />
            {/* TODO: Adicionar rotas /gym/members, /gym/check-ins, /gym/plans */}

            {/* Fallback for protected routes */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
