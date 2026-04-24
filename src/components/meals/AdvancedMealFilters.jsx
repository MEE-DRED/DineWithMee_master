import React, { useState } from 'react';

/**
 * Advanced Meal Filtering Component
 * Based on DinewithMee Nutritionist Corner Specification
 * Filters by: Dietary Nomenclature, Country, Health Condition, Price Range
 */

const AdvancedMealFilters = ({ onFilterChange, currentFilters = {} }) => {
  const [filters, setFilters] = useState({
    htnSuitability: currentFilters.htnSuitability || '',
    diabetesSuitability: currentFilters.diabetesSuitability || '',
    region: currentFilters.region || '',
    searchQuery: currentFilters.searchQuery || '',
    ...currentFilters
  });

  // Backend uses FoodSuitability enum: HIGHLY_RECOMMENDED, RECOMMENDED, MODERATE, OCCASIONAL, AVOID
  const suitabilityLevels = [
    { value: 'HIGHLY_RECOMMENDED', label: '⭐ Highly Recommended', color: 'bg-green-50 text-green-700 border-green-200' },
    { value: 'RECOMMENDED', label: '✅ Recommended', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { value: 'MODERATE', label: '⚖️ Moderate', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    { value: 'OCCASIONAL', label: '⚠️ Occasional', color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { value: 'AVOID', label: '❌ Avoid', color: 'bg-red-50 text-red-700 border-red-200' }
  ];

  const regions = [
    { value: '', label: '🌍 All Regions', flag: '' },
    { value: 'West Africa', label: 'West Africa', flag: '🇳🇬', description: 'Nigeria, Ghana, etc.' },
    { value: 'East Africa', label: 'East Africa', flag: '🇷🇼', description: 'Rwanda, Kenya, Uganda' }
  ];

  const healthConditions = [
    { value: '', label: 'All Conditions', key: 'all' },
    { value: 'hypertension', label: '💓 Hypertension', description: 'Low sodium, heart-friendly', key: 'htnSuitability' },
    { value: 'diabetes', label: '🩸 Diabetes', description: 'Low GI, blood sugar control', key: 'diabetesSuitability' }
  ];

  const servingSizes = [
    { value: '', label: 'All Servings' },
    { value: '1-2', label: 'Small (1-2 servings)' },
    { value: '3-4', label: 'Medium (3-4 servings)' },
    { value: '5+', label: 'Large (5+ servings)' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      htnSuitability: '',
      diabetesSuitability: '',
      region: '',
      searchQuery: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFilterCount = Object.values(filters).filter(v => v && v !== 'all' && v !== '').length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-green-800">Filter Meals</h3>
          <p className="text-sm text-gray-600 mt-1">Find meals that match your health needs</p>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
          >
            Reset ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🔍 Search Meals
        </label>
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
          placeholder="Search by name or ingredient..."
          className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Hypertension Suitability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          💓 Hypertension Suitability
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleFilterChange('htnSuitability', '')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition border ${
              filters.htnSuitability === ''
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            All Levels
          </button>
          {suitabilityLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => handleFilterChange('htnSuitability', level.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition border ${
                filters.htnSuitability === level.value
                  ? level.color + ' ring-2 ring-offset-1 ring-current'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diabetes Suitability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          🩸 Diabetes Suitability
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleFilterChange('diabetesSuitability', '')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition border ${
              filters.diabetesSuitability === ''
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            All Levels
          </button>
          {suitabilityLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => handleFilterChange('diabetesSuitability', level.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition border ${
                filters.diabetesSuitability === level.value
                  ? level.color + ' ring-2 ring-offset-1 ring-current'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Health Condition Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          🎯 Quick Health Presets
        </label>
        <div className="space-y-2">
          {healthConditions.map((condition) => (
            <button
              key={condition.value}
              onClick={() => {
                if (condition.key === 'all') {
                  handleFilterChange('htnSuitability', '');
                  handleFilterChange('diabetesSuitability', '');
                } else if (condition.key === 'htnSuitability') {
                  handleFilterChange('htnSuitability', 'HIGHLY_RECOMMENDED');
                  handleFilterChange('diabetesSuitability', '');
                } else if (condition.key === 'diabetesSuitability') {
                  handleFilterChange('diabetesSuitability', 'HIGHLY_RECOMMENDED');
                  handleFilterChange('htnSuitability', '');
                }
              }}
              className={`w-full text-left px-4 py-3 rounded-xl transition border ${
                (condition.key === 'htnSuitability' && filters.htnSuitability === 'HIGHLY_RECOMMENDED') ||
                (condition.key === 'diabetesSuitability' && filters.diabetesSuitability === 'HIGHLY_RECOMMENDED') ||
                (condition.key === 'all' && !filters.htnSuitability && !filters.diabetesSuitability)
                  ? 'bg-green-50 border-green-300 text-green-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{condition.label}</div>
                  {condition.description && (
                    <div className="text-xs text-gray-600 mt-1">{condition.description}</div>
                  )}
                </div>
                {((condition.key === 'htnSuitability' && filters.htnSuitability === 'HIGHLY_RECOMMENDED') ||
                  (condition.key === 'diabetesSuitability' && filters.diabetesSuitability === 'HIGHLY_RECOMMENDED') ||
                  (condition.key === 'all' && !filters.htnSuitability && !filters.diabetesSuitability)) && (
                  <span className="text-green-600">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Region Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          🌍 Regional Cuisine
        </label>
        <div className="space-y-2">
          {regions.map((region) => (
            <button
              key={region.value}
              onClick={() => handleFilterChange('region', region.value)}
              className={`w-full text-left px-4 py-3 rounded-xl transition border ${
                filters.region === region.value
                  ? 'bg-green-50 border-green-300 text-green-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    {region.flag && <span className="mr-2">{region.flag}</span>}
                    {region.label}
                  </div>
                  {region.description && (
                    <div className="text-xs text-gray-600 mt-1">{region.description}</div>
                  )}
                </div>
                {filters.region === region.value && (
                  <span className="text-green-600">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Serving Size Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          🍽️ Serving Size
        </label>
        <select
          value={filters.servingSize || ''}
          onChange={(e) => handleFilterChange('servingSize', e.target.value)}
          className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          {servingSizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters Summary */}
      {activeFilterCount > 0 && (
        <div className="pt-4 border-t border-green-100">
          <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.htnSuitability && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                💓 HTN: {filters.htnSuitability}
              </span>
            )}
            {filters.diabetesSuitability && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                🩸 Diabetes: {filters.diabetesSuitability}
              </span>
            )}
            {filters.region && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                🌍 {filters.region}
              </span>
            )}
            {filters.searchQuery && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                🔍 "{filters.searchQuery}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedMealFilters;
