import { defineStore } from 'pinia';
import api from '@/services/api';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Store de Autenticação (Pinia).
 * 
 * Gerencia o estado global de autenticação do usuário, incluindo login, registro e logout.
 * Persiste o token JWT no localStorage para manter a sessão (opcional).
 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token'));
  const router = useRouter();

  /**
   * Verifica se o usuário está autenticado baseando-se na presença do token.
   */
  const isAuthenticated = computed(() => !!token.value);

  /**
   * Realiza o login do usuário.
   * 
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @returns {Promise<boolean>} Retorna true se o login for bem-sucedido.
   */
  async function login(email, password) {
    try {
      const params = new URLSearchParams();
      params.append('username', email); // OAuth2 espera 'username'
      params.append('password', password);

      const { data } = await api.post('/auth/login', params);

      token.value = data.access_token;
      localStorage.setItem('token', data.access_token);

      return true;
    } catch (error) {
      console.error('[Auth Store] Erro no login:', error);
      throw error;
    }
  }

  /**
   * Registra um novo usuário.
   * 
   * @param {Object} userData - Dados do usuário para registro.
   * @param {string} userData.email - Email do usuário.
   * @param {string} userData.password - Senha do usuário.
   * @param {string} userData.full_name - Nome completo do usuário.
   * @returns {Promise<boolean>} Retorna true se o registro e login automático forem bem-sucedidos.
   */
  async function register(userData) {
    try {
      // Cria o usuário no backend
      await api.post('/auth/register', userData);

      // Realiza o login automático
      await login(userData.email, userData.password);

      return true;
    } catch (error) {
      console.error('[Auth Store] Erro no registro:', error);
      throw error;
    }
  }

  /**
   * Realiza o logout do usuário, limpando o estado e o localStorage.
   */
  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
  }

  return { user, token, isAuthenticated, login, logout, register };
});