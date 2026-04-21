import api from './index';

export const contentAPI = {
  // Get content by topic
  getByTopic: async (topic) => {
    const response = await api.get(`/api/v1/content/topic/${topic}`);
    return response.data;
  },

  // Get featured content
  getFeatured: async () => {
    const response = await api.get('/api/v1/content/featured');
    return response.data;
  },

  // Get content by ID
  getById: async (id) => {
    const response = await api.get(`/api/v1/content/${id}`);
    return response.data;
  },
};
