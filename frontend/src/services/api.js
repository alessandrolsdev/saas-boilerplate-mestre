import axios from 'axios';

/**
 * Configuração do Axios para comunicação com a API.
 * 
 * Define a URL base e configura interceptors para autenticação.
 */
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1', // URL do seu Backend
});

/**
 * Interceptor de Requisição.
 * 
 * Adiciona o token JWT (se existir) ao cabeçalho Authorization de todas as requisições.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;