<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="dashboard-container">
    <aside class="sidebar">
      <div class="logo">SaaS Mestre</div>
      <nav>
        <a href="#" class="active">Visão Geral</a>
        <a href="#">Clientes</a>
        <a href="#">Financeiro</a>
      </nav>
    </aside>

    <main class="content">
      <header>
        <h1>Bem-vindo de volta!</h1>
        <button @click="handleLogout" class="logout-btn">Sair</button>
      </header>
      
      <div class="cards-grid">
        <div class="card">
          <h3>Status do Token</h3>
          <p class="token-status">Ativo e Seguro 🔒</p>
        </div>
        <div class="card">
          <h3>Próxima Missão</h3>
          <p>Implementar gestão de clientes.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: $background-bg;
}

.sidebar {
  width: 250px;
  background-color: white;
  padding: 2rem;
  border-right: 1px solid #e2e8f0;

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: $primary-color;
    margin-bottom: 2rem;
  }

  nav a {
    display: block;
    padding: 0.75rem 0;
    color: $secondary-color;
    transition: color 0.2s;

    &:hover, &.active {
      color: $accent-color;
      font-weight: 600;
    }
  }
}

.content {
  flex: 1;
  padding: 2rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
      color: $primary-color;
    }
  }
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: $border-radius;
  cursor: pointer;
  color: #ef4444;
  font-weight: 600;

  &:hover {
    background-color: #fef2f2;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: $border-radius;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  h3 {
    margin-bottom: 0.5rem;
    color: $secondary-color;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    color: $text-main;
    font-weight: 500;
  }
  
  .token-status {
    color: #10b981; // Verde sucesso
  }
}
</style>