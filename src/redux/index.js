// Store
import store from './store';

// Auth
import authSlice, {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  clearAuthState,
  clearError,
  checkAuthState,
  setToken,
  selectAuth,
} from './slices/authSlice';

// Cart
import cartSlice, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  loadCartFromStorage,
  selectCartItems,
  selectCartIsOpen,
  selectCartTotalItems,
  selectCartTotalPrice,
} from './slices/cartSlice';

// UI
import uiSlice, {
  addToast,
  removeToast,
  clearToasts,
  setLoading,
  setGlobalLoading,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  selectToasts,
  selectLoading,
  selectIsLoading,
} from './slices/uiSlice';

// Meals
import mealsSlice, {
  fetchMeals,
  setRegionFilter,
  setHealthTagFilter,
  clearHealthTagFilters,
  setPriceRangeFilter,
  setSearchTerm,
  clearAllFilters,
  applyFilters,
  selectMeals,
  selectFilteredMeals,
  selectMealsLoading,
  selectMealsError,
  selectFilters,
  selectAllRegions,
  selectAllHealthTags,
} from './slices/mealsSlice';

// Regions
import regionsSlice, {
  fetchRegions,
  fetchRegionById,
  clearError as clearRegionsError,
  setCurrentRegion,
  selectRegions,
  selectCurrentRegion,
  selectRegionsLoading,
  selectRegionsError,
} from './slices/regionsSlice';

// Ingredients
import ingredientsSlice, {
  fetchIngredients,
  searchIngredients,
  fetchIngredientSuitability,
  fetchIngredientById,
  clearError as clearIngredientsError,
  clearSearchResults,
  setCurrentIngredient,
  selectIngredients,
  selectSearchResults,
  selectSuitabilityData,
  selectCurrentIngredient,
  selectIngredientsLoading,
  selectIngredientsError,
} from './slices/ingredientsSlice';

// Users
import usersSlice, {
  fetchAllUsers,
  fetchUserById,
  updateUserStatus,
  fetchUserAnalytics,
  clearError as clearUsersError,
  setCurrentUser,
  selectUsers,
  selectCurrentUser,
  selectUserAnalytics,
  selectUsersLoading,
  selectUsersError,
} from './slices/usersSlice';

// Content
import contentSlice, {
  fetchContentByTopic,
  fetchFeaturedContent,
  fetchContentById,
  clearError as clearContentError,
  setCurrentContent,
  selectContent,
  selectFeaturedContent,
  selectCurrentContent,
  selectContentLoading,
  selectContentError,
} from './slices/contentSlice';

// Health
import healthSlice, {
  fetchHealthProfile,
  fetchHealthProfileById,
  createHealthProfile,
  updateHealthProfile,
  fetchNutritionalGoals,
  fetchAnalyticsDistribution,
  fetchHealthAssessments,
  fetchMyAssessments,
  clearError as clearHealthError,
  setCurrentProfile,
  selectHealthProfile,
  selectHealthProfiles,
  selectNutritionalGoals,
  selectHealthAnalytics,
  selectHealthAssessments,
  selectMyAssessments,
  selectHealthLoading,
  selectHealthError,
} from './slices/healthSlice';

export {
  // Store
  store,
  
  // Auth
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  clearAuthState,
  clearError,
  checkAuthState,
  setToken,
  selectAuth,
  
  // Cart
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  loadCartFromStorage,
  
  // UI
  addToast,
  removeToast,
  clearToasts,
  setLoading,
  setGlobalLoading,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  
  // Meals
  fetchMeals,
  setRegionFilter,
  setHealthTagFilter,
  clearHealthTagFilters,
  setPriceRangeFilter,
  setSearchTerm,
  clearAllFilters,
  applyFilters,
  selectMeals,
  selectFilteredMeals,
  selectMealsLoading,
  selectMealsError,
  selectFilters,
  selectAllRegions,
  selectAllHealthTags,
  
  // Regions
  fetchRegions,
  fetchRegionById,
  clearRegionsError,
  setCurrentRegion,
  selectRegions,
  selectCurrentRegion,
  selectRegionsLoading,
  selectRegionsError,
  
  // Ingredients
  fetchIngredients,
  searchIngredients,
  fetchIngredientSuitability,
  fetchIngredientById,
  clearIngredientsError,
  clearSearchResults,
  setCurrentIngredient,
  selectIngredients,
  selectSearchResults,
  selectSuitabilityData,
  selectCurrentIngredient,
  selectIngredientsLoading,
  selectIngredientsError,
  
  // Users
  fetchAllUsers,
  fetchUserById,
  updateUserStatus,
  fetchUserAnalytics,
  clearUsersError,
  setCurrentUser,
  selectUsers,
  selectCurrentUser,
  selectUserAnalytics,
  selectUsersLoading,
  selectUsersError,
  
  // Content
  fetchContentByTopic,
  fetchFeaturedContent,
  fetchContentById,
  clearContentError,
  setCurrentContent,
  selectContent,
  selectFeaturedContent,
  selectCurrentContent,
  selectContentLoading,
  selectContentError,
  
  // Health
  fetchHealthProfile,
  fetchHealthProfileById,
  createHealthProfile,
  updateHealthProfile,
  fetchNutritionalGoals,
  fetchAnalyticsDistribution,
  fetchHealthAssessments,
  fetchMyAssessments,
  clearHealthError,
  setCurrentProfile,
  selectHealthProfile,
  selectHealthProfiles,
  selectNutritionalGoals,
  selectHealthAnalytics,
  selectHealthAssessments,
  selectMyAssessments,
  selectHealthLoading,
  selectHealthError,
};

export default store;
