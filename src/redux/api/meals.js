import api from './index';

export const mealsAPI = {
  // Get all meals
  getAll: async (params = {}) => {
    const response = await api.get('/api/v1/meals', { params });
    return response.data;
  },

  // Get meal by ID
  getById: async (id) => {
    const response = await api.get(`/api/v1/meals/${id}`);
    return response.data;
  },

  // Search meals
  search: async (query) => {
    const response = await api.get('/api/v1/meals/search', { 
      params: { q: query } 
    });
    return response.data;
  },

  // Get featured meals
  getFeatured: async () => {
    const response = await api.get('/api/v1/meals/featured');
    return response.data;
  },

  // Get meals by suitability
  getBySuitability: async (suitability) => {
    const response = await api.get('/api/v1/meals/suitability', {
      params: { suitability }
    });
    return response.data;
  },
};
