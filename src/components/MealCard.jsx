import React from 'react';
import { Link } from 'react-router-dom';
import { useReduxCart } from '../hooks/useReduxCart';

const MealCard = ({ meal, className = '' }) => {
  const { addItem } = useReduxCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: meal._id || meal.id,
      name: meal.name,
      price: meal.price,
      currency: meal.currency || 'RWF',
      image: meal.imageUrl || meal.image,
      quantity: 1,
      type: 'meals'
    });
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link
      to={`/meals/${meal._id || meal.id}`}
      className={`block group ${className}`}
    >
      <div className="card hover:shadow-lg transition-shadow duration-200">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {meal.featured_image || meal.image ? (
            <img
              src={meal.featured_image || meal.image}
              alt={meal.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-dwm-green-pale to-dwm-green-light flex items-center justify-center">
              <span className="text-4xl">{meal.emoji || '🍽️'}</span>
            </div>
          )}
          
          {/* Region Badge */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-dwm-green-deep/90 text-white text-xs rounded-full backdrop-blur-sm">
              {meal.emoji || '🍽️'} {(() => {
                const country = typeof meal.country === 'object' ? meal.country?.name : meal.country;
                const region = typeof meal.region === 'object' ? meal.region?.name : meal.region;
                return country || region || 'African Cuisine';
              })()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="card-content">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dwm-text-mid">
              {(() => {
                const country = typeof meal.country === 'object' ? meal.country?.name : meal.country;
                const region = typeof meal.region === 'object' ? meal.region?.name : meal.region;
                return country || region || 'African Cuisine';
              })()}
            </span>
            <span className="text-dwm-gold font-semibold">
              {(() => {
                const currency = typeof meal.currency === 'object' ? meal.currency?.name : meal.currency;
                return currency || 'RWF';
              })()}{' '}
              {(meal.price || 0).toLocaleString()}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-dwm-green-deep mb-2 group-hover:text-dwm-gold transition-colors">
            {meal.name || 'Unnamed Meal'}
          </h3>
          
          <p className="text-dwm-text-mid text-sm mb-4 line-clamp-2">
            {meal.desc || meal.description || 'Delicious and nutritious African meal'}
          </p>

          {/* Health Tags */}
          {meal.healthTags && meal.healthTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {meal.healthTags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-dwm-green-pale text-dwm-green-mid text-xs rounded-full"
                >
                  {typeof tag === 'object' ? tag?.name || tag?.label : tag}
                </span>
              ))}
              {meal.healthTags.length > 2 && (
                <span className="px-2 py-1 bg-dwm-green-pale text-dwm-green-mid text-xs rounded-full">
                  +{meal.healthTags.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Nutrition Preview */}
          {meal.nutrition && (
            <div className="flex items-center justify-between text-xs text-dwm-text-mid mb-4">
              <span>{meal.nutrition.calories} cal</span>
              <span>P: {meal.nutrition.protein}g</span>
              <span>C: {meal.nutrition.carbs}g</span>
              <span>F: {meal.nutrition.fats}g</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="btn-primary flex-1 text-sm py-2"
            >
              Add to Cart
            </button>
            <button
              onClick={handleViewDetails}
              className="btn-secondary flex-1 text-sm py-2"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MealCard;
