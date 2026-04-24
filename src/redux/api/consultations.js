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

  // Get my consultations
  getMyConsultations: async (params = {}) => {
    const response = await api.get('/api/v1/consultations/my-consultations', { params });
    return response.data;
  },

  // Get upcoming consultations
  getUpcoming: async (params = {}) => {
    const response = await api.get('/api/v1/consultations/upcoming', { params });
    return response.data;
  },

  // Get consultation statistics
  getStats: async (params = {}) => {
    const response = await api.get('/api/v1/consultations/stats', { params });
    return response.data;
  },

  // Update consultation status
  updateStatus: async (id, statusData) => {
    const response = await api.patch(`/api/v1/consultations/${id}/status`, statusData);
    return response.data;
  },

  // Add review to consultation
  addReview: async (id, reviewData) => {
    const response = await api.post(`/api/v1/consultations/${id}/review`, reviewData);
    return response.data;
  },

  // Delete consultation (Admin only)
  delete: async (id) => {
    const response = await api.delete(`/api/v1/consultations/${id}`);
    return response.data;
  },
};
