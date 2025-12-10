<script setup>
/**
 * Dashboard Master.
 * 
 * Componente principal do painel de controle. Exibe KPIs, gráficos de receita/clientes
 * e tabelas de gestão. Utiliza ApexCharts para visualização de dados.
 */
import { ref, onMounted, computed, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import dashboardService from '@/services/dashboard';
import clientService from '@/services/clients';
import {
  LayoutDashboard, Users, Wallet, Bell, Search,
  TrendingUp, TrendingDown, Plus, Zap, PieChart, Shield,
  X, Filter, MoreHorizontal, ChevronLeft, ChevronRight
} from 'lucide-vue-next';

// --- ESTADO ---
const statsData = ref(null);
const allClients = ref([]); 
const loading = ref(true);
const activeTab = ref('overview');
const selectedClient = ref(null); 
const isCommandOpen = ref(false);

// Filtros e Paginação
const clientSearch = ref('');
const clientFilterStatus = ref('Todos');
const currentPage = ref(1);
const itemsPerPage = 8;

// Controles do Gráfico
const chartRange = ref('6m'); 

// --- CONFIGURAÇÃO DO APEXCHARTS ---
const chartOptions = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 350,
      fontFamily: 'Inter, sans-serif',
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true, easing: 'easeinout', speed: 800 }
    },
    colors: ['#6366f1', '#10b981'], // Indigo (Receita) e Emerald (Clientes)
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 100]
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: [3, 2],
      dashArray: [0, 5]
    },
    xaxis: {
      categories: statsData.value ? Object.keys(statsData.value.chart) : [],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
      tooltip: { enabled: false },
      crosshairs: { show: true, stroke: { color: '#334155', dashArray: 4 } }
    },
    yaxis: [
      {
        seriesName: 'Receita',
        labels: {
          style: { colors: '#94a3b8' },
          formatter: (value) => `R$ ${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`
        }
      },
      {
        opposite: true,
        seriesName: 'Novos Clientes',
        labels: {
          style: { colors: '#94a3b8' },
          formatter: (value) => Math.floor(value)
        }
      }
    ],
    grid: {
      borderColor: '#334155',
      strokeDashArray: 4,
      yaxis: { lines: { show: true } }
    },
    theme: { mode: 'dark' },
    // Configuração do Tooltip personalizado
    tooltip: {
      theme: 'dark',
      followCursor: true,
      intersect: false,
      shared: true,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
      },
      x: { show: true },
      y: {
        formatter: function (y, { seriesIndex }) {
          if(seriesIndex === 0) return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(y);
          return Math.floor(y) + " clientes";
        }
      },
      marker: { show: true },
    },
    legend: { show: true, position: 'top', horizontalAlign: 'right' }
  };
});

const chartSeries = computed(() => {
  if (!statsData.value?.chart) return [];
  
  const raw = statsData.value.chart;
  const dates = Object.keys(raw);
  
  return [
    {
      name: 'Receita (MRR)',
      type: 'area',
      data: dates.map(d => raw[d].revenue)
    },
    {
      name: 'Novos Clientes',
      type: 'line',
      data: dates.map(d => raw[d].clients)
    }
  ];
});

// --- CARREGAMENTO DE DADOS ---
const loadDashboard = async () => {
  try {
    loading.value = true;
    statsData.value = await dashboardService.getStats(chartRange.value);
    allClients.value = await clientService.getAll();
  } catch (error) {
    console.error("Erro ao carregar dashboard:", error);
  } finally {
    loading.value = false;
  }
};

// --- COMPUTEDS GERAIS ---
const limitedRecentClients = computed(() => [...allClients.value].slice(0, 5));
const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);

const kpis = computed(() => {
  const ov = statsData.value?.overview || {};
  return [
    { label: 'MRR (Receita)', value: formatCurrency(ov.mrr?.value), trend: ov.mrr?.trend, isPositive: (ov.mrr?.trend >= 0), icon: Wallet },
    { label: 'Clientes Ativos', value: ov.active_clients?.value || 0, trend: ov.active_clients?.trend, isPositive: (ov.active_clients?.trend >= 0), icon: Users },
    { label: 'Churn Rate', value: (ov.churn?.value || 0).toFixed(1) + '%', trend: ov.churn?.trend, isPositive: (ov.churn?.value < 2), icon: TrendingDown },
    { label: 'Ticket Médio', value: formatCurrency(ov.avg_ticket?.value), trend: 0, isPositive: true, icon: Zap },
  ];
});

// Donut Chart (Distribuição)
const planDistribution = computed(() => {
  if (!statsData.value?.distribution) return [];
  const dist = statsData.value.distribution;
  const config = { 'Basic': {color:'#3b82f6'}, 'Pro': {color:'#a855f7'}, 'Enterprise': {color:'#10b981'} };
  
  return {
    series: Object.values(dist),
    labels: Object.keys(dist),
    colors: Object.keys(dist).map(k => config[k]?.color || '#ccc')
  };
});

const donutOptions = computed(() => ({
  chart: { type: 'donut', background: 'transparent' },
  labels: planDistribution.value.labels,
  colors: planDistribution.value.colors,
  stroke: { show: true, colors: ['#1e293b'], width: 2 },
  dataLabels: { enabled: false },
  legend: { position: 'bottom', labels: { colors: '#94a3b8' } },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          name: { show: true, color: '#94a3b8' },
          value: { show: true, color: '#fff', fontSize: '24px', fontWeight: 'bold' },
          total: { show: true, showAlways: true, label: 'Total', color: '#94a3b8' }
        }
      }
    }
  }
}));

// --- FILTROS LISTA CLIENTES ---
const filteredClients = computed(() => {
  let result = allClients.value;
  if (clientSearch.value) {
    const term = clientSearch.value.toLowerCase();
    result = result.filter(c => c.full_name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term));
  }
  if (clientFilterStatus.value !== 'Todos') result = result.filter(c => c.status === clientFilterStatus.value);
  return result;
});
const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredClients.value.slice(start, start + itemsPerPage);
});

watch(chartRange, loadDashboard);
onMounted(loadDashboard);
</script>

