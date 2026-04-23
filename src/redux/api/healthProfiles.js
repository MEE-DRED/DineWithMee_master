import api from './index';

export const healthProfilesAPI = {
  // Get current user's health profile
  getMyProfile: async () => {
    const response = await api.get('/health-profiles/me');
    return response.data;
  },

  // Create health profile
  create: async (profileData) => {
    const response = await api.post('/health-profiles', profileData);
    return response.data;
  },

  // Update health profile
  update: async (id, profileData) => {
    const response = await api.patch(`/health-profiles/${id}`, profileData);
    return response.data;
  },

  // Get health profile by ID
  getById: async (id) => {
    const response = await api.get(`/health-profiles/${id}`);
    return response.data;
  },
};
