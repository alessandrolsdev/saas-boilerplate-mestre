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
    router.push('/dashboard'); // Redireciona após sucesso
  } catch (error) {
    errorMessage.value = 'Email ou senha incorretos.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h2>Acessar Sistema</h2>
      <p class="subtitle">Entre com suas credenciais</p>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" required placeholder="admin@exemplo.com" />
        </div>
        
        <div class="form-group">
          <label>Senha</label>
          <input type="password" v-model="password" required placeholder="********" />
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Importa variáveis globais automaticamente se configurou o vite.config.js
// Caso contrário: @use '@/assets/styles/variables' as *;

.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $background-bg;
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: $border-radius;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 400px;
  text-align: center;

  h2 {
    color: $primary-color;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: $secondary-color;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: $text-main;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: $border-radius;
    outline: none;
    transition: border-color 0.2s;
    
    &:focus {
      border-color: $accent-color;
    }
  }
}

button {
  width: 100%;
  padding: 0.85rem;
  background-color: $accent-color;
  color: white;
  border: none;
  border-radius: $border-radius;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.error {
  color: #ef4444;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}
</style>