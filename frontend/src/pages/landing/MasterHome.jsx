import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Dumbbell,
  DollarSign,
  ArrowRight,
  Code2,
  Zap,
  CheckCircle2,
  TrendingUp,
  Users,
  Clock,
  Shield,
  Star,
  Rocket,
  BarChart3,
  Smartphone,
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  Wallet,
  Pizza,
  Scale,
  Truck
} from 'lucide-react';

/**
 * MasterHome Component - Landing Page de Alta Conversão
 * 
 * Página principal showcaseando os 3 produtos SaaS com seções completas
 * de benefícios, estatísticas, prova social e persuasão.
 */
export default function MasterHome() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            SaaS Mestre<span className="text-purple-500">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#produtos" className="hover:text-white transition-colors">
              Produtos
            </a>
            <a href="#beneficios" className="hover:text-white transition-colors">
              Benefícios
            </a>
            <a href="#resultados" className="hover:text-white transition-colors">
              Resultados
            </a>
            <a href="#comparacao" className="hover:text-white transition-colors">
              Comparação
            </a>
          </div>
          <Link to="/finance-dashboard">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] shadow-lg px-5 py-2 text-sm h-auto">
              Acessar Plataforma
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section - APRIMORADO */}
      <section className="relative z-10 pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm font-semibold text-purple-300">
                  Mais de 3.000 empresas confiam
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-400">
                  Gerencie seu negócio com
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                  Inteligência
                </span>
              </h1>

              <p className="text-xl text-zinc-400 max-w-xl mb-12 leading-relaxed">
                Sistemas completos para <span className="text-white font-semibold">salões de beleza</span>,{' '}
                <span className="text-white font-semibold">academias</span> e{' '}
                <span className="text-white font-semibold">gestão financeira</span>.
                Automação, análise de dados e crescimento garantido.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-6 text-lg font-semibold rounded-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-105 transition-all inline-flex items-center gap-2">
                    Começar Grátis <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="#produtos">
                  <Button className="border-2 border-purple-500/30 text-white px-8 py-6 text-lg font-semibold rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                    Ver Produtos
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-black flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">4.9/5 de 2.847 avaliações</p>
                </div>
              </div>
            </div>

            {/* Right Column - Stats Cards */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:scale-105 transition-transform">
                  <TrendingUp className="w-10 h-10 text-green-400 mb-4" />
                  <div className="text-4xl font-black text-white mb-2">+287%</div>
                  <div className="text-sm text-zinc-400">Aumento médio de faturamento</div>
                </div>

                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:scale-105 transition-transform">
                  <Users className="w-10 h-10 text-blue-400 mb-4" />
                  <div className="text-4xl font-black text-white mb-2">18K+</div>
                  <div className="text-sm text-zinc-400">Usuários ativos diariamente</div>
                </div>

                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:scale-105 transition-transform">
                  <Clock className="w-10 h-10 text-purple-400 mb-4" />
                  <div className="text-4xl font-black text-white mb-2">-62%</div>
                  <div className="text-sm text-zinc-400">Redução em tarefas manuais</div>
                </div>

                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:scale-105 transition-transform">
                  <Rocket className="w-10 h-10 text-orange-400 mb-4" />
                  <div className="text-4xl font-black text-white mb-2">5min</div>
                  <div className="text-sm text-zinc-400">Para começar a usar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section id="produtos" className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Escolha o Sistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Perfeito</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Cada produto foi desenvolvido especificamente para seu nicho, com recursos que realmente importam.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Beauty SaaS */}
            <Link
              to="/beleza"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border-2 border-rose-500/20 hover:border-rose-500/50 transition-all duration-500 p-8 hover:scale-105"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-rose-400 transition-colors">
                  Beauty<span className="font-light">Flow</span>
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  Sistema completo de agendamentos online, gestão de profissionais e análise de desempenho para salões premium.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-sm text-rose-300">
                    <CheckCircle2 className="w-4 h-4" />
                    Agendamento 24/7 online
                  </div>
                  <div className="flex items-center gap-2 text-sm text-rose-300">
                    <CheckCircle2 className="w-4 h-4" />
                    Lembretes automáticos SMS
                  </div>
                  <div className="flex items-center gap-2 text-sm text-rose-300">
                    <CheckCircle2 className="w-4 h-4" />
                    Controle de comissões
                  </div>
                </div>

                <div className="flex items-center text-rose-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                  Explorar BeautyFlow <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* Gym SaaS */}
            <Link
              to="/academia"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 p-8 hover:scale-105"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-black uppercase mb-3 text-white group-hover:text-orange-400 transition-colors tracking-tight">
                  Gym<span className="font-light">Master</span>
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  Gestão completa de membros, check-in inteligente QR Code e dashboards de performance para academias.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-sm text-orange-300 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Check-in por QR Code
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-300 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Controle de frequência
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-300 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Gestão de planos
                  </div>
                </div>

                <div className="flex items-center text-orange-400 font-black uppercase group-hover:gap-3 gap-2 transition-all">
                  Explorar GymMaster <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* Financial SaaS */}
            <Link
              to="/financeiro"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border-2 border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-500 p-8 hover:scale-105"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">
                  SaaS Financeiro
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  Controle total de clientes, emissão de cobranças, faturamento e dashboards financeiros para empresas de serviços.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-sm text-indigo-300">
                    <CheckCircle2 className="w-4 h-4" />
                    Emissão de cobranças
                  </div>
                  <div className="flex items-center gap-2 text-sm text-indigo-300">
                    <CheckCircle2 className="w-4 h-4" />
                    Dashboard de MRR
                  </div>
                  <div className="flex items-center gap-2 text-sm text-indigo-300">
                    <CheckCircle2 className="w-4 h-4" />
                    Gestão de clientes
                  </div>
                </div>

                <div className="flex items-center text-indigo-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                  Explorar Financeiro <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Por que <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">SaaS Mestre</span>?
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Tecnologia de ponta, suporte dedicado e resultados comprovados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">100% Mobile</h3>
              <p className="text-zinc-400 leading-relaxed">
                Acesse de qualquer dispositivo. Design responsivo e apps nativos para iOS e Android.
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Segurança Total</h3>
              <p className="text-zinc-400 leading-relaxed">
                Criptografia de ponta, backups automáticos e conformidade com LGPD.
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Analytics Avançado</h3>
              <p className="text-zinc-400 leading-relaxed">
                Dashboards em tempo real com insights acionáveis e previsões com IA.
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Automação Inteligente</h3>
              <p className="text-zinc-400 leading-relaxed">
                Lembretes, notificações e workflows automáticos que economizam horas por dia.
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Suporte 24/7</h3>
              <p className="text-zinc-400 leading-relaxed">
                Equipe especializada pronta para ajudar via chat, email ou telefone.
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8 hover:scale-105 transition-transform">
              <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Setup em 5min</h3>
              <p className="text-zinc-400 leading-relaxed">
                Interface intuitiva com onboarding guiado. Comece a operar hoje mesmo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Section - NOVA */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-gradient-to-b from-zinc-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Automações <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Inteligentes</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Workflows poderosos que economizam horas por dia e eliminam tarefas repetitivas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-purple-500/20 rounded-2xl p-8 hover:scale-105 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Lembretes Automáticos</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-4">
                SMS e email automáticos para agendamentos, vencimentos e follow-ups. Redução de 80% no no-show.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-300">
                <CheckCircle2 className="w-4 h-4" />
                Disparo em horários personalizados
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-blue-500/20 rounded-2xl p-8 hover:scale-105 hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Campanhas de Email</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Sequências automatizadas de nutrição, reativação de clientes inativos e promoções segmentadas.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-300">
                <CheckCircle2 className="w-4 h-4" />
                Taxas de abertura 3x maiores
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-green-500/20 rounded-2xl p-8 hover:scale-105 hover:border-green-500/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Chatbot Inteligente</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Atendimento 24/7 via WhatsApp e chat. Responde dúvidas, agenda horários e qualifica leads automaticamente.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-300">
                <CheckCircle2 className="w-4 h-4" />
                IA treinada no seu negócio
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-orange-500/20 rounded-2xl p-8 hover:scale-105 hover:border-orange-500/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Sincronização de Agenda</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Integração com Google Calendar, Outlook e Apple. Bloqueio automático de horários conflitantes.
              </p>
              <div className="flex items-center gap-2 text-sm text-orange-300">
                <CheckCircle2 className="w-4 h-4" />
                Atualização em tempo real
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-pink-500/20 rounded-2xl p-8 hover:scale-105 hover:border-pink-500/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Relatórios Automáticos</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-4">
                PDFs gerados e enviados automaticamente. Faturamento, performance, churn - tudo sem esforço manual.
              </p>
              <div className="flex items-center gap-2 text-sm text-pink-300">
                <CheckCircle2 className="w-4 h-4" />
                Agendamento flexível (diário, semanal, mensal)
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-indigo-500/20 rounded-2xl p-8 hover:scale-105 hover:border-indigo-500/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Cobrança Recorrente</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Faturamento automático de mensalidades e assinaturas. Retry inteligente para cartões recusados.
              </p>
              <div className="flex items-center gap-2 text-sm text-indigo-300">
                <CheckCircle2 className="w-4 h-4" />
                Recuperação de 40% de pagamentos falhos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Pages Showcase - NOVA */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              LPs de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Alta Conversão</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Criamos landing pages otimizadas para cada nicho. Veja exemplos reais de nossos projetos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Legal LP */}
            <Link
              to="/advogado"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 to-yellow-500/10 border-2 border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:scale-105"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Scale className="w-8 h-8 text-white" />
                </div>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold uppercase mb-3">
                    Nicho: Jurídico
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    LexFlow
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Sistema jurídico com gestão de processos, intimações e documentos. Design sóbrio e autoritário.
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-blue-300">
                    <CheckCircle2 className="w-3 h-3" />
                    Tipografia serif profissional
                  </div>
                  <div className="flex items-center gap-2 text-xs text-blue-300">
                    <CheckCircle2 className="w-3 h-3" />
                    Cores azul/dourado elegantes
                  </div>
                  <div className="flex items-center gap-2 text-xs text-blue-300">
                    <CheckCircle2 className="w-3 h-3" />
                    CTAs otimizados para conversão
                  </div>
                </div>

                <div className="flex items-center text-blue-400 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                  Ver Landing Page <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Construction LP */}
            <Link
              to="/terraplanagem"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500/10 to-black border-2 border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="w-8 h-8 text-white" />
                </div>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-black uppercase mb-3">
                    Nicho: Construção
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white mb-2 tracking-tight">
                    TerraForce
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Gestão de frota, manutenção e custos para terraplanagem. Design industrial com faixa de alerta.
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-yellow-300 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Tema brutalist amarelo/preto
                  </div>
                  <div className="flex items-center gap-2 text-xs text-yellow-300 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Tipografia bold e impactante
                  </div>
                  <div className="flex items-center gap-2 text-xs text-yellow-300 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Visual de alta energia
                  </div>
                </div>

                <div className="flex items-center text-yellow-400 font-black uppercase text-sm group-hover:gap-2 gap-1 transition-all">
                  Ver Landing Page <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Pizzaria LP */}
            <Link
              to="/pizzaria"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/20 hover:border-red-500/50 transition-all duration-500 hover:scale-105"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Pizza className="w-8 h-8 text-white" />
                </div>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-black uppercase mb-3">
                    Nicho: Delivery
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white mb-2 tracking-tight">
                    BellaPizza
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Delivery de pizzaria com cardápio online, rastreio de pedidos e promoções. Design appetizing.
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-red-300 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Cores quentes vermelho/amarelo
                  </div>
                  <div className="flex items-center gap-2 text-xs text-red-300 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Visual que estimula apetite
                  </div>
                  <div className="flex items-center gap-2 text-xs text-red-300 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    CTAs para pedido imediato
                  </div>
                </div>

                <div className="flex items-center text-red-400 font-black uppercase text-sm group-hover:gap-2 gap-1 transition-all">
                  Ver Landing Page <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <p className="text-zinc-400 text-lg mb-6">
              <span className="text-white font-bold">Quer uma LP personalizada para seu nicho?</span> Nós criamos do zero com foco em conversão.
            </p>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-10 py-6 text-lg font-bold rounded-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-105 transition-all inline-flex items-center gap-3">
                Solicitar Orçamento <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="resultados" className="relative z-10 py-24 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Resultados <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Comprovados</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Dados reais de mais de 3.000 empresas que transformaram seus negócios.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-600 mb-4">
                +287%
              </div>
              <div className="text-lg font-semibold text-white mb-2">Aumento de Faturamento</div>
              <div className="text-sm text-zinc-500">Média em 12 meses</div>
            </div>

            <div className="text-center">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600 mb-4">
                -62%
              </div>
              <div className="text-lg font-semibold text-white mb-2">Redução de No-Show</div>
              <div className="text-sm text-zinc-500">Com lembretes automáticos</div>
            </div>

            <div className="text-center">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-600 mb-4">
                18h
              </div>
              <div className="text-lg font-semibold text-white mb-2">Economizadas/Semana</div>
              <div className="text-sm text-zinc-500">Em tarefas administrativas</div>
            </div>

            <div className="text-center">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600 mb-4">
                98%
              </div>
              <div className="text-lg font-semibold text-white mb-2">Satisfação</div>
              <div className="text-sm text-zinc-500">NPS de 72 pontos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparacao" className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              SaaS Mestre vs. <span className="text-zinc-600">Planilhas</span>
            </h2>
            <p className="text-xl text-zinc-400">
              Veja por que milhares de empresas fizeram a mudança.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 px-6 text-zinc-400 font-medium">Recurso</th>
                  <th className="text-center py-4 px-6 text-purple-400 font-bold">SaaS Mestre</th>
                  <th className="text-center py-4 px-6 text-zinc-600 font-medium">Planilhas</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Agendamento Online 24/7', true, false],
                  ['Lembretes Automáticos', true, false],
                  ['Dashboard em Tempo Real', true, false],
                  ['Acesso Mobile', true, false],
                  ['Backup Automático', true, false],
                  ['Suporte Técnico', true, false],
                  ['Relatórios com IA', true, false],
                  ['Tempo de Setup', '5 minutos', 'Horas/Dias'],
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-zinc-800/50">
                    <td className="py-4 px-6 text-white">{row[0]}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof row[1] === 'boolean' ? (
                        row[1] ? (
                          <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-zinc-700 mx-auto"></div>
                        )
                      ) : (
                        <span className="text-purple-400 font-semibold">{row[1]}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row[2] === 'boolean' ? (
                        row[2] ? (
                          <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-zinc-700 mx-auto"></div>
                        )
                      ) : (
                        <span className="text-zinc-600">{row[2]}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
            Pronto para <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Transformar</span> seu Negócio?
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Junte-se a mais de 3.000 empresas que já automatizaram suas operações e aumentaram o faturamento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-12 py-7 text-xl font-bold rounded-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-105 transition-all inline-flex items-center gap-3">
                Começar Teste Grátis <Zap className="w-6 h-6" />
              </Button>
            </Link>
            <a href="#produtos">
              <Button className="border-2 border-purple-500/30 text-white px-12 py-7 text-xl font-bold rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                Ver Demonstração
              </Button>
            </a>
          </div>

          <p className="text-sm text-zinc-500">
            ✓ Sem cartão de crédito &nbsp;·&nbsp; ✓ 14 dias grátis &nbsp;·&nbsp; ✓ Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-zinc-600 text-sm border-t border-white/5 relative z-10">
        <p className="mb-4">© 2025 SaaS Mestre. Soluções Verticais de Alto Impacto.</p>
        <div className="flex justify-center gap-6 text-xs">
          <a href="#" className="hover:text-zinc-400 transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Privacidade</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Contato</a>
        </div>
      </footer>
    </div>
  );
}
