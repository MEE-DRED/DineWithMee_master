import api from './index';

export const mealPlansAPI = {
  // Get all meal plans for current user
  getAll: async () => {
    const response = await api.get('/meal-plans');
    return response.data;
  },

  // Get meal plan by ID
  getById: async (id) => {
    const response = await api.get(`/meal-plans/${id}`);
    return response.data;
  },

  // Create meal plan
  create: async (mealPlanData) => {
    const response = await api.post('/meal-plans', mealPlanData);
    return response.data;
  },

  // Update meal plan
  update: async (id, mealPlanData) => {
    const response = await api.patch(`/meal-plans/${id}`, mealPlanData);
    return response.data;
  },

  // Add meal to meal plan
  addMeal: async (mealPlanId, mealData) => {
    const response = await api.post(`/meal-plans/${mealPlanId}/meals`, mealData);
    return response.data;
  },

  // Remove meal from meal plan
  removeMeal: async (mealPlanId, mealId) => {
    const response = await api.delete(`/meal-plans/${mealPlanId}/meals/${mealId}`);
    return response.data;
  },

  // Get my meal plans
  getMyPlans: async (params = {}) => {
    const response = await api.get('/api/v1/meal-plans/my-plans', { params });
    return response.data;
  },

  // Get meal plan items
  getPlanItems: async (planId, params = {}) => {
    const response = await api.get(`/api/v1/meal-plans/${planId}/items`, { params });
    return response.data;
  },

  // Get nutritional summary
  getNutritionalSummary: async (planId) => {
    const response = await api.get(`/api/v1/meal-plans/${planId}/nutritional-summary`);
    return response.data;
  },

  // Generate weekly meal plan
  generateWeeklyPlan: async (preferences) => {
    const response = await api.post('/api/v1/meal-plans/generate-weekly', preferences);
    return response.data;
  },

  // Get meal plans by user ID (Admin/Nutritionist)
  getByUserId: async (userId, params = {}) => {
    const response = await api.get(`/api/v1/meal-plans/user/${userId}`, { params });
    return response.data;
  },

  // Get meal plans by nutritionist ID (Admin/Nutritionist)
  getByNutritionistId: async (nutritionistId, params = {}) => {
    const response = await api.get(`/api/v1/meal-plans/nutritionist/${nutritionistId}`, { params });
    return response.data;
  },

  // Delete meal plan (Admin)
  delete: async (id) => {
    const response = await api.delete(`/api/v1/meal-plans/${id}`);
    return response.data;
  },
};
