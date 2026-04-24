import React from 'react';

const regions = [
  'all',
  'West Africa',
  'East Africa',
  'North Africa',
  'Southern Africa',
  'Central Africa'
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'calories-low', label: 'Calories: Low to High' },
  { value: 'calories-high', label: 'Calories: High to Low' },
  { value: 'protein-high', label: 'Protein: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
];

const MarketplaceFilters = ({
  region,
  onRegionChange,
  healthTags,
  onHealthTagsChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  maxCalories,
  onMaxCaloriesChange,
  minProtein,
  onMinProteinChange,
  showFavoritesOnly,
  onToggleFavorites,
  onClearFilters,
  activeFilterCount,
  availableHealthTags = [],
}) => {
  const toggleHealthTag = (tag) => {
    if (healthTags.includes(tag)) {
      onHealthTagsChange(healthTags.filter(t => t !== tag));
    } else {
      onHealthTagsChange([...healthTags, tag]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 space-y-6">
      {/* Region Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Region</h3>
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => onRegionChange(r)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                region === r
                  ? 'bg-emerald-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {r === 'all' ? 'All Regions' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Search Meals
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by meal, country, ingredient..."
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Health Tags */}
      {availableHealthTags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Health Goals</h3>
          <div className="flex flex-wrap gap-2">
            {availableHealthTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleHealthTag(tag)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  healthTags.includes(tag)
                    ? 'bg-emerald-800 text-white'
                    : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nutrition Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Max Calories: {maxCalories}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={maxCalories}
            onChange={(e) => onMaxCaloriesChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Min Protein: {minProtein}g
          </label>
          <input
            type="range"
            min="0"
            max="60"
            step="5"
            value={minProtein}
            onChange={(e) => onMinProteinChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={onToggleFavorites}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showFavoritesOnly
              ? 'bg-amber-400 text-emerald-900'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showFavoritesOnly ? '❤️ Favorites Only' : '🤍 Show All'}
        </button>

        <div className="flex items-center gap-4">
          {activeFilterCount > 0 && (
            <span className="text-sm text-gray-600">
              {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
            </span>
          )}
          <button
            onClick={onClearFilters}
            className="text-sm text-emerald-700 hover:text-emerald-600 font-semibold"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
