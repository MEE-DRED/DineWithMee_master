import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMeals,
  selectMeals,
  selectMealsLoading,
  selectMealsError,
  fetchIngredients,
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError,
  addToCart,
  selectFavorites,
  toggleFavorite,
} from '../redux';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MealCard from '../components/MealCard';
import IngredientCard from '../components/IngredientCard';
import MarketplaceFilters from '../components/marketplace/MarketplaceFilters';
import MealDetailModal from '../components/marketplace/MealDetailModal';
import { sortMeals } from '../utils/mealSorting';

const Marketplace = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('meals');

  // Filter state
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedHealthTags, setSelectedHealthTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [maxCalories, setMaxCalories] = useState(1000);
  const [minProtein, setMinProtein] = useState(0);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Redux selectors
  const mealsData = useSelector(selectMeals);
  const mealsLoading = useSelector(selectMealsLoading);
  const mealsError = useSelector(selectMealsError);
  const ingredientsData = useSelector(selectIngredients);
  const ingredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientsError = useSelector(selectIngredientsError);
  const favorites = useSelector(selectFavorites);

  // Ensure data is always an array
  const meals = Array.isArray(mealsData) ? mealsData : [];
  const ingredients = Array.isArray(ingredientsData) ? ingredientsData : [];

  useEffect(() => {
    dispatch(fetchMeals({ limit: 100, page: 1 }));
    dispatch(fetchIngredients({ limit: 100, page: 1 }));
  }, [dispatch]);

  // Extract available health tags from meals
  const availableHealthTags = useMemo(() => {
    const tags = new Set();
    meals.forEach(meal => {
      meal.healthTags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [meals]);

  // Apply filters to meals
  const filteredMeals = useMemo(() => {
    let filtered = meals;

    // Region filter
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(meal => meal.region === selectedRegion);
    }

    // Health tags filter
    if (selectedHealthTags.length > 0) {
      filtered = filtered.filter(meal =>
        selectedHealthTags.every(tag => meal.healthTags?.includes(tag))
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        meal =>
          meal.name.toLowerCase().includes(query) ||
          meal.desc?.toLowerCase().includes(query) ||
          meal.country?.toLowerCase().includes(query) ||
          meal.region?.toLowerCase().includes(query) ||
          meal.ingredients?.some(ing => ing.toLowerCase().includes(query))
      );
    }

    // Nutrition filters
    filtered = filtered.filter(
      meal =>
        (meal.nutrition?.calories || 0) <= maxCalories &&
        (meal.nutrition?.protein || 0) >= minProtein
    );

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(meal => favorites.includes(meal.id || meal._id));
    }

    // Sorting
    return sortMeals(filtered, sortBy);
  }, [
    meals,
    selectedRegion,
    selectedHealthTags,
    searchQuery,
    maxCalories,
    minProtein,
    showFavoritesOnly,
    sortBy,
    favorites,
  ]);

  // Calculate active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedRegion !== 'all') count++;
    if (selectedHealthTags.length > 0) count++;
    if (searchQuery) count++;
    if (maxCalories < 1000) count++;
    if (minProtein > 0) count++;
    if (showFavoritesOnly) count++;
    return count;
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedRegion('all');
    setSelectedHealthTags([]);
    setSearchQuery('');
    setMaxCalories(1000);
    setMinProtein(0);
    setShowFavoritesOnly(false);
  };

  // Handle add to cart
  const handleAddToCart = meal => {
    dispatch(addToCart({ ...meal, quantity: 1 }));
  };

  // Handle toggle favorite
  const handleToggleFavorite = mealId => {
    dispatch(toggleFavorite(mealId));
  };

  const loading = activeTab === 'meals' ? mealsLoading : ingredientsLoading;
  const error = activeTab === 'meals' ? mealsError : ingredientsError;
  const displayItems = activeTab === 'meals' ? filteredMeals : ingredients;

  return (
    <div className="marketplace-page">
      {/* Hero Section */}
      <div className="page-hero bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white py-16">
        <div className="page-hero-content text-center max-w-4xl mx-auto px-6">
          <div className="breadcrumb text-emerald-200 mb-4">
            <a href="/" className="text-amber-400 hover:text-amber-300">
              Home
            </a>{' '}
            &#8250; Marketplace
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">African Marketplace by Region</h1>
          <p className="text-xl text-emerald-100">
            Shop clinically informed African meals and ingredients across West, East, and Southern
            Africa.
          </p>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-emerald-200 overflow-hidden bg-white">
              <button
                onClick={() => setActiveTab('meals')}
                className={`px-8 py-3 font-semibold transition-colors ${
                  activeTab === 'meals'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                Meals ({activeTab === 'meals' ? filteredMeals.length : meals.length})
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-8 py-3 font-semibold transition-colors ${
                  activeTab === 'ingredients'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                Ingredients ({ingredients.length})
              </button>
            </div>
          </div>

          {/* Filters - Only show for meals tab */}
          {activeTab === 'meals' && (
            <MarketplaceFilters
              region={selectedRegion}
              onRegionChange={setSelectedRegion}
              healthTags={selectedHealthTags}
              onHealthTagsChange={setSelectedHealthTags}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              maxCalories={maxCalories}
              onMaxCaloriesChange={setMaxCalories}
              minProtein={minProtein}
              onMinProteinChange={setMinProtein}
              showFavoritesOnly={showFavoritesOnly}
              onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
              onClearFilters={clearAllFilters}
              activeFilterCount={getActiveFilterCount()}
              availableHealthTags={availableHealthTags}
            />
          )}

          {/* Results Header */}
          {activeTab === 'meals' && !loading && !error && (
            <div className="mb-6">
              <p className="text-gray-700 font-medium">
                {filteredMeals.length} meal{filteredMeals.length !== 1 ? 's' : ''} found
                {showFavoritesOnly && <span className="ml-2 text-amber-600">· Favorites Only</span>}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="text-center">{error}</p>
            </div>
          )}

          {/* Items Grid */}
          {!loading && !error && displayItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayItems.map(item =>
                activeTab === 'meals' ? (
                  <div key={item.id || item._id} className="relative">
                    <div onClick={() => setSelectedMeal(item)} className="cursor-pointer">
                      <MealCard meal={item} />
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleToggleFavorite(item.id || item._id);
                      }}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors z-10"
                    >
                      {favorites.includes(item.id || item._id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                ) : (
                  <IngredientCard key={item.id || item._id} ingredient={item} />
                )
              )}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && displayItems.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600 text-lg mb-4">
                No {activeTab} {showFavoritesOnly ? 'favorites' : 'found'}{' '}
                {searchQuery && `matching "${searchQuery}"`}.
              </p>
              {(getActiveFilterCount() > 0 || showFavoritesOnly) && (
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <MealDetailModal
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
          onAddToCart={handleAddToCart}
          isFavorite={favorites.includes(selectedMeal.id || selectedMeal._id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
};

export default Marketplace;
