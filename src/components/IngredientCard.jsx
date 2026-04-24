import React from 'react';
import { Link } from 'react-router-dom';
import { useReduxCart } from '../hooks/useReduxCart';

const IngredientCard = ({ ingredient, className = '' }) => {
  const { addItem } = useReduxCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: ingredient._id || ingredient.id,
      name: ingredient.name,
      price: ingredient.price,
      currency: ingredient.currency || 'RWF',
      image: ingredient.imageUrl || ingredient.image,
      quantity: 1,
      type: 'ingredients'
    });
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link
      to={`/ingredients/${ingredient._id || ingredient.id}`}
      className={`block group ${className}`}
    >
      <div className="card hover:shadow-lg transition-shadow duration-200">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {ingredient.featured_image || ingredient.image ? (
            <img
              src={ingredient.featured_image || ingredient.image}
              alt={ingredient.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-dwm-gold-light to-dwm-gold flex items-center justify-center">
              <span className="text-4xl">{ingredient.emoji || '🥕'}</span>
            </div>
          )}
          
          {/* Region Badge */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-dwm-gold/90 text-white text-xs rounded-full backdrop-blur-sm">
              {ingredient.emoji || '🥕'} {(() => {
                const country = typeof ingredient.country === 'object' ? ingredient.country?.name : ingredient.country;
                const region = typeof ingredient.region === 'object' ? ingredient.region?.name : ingredient.region;
                return country || region || 'Africa';
              })()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="card-content">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dwm-text-mid">
              {(() => {
                const country = typeof ingredient.country === 'object' ? ingredient.country?.name : ingredient.country;
                const region = typeof ingredient.region === 'object' ? ingredient.region?.name : ingredient.region;
                return country || region || 'African Ingredient';
              })()}
            </span>
            <span className="text-dwm-gold font-semibold">
              {(() => {
                const currency = typeof ingredient.currency === 'object' ? ingredient.currency?.name : ingredient.currency;
                return currency || 'RWF';
              })()}{' '}
              {(ingredient.price || 0).toLocaleString()}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-dwm-green-deep mb-2 group-hover:text-dwm-gold transition-colors">
            {ingredient.name || 'Unnamed Ingredient'}
          </h3>
          
          <p className="text-dwm-text-mid text-sm mb-4 line-clamp-2">
            {ingredient.desc || ingredient.description || 'Fresh and nutritious African ingredient'}
          </p>

          {/* Suitability Tags */}
          {ingredient.suitability && ingredient.suitability.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {ingredient.suitability.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-dwm-gold-light text-dwm-gold-dark text-xs rounded-full"
                >
                  {typeof tag === 'object' ? tag?.name || tag?.label : tag}
                </span>
              ))}
              {ingredient.suitability.length > 2 && (
                <span className="px-2 py-1 bg-dwm-gold-light text-dwm-gold-dark text-xs rounded-full">
                  +{ingredient.suitability.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Nutrition Preview */}
          {ingredient.nutrition && (
            <div className="flex items-center justify-between text-xs text-dwm-text-mid mb-4">
              <span>{ingredient.nutrition.calories} cal/100g</span>
              {ingredient.nutrition.protein && <span>P: {ingredient.nutrition.protein}g</span>}
              {ingredient.nutrition.fiber && <span>Fiber: {ingredient.nutrition.fiber}g</span>}
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

export default IngredientCard;
