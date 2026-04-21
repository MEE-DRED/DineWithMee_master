import api from './index';

export const regionsAPI = {
  // Get all regions
  getAll: async () => {
    const response = await api.get('/api/v1/regions');
    return response.data;
  },

  // Get region by ID
  getById: async (id) => {
    const response = await api.get(`/api/v1/regions/${id}`);
    return response.data;
  },
};
