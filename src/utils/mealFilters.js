export const filterMealsByRegion = (meals, region) => {
  if (region === 'all') return meals;
  return meals.filter(meal => meal.region === region);
};

export const filterMealsByHealthTags = (meals, tags) => {
  if (tags.length === 0) return meals;
  return meals.filter(meal =>
    tags.every(tag => meal.healthTags?.includes(tag))
  );
};

export const filterMealsBySearch = (meals, query) => {
  if (!query) return meals;
  const lowerQuery = query.toLowerCase();
  return meals.filter(meal =>
    meal.name.toLowerCase().includes(lowerQuery) ||
    meal.desc.toLowerCase().includes(lowerQuery) ||
    meal.country.toLowerCase().includes(lowerQuery) ||
    meal.region.toLowerCase().includes(lowerQuery) ||
    meal.ingredients?.some(ing => ing.toLowerCase().includes(lowerQuery))
  );
};

export const filterMealsByNutrition = (meals, maxCalories, minProtein) => {
  return meals.filter(meal =>
    meal.nutrition.calories <= maxCalories &&
    meal.nutrition.protein >= minProtein
  );
};

export const filterMealsByFavorites = (meals, favorites, showFavoritesOnly) => {
  if (!showFavoritesOnly) return meals;
  return meals.filter(meal => favorites.includes(meal.id));
};
