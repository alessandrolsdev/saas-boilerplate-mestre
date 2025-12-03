import { defineStore } from 'pinia';
import api from '@/services/api';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token'));
  const router = useRouter();

  // Computed: Verifica se está logado baseado na existência do token
  const isAuthenticated = computed(() => !!token.value);

  async function login(email, password) {
    try {
      // O formulário envia x-www-form-urlencoded (padrão do OAuth2 do FastAPI)
      const params = new URLSearchParams();
      params.append('username', email); // FastAPI espera 'username', não 'email'
      params.append('password', password);

      const { data } = await api.post('/auth/login', params);
      
      // Sucesso: Salva token e atualiza estado
      token.value = data.access_token;
      localStorage.setItem('token', data.access_token);
      
      // Opcional: Buscar dados do usuário logo após login
      // await fetchUser(); 
      
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    // Redirecionar via router no componente ou aqui
  }

  return { user, token, isAuthenticated, login, logout };
});