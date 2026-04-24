import api from './index';

/**
 * Diet Recalls API
 * Endpoints for 24-hour dietary recall and nutritional analysis
 */
export const dietRecallsAPI = {
  /**
   * Submit a 24-hour diet recall
   * @param {Object} recallData - Diet recall data
   * @param {string} recallData.recallPeriod - Period: 24_HOURS
   * @param {Object} recallData.mealsConsumed - Meals consumed with items and quantities
   * @param {string} recallData.conversationId - Associated conversation ID
   * @returns {Promise} Diet recall with nutritional analysis
   */
  createRecall: async (recallData) => {
    const response = await api.post('/diet-recalls', recallData);
    return response.data;
  },

  /**
   * Get diet recall history for a user
   * @param {string} userId - User ID
   * @param {Object} params - Query parameters
   * @param {number} params.limit - Number of recalls to return
   * @returns {Promise} Array of diet recalls
   */
  getUserHistory: async (userId, params = {}) => {
    const response = await api.get(`/diet-recalls/user/${userId}`, { params });
    return response.data;
  },

  /**
   * Get detailed nutritional analysis for a diet recall
   * @param {string} recallId - Diet recall ID
   * @returns {Promise} Nutritional breakdown and recommendations
   */
  getAnalysis: async (recallId) => {
    const response = await api.get(`/diet-recalls/${recallId}/analysis`);
    return response.data;
  },
};
