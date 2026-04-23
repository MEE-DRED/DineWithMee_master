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
};
