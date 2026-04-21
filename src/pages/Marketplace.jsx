import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeals, selectMeals, selectMealsLoading, selectMealsError } from '../redux';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Marketplace = () => {
  const dispatch = useDispatch();
  const meals = useSelector(selectMeals);
  const loading = useSelector(selectMealsLoading);
  const error = useSelector(selectMealsError);
  const { addToCart } = useCart();

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  return (
    <div className="marketplace-page">
      <div className="page-hero bg-dwm-green-pale py-16">
        <div className="page-hero-content text-center max-w-4xl mx-auto px-6">
          <div className="breadcrumb text-dwm-text-mid mb-4">
            <a href="/" className="text-dwm-gold hover:text-dwm-gold-light">Home</a> &#8250; Marketplace
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-dwm-green-deep mb-4">
            African Marketplace by Region
          </h1>
          <p className="text-xl text-dwm-text-mid">
            Shop clinically informed African meals and ingredients across West, East, and Southern Africa.
          </p>
        </div>
      </div>

      <section className="section">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="text-center">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <div key={meal.id} className="card">
                <img 
                  src={meal.image} 
                  alt={meal.name}
                  className="card-image"
                />
                <div className="card-content">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-dwm-text-mid">{meal.emoji} {meal.country}</span>
                    <span className="text-dwm-gold font-semibold">
                      {meal.currency} {meal.price.toLocaleString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">{meal.name}</h3>
                  <p className="text-dwm-text-mid text-sm mb-4">{meal.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {meal.healthTags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-dwm-green-pale text-dwm-green-mid text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => addToCart(meal)}
                    className="btn-primary w-full text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Marketplace;
