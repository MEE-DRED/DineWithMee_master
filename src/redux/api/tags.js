import api from './index';

/**
 * Tags API
 * Endpoints for managing health tags and categories
 */
export const tagsAPI = {
  /**
   * Get all tags
   * @param {Object} params - Query parameters
   * @param {string} params.category - Filter by category
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise} Array of tags
   */
  getAll: async (params = {}) => {
    const response = await api.get('/api/v1/tags', { params });
    return response.data;
  },

  /**
   * Get tag by ID
   * @param {string} id - Tag ID
   * @returns {Promise} Tag details
   */
  getById: async (id) => {
    const response = await api.get(`/api/v1/tags/${id}`);
    return response.data;
  },

  /**
   * Search tags
   * @param {string} query - Search query
   * @param {Object} params - Additional query parameters
   * @returns {Promise} Array of matching tags
   */
  search: async (query, params = {}) => {
    const response = await api.get('/api/v1/tags/search', {
      params: { q: query, ...params }
    });
    return response.data;
  },

  /**
   * Get tags by category
   * @param {string} category - Category name
   * @returns {Promise} Array of tags in category
   */
  getByCategory: async (category) => {
    const response = await api.get(`/api/v1/tags/category/${category}`);
    return response.data;
  },
};
