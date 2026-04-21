import api from './index';

export const healthAPI = {
  // Get user's health profile
  getProfile: async () => {
    const response = await api.get('/api/v1/health-profiles/me');
    return response.data;
  },

  // Get health profile by ID
  getById: async (id) => {
    const response = await api.get(`/api/v1/health-profiles/${id}`);
    return response.data;
  },

  // Create health profile
  create: async (profileData) => {
    const response = await api.post('/api/v1/health-profiles', profileData);
    return response.data;
  },

  // Update health profile
  update: async (id, profileData) => {
    const response = await api.put(`/api/v1/health-profiles/${id}`, profileData);
    return response.data;
  },

  // Get nutritional goals
  getNutritionalGoals: async (profileId) => {
    const response = await api.get(`/api/v1/health-profiles/${profileId}/nutritional-goals`);
    return response.data;
  },

  // Get analytics distribution
  getAnalyticsDistribution: async (profileId) => {
    const response = await api.get(`/api/v1/health-profiles/analytics/distribution`);
    return response.data;
  },

  // Get health assessments
  getAssessments: async (userId) => {
    const response = await api.get(`/api/v1/health-assessments/user/${userId}`);
    return response.data;
  },

  // Get my assessments
  getMyAssessments: async () => {
    const response = await api.get('/api/v1/health-assessments/my-assessments');
    return response.data;
  },
};
