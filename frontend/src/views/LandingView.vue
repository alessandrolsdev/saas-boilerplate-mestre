<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
// Importamos os 3 componentes de Landing Page
import MasterHome from '@/components/landing/MasterHome.vue';
import LegalLP from '@/components/landing/LegalLP.vue';
import ConstructionLP from '@/components/landing/ConstructionLP.vue';

const route = useRoute();

// Define qual componente mostrar baseado na ROTA (URL)
const currentComponent = computed(() => {
  if (route.path === '/advogado') return LegalLP;
  if (route.path === '/terraplanagem') return ConstructionLP;
  // Se não for nenhum nicho específico, mostra a MASTER (Home do Dev)
  return MasterHome;
});
</script>

<template>
  <component :is="currentComponent" />
</template>