import api from './index';

export const aiRecommendationsAPI = {
  // Get AI-powered meal suggestions
  getSuggestions: async (recommendationData) => {
    const response = await api.post('/ai-recommendations/suggest', recommendationData);
    return response.data;
  },

  // Chat with Nia (AI nutritionist)
  chat: async (messageData) => {
    const response = await api.post('/ai-recommendations/chat', messageData);
    return response.data;
  },

  // Get conversation history
  getConversationHistory: async () => {
    const response = await api.get('/ai-recommendations/history');
    return response.data;
  },
};
