import api from './api';

/**
 * Serviço de Dashboard.
 * 
 * Responsável por buscar os dados estatísticos para o painel de controle.
 */
export default {
  /**
   * Busca as estatísticas do dashboard.
   * 
   * @param {string} period - O período de análise (ex: '7d', '30d', '6m', '12m').
   * @returns {Promise<Object>} Dados estatísticos (KPIs, gráficos, etc).
   */
  getStats: async (period = '6m') => {
    const { data } = await api.get(`/dashboard/stats?period=${period}`);
    return data;
  }
};