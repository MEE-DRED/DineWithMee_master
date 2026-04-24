import React from 'react';
import Modal from '../ui/Modal';
import { motion } from 'framer-motion';

const MealDetailModal = ({ meal, onClose, onAddToCart, isFavorite, onToggleFavorite }) => {
  if (!meal) return null;

  return (
    <Modal isOpen={!!meal} onClose={onClose} size="lg">
      <div className="space-y-6">
        {/* Image */}
        <div className="relative h-64 rounded-xl overflow-hidden">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => onToggleFavorite(meal.id)}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {meal.emoji && <span className="text-2xl">{meal.emoji}</span>}
            <span className="text-sm text-gray-600">{meal.country}</span>
          </div>
          <h2 className="text-3xl font-bold text-emerald-900 mb-2">{meal.name}</h2>
          <p className="text-gray-600 leading-relaxed">{meal.desc}</p>
        </div>

        {/* Health Tags */}
        {meal.healthTags && meal.healthTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {meal.healthTags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Nutrition */}
        <div className="bg-emerald-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-emerald-900 mb-4">Nutrition Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-900">
                {meal.nutrition?.calories || 0}
              </div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-900">
                {meal.nutrition?.protein || 0}g
              </div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-900">
                {meal.nutrition?.carbs || 0}g
              </div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-900">
                {meal.nutrition?.fats || 0}g
              </div>
              <div className="text-sm text-gray-600">Fats</div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        {meal.ingredients && meal.ingredients.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-emerald-900 mb-3">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {meal.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-3xl font-bold text-emerald-900">
            {meal.price} {meal.currency || 'RWF'}
          </div>
          <button
            onClick={() => {
              onAddToCart(meal);
              onClose();
            }}
            className="px-8 py-3 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MealDetailModal;
