<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { niches } from '@/data/niches';

const route = useRoute();
// Lógica para detectar se é industrial (para a faixa amarela)
const niche = computed(() => niches[route.meta.niche || 'default'] || niches.default);
const isIndustrial = computed(() => niche.value.style.mode === 'industrial');
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans transition-colors duration-500">
    
    <div v-if="isIndustrial" class="h-3 w-full industrial-tape border-b-4 border-black"></div>

    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <div class="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span class="text-2xl">🚀</span>
          <span>SaaS Mestre</span>
        </div>
        
        <nav class="hidden md:flex gap-8 text-sm font-medium text-foreground/70">
          <a href="#features" class="hover:text-primary transition-colors">Funcionalidades</a>
          <a href="#pricing" class="hover:text-primary transition-colors">Planos</a>
          <a href="#contact" class="hover:text-primary transition-colors">Contato</a>
        </nav>

        <div class="flex items-center gap-4">
          <router-link to="/login">
            <button class="px-6 py-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all text-sm font-semibold">
              Área do Cliente
            </button>
          </router-link>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot></slot>
    </main>

    <footer class="border-t border-border bg-background py-12">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-center md:text-left">
          <h4 class="font-bold text-lg">SaaS Mestre</h4>
          <p class="text-sm text-muted-foreground">Construindo o futuro, um bloco de cada vez.</p>
        </div>
        <p class="text-sm text-muted-foreground">© 2025 Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>