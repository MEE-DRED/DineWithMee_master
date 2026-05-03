import React from 'react';
import Modal from '../ui/Modal';
import { motion } from 'framer-motion';
import {
  FaCarrot,
  FaLeaf,
  FaDrumstickBite,
  FaFish,
  FaBreadSlice,
  FaTint,
  FaTimes,
} from 'react-icons/fa';

const ingredientIcons = {
  vegetable: <FaCarrot className="text-orange-500" />,
  spice: <FaLeaf className="text-green-500" />,
  protein: <FaDrumstickBite className="text-amber-800" />,
  fish: <FaFish className="text-blue-500" />,
  garnish: <FaLeaf className="text-lime-500" />,
  carb: <FaBreadSlice className="text-amber-600" />,
  default: <FaTint className="text-gray-400" />,
};

const MealDetailModal = ({ meal, onClose, onAddToCart, isFavorite, onToggleFavorite }) => {
  if (!meal) return null;

  const getIngredientIcon = ingredient => {
    const type = ingredient.type || 'default';
    return ingredientIcons[type] || ingredientIcons.default;
  };

  return (
    <Modal isOpen={!!meal} onClose={onClose} size="3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-8 p-4"
      >
        {/* Left Column: Image */}
        <motion.div
          className="md:col-span-2 relative h-96 rounded-2xl overflow-hidden shadow-2xl group"
          whileHover={{ scale: 1.03 }}
        >
          <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button
            onClick={() => onToggleFavorite(meal.id)}
            className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all text-3xl shadow-lg"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </motion.div>

        {/* Right Column: Details */}
        <div className="md:col-span-3 flex flex-col space-y-6">
          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {meal.emoji && <span className="text-3xl">{meal.emoji}</span>}
                  <span className="text-base font-semibold text-gray-500 tracking-wide uppercase">
                    {meal.country}
                  </span>
                </div>
                <h2 className="text-4xl font-extrabold text-emerald-900 mb-3">{meal.name}</h2>
              </div>
              <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800">
                <FaTimes size={24} />
              </button>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">{meal.desc}</p>
          </div>

          {meal.healthTags && meal.healthTags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {meal.healthTags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="bg-emerald-50/80 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-emerald-900 mb-4">Nutrition Snapshot</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['calories', 'protein', 'carbs', 'fats'].map(key => (
                <div
                  key={key}
                  className="text-center p-2 rounded-lg hover:bg-emerald-100/70 transition"
                >
                  <div className="text-4xl font-bold text-emerald-800">
                    {meal.nutrition?.[key] || 0}
                    <span className="text-lg">{key !== 'calories' && 'g'}</span>
                  </div>
                  <div className="text-sm text-gray-600 font-medium capitalize mt-1">{key}</div>
                </div>
              ))}
            </div>
          </div>

          {meal.ingredients && meal.ingredients.length > 0 && (
            <div className="pt-6">
              <h3 className="text-xl font-bold text-emerald-900 mb-4">Key Ingredients</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {meal.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <div className="text-2xl">{getIngredientIcon(ingredient)}</div>
                    <span className="text-gray-800 font-medium">{ingredient.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-gray-100">
            <div className="text-5xl font-extrabold text-emerald-900">
              {meal.price} <span className="text-2xl font-semibold">{meal.currency || 'RWF'}</span>
            </div>
            <button
              onClick={() => {
                onAddToCart(meal);
                onClose();
              }}
              className="w-full sm:w-auto px-10 py-4 bg-emerald-800 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default MealDetailModal;
