<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

// Mostra o botão apenas se NÃO estiver na home, nem no login, nem no dashboard
const showBackButton = computed(() => {
  return ['/advogado', '/terraplanagem'].includes(route.path);
});
</script>

<template>
  <div>
    <div v-if="showBackButton" class="fixed top-6 left-6 z-[100] animate-in fade-in slide-in-from-left duration-500">
      <button 
        @click="router.push('/')" 
        class="flex items-center gap-2 bg-black/80 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-bold uppercase hover:bg-black border border-white/10 hover:border-white/40 transition-all shadow-xl"
      >
        ← Voltar ao Hub
      </button>
    </div>

    <router-view />
  </div>
</template>