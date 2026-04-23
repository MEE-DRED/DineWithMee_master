import api from './index';

export const consultationsAPI = {
  // Get all consultations (with optional filters)
  getAll: async (params = {}) => {
    const response = await api.get('/consultations', { params });
    return response.data;
  },

  // Get consultation by ID
  getById: async (id) => {
    const response = await api.get(`/consultations/${id}`);
    return response.data;
  },

  // Create consultation
  create: async (consultationData) => {
    const response = await api.post('/consultations', consultationData);
    return response.data;
  },

  // Update consultation
  update: async (id, consultationData) => {
    const response = await api.patch(`/consultations/${id}`, consultationData);
    return response.data;
  },

  // Get consultations by status
  getByStatus: async (status) => {
    const response = await api.get('/consultations', {
      params: { status }
    });
    return response.data;
  },

  // Get consultations by nutritionist
  getByNutritionist: async (nutritionistId) => {
    const response = await api.get('/consultations', {
      params: { nutritionistId }
    });
    return response.data;
  },
};
