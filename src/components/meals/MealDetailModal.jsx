import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Meal Detail Modal Component
 * Shows comprehensive meal information including:
 * - Nutritional breakdown
 * - Health suitability
 * - Ingredients
 * - Price and availability
 * - Quick actions (Add to Cart, Chat with Nia)
 */

const MealDetailModal = ({ meal, isOpen, onClose, healthScore }) => {
  const navigate = useNavigate();

  if (!isOpen || !meal) return null;

  const getDietaryBadgeColor = (nomenclature) => {
    const colors = {
      'DASH': 'bg-red-100 text-red-700 border-red-300',
      'Low GI': 'bg-blue-100 text-blue-700 border-blue-300',
      'Balanced': 'bg-green-100 text-green-700 border-green-300',
      'High Protein': 'bg-purple-100 text-purple-700 border-purple-300',
      'High Carb': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'High Fat': 'bg-orange-100 text-orange-700 border-orange-300',
      'High Sodium risk': 'bg-red-100 text-red-700 border-red-300',
      'High GI': 'bg-orange-100 text-orange-700 border-orange-300'
    };
    return colors[nomenclature] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return { bg: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-500' };
    if (score >= 60) return { bg: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-500' };
    if (score >= 40) return { bg: 'bg-yellow-100', text: 'text-yellow-700', bar: 'bg-yellow-500' };
    return { bg: 'bg-orange-100', text: 'text-orange-700', bar: 'bg-orange-500' };
  };

  const handleChatWithNia = () => {
    // Store meal context for Nia
    localStorage.setItem('nia-meal-context', JSON.stringify(meal));
    navigate('/customer/chat-with-nia');
  };

  const handleAddToCart = () => {
    // This would integrate with your cart system
    console.log('Add to cart:', meal);
    // You can dispatch to CartContext here
  };

  const scoreColors = healthScore ? getHealthScoreColor(healthScore) : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Image */}
          <div className="relative h-64 bg-gradient-to-br from-green-100 to-emerald-100">
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
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Country Flag */}
            {meal.country && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 rounded-full text-sm font-medium">
                {meal.country === 'Nigeria' ? '🇳🇬 Nigerian' : '🇷🇼 Rwandan'}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Title & Price */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{meal.name}</h2>
                <p className="text-gray-600">{meal.nutritionalValue || meal.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  {meal.currency || 'RWF'} {meal.price?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">per serving</div>
              </div>
            </div>

            {/* Dietary Badge */}
            <div className="flex flex-wrap gap-2">
              {meal.dietaryNomenclature && (
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getDietaryBadgeColor(meal.dietaryNomenclature)}`}>
                  {meal.dietaryNomenclature}
                </span>
              )}
              {meal.calories && (
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold border border-gray-300">
                  {meal.calories} cal
                </span>
              )}
            </div>

            {/* Health Score */}
            {healthScore !== undefined && (
              <div className={`${scoreColors.bg} rounded-xl p-4 border-2 border-current ${scoreColors.text}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Health Match Score</span>
                  <span className="text-2xl font-bold">{healthScore}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${scoreColors.bar} transition-all duration-1000`}
                    style={{ width: `${healthScore}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-2 opacity-90">
                  {healthScore >= 80 && 'Highly recommended for your health profile'}
                  {healthScore >= 60 && healthScore < 80 && 'Good match for your health needs'}
                  {healthScore >= 40 && healthScore < 60 && 'Moderate suitability'}
                  {healthScore < 40 && 'Consider alternatives better suited to your health'}
                </p>
              </div>
            )}

            {/* Key Ingredients */}
            {meal.keyIngredients && meal.keyIngredients.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="text-xl mr-2">🥘</span>
                  Key Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {meal.keyIngredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Health Tags */}
            {meal.healthTags && meal.healthTags.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="text-xl mr-2">💚</span>
                  Health Benefits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {meal.healthTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm capitalize"
                    >
                      {tag.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suitability */}
            {meal.suitableFor && meal.suitableFor.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="text-xl mr-2">✅</span>
                  Suitable For
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {meal.suitableFor.map((condition, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200"
                    >
                      <span className="text-green-600">✓</span>
                      <span className="text-sm text-green-800 capitalize">
                        {condition.replace(/-/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {meal.warnings && meal.warnings.length > 0 && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <h3 className="font-bold text-red-800 mb-2 flex items-center">
                  <span className="text-xl mr-2">⚠️</span>
                  Important Notice
                </h3>
                <ul className="space-y-1">
                  {meal.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-red-700 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nutritional Information Grid */}
            {meal.nutritionalInfo && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="text-xl mr-2">📊</span>
                  Nutritional Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(meal.nutritionalInfo).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                      <div className="text-2xl font-bold text-gray-800">{value}</div>
                      <div className="text-xs text-gray-600 mt-1 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleChatWithNia}
                className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-medium shadow-md text-center"
              >
                <div className="text-2xl mb-1">🤖</div>
                <div className="font-semibold">Ask Nia</div>
                <div className="text-xs opacity-90 mt-1">Get personalized advice</div>
              </button>

              <button
                onClick={handleAddToCart}
                className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition font-medium shadow-md text-center"
              >
                <div className="text-2xl mb-1">🛒</div>
                <div className="font-semibold">Add to Cart</div>
                <div className="text-xs opacity-90 mt-1">{meal.currency} {meal.price?.toLocaleString()}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealDetailModal;
