import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchIngredients, 
  fetchIngredientById,
  selectIngredients, 
  selectIngredientsLoading, 
  selectIngredientsError,
  selectCurrentIngredient 
} from '../redux';
import { useReduxCart } from '../hooks/useReduxCart';
import LoadingSpinner from '../components/common/LoadingSpinner';

const IngredientDetail = () => {
  const { ingredientId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addItem } = useReduxCart();

  // Redux state
  const ingredientsData = useSelector(selectIngredients);
  const ingredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientsError = useSelector(selectIngredientsError);
  const currentIngredient = useSelector(selectCurrentIngredient);

  // Local state
  const [ingredient, setIngredient] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [relatedMeals, setRelatedMeals] = useState([]);
  const [mealsUsingIngredient, setMealsUsingIngredient] = useState([]);

  const ingredients = Array.isArray(ingredientsData) ? ingredientsData : [];

  useEffect(() => {
    // Fetch ingredients if not already loaded
    if (ingredients.length === 0) {
      dispatch(fetchIngredients({ limit: 100, page: 1 }));
    }
    
    // Fetch specific ingredient by ID
    dispatch(fetchIngredientById(ingredientId));
  }, [dispatch, ingredientId, ingredients.length]);

  useEffect(() => {
    // Use current ingredient from Redux or find in local data
    const foundIngredient = currentIngredient || ingredients.find(i => 
      i.id === ingredientId || i._id === ingredientId
    );
    
    if (foundIngredient) {
      setIngredient(foundIngredient);
      
      // Find meals that use this ingredient (mock data for now)
      // In a real app, this would come from the API
      const mockMealsUsingIngredient = [
        {
          id: 'm1',
          name: 'Jollof Rice',
          price: 4500,
          image: 'https://www.allrecipes.com/thmb/EJn9SMTzr4QRkdiWdi3ZBgC0Clw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/7499757JollofriceChefJohn4x3-d601da10d7e845d1ad4c8656a5b87ed4.jpg'
        },
        {
          id: 'm2',
          name: 'Efo Riro',
          price: 4200,
          image: 'https://lowcarbafrica.com/wp-content/uploads/2019/08/Efo-Riro-IG-1.jpg'
        }
      ];
      setMealsUsingIngredient(mockMealsUsingIngredient);
      
      // Find related ingredients (same region or similar suitability)
      const related = ingredients.filter(i => 
        (i.id === ingredientId || i._id === ingredientId) === false &&
        (i.region === foundIngredient.region || 
         i.suitability?.some(suit => foundIngredient.suitability?.includes(suit)))
      ).slice(0, 3);
      
      setRelatedMeals(related);
    } else if (ingredients.length > 0 && !ingredientsLoading) {
      // Ingredient not found and data is loaded
      navigate('/marketplace', { replace: true });
    }
  }, [ingredientId, ingredients, currentIngredient, ingredientsLoading, navigate]);

  const handleAddToCart = () => {
    if (ingredient) {
      addItem({
        id: ingredient._id || ingredient.id,
        name: ingredient.name,
        price: ingredient.price,
        currency: ingredient.currency || 'RWF',
        image: ingredient.imageUrl || ingredient.image,
        quantity: quantity,
        type: 'ingredients'
      });
    }
  };

  const renderNutritionChart = () => {
    if (!ingredient?.nutrition) return null;

    const { calories, protein, carbs, fats, fiber } = ingredient.nutrition;
    const total = protein + carbs + fats;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{calories}</div>
            <div className="text-sm text-gray-600">Calories</div>
            <div className="text-xs text-gray-500">per 100g</div>
          </div>
          {fiber && (
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{fiber}g</div>
              <div className="text-sm text-gray-600">Fiber</div>
              <div className="text-xs text-gray-500">per 100g</div>
            </div>
          )}
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

  if (ingredientsLoading && !ingredient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (ingredientsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p>{ingredientsError}</p>
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

  if (!ingredient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-dwm-text-mid text-lg mb-4">Ingredient not found</p>
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
            <span className="text-dwm-text-mid">{ingredient.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ingredient Header */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img
                  src={ingredient.image || ingredient.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'}
                  alt={ingredient.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-dwm-green-deep text-white text-sm rounded-full">
                    {ingredient.emoji || '🥕'} {(() => {
                      const region = typeof ingredient.region === 'object' ? ingredient.region?.name : ingredient.region;
                      return region || 'African Ingredient';
                    })()}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-dwm-green-deep mb-2">{ingredient.name}</h1>
                    <p className="text-dwm-text-mid">{ingredient.desc || ingredient.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-dwm-gold">
                      {ingredient.currency || 'RWF'} {(ingredient.price || 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-dwm-text-mid">per 100g</div>
                  </div>
                </div>

                {/* Suitability Tags */}
                {ingredient.suitability && ingredient.suitability.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {ingredient.suitability.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-dwm-gold-light text-dwm-gold-dark text-sm rounded-full"
                      >
                        {typeof tag === 'object' ? tag?.name || tag?.label : tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tabs */}
                <div className="border-b mb-6">
                  <nav className="flex space-x-8">
                    {['overview', 'nutrition', 'benefits'].map((tab) => (
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
                        <h3 className="font-semibold text-dwm-green-deep mb-2">About this ingredient</h3>
                        <p className="text-dwm-text-mid">
                          {ingredient.desc || ingredient.description || 'A nutritious African ingredient rich in essential vitamins and minerals, commonly used in traditional cooking.'}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-dwm-green-deep mb-2">Origin & Availability</h3>
                        <p className="text-dwm-text-mid">
                          Sourced from {(() => {
                            const country = typeof ingredient.country === 'object' ? ingredient.country?.name : ingredient.country;
                            return country || 'local farms';
                          })()}, {(() => {
                            const region = typeof ingredient.region === 'object' ? ingredient.region?.name : ingredient.region;
                            return region || 'Africa';
                          })()}
                        </p>
                        <p className="text-dwm-text-mid text-sm">
                          Available year-round, peak season: {ingredient.season || 'All seasons'}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-dwm-green-deep mb-2">Storage & Preparation</h3>
                        <ul className="list-disc list-inside text-dwm-text-mid space-y-1">
                          <li>Store in cool, dry place</li>
                          <li>Best consumed within {ingredient.shelfLife || '2 weeks'} of purchase</li>
                          <li>Wash thoroughly before use</li>
                          <li>Can be used fresh or dried</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'nutrition' && (
                    <div>
                      <h3 className="font-semibold text-dwm-green-deep mb-4">Nutritional Information (per 100g)</h3>
                      {renderNutritionChart()}
                      
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-dwm-green-deep mb-2">Vitamins</h4>
                          <ul className="text-sm text-dwm-text-mid space-y-1">
                            <li>• Vitamin A: {ingredient.vitamins?.A || 'N/A'}</li>
                            <li>• Vitamin C: {ingredient.vitamins?.C || 'N/A'}</li>
                            <li>• Vitamin K: {ingredient.vitamins?.K || 'N/A'}</li>
                            <li>• Folate: {ingredient.vitamins?.folate || 'N/A'}</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-dwm-green-deep mb-2">Minerals</h4>
                          <ul className="text-sm text-dwm-text-mid space-y-1">
                            <li>• Iron: {ingredient.minerals?.iron || 'N/A'}</li>
                            <li>• Calcium: {ingredient.minerals?.calcium || 'N/A'}</li>
                            <li>• Potassium: {ingredient.minerals?.potassium || 'N/A'}</li>
                            <li>• Magnesium: {ingredient.minerals?.magnesium || 'N/A'}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'benefits' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-dwm-green-deep mb-2">Health Benefits</h3>
                        <ul className="list-disc list-inside text-dwm-text-mid space-y-2">
                          <li>Rich in antioxidants that help fight free radicals</li>
                          <li>Supports immune system function</li>
                          <li>Promotes digestive health</li>
                          <li>Helps maintain healthy blood sugar levels</li>
                          <li>Supports heart health and circulation</li>
                          <li>Provides essential nutrients for overall wellness</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-dwm-green-deep mb-2">Scientific Research</h3>
                        <p className="text-dwm-text-mid mb-3">
                          Studies have shown that regular consumption of this ingredient may provide numerous health benefits:
                        </p>
                        <div className="space-y-2">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-1">Anti-inflammatory Properties</h4>
                            <p className="text-sm text-blue-700">
                              Research indicates compounds that help reduce inflammation in the body.
                            </p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <h4 className="font-medium text-green-800 mb-1">Nutrient Density</h4>
                            <p className="text-sm text-green-700">
                              High concentration of essential vitamins and minerals per serving.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Meals Using This Ingredient */}
            {mealsUsingIngredient.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-dwm-green-deep mb-4">Meals Using This Ingredient</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mealsUsingIngredient.map((meal) => (
                    <Link
                      key={meal.id}
                      to={`/meals/${meal.id}`}
                      className="block group"
                    >
                      <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-32 bg-gray-200">
                          <img
                            src={meal.image}
                            alt={meal.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-dwm-green-deep group-hover:text-dwm-gold transition-colors">
                            {meal.name}
                          </h4>
                          <p className="text-sm text-dwm-text-mid">
                            {meal.currency || 'RWF'} {(meal.price || 0).toLocaleString()}
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
              <h3 className="text-xl font-semibold text-dwm-green-deep mb-4">Order this ingredient</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dwm-text-mid mb-2">
                    Quantity (100g packs)
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
                      {ingredient.currency || 'RWF'} {((ingredient.price || 0) * quantity).toLocaleString()}
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
                      const region = typeof ingredient.region === 'object' ? ingredient.region?.name : ingredient.region;
                      return region || 'Africa';
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Country</span>
                  <span className="font-medium">
                    {(() => {
                      const country = typeof ingredient.country === 'object' ? ingredient.country?.name : ingredient.country;
                      return country || 'Local';
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Season</span>
                  <span className="font-medium">{ingredient.season || 'All year'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Shelf Life</span>
                  <span className="font-medium">{ingredient.shelfLife || '2 weeks'}</span>
                </div>
              </div>
            </div>

            {/* Suitability */}
            {ingredient.suitability && ingredient.suitability.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-dwm-green-deep mb-4">Suitable For</h3>
                <div className="space-y-2">
                  {ingredient.suitability.map((suit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-dwm-gold rounded-full"></span>
                      <span className="text-dwm-text-mid">
                        {typeof suit === 'object' ? suit?.name || suit?.label : suit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetail;
