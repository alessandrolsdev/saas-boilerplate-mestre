import api from './api';

/**
 * Serviço de Cobranças.
 * 
 * Responsável por todas as requisições relacionadas a cobranças (financeiro).
 */
export default {
    /**
     * Busca todas as cobranças do usuário logado.
     * @returns {Promise<Array>} Lista de cobranças.
     */
    getAll: async () => {
        const { data } = await api.get('/charges/');
        return data;
    },

    /**
     * Cria uma nova cobrança.
     * @param {Object} chargeData - Dados da cobrança.
     * @returns {Promise<Object>} A cobrança criada.
     */
    create: async (chargeData) => {
        const { data } = await api.post('/charges/', chargeData);
        return data;
    }
};
