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
  <div class="login-wrapper">
    <div class="login-container">
      <div class="brand-header">
        <span class="logo">🚀</span>
        <h1>SaaS Mestre</h1>
        <p>Bem-vindo de volta</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Email Corporativo</label>
          <input type="email" v-model="email" required placeholder="seunome@empresa.com" />
        </div>
        
        <div class="form-group">
          <label>Senha</label>
          <input type="password" v-model="password" required placeholder="••••••••" />
        </div>

        <div v-if="errorMessage" class="error-alert">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="isLoading" class="btn-login">
          {{ isLoading ? 'Acessando...' : 'Entrar na Plataforma' }}
        </button>
      </form>
      
      <div class="footer-links">
        <a href="#">Esqueceu a senha?</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $bg-app;
}

.login-container {
  background: $bg-surface;
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;
  border: 1px solid $border-color;
  
  .brand-header {
    text-align: center;
    margin-bottom: 2rem;
    
    .logo { font-size: 3rem; display: block; margin-bottom: 0.5rem; }
    h1 { color: $primary-color; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }
    p { color: $text-muted; font-size: 0.95rem; }
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  
  .form-group {
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: $text-main;
      font-size: 0.85rem;
      font-weight: 600;
    }
    
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid $border-color;
      border-radius: $radius-md;
      font-size: 1rem;
      color: $text-main;
      background: $bg-app;
      outline: none;
      transition: all 0.2s;
      
      &:focus {
        border-color: $accent-color;
        box-shadow: 0 0 0 3px rgba($accent-color, 0.1);
        background: white;
      }
    }
  }

  .btn-login {
    margin-top: 0.5rem;
    padding: 0.85rem;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: $radius-md;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
    
    &:hover { background-color: $primary-hover; }
    &:disabled { opacity: 0.7; cursor: not-allowed; }
  }
}

.error-alert {
  padding: 0.75rem;
  background-color: rgba($danger, 0.1);
  color: $danger;
  font-size: 0.85rem;
  border-radius: $radius-sm;
  text-align: center;
}

.footer-links {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  
  a {
    color: $text-muted;
    &:hover { color: $accent-color; text-decoration: underline; }
  }
}
</style>