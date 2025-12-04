<script setup>
defineProps({
  isOpen: Boolean,
  title: String
});

defineEmits(['close']);
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="w-full max-w-lg bg-background rounded-xl shadow-2xl border border-border animate-in fade-in zoom-in duration-200">
      
      <header class="flex items-center justify-between px-6 py-4 border-b border-border">
        <h3 class="text-lg font-bold text-foreground">{{ title }}</h3>
        <button 
          class="text-muted-foreground hover:text-red-500 transition-colors text-2xl leading-none" 
          @click="$emit('close')"
        >
          &times;
        </button>
      </header>
      
      <div class="p-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>