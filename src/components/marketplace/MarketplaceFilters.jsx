import React from 'react';

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
  const toggleHealthTag = tag => {
    if (healthTags.includes(tag)) {
      onHealthTagsChange(healthTags.filter(t => t !== tag));
    } else {
      onHealthTagsChange([...healthTags, tag]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 space-y-8">
      {/* Search and Sort */}
      <div className="border-b border-gray-200 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-base font-semibold text-gray-800 mb-3 block">Search Meals</label>
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="E.g., Jollof Rice, Chicken..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-base font-semibold text-gray-800 mb-3 block">Sort By</label>
            <select
              value={sortBy}
              onChange={e => onSortChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Health Tags */}
      {availableHealthTags.length > 0 && (
        <div className="border-b border-gray-200 pb-8">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Health Goals</h3>
          <div className="flex flex-wrap gap-3">
            {availableHealthTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleHealthTag(tag)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  healthTags.includes(tag)
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 hover:shadow-sm'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nutrition Sliders */}
      <div className="border-b border-gray-200 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-base font-semibold text-gray-800 mb-3 block flex justify-between">
              <span>Max Calories</span>
              <span className="font-bold text-emerald-700">{maxCalories}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={maxCalories}
              onChange={e => onMaxCaloriesChange(Number(e.target.value))}
              className="w-full accent-emerald-700"
            />
          </div>
          <div>
            <label className="text-base font-semibold text-gray-800 mb-3 block flex justify-between">
              <span>Min Protein</span>
              <span className="font-bold text-emerald-700">{minProtein}g</span>
            </label>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={minProtein}
              onChange={e => onMinProteinChange(Number(e.target.value))}
              className="w-full accent-emerald-700"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4">
        <button
          onClick={onToggleFavorites}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            showFavoritesOnly
              ? 'bg-amber-400 text-emerald-900 hover:bg-amber-500 shadow-lg'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {showFavoritesOnly ? '❤️ Favorites' : '🤍 Show All'}
        </button>

        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          {activeFilterCount > 0 && (
            <span className="text-base text-gray-600">
              {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
            </span>
          )}
          <button
            onClick={onClearFilters}
            className="text-base text-emerald-700 hover:text-emerald-600 font-semibold hover:underline"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
