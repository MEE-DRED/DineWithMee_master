import api from './index';

export const adminAPI = {
  // Get system statistics
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // Get all users (with optional filters)
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  // Update user (role, status, etc.)
  updateUser: async (userId, userData) => {
    const response = await api.patch(`/admin/users/${userId}`, userData);
    return response.data;
  },

  // Get user by ID
  getUserById: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  // Suspend/activate user
  updateUserStatus: async (userId, status) => {
    const response = await api.patch(`/admin/users/${userId}`, { status });
    return response.data;
  },

  // Change user role
  updateUserRole: async (userId, role) => {
    const response = await api.patch(`/admin/users/${userId}`, { role });
    return response.data;
  },
};
