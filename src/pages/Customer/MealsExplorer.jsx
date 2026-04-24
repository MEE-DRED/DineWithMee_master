import React, { useState, useEffect } from 'react';
import { mealsAPI } from '../../redux/api/meals';
import AdvancedMealFilters from '../../components/meals/AdvancedMealFilters';
import MealDetailModal from '../../components/meals/MealDetailModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';

/**
 * Meals Explorer Page
 * Integrates with real backend API
 * Endpoint: GET /api/v1/meals
 */

const MealsExplorer = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    htnSuitability: '',
    diabetesSuitability: '',
    region: '',
    searchQuery: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetchMeals();
  }, [filters, pagination.page]);

  const fetchMeals = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        include: 'region,ingredients'
      };

      // Add filters if they exist
      if (filters.htnSuitability) params.htnSuitability = filters.htnSuitability;
      if (filters.diabetesSuitability) params.diabetesSuitability = filters.diabetesSuitability;

      let response;

      // Use suitability endpoint if filters are present
      if (filters.htnSuitability || filters.diabetesSuitability) {
        response = await mealsAPI.getBySuitability(
          filters.htnSuitability,
          filters.diabetesSuitability,
          params.include,
          params.page,
          params.limit
        );
      } else if (filters.searchQuery) {
        response = await mealsAPI.search({
          query: filters.searchQuery,
          page: params.page,
          limit: params.limit
        });
      } else {
        response = await mealsAPI.getAll(params);
      }

      setMeals(response.data || []);
      if (response.meta) {
        setPagination(prev => ({
          ...prev,
          total: response.meta.total,
          totalPages: response.meta.totalPages
        }));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch meals');
      console.error('Error fetching meals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1 when filters change
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSuitabilityBadge = (suitability) => {
    const badges = {
      HIGHLY_RECOMMENDED: { color: 'bg-green-100 text-green-700 border-green-300', label: '⭐ Highly Recommended' },
      RECOMMENDED: { color: 'bg-blue-100 text-blue-700 border-blue-300', label: '✅ Recommended' },
      MODERATE: { color: 'bg-yellow-100 text-yellow-700 border-yellow-300', label: '⚖️ Moderate' },
      OCCASIONAL: { color: 'bg-orange-100 text-orange-700 border-orange-300', label: '⚠️ Occasional' },
      AVOID: { color: 'bg-red-100 text-red-700 border-red-300', label: '❌ Avoid' }
    };
    return badges[suitability] || { color: 'bg-gray-100 text-gray-700 border-gray-300', label: suitability };
  };

  if (error && meals.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Meals</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={fetchMeals}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Explore Healthy Meals
          </h1>
          <p className="text-gray-600">
            Discover culturally-authentic meals tailored to your health needs
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <AdvancedMealFilters
                onFilterChange={handleFilterChange}
                currentFilters={filters}
              />
            </div>
          </div>

          {/* Meals Grid */}
          <div className="lg:col-span-3">
            {/* View Controls */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{meals.length}</span> of{' '}
                  <span className="font-semibold text-gray-900">{pagination.total}</span> meals
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition ${
                      viewMode === 'grid'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition ${
                      viewMode === 'list'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : meals.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Meals Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={() => handleFilterChange({ htnSuitability: '', diabetesSuitability: '', region: '', searchQuery: '' })}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Meals Grid/List */}
                <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                  {meals.map((meal) => (
                    <div
                      key={meal.id}
                      onClick={() => setSelectedMeal(meal)}
                      className={`bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-all ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'}>
                        {meal.featured_image ? (
                          <img
                            src={meal.featured_image}
                            alt={meal.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-5xl">
                            🍽️
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{meal.name}</h3>
                          {meal.region && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              {meal.region.name}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {meal.description || 'No description available'}
                        </p>

                        {/* Suitability Badges */}
                        <div className="space-y-2">
                          {meal.htn_suitability && (
                            <div className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getSuitabilityBadge(meal.htn_suitability).color}`}>
                              💓 HTN: {getSuitabilityBadge(meal.htn_suitability).label}
                            </div>
                          )}
                          {meal.diabetes_suitability && (
                            <div className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getSuitabilityBadge(meal.diabetes_suitability).color}`}>
                              🩸 Diabetes: {getSuitabilityBadge(meal.diabetes_suitability).label}
                            </div>
                          )}
                        </div>

                        {/* Nutritional Info */}
                        {meal.calories_per_serving && (
                          <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                            <span>🔥 {meal.calories_per_serving} cal</span>
                            {meal.servings && <span>🍽️ {meal.servings} servings</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-4 py-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Previous
                    </button>

                    <div className="flex items-center space-x-1">
                      {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-lg font-medium transition ${
                              pagination.page === pageNum
                                ? 'bg-green-600 text-white'
                                : 'bg-white border border-green-200 text-gray-700 hover:bg-green-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="px-4 py-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Meal Detail Modal */}
      <MealDetailModal
        meal={selectedMeal}
        isOpen={!!selectedMeal}
        onClose={() => setSelectedMeal(null)}
      />
    </div>
  );
};

export default MealsExplorer;
