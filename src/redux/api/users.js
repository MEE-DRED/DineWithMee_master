import api from './index';

export const usersAPI = {
  // Get all users (admin only)
  getAll: async (params = {}) => {
    const response = await api.get('/api/v1/users', { params });
    return response.data;
  },

  // Get user by ID
  getById: async (id) => {
    const response = await api.get(`/api/v1/users/${id}`);
    return response.data;
  },

  // Update user status
  updateStatus: async (id, status) => {
    const response = await api.patch(`/api/v1/users/${id}/status`, { status });
    return response.data;
  },

  // Get user analytics dashboard
  getAnalytics: async () => {
    const response = await api.get('/api/v1/users/analytics/dashboard');
    return response.data;
  },
};
