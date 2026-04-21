import api from './index';

export const ingredientsAPI = {
  // Get all ingredients
  getAll: async (params = {}) => {
    const response = await api.get('/api/v1/ingredients', { params });
    return response.data;
  },

  // Search ingredients
  search: async (query) => {
    const response = await api.get('/api/v1/ingredients/search', {
      params: { q: query }
    });
    return response.data;
  },

  // Get ingredient suitability
  getSuitability: async (params) => {
    const response = await api.get('/api/v1/ingredients/suitability', { params });
    return response.data;
  },

  // Get ingredient by ID
  getById: async (id) => {
    const response = await api.get(`/api/v1/ingredients/${id}`);
    return response.data;
  },
};
