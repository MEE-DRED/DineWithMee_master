import api from './index';

export const authAPI = {
  // Login user
  login: async (credentials) => {
    const response = await api.post('/api/v1/users/login', credentials);
    return response.data;
  },

  // Register user  
  register: async (userData) => {
    const response = await api.post('/api/v2/auth/signup', userData);
    return response.data;
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get('/api/v1/users/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/api/v1/users/me', userData);
    return response.data;
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/api/v1/users/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    }
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/api/v1/users/refresh-token');
    return response.data;
  },
};
