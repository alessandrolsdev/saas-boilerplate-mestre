import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Pages & Layouts
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

// Vistas internas Beauty
import Appointments from './pages/beauty/Appointments'
import Services from './pages/beauty/Services'
import Professionals from './pages/beauty/Professionals'

// Vistas internas Gym
import Members from './pages/gym/Members'
import CheckIns from './pages/gym/CheckIns'

// React Query Client
const queryClient = new QueryClient()

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

          {/* Authentication (mantidas para compatibilidade, mas não são mais obrigatórias) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes - AGORA PÚBLICAS (sem autenticação) */}

          {/* Main Dashboard (pode redirecionar para um dos 3 produtos) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Financial SaaS Dashboard */}
          <Route path="/finance-dashboard" element={<FinanceDashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/finance" element={<Charges />} />

          {/* Beauty SaaS Dashboard */}
          <Route path="/beauty/dashboard" element={<BeautyDashboard />} />
          <Route path="/beauty/appointments" element={<Appointments />} />
          <Route path="/beauty/services" element={<Services />} />
          <Route path="/beauty/professionals" element={<Professionals />} />

          {/* Gym SaaS Dashboard */}
          <Route path="/gym/dashboard" element={<GymDashboard />} />
          <Route path="/gym/members" element={<Members />} />
          <Route path="/gym/check-ins" element={<CheckIns />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
