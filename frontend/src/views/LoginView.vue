<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    await authStore.login(email.value, password.value);
    router.push('/dashboard');
  } catch (error) {
    errorMessage.value = 'Email ou senha incorretos.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-secondary/30">
    <div class="w-full max-w-md p-8 bg-background rounded-2xl shadow-xl border border-border">
      
      <div class="text-center mb-8">
        <span class="text-4xl mb-2 block">🚀</span>
        <h1 class="text-2xl font-bold text-foreground">SaaS Mestre</h1>
        <p class="text-muted-foreground text-sm">Bem-vindo de volta</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Email</label>
          <input 
            type="email" 
            v-model="email" 
            required 
            placeholder="admin@exemplo.com" 
            class="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all bg-background text-foreground"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Senha</label>
          <input 
            type="password" 
            v-model="password" 
            required 
            placeholder="••••••••" 
            class="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all bg-background text-foreground"
          />
        </div>

        <div v-if="errorMessage" class="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
          {{ errorMessage }}
        </div>

        <button 
          type="submit" 
          :disabled="isLoading" 
          class="w-full py-3 px-4 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {{ isLoading ? 'Entrando...' : 'Acessar Painel' }}
        </button>
      </form>
      
      <div class="mt-6 text-center text-sm">
        <a href="#" class="text-muted-foreground hover:text-accent transition-colors">Esqueceu a senha?</a>
      </div>
    </div>
  </div>
</template>