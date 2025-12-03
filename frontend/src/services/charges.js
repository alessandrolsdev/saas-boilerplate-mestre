import api from './api';

export default {
  getAll: async () => {
    const { data } = await api.get('/charges/');
    return data;
  },
  
  create: async (chargeData) => {
    const { data } = await api.post('/charges/', chargeData);
    return data;
  }
};