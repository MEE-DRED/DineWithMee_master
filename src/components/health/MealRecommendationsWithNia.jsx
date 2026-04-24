import React, { useState, useEffect } from 'react';
import { mealsAPI } from '../../redux/api/meals';
import { healthAPI } from '../../redux/api/health';
import { aiRecommendationsAPI } from '../../redux/api/aiRecommendations';
import LoadingSpinner from '../common/LoadingSpinner';

const MealRecommendationsWithNia = ({ healthProfile, onSelectMeal, showNiaChat }) => {
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetchMeals();
  }, [healthProfile, selectedFilter]);

  const fetchMeals = async () => {
    setLoading(true);
    setError(null);

    try {
      let mealsResponse;

      if (healthProfile && selectedFilter !== 'ALL') {
        // Fetch meals by suitability based on health conditions
        const suitability = getSuitabilityParam();
        mealsResponse = await mealsAPI.getBySuitability(suitability);
      } else {
        // Fetch all meals with filters
        mealsResponse = await mealsAPI.getAll({
          limit: 30,
          include: 'ingredients,region,tags'
        });
      }

      setAllMeals(mealsResponse.data);

      // If health profile exists, get AI recommendations
      if (healthProfile) {
        const recommendationsResponse = await aiRecommendationsAPI.getMealRecommendations({
          healthProfileId: healthProfile.id
        });

        setRecommendedMeals(recommendationsResponse.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch meals');
      console.error('Failed to fetch meals:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSuitabilityParam = () => {
    const conditions = healthProfile?.healthConditions || [];

    if (conditions.includes('HYPERTENSION')) {
      return 'hypertension-friendly';
    }
    if (conditions.includes('DIABETES')) {
      return 'diabetes-friendly';
    }
    if (conditions.includes('OBESITY')) {
      return 'weight-loss';
    }

    return 'general-wellness';
  };

  const filterMeals = () => {
    let filtered = allMeals;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(meal =>
        meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Health condition filter
    if (selectedFilter !== 'ALL') {
      filtered = filtered.filter(meal => {
        const dietaryNomenclature = meal.dietaryNomenclature || meal.dietary_nomenclature;

        switch (selectedFilter) {
          case 'DASH':
            return dietaryNomenclature === 'DASH';
          case 'LOW_GI':
            return dietaryNomenclature === 'Low GI';
          case 'BALANCED':
            return dietaryNomenclature === 'Balanced';
          case 'HTN_FRIENDLY':
            return ['DASH', 'Low Sodium'].includes(dietaryNomenclature);
          case 'DIABETES_FRIENDLY':
            return ['Low GI', 'Low Carb'].includes(dietaryNomenclature);
          default:
            return true;
        }
      });
    }

    return filtered;
  };

  const getMealHealthScore = (meal) => {
    const conditions = healthProfile?.healthConditions || [];
    const dietaryNomenclature = meal.dietaryNomenclature || meal.dietary_nomenclature;

    let score = 0;

    if (conditions.includes('HYPERTENSION') && ['DASH', 'Low Sodium'].includes(dietaryNomenclature)) {
      score += 30;
    }

    if (conditions.includes('DIABETES') && ['Low GI', 'Low Carb'].includes(dietaryNomenclature)) {
      score += 30;
    }

    if (dietaryNomenclature === 'Balanced') {
      score += 20;
    }

    // Add score based on dietary preferences
    const preferences = healthProfile?.dietaryPreferences || [];
    if (preferences.includes('LOW_SODIUM') && dietaryNomenclature === 'DASH') {
      score += 20;
    }

    if (preferences.includes('LOW_GI') && dietaryNomenclature === 'Low GI') {
      score += 20;
    }

    return Math.min(score, 100);
  };

  const getHealthBadge = (meal) => {
    const score = getMealHealthScore(meal);
    const dietaryNomenclature = meal.dietaryNomenclature || meal.dietary_nomenclature;

    if (score >= 50) {
      return {
        label: 'Highly Recommended',
        color: 'bg-green-100 text-green-800 border-green-300',
        icon: '⭐'
      };
    }

    if (dietaryNomenclature === 'DASH') {
      return {
        label: 'Heart Healthy',
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        icon: '💓'
      };
    }

    if (dietaryNomenclature === 'Low GI') {
      return {
        label: 'Blood Sugar Friendly',
        color: 'bg-purple-100 text-purple-800 border-purple-300',
        icon: '🩸'
      };
    }

    return {
      label: 'Balanced Meal',
      color: 'bg-gray-100 text-gray-800 border-gray-300',
      icon: '🥗'
    };
  };

  const filteredMeals = filterMeals();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800">{error}</p>
        <button
          onClick={fetchMeals}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Nia's Recommendation Banner */}
      {healthProfile && recommendedMeals.length > 0 && (
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
              🤖
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Nia's Recommendations for You</h3>
              <p className="text-green-100 mb-4">
                Based on your health profile ({healthProfile.healthConditions?.join(', ')}),
                I've found {recommendedMeals.length} perfect meals for you!
              </p>
              {showNiaChat && (
                <button
                  onClick={showNiaChat}
                  className="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 font-medium transition"
                >
                  💬 Ask Nia About These Meals
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search meals... (e.g., jollof rice, beans)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg ${view === 'grid' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <span className="text-xl">⊞</span>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg ${view === 'list' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'ALL', label: 'All Meals', icon: '🍽️' },
            { value: 'DASH', label: 'DASH Diet', icon: '💓' },
            { value: 'LOW_GI', label: 'Low GI', icon: '📉' },
            { value: 'BALANCED', label: 'Balanced', icon: '⚖️' },
            { value: 'HTN_FRIENDLY', label: 'Hypertension Friendly', icon: '💊' },
            { value: 'DIABETES_FRIENDLY', label: 'Diabetes Friendly', icon: '🩸' }
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === filter.value
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Found <strong>{filteredMeals.length}</strong> meals
          {healthProfile && ` personalized for your health goals`}
        </p>
      </div>

      {/* Meals Grid/List */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map(meal => {
            const healthBadge = getHealthBadge(meal);
            const healthScore = getMealHealthScore(meal);

            return (
              <div
                key={meal.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 hover:border-green-300"
              >
                {/* Meal Image */}
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-100">
                  {meal.image ? (
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      🍽️
                    </div>
                  )}

                  {/* Health Badge */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium border ${healthBadge.color}`}>
                    {healthBadge.icon} {healthBadge.label}
                  </div>

                  {/* Health Score */}
                  {healthScore > 0 && (
                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-sm font-bold text-green-600">
                      {healthScore}% Match
                    </div>
                  )}
                </div>

                {/* Meal Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {meal.name}
                  </h3>

                  {meal.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {meal.description}
                    </p>
                  )}

                  {/* Nutritional Info */}
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    {meal.calories && (
                      <div className="flex items-center space-x-1">
                        <span>🔥</span>
                        <span>{meal.calories} cal</span>
                      </div>
                    )}
                    {meal.protein && (
                      <div className="flex items-center space-x-1">
                        <span>💪</span>
                        <span>{meal.protein}g protein</span>
                      </div>
                    )}
                    {meal.carbs && (
                      <div className="flex items-center space-x-1">
                        <span>🍞</span>
                        <span>{meal.carbs}g carbs</span>
                      </div>
                    )}
                    {meal.fat && (
                      <div className="flex items-center space-x-1">
                        <span>🥑</span>
                        <span>{meal.fat}g fat</span>
                      </div>
                    )}
                  </div>

                  {/* Region Tag */}
                  {meal.region && (
                    <div className="mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {meal.region.name === 'Nigeria' ? '🇳🇬' : '🇷🇼'} {meal.region.name}
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  {meal.tags && meal.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {meal.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag.id}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onSelectMeal && onSelectMeal(meal)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 text-sm font-medium transition"
                    >
                      View Details
                    </button>
                    {showNiaChat && (
                      <button
                        onClick={() => showNiaChat(meal)}
                        className="px-3 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                      >
                        💬
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMeals.map(meal => {
            const healthBadge = getHealthBadge(meal);
            const healthScore = getMealHealthScore(meal);

            return (
              <div
                key={meal.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-gray-100 hover:border-green-300"
              >
                <div className="flex items-start space-x-4">
                  {/* Meal Image */}
                  <div className="w-32 h-32 flex-shrink-0 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 overflow-hidden">
                    {meal.image ? (
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🍽️
                      </div>
                    )}
                  </div>

                  {/* Meal Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {meal.name}
                        </h3>
                        {meal.region && (
                          <span className="text-sm text-gray-600">
                            {meal.region.name === 'Nigeria' ? '🇳🇬' : '🇷🇼'} {meal.region.name} Cuisine
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${healthBadge.color}`}>
                          {healthBadge.icon} {healthBadge.label}
                        </div>
                        {healthScore > 0 && (
                          <div className="px-3 py-1 bg-green-100 rounded-full text-sm font-bold text-green-600">
                            {healthScore}% Match
                          </div>
                        )}
                      </div>
                    </div>

                    {meal.description && (
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {meal.description}
                      </p>
                    )}

                    {/* Nutritional Info */}
                    <div className="flex flex-wrap gap-4 mb-3 text-sm">
                      {meal.calories && (
                        <div className="flex items-center space-x-1">
                          <span>🔥</span>
                          <span>{meal.calories} cal</span>
                        </div>
                      )}
                      {meal.protein && (
                        <div className="flex items-center space-x-1">
                          <span>💪</span>
                          <span>{meal.protein}g protein</span>
                        </div>
                      )}
                      {meal.carbs && (
                        <div className="flex items-center space-x-1">
                          <span>🍞</span>
                          <span>{meal.carbs}g carbs</span>
                        </div>
                      )}
                      {meal.fat && (
                        <div className="flex items-center space-x-1">
                          <span>🥑</span>
                          <span>{meal.fat}g fat</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {meal.tags && meal.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {meal.tags.map(tag => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onSelectMeal && onSelectMeal(meal)}
                        className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 text-sm font-medium transition"
                      >
                        View Full Recipe
                      </button>
                      {showNiaChat && (
                        <button
                          onClick={() => showNiaChat(meal)}
                          className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition flex items-center space-x-2"
                        >
                          <span>💬</span>
                          <span>Ask Nia</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredMeals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No meals found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={() => {
              setSelectedFilter('ALL');
              setSearchTerm('');
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MealRecommendationsWithNia;
