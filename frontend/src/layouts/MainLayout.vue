<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

// Definição do Menu (Lego: Adicione novos módulos aqui)
const menuItems = [
  { label: 'Visão Geral', path: '/dashboard', icon: '📊' },
  { label: 'Meus Clientes', path: '/clients', icon: '👥' },
  { label: 'Financeiro', path: '/finance', icon: '💰' },
];

// Título dinâmico baseado na rota
const pageTitle = computed(() => {
  switch (route.name) {
    case 'dashboard': return 'Visão Geral';
    case 'clients': return 'Gestão de Clientes';
    case 'finance': return 'Controle Financeiro';
    default: return 'Sistema';
  }
});
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo-box">
          <span class="logo-icon">🚀</span>
          <span class="logo-text">SaaS Mestre</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="nav-item"
          :class="{ active: route.path === item.path }"
        >
          <span class="icon">{{ item.icon }}</span>
          <span class="label">{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="user-mini-profile">
          <div class="avatar">{{ authStore.user?.full_name?.substring(0,2).toUpperCase() || 'US' }}</div>
          <div class="info">
            <span class="name">{{ authStore.user?.full_name || 'Usuário' }}</span>
            <span class="role">Admin</span>
          </div>
        </div>
        <button @click="handleLogout" class="logout-btn" title="Sair">
          🚪
        </button>
      </div>
    </aside>

    <div class="main-wrapper">
      <header class="topbar">
        <h2 class="page-title">{{ pageTitle }}</h2>
        <div class="topbar-actions">
          <span class="notification-badge">🔔</span>
        </div>
      </header>

      <main class="content-area">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  height: 100vh;
  background-color: $bg-app;
  color: $text-main;
  font-family: $font-family;
}

// --- SIDEBAR ---
.sidebar {
  width: $sidebar-width;
  background-color: $primary-color;
  color: $text-inverse;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 4px 0 24px rgba(0,0,0,0.1); // Sombra para profundidade
  z-index: 10;

  .sidebar-header {
    height: $header-height;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    
    .logo-box {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      display: flex;
      gap: 0.5rem;
    }
  }

  .sidebar-nav {
    flex: 1;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: $radius-md;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    transition: all 0.2s;
    font-weight: 500;

    &:hover {
      background-color: rgba(255,255,255,0.05);
      color: $text-inverse;
    }

    &.active {
      background-color: $accent-color;
      color: white;
      box-shadow: $shadow-md;
    }
  }

  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid rgba(255,255,255,0.05);
    background-color: rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-mini-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      .avatar {
        width: 32px;
        height: 32px;
        background: $accent-color;
        border-radius: $radius-md;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: bold;
      }
      
      .info {
        display: flex;
        flex-direction: column;
        .name { font-size: 0.85rem; font-weight: 600; max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .role { font-size: 0.7rem; color: rgba(255,255,255,0.5); }
      }
    }

    .logout-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0.5rem;
      border-radius: $radius-md;
      transition: background 0.2s;
      
      &:hover { background-color: rgba(255,0,0,0.2); }
    }
  }
}

// --- MAIN AREA ---
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.topbar {
  height: $header-height;
  background-color: $bg-surface;
  border-bottom: 1px solid $border-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  
  .page-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: $primary-color;
  }
  
  .notification-badge {
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0.7;
    transition: opacity 0.2s;
    &:hover { opacity: 1; }
  }
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}
</style>