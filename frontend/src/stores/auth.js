import { defineStore } from 'pinia';
import api from '@/services/api';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token'));
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);

  async function login(email, password) {
    try {
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);

      const { data } = await api.post('/auth/login', params);
      
      token.value = data.access_token;
      localStorage.setItem('token', data.access_token);
      
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async function register(userData) {
    try {
      // 1. Cria o usuário no backend
      await api.post('/auth/register', userData);
      
      // 2. Se deu certo, já faz o login automático para não obrigar o usuário a digitar tudo de novo
      await login(userData.email, userData.password);
      
      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    // O redirecionamento geralmente é feito no componente, mas pode ser forçado aqui se quiser
  }

  return { user, token, isAuthenticated, login, logout, register };
});