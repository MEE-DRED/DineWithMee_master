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

  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/api/v1/admin/dashboard/stats');
    return response.data;
  },

  // Verify/unverify nutritionist
  verifyNutritionist: async (userId, verificationData) => {
    const response = await api.put(`/api/v1/admin/users/${userId}/verify`, verificationData);
    return response.data;
  },

  // Get content moderation stats
  getContentModerationStats: async () => {
    const response = await api.get('/api/v1/admin/content/moderation');
    return response.data;
  },

  // Get pending content
  getPendingContent: async () => {
    const response = await api.get('/api/v1/admin/content/pending');
    return response.data;
  },

  // Approve content
  approveContent: async (contentId, type) => {
    const response = await api.put(`/api/v1/admin/content/${contentId}/approve`, null, {
      params: { type }
    });
    return response.data;
  },

  // Reject content
  rejectContent: async (contentId, type) => {
    const response = await api.put(`/api/v1/admin/content/${contentId}/reject`, null, {
      params: { type }
    });
    return response.data;
  },

  // Get system health
  getSystemHealth: async () => {
    const response = await api.get('/api/v1/admin/system/health');
    return response.data;
  },
};
