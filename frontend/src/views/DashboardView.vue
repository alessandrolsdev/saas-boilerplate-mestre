<script setup>
import MainLayout from '@/layouts/MainLayout.vue';

// Dados fake para visualização rápida (substitua por chamadas de API depois)
const stats = [
  { title: 'Receita Total', value: 'R$ 12.450', icon: '💰', color: 'green' },
  { title: 'Clientes Ativos', value: '48', icon: '👥', color: 'blue' },
  { title: 'Cobranças Pendentes', value: '5', icon: '⚠️', color: 'orange' },
];
</script>

<template>
  <MainLayout>
    <div class="dashboard-grid">
      <div class="welcome-card">
        <h3>Bem-vindo ao Painel de Controle</h3>
        <p>Aqui está o resumo da sua operação hoje. O sistema está rodando 100%.</p>
      </div>

      <div class="stats-row">
        <div v-for="(stat, index) in stats" :key="index" class="stat-card">
          <div class="icon-box" :class="stat.color">{{ stat.icon }}</div>
          <div class="info">
            <span class="label">{{ stat.title }}</span>
            <span class="value">{{ stat.value }}</span>
          </div>
        </div>
      </div>
      
      <div class="recent-activity">
        <h4>Atividade Recente</h4>
        <div class="placeholder-box">
          Gráfico de desempenho será carregado aqui...
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.welcome-card {
  background: linear-gradient(135deg, $primary-color 0%, darken($primary-color, 10%) 100%);
  color: white;
  padding: 2rem;
  border-radius: $radius-lg;
  box-shadow: $shadow-md;
  
  h3 { margin-bottom: 0.5rem; font-size: 1.5rem; }
  p { opacity: 0.9; }
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: $bg-surface;
  padding: 1.5rem;
  border-radius: $radius-lg;
  border: 1px solid $border-color;
  box-shadow: $shadow-sm;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-md;
  }
  
  .icon-box {
    width: 50px;
    height: 50px;
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    
    &.green { background: rgba($success, 0.1); color: $success; }
    &.blue { background: rgba($info, 0.1); color: $info; }
    &.orange { background: rgba($warning, 0.1); color: $warning; }
  }
  
  .info {
    display: flex;
    flex-direction: column;
    .label { font-size: 0.85rem; color: $text-muted; font-weight: 500; }
    .value { font-size: 1.5rem; font-weight: 700; color: $text-main; }
  }
}

.recent-activity {
  h4 { margin-bottom: 1rem; color: $text-main; }
  .placeholder-box {
    background: $bg-surface;
    border: 2px dashed $border-color;
    border-radius: $radius-lg;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-muted;
  }
}
</style>