import api from './api';

export default {
  getAll: async () => {
    const { data } = await api.get('/clients/');
    return data;
  },
  
  create: async (clientData) => {
    const { data } = await api.post('/clients/', clientData);
    return data;
  },
  
  // No futuro adicionamos update e delete aqui
};