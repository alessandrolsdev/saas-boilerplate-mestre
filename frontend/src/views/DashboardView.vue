<script setup>
import MainLayout from '@/layouts/MainLayout.vue';

const stats = [
  { title: 'Receita Total', value: 'R$ 12.450', icon: '💰', color: 'bg-green-100 text-green-600' },
  { title: 'Clientes Ativos', value: '48', icon: '👥', color: 'bg-blue-100 text-blue-600' },
  { title: 'Cobranças Pendentes', value: '5', icon: '⚠️', color: 'bg-yellow-100 text-yellow-600' },
];
</script>

<template>
  <MainLayout>
    <div class="space-y-8">
      <div class="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl shadow-lg">
        <h3 class="text-2xl font-bold mb-2">Bem-vindo ao Painel de Controle</h3>
        <p class="opacity-90">Aqui está o resumo da sua operação hoje. O sistema está rodando 100%.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(stat, index) in stats" :key="index" class="bg-background p-6 rounded-xl border border-border shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div :class="`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${stat.color}`">
            {{ stat.icon }}
          </div>
          <div>
            <p class="text-sm text-muted font-medium uppercase tracking-wide">{{ stat.title }}</p>
            <p class="text-2xl font-bold text-foreground">{{ stat.value }}</p>
          </div>
        </div>
      </div>
      
      <div class="border-2 border-dashed border-border rounded-xl h-64 flex items-center justify-center text-muted">
        Gráfico de desempenho será carregado aqui...
      </div>
    </div>
  </MainLayout>
</template>