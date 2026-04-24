import api from './index';

/**
 * Health Progress API
 * Endpoints for tracking health metrics and progress over time
 */
export const healthProgressAPI = {
  /**
   * Get all progress logs (Admin/Nutritionist only)
   * @param {Object} params - Query parameters
   * @returns {Promise} Array of progress logs
   */
  getAll: async (params = {}) => {
    const response = await api.get('/api/v1/health-progress', { params });
    return response.data;
  },

  /**
   * Get progress logs by user ID (Admin/Nutritionist only)
   * @param {string} userId - User ID
   * @param {Object} params - Query parameters
   * @returns {Promise} Array of user's progress logs
   */
  getByUserId: async (userId, params = {}) => {
    const response = await api.get(`/api/v1/health-progress/user/${userId}`, { params });
    return response.data;
  },

  /**
   * Get current user's progress logs
   * @param {Object} params - Query parameters
   * @param {string} params.include - Relations to include
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} Array of progress logs
   */
  getMyProgress: async (params = {}) => {
    const response = await api.get('/api/v1/health-progress/my-progress', { params });
    return response.data;
  },

  /**
   * Get progress trends over time
   * @param {Object} params - Query parameters
   * @param {number} params.days - Number of days (default: 30)
   * @returns {Promise} Trend data for weight, blood pressure, etc.
   */
  getMyTrends: async (params = {}) => {
    const response = await api.get('/api/v1/health-progress/my-progress/trends', { params });
    return response.data;
  },

  /**
   * Get weekly progress summary
   * @returns {Promise} Weekly summary statistics
   */
  getWeeklySummary: async () => {
    const response = await api.get('/api/v1/health-progress/my-progress/weekly-summary');
    return response.data;
  },

  /**
   * Get monthly statistics
   * @param {Object} params - Query parameters
   * @param {number} params.year - Year
   * @param {number} params.month - Month (1-12)
   * @returns {Promise} Monthly statistics
   */
  getMonthlyStats: async (params = {}) => {
    const response = await api.get('/api/v1/health-progress/my-progress/monthly-stats', { params });
    return response.data;
  },

  /**
   * Get progress log by ID
   * @param {string} id - Progress log ID
   * @returns {Promise} Progress log details
   */
  getById: async (id) => {
    const response = await api.get(`/api/v1/health-progress/${id}`);
    return response.data;
  },

  /**
   * Create a new progress log
   * @param {Object} progressData - Progress log data
   * @param {string} progressData.userId - User ID
   * @param {string} progressData.date - Date (YYYY-MM-DD)
   * @param {number} progressData.weight - Weight in kg
   * @param {number} progressData.bloodPressureSystolic - Systolic BP
   * @param {number} progressData.bloodPressureDiastolic - Diastolic BP
   * @param {number} progressData.bloodSugar - Blood sugar level
   * @param {string} progressData.notes - Optional notes
   * @returns {Promise} Created progress log
   */
  create: async (progressData) => {
    const response = await api.post('/api/v1/health-progress', progressData);
    return response.data;
  },

  /**
   * Update a progress log (Admin/Nutritionist only)
   * @param {string} id - Progress log ID
   * @param {Object} progressData - Updated data
   * @returns {Promise} Updated progress log
   */
  update: async (id, progressData) => {
    const response = await api.patch(`/api/v1/health-progress/${id}`, progressData);
    return response.data;
  },

  /**
   * Delete a progress log (Admin only)
   * @param {string} id - Progress log ID
   * @returns {Promise} Deletion confirmation
   */
  delete: async (id) => {
    const response = await api.delete(`/api/v1/health-progress/${id}`);
    return response.data;
  },
};
