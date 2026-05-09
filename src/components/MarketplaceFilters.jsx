import { useState } from 'react';

const MarketplaceFilters = ({ onFilterChange, filters }) => {
  const [activeTab, setActiveTab] = useState('meals');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'west', label: 'West Africa' },
    { value: 'east', label: 'East Africa' },
  ];

  const healthTags = [
    { value: 'diabetes-friendly', label: 'Diabetes-Friendly', icon: '🩺' },
    { value: 'low-sodium', label: 'Low Sodium', icon: '🧂' },
    { value: 'high-protein', label: 'High Protein', icon: '💪' },
    { value: 'low-gi', label: 'Low GI', icon: '📊' },
    { value: 'dash', label: 'DASH Diet', icon: '❤️' },
    { value: 'balanced', label: 'Balanced', icon: '⚖️' },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'calories-asc', label: 'Calories: Low to High' },
    { value: 'protein-desc', label: 'Protein: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
  ];

  const handleRegionChange = region => {
    onFilterChange({ ...filters, region });
  };

  const handleHealthTagToggle = tag => {
    const newTags = filters.healthTags?.includes(tag)
      ? filters.healthTags.filter(t => t !== tag)
      : [...(filters.healthTags || []), tag];
    onFilterChange({ ...filters, healthTags: newTags });
  };

  const handleSearchChange = e => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleSortChange = e => {
    onFilterChange({ ...filters, sort: e.target.value });
  };

  const handleCaloriesChange = e => {
    onFilterChange({ ...filters, maxCalories: parseInt(e.target.value) });
  };

  const handleProteinChange = e => {
    onFilterChange({ ...filters, minProtein: parseInt(e.target.value) });
  };

  return (
    <div className="bg-white rounded-dwm-md shadow-dwm-sm p-6 mb-8">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('meals')}
          className={`pb-3 px-4 font-medium transition-colors relative ${
            activeTab === 'meals'
              ? 'text-dwm-green-deep'
              : 'text-dwm-text-mid hover:text-dwm-green-mid'
          }`}
        >
          African Meals
          {activeTab === 'meals' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-dwm-gold" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('ingredients')}
          className={`pb-3 px-4 font-medium transition-colors relative ${
            activeTab === 'ingredients'
              ? 'text-dwm-green-deep'
              : 'text-dwm-text-mid hover:text-dwm-green-mid'
          }`}
        >
          Ingredients
          {activeTab === 'ingredients' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-dwm-gold" />
          )}
        </button>
      </div>

      {/* Search and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search meals..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-dwm-sm focus:outline-none focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <select
          value={filters.sort || 'featured'}
          onChange={handleSortChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-dwm-sm focus:outline-none focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Region Filters */}
      <div className="mb-6">
        <h3 className="font-semibold text-dwm-green-deep mb-3">Region</h3>
        <div className="flex flex-wrap gap-2">
          {regions.map(region => (
            <button
              key={region.value}
              onClick={() => handleRegionChange(region.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filters.region === region.value
                  ? 'bg-dwm-gold text-white'
                  : 'bg-dwm-green-pale text-dwm-green-deep hover:bg-dwm-gold-pale'
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      {/* Health Tags */}
      <div className="mb-6">
        <h3 className="font-semibold text-dwm-green-deep mb-3">Health Tags</h3>
        <div className="flex flex-wrap gap-2">
          {healthTags.map(tag => (
            <button
              key={tag.value}
              onClick={() => handleHealthTagToggle(tag.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                filters.healthTags?.includes(tag.value)
                  ? 'bg-dwm-green-deep text-white'
                  : 'bg-gray-100 text-dwm-text-mid hover:bg-dwm-green-pale'
              }`}
            >
              <span>{tag.icon}</span>
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-dwm-gold font-medium hover:text-dwm-gold-light transition-colors mb-4"
      >
        <span>Advanced Filters</span>
        <svg
          className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-dwm-green-deep mb-2">
              Max Calories: {filters.maxCalories || 1000}
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={filters.maxCalories || 1000}
              onChange={handleCaloriesChange}
              className="w-full accent-dwm-gold"
            />
            <div className="flex justify-between text-xs text-dwm-text-light mt-1">
              <span>100</span>
              <span>1000</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-dwm-green-deep mb-2">
              Min Protein (g): {filters.minProtein || 0}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.minProtein || 0}
              onChange={handleProteinChange}
              className="w-full accent-dwm-gold"
            />
            <div className="flex justify-between text-xs text-dwm-text-light mt-1">
              <span>0g</span>
              <span>100g</span>
            </div>
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {(filters.region !== 'all' || filters.healthTags?.length > 0 || filters.search) && (
        <button
          onClick={() =>
            onFilterChange({
              region: 'all',
              healthTags: [],
              search: '',
              sort: 'featured',
              maxCalories: 1000,
              minProtein: 0,
            })
          }
          className="mt-4 text-sm text-dwm-text-mid hover:text-dwm-green-deep transition-colors underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default MarketplaceFilters;