<template>
  <div class="flex min-h-screen bg-[#0f172a] font-sans text-slate-200 selection:bg-indigo-500/30">

    <aside class="w-20 lg:w-72 fixed h-screen border-r border-slate-800 bg-[#0f172a] z-50 flex flex-col">
       <div class="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800/50">
        <span class="ml-3 font-bold text-xl hidden lg:block text-white">SaaS<span class="text-indigo-500">Mestre</span></span>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
         <button v-for="tab in ['overview', 'clients', 'analytics']" :key="tab" @click="activeTab = tab" 
          :class="`w-full flex items-center gap-3 px-4 py-3 rounded-xl capitalize transition-all ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`">
          <LayoutDashboard v-if="tab==='overview'" :size="20"/><Users v-if="tab==='clients'" :size="20"/><PieChart v-if="tab==='analytics'" :size="20"/>
          <span class="hidden lg:block">{{ tab }}</span>
         </button>
      </nav>
    </aside>

    <main class="flex-1 ml-20 lg:ml-72 bg-[#0f172a] h-screen overflow-y-auto relative scroll-smooth">
      <div class="absolute top-0 left-0 w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full mix-blend-screen"></div>

      <header class="sticky top-0 z-30 px-8 h-20 flex items-center justify-between backdrop-blur-xl bg-[#0f172a]/80 border-b border-slate-800/50">
         <div class="text-slate-400 text-sm flex gap-2 items-center"><Search :size="16"/> Buscar...</div>
         <div class="flex gap-4"><Bell :size="20" class="text-slate-400"/></div>
      </header>

      <div class="p-8 max-w-[1600px] mx-auto space-y-8 relative z-10">
        
        <div v-if="activeTab === 'overview'" class="space-y-6">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-white">Visão Geral</h1>
                <button class="bg-white text-indigo-900 px-4 py-2 rounded-lg font-bold flex gap-2 hover:bg-slate-200"><Plus :size="18"/> Nova Ação</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div v-for="(stat, idx) in kpis" :key="idx" class="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
                    <div class="flex justify-between mb-4">
                        <div class="p-3 rounded-xl bg-slate-800 text-indigo-400 border border-slate-700"><component :is="stat.icon" :size="24" /></div>
                        <div :class="`text-xs font-bold px-2 py-1 rounded-full flex gap-1 items-center ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`">
                            <component :is="stat.isPositive ? TrendingUp : TrendingDown" :size="12" /> {{ typeof stat.trend === 'number' ? Math.abs(stat.trend).toFixed(1) + '%' : stat.trend }}
                        </div>
                    </div>
                    <div class="text-slate-400 text-sm">{{ stat.label }}</div>
                    <div class="text-3xl font-bold text-white mt-1">{{ stat.value }}</div>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div class="xl:col-span-2 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 relative">
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <h3 class="text-lg font-bold text-white">Performance Financeira</h3>
                            <p class="text-sm text-slate-400">Receita vs Aquisição de Clientes</p>
                        </div>
                        <div class="bg-slate-900 border border-slate-700 p-1 rounded-lg flex text-xs">
                             <button v-for="r in ['7d', '30d', '6m', '12m']" :key="r" @click="chartRange = r" 
                                :class="`px-3 py-1 rounded transition-all uppercase ${chartRange === r ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`">
                                {{ r }}
                            </button>
                        </div>
                    </div>

                    <div class="w-full h-[350px]">
                        <VueApexCharts type="area" height="350" :options="chartOptions" :series="chartSeries" />
                    </div>
                </div>

                <div class="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-center">
                    <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-6">Distribuição</h3>
                    <div class="h-[250px] flex items-center justify-center">
                        <VueApexCharts type="donut" width="320" :options="donutOptions" :series="planDistribution.series" />
                    </div>
                </div>
            </div>

            <div class="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
                <div class="p-6 border-b border-slate-700/50 flex justify-between"><h3 class="font-bold text-white">Transações Recentes</h3></div>
                <table class="w-full text-left text-sm text-slate-300">
                    <tbody class="divide-y divide-slate-700/50">
                        <tr v-for="c in limitedRecentClients" :key="c.id" class="hover:bg-slate-700/30">
                            <td class="p-4 font-bold text-white">{{ c.full_name }}</td>
                            <td class="p-4"><span :class="`px-2 py-1 rounded text-xs ${c.status==='Ativo'?'bg-emerald-500/10 text-emerald-400':'bg-rose-500/10 text-rose-400'}`">{{ c.status }}</span></td>
                            <td class="p-4 font-mono text-right">{{ formatCurrency(c.mrr) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="activeTab === 'clients'" class="space-y-6">
             <div class="flex justify-between items-center"><h1 class="text-3xl font-bold text-white">Gestão de Clientes</h1></div>
             <div class="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl flex gap-4">
                 <div class="relative flex-1"><Search class="absolute left-3 top-3 text-slate-500" :size="18"/><input v-model="clientSearch" placeholder="Buscar..." class="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white outline-none"/></div>
                 <select v-model="clientFilterStatus" class="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"><option>Todos</option><option>Ativo</option><option>Inadimplente</option><option>Cancelado</option></select>
             </div>
             <div class="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
                 <table class="w-full text-left text-sm text-slate-300">
                     <thead class="bg-slate-900/50 text-slate-400 uppercase font-bold text-xs"><tr><th class="p-4">Cliente</th><th class="p-4">Plano</th><th class="p-4">Status</th><th class="p-4">MRR</th></tr></thead>
                     <tbody class="divide-y divide-slate-700/50">
                         <tr v-for="client in paginatedClients" :key="client.id" class="hover:bg-slate-700/30 group">
                             <td class="p-4"><div class="font-bold text-white">{{ client.full_name }}</div><div class="text-xs text-slate-500">{{ client.email }}</div></td>
                             <td class="p-4"><span class="bg-slate-700 px-2 py-1 rounded text-xs text-slate-200">{{ client.plan }}</span></td>
                             <td class="p-4"><span :class="`px-2 py-1 rounded-full text-xs font-bold ${client.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`">{{ client.status }}</span></td>
                             <td class="p-4 font-mono font-bold text-white">{{ formatCurrency(client.mrr) }}</td>
                         </tr>
                     </tbody>
                 </table>
                 <div class="p-4 border-t border-slate-700/50 bg-slate-900/30 flex justify-end gap-2">
                     <button @click="currentPage--" :disabled="currentPage === 1" class="p-2 rounded hover:bg-slate-700 disabled:opacity-50"><ChevronLeft :size="16"/></button>
                     <button @click="currentPage++" :disabled="paginatedClients.length < itemsPerPage" class="p-2 rounded hover:bg-slate-700 disabled:opacity-50"><ChevronRight :size="16"/></button>
                 </div>
             </div>
        </div>

      </div>
    </main>
  </div>
</template>