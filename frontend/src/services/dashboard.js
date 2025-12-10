import api from './api';

export default {
    /**
     * Busca as estatísticas do dashboard.
     * @param {string} period '7d' | '30d' | '6m' | '12m'
     */
    getStats: async (period = '6m') => {
        const { data } = await api.get(`/dashboard/stats?period=${period}`);
        return data;
    }
};
