import { create } from 'zustand';
import api from '@/services/api';

/**
 * Store de Autenticação (Zustand).
 * Gerencia login, registro, logout e estado do usuário.
 */
export const useAuth = create((set, get) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const params = new URLSearchParams();
            params.append('username', email);
            params.append('password', password);

            const { data } = await api.post('/auth/login', params);

            localStorage.setItem('token', data.access_token);
            set({ token: data.access_token, isAuthenticated: true, isLoading: false });
            return true;
        } catch (error) {
            console.error("Login error:", error);
            set({ error: "Email ou senha incorretos", isLoading: false });
            throw error;
        }
    },

    register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            await api.post('/auth/register', userData);
            // Auto-login após registro
            await get().login(userData.email, userData.password);
            set({ isLoading: false });
            return true;
        } catch (error) {
            console.error("Register error:", error);
            set({ error: "Erro ao criar conta", isLoading: false });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isAuthenticated: false });
    }
}));
