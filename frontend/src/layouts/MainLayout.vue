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

const menuItems = [
  { label: 'Visão Geral', path: '/dashboard', icon: '📊' },
  { label: 'Meus Clientes', path: '/clients', icon: '👥' },
  { label: 'Financeiro', path: '/finance', icon: '💰' },
];

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
  <div class="flex h-screen bg-secondary/20">
    <aside class="w-64 bg-primary text-primary-foreground flex flex-col shadow-2xl z-20">
      <div class="h-20 flex items-center px-6 border-b border-white/10">
        <span class="text-xl font-bold flex items-center gap-2 tracking-tight">
          <span>🚀</span> SaaS Mestre
        </span>
      </div>

      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/70 hover:bg-white/10 hover:text-white transition-all font-medium"
          :class="{ '!bg-accent !text-accent-foreground shadow-md': route.path === item.path }"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-white/10 bg-black/20">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-md bg-accent flex items-center justify-center font-bold text-xs">
              {{ authStore.user?.full_name?.substring(0,2).toUpperCase() || 'AD' }}
            </div>
            <div class="text-sm">
              <p class="font-bold leading-none">{{ authStore.user?.full_name || 'Admin' }}</p>
              <p class="text-xs opacity-60">Online</p>
            </div>
          </div>
          <button @click="handleLogout" class="text-white/60 hover:text-red-400 transition-colors" title="Sair">
            🚪
          </button>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="h-20 bg-background border-b border-border flex items-center justify-between px-8 shadow-sm z-10">
        <h2 class="text-xl font-bold text-foreground">{{ pageTitle }}</h2>
        <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-secondary/80">
          🔔
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-8">
        <slot></slot>
      </main>
    </div>
  </div>
</template>