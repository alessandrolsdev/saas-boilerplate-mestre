<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'master-primary'
  },
  icon: Object // Componente do ícone Lucide
});

const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-300 transform hover:-translate-y-1 cursor-pointer";

const variants = {
  // Tema Jurídico
  'legal-primary': "bg-[#C5A059] text-slate-900 rounded-sm hover:bg-[#d4b06a] shadow-[0_0_20px_rgba(197,160,89,0.3)] font-serif tracking-wide",
  'legal-outline': "border border-[#C5A059] text-[#C5A059] rounded-sm hover:bg-[#C5A059] hover:text-slate-900 font-serif tracking-wide",
  
  // Tema Engenharia
  'eng-primary': "bg-[#FFD700] text-black font-black uppercase tracking-wider rounded-none border-b-4 border-black hover:bg-yellow-400 active:border-b-0 active:translate-y-1 shadow-lg",
  'eng-secondary': "bg-zinc-900 text-white font-bold uppercase tracking-wider rounded-none hover:bg-zinc-800 border-b-4 border-zinc-600",
  
  // Tema Master (Dev/Studio)
  'master-primary': "bg-white text-black rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] font-bold tracking-tight",
  'master-secondary': "bg-white/10 text-white backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20",
};

const classes = computed(() => `${baseStyles} ${variants[props.variant] || variants['master-primary']}`);
</script>

<template>
  <button :class="classes">
    <slot></slot>
    <component :is="icon" v-if="icon" class="ml-2 w-5 h-5" />
  </button>
</template>