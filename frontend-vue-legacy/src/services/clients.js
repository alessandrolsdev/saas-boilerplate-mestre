import api from './api';

/**
 * Serviço de Clientes.
 * 
 * Responsável por todas as requisições relacionadas a gestão de clientes.
 */
export default {
  /**
   * Busca todos os clientes do usuário logado.
   * @returns {Promise<Array>} Lista de clientes.
   */
  getAll: async () => {
    const { data } = await api.get('/clients/');
    return data;
  },

  /**
   * Cria um novo cliente.
   * @param {Object} clientData - Dados do cliente.
   * @returns {Promise<Object>} O cliente criado.
   */
  create: async (clientData) => {
    const { data } = await api.post('/clients/', clientData);
    return data;
  }
};