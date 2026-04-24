/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeals, selectMeals, selectMealsLoading, selectMealsError } from '../redux';
import { useReduxCart } from '../hooks/useReduxCart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getMealById } from '../data/meals';

const MealDetail = () => {
  const { mealId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addItem } = useReduxCart();

  // Redux state
  const mealsData = useSelector(selectMeals);
  const mealsLoading = useSelector(selectMealsLoading);
  const mealsError = useSelector(selectMealsError);

  // Local state
  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [relatedMeals, setRelatedMeals] = useState([]);

  const meals = Array.isArray(mealsData) ? mealsData : [];

  useEffect(() => {
    // Fetch meals if not already loaded
    if (meals.length === 0) {
      dispatch(fetchMeals({ limit: 100, page: 1 }));
    }
  }, [dispatch, meals.length]);

  useEffect(() => {
    // Find meal by ID
    let foundMeal = meals.find(m => m.id === mealId || m._id === mealId);
    
    // If not found in Redux data, check static data
    if (!foundMeal) {
      foundMeal = getMealById(mealId);
    }
    
    if (foundMeal) {
      setMeal(foundMeal);
      
      // Find related meals (same region or similar health tags)
      const related = meals.filter(m => 
        (m.region === foundMeal.region || m.id === mealId || m._id === mealId) === false &&
        (m.region === foundMeal.region || 
         m.healthTags?.some(tag => foundMeal.healthTags?.includes(tag)))
      ).slice(0, 3);
      
      setRelatedMeals(related);
    } else if (meals.length > 0) {
      // Meal not found and data is loaded
      navigate('/marketplace', { replace: true });
    }
  }, [mealId, meals, navigate]);

  const handleAddToCart = () => {
    if (meal) {
      addItem({
        id: meal._id || meal.id,
        name: meal.name,
        price: meal.price,
        currency: meal.currency || 'RWF',
        image: meal.imageUrl || meal.image,
        quantity: quantity,
        type: 'meals'
      });
    }
  };

  const renderNutritionChart = () => {
    if (!meal?.nutrition) return null;

    const { calories, protein, carbs, fats } = meal.nutrition;
    const total = protein + carbs + fats;

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-dwm-text-mid">Calories</span>
          <span className="font-semibold text-dwm-green-deep">{calories} kcal</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Protein</span>
              <span>{protein}g ({Math.round((protein/total)*100)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${(protein/total)*100}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Carbohydrates</span>
              <span>{carbs}g ({Math.round((carbs/total)*100)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(carbs/total)*100}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Fats</span>
              <span>{fats}g ({Math.round((fats/total)*100)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${(fats/total)*100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (mealsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (mealsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p>{mealsError}</p>
          </div>
          <button
            onClick={() => navigate('/marketplace')}
            className="btn-primary"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-dwm-text-mid text-lg mb-4">Meal not found</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="btn-primary"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-dwm-gold hover:text-dwm-gold-light">Home</Link>
            <span className="text-dwm-text-mid">›</span>
            <Link to="/marketplace" className="text-dwm-gold hover:text-dwm-gold-light">Marketplace</Link>
            <span className="text-dwm-text-mid">›</span>
            <span className="text-dwm-text-mid">{meal.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Meal Header */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img
                  src={meal.image || meal.imageUrl || 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-dwm-green-deep text-white text-sm rounded-full">
                    {meal.emoji || '🍽️'} {(() => {
                      const region = typeof meal.region === 'object' ? meal.region?.name : meal.region;
                      return region || 'African Cuisine';
                    })()}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-dwm-green-deep mb-2">{meal.name}</h1>
                    <p className="text-dwm-text-mid">{meal.desc || meal.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-dwm-gold">
                      {meal.currency || 'RWF'} {(meal.price || 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-dwm-text-mid">per serving</div>
                  </div>
                </div>

                {/* Health Tags */}
                {meal.healthTags && meal.healthTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {meal.healthTags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-dwm-green-pale text-dwm-green-mid text-sm rounded-full"
                      >
                        {typeof tag === 'object' ? tag?.name || tag?.label : tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tabs */}
                <div className="border-b mb-6">
                  <nav className="flex space-x-8">
                    {['overview', 'nutrition', 'ingredients'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                          activeTab === tab
                            ? 'border-dwm-green-deep text-dwm-green-deep'
                            : 'border-transparent text-dwm-text-mid hover:text-dwm-green-deep'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="min-h-[200px]">
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-dwm-green-deep mb-2">About this meal</h3>
                        <p className="text-dwm-text-mid">
                          {meal.desc || meal.description || 'A delicious and nutritious African meal prepared with traditional ingredients and cooking methods.'}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-dwm-green-deep mb-2">Origin</h3>
                        <p className="text-dwm-text-mid">
                          {(() => {
                            const country = typeof meal.country === 'object' ? meal.country?.name : meal.country;
                            const region = typeof meal.region === 'object' ? meal.region?.name : meal.region;
                            return `${country || 'Africa'}, ${region || 'African Cuisine'}`;
                          })()}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-dwm-green-deep mb-2">Health Benefits</h3>
                        <ul className="list-disc list-inside text-dwm-text-mid space-y-1">
                          {meal.ingredientNutrition?.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          )) || (
                            <li>Rich in essential nutrients and vitamins</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'nutrition' && (
                    <div>
                      <h3 className="font-semibold text-dwm-green-deep mb-4">Nutritional Information</h3>
                      {renderNutritionChart()}
                    </div>
                  )}

                  {activeTab === 'ingredients' && (
                    <div>
                      <h3 className="font-semibold text-dwm-green-deep mb-4">Ingredients</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {meal.ingredients?.map((ingredient, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-dwm-gold rounded-full"></span>
                            <span className="text-dwm-text-mid">{ingredient}</span>
                          </div>
                        )) || (
                          <p className="text-dwm-text-mid">Ingredients information not available</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Related Meals */}
            {relatedMeals.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-dwm-green-deep mb-4">Related Meals</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedMeals.map((relatedMeal) => (
                    <Link
                      key={relatedMeal.id || relatedMeal._id}
                      to={`/meals/${relatedMeal.id || relatedMeal._id}`}
                      className="block group"
                    >
                      <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-32 bg-gray-200">
                          {relatedMeal.image && (
                            <img
                              src={relatedMeal.image}
                              alt={relatedMeal.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-dwm-green-deep group-hover:text-dwm-gold transition-colors">
                            {relatedMeal.name}
                          </h4>
                          <p className="text-sm text-dwm-text-mid">
                            {relatedMeal.currency || 'RWF'} {(relatedMeal.price || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-dwm-green-deep mb-4">Order this meal</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dwm-text-mid mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full border border-dwm-green-light flex items-center justify-center hover:bg-dwm-green-pale"
                    >
                      -
                    </button>
                    <span className="font-semibold text-lg w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full border border-dwm-green-light flex items-center justify-center hover:bg-dwm-green-pale"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-dwm-text-mid">Total</span>
                    <span className="text-2xl font-bold text-dwm-gold">
                      {meal.currency || 'RWF'} {((meal.price || 0) * quantity).toLocaleString()}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-dwm-green-deep mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Region</span>
                  <span className="font-medium">
                    {(() => {
                      const region = typeof meal.region === 'object' ? meal.region?.name : meal.region;
                      return region || 'African Cuisine';
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Country</span>
                  <span className="font-medium">
                    {(() => {
                      const country = typeof meal.country === 'object' ? meal.country?.name : meal.country;
                      return country || 'Africa';
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Prep Time</span>
                  <span className="font-medium">25-30 mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Servings</span>
                  <span className="font-medium">2-3 people</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
