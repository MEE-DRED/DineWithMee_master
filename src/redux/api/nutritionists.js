import api from './index';

/**
 * Nutritionists API
 * Endpoints for managing nutritionist profiles and services
 */
export const nutritionistsAPI = {
  /**
   * Get all nutritionists
   * @param {Object} params - Query parameters
   * @param {string} params.specialization - Filter by specialization
   * @param {string} params.region - Filter by region
   * @param {boolean} params.isAvailable - Filter by availability
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} Array of nutritionists
   */
  getAll: async (params = {}) => {
    const response = await api.get('/api/v1/nutritionists', { params });
    return response.data;
  },

  /**
   * Get nutritionist by ID
   * @param {string} id - Nutritionist ID
   * @param {Object} params - Query parameters
   * @param {string} params.include - Relations to include (e.g., "consultations,reviews")
   * @returns {Promise} Nutritionist details
   */
  getById: async (id, params = {}) => {
    const response = await api.get(`/api/v1/nutritionists/${id}`, { params });
    return response.data;
  },

  /**
   * Get current user's nutritionist profile
   * @returns {Promise} Nutritionist profile
   */
  getMyProfile: async () => {
    const response = await api.get('/api/v1/nutritionists/me');
    return response.data;
  },

  /**
   * Get nutritionist's consultations
   * @param {string} nutritionistId - Nutritionist ID
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} Array of consultations
   */
  getConsultations: async (nutritionistId, params = {}) => {
    const response = await api.get(`/api/v1/nutritionists/${nutritionistId}/consultations`, { params });
    return response.data;
  },

  /**
   * Get nutritionist reviews
   * @param {string} nutritionistId - Nutritionist ID
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} Array of reviews
   */
  getReviews: async (nutritionistId, params = {}) => {
    const response = await api.get(`/api/v1/nutritionists/${nutritionistId}/reviews`, { params });
    return response.data;
  },

  /**
   * Update nutritionist profile
   * @param {string} id - Nutritionist ID
   * @param {Object} profileData - Updated profile data
   * @returns {Promise} Updated nutritionist profile
   */
  updateProfile: async (id, profileData) => {
    const response = await api.patch(`/api/v1/nutritionists/${id}`, profileData);
    return response.data;
  },

  /**
   * Get nutritionist availability
   * @param {string} nutritionistId - Nutritionist ID
   * @param {Object} params - Query parameters
   * @param {string} params.date - Date to check availability
   * @returns {Promise} Available time slots
   */
  getAvailability: async (nutritionistId, params = {}) => {
    const response = await api.get(`/api/v1/nutritionists/${nutritionistId}/availability`, { params });
    return response.data;
  },
};
