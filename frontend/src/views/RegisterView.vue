<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  full_name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errorMessage = ref('');
const isLoading = ref(false);

const handleRegister = async () => {
  errorMessage.value = '';
  
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'As senhas não coincidem.';
    return;
  }

  if (form.value.password.length < 6) {
    errorMessage.value = 'A senha deve ter pelo menos 6 caracteres.';
    return;
  }

  isLoading.value = true;
  
  try {
    await authStore.register({
      email: form.value.email,
      password: form.value.password,
      full_name: form.value.full_name
    });
    // Sucesso -> Vai pro Dashboard
    router.push('/dashboard');
  } catch (error) {
    // Tenta ler a mensagem de erro da API (ex: Email já existe)
    errorMessage.value = error.response?.data?.detail || 'Erro ao criar conta. Tente novamente mais tarde.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8 bg-background p-8 rounded-2xl shadow-xl border border-border">
      
      <div class="text-center">
        <span class="text-4xl mb-2 block">🚀</span>
        <h2 class="text-3xl font-bold tracking-tight text-foreground">Crie sua conta</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Junte-se à plataforma SaaS Mestre.
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          
          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Nome Completo</label>
            <input 
              v-model="form.full_name"
              type="text" 
              required 
              class="w-full px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-foreground"
              placeholder="Ex: João da Silva"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Email Corporativo</label>
            <input 
              v-model="form.email"
              type="email" 
              required 
              class="w-full px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-foreground"
              placeholder="voce@empresa.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Senha</label>
            <input 
              v-model="form.password"
              type="password" 
              required 
              class="w-full px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-foreground"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Confirmar Senha</label>
            <input 
              v-model="form.confirmPassword"
              type="password" 
              required 
              class="w-full px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-foreground"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 text-center">
          {{ errorMessage }}
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-3 px-4 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 shadow-md"
        >
          {{ isLoading ? 'Criando conta...' : 'Cadastrar Gratuitamente' }}
        </button>
      </form>

      <div class="text-center text-sm">
        <p class="text-muted-foreground">
          Já tem uma conta? 
          <router-link to="/login" class="font-medium text-accent hover:underline">
            Fazer Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>