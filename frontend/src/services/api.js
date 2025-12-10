import axios from 'axios';

/**
 * Instância do Axios para comunicação com a API (FastAPI).
 */
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
});

// Interceptor para adicionar o Token JWT
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
