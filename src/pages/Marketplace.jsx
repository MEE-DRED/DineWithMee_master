import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMeals,
  selectMeals,
  selectMealsLoading,
  selectMealsError,
  fetchIngredients,
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} from '../redux';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MealCard from '../components/MealCard';
import IngredientCard from '../components/IngredientCard';

const Marketplace = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('meals'); // 'meals' or 'ingredients'

  const mealsData = useSelector(selectMeals);
  const mealsLoading = useSelector(selectMealsLoading);
  const mealsError = useSelector(selectMealsError);

  const ingredientsData = useSelector(selectIngredients);
  const ingredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientsError = useSelector(selectIngredientsError);

  // Ensure data is always an array
  const meals = Array.isArray(mealsData) ? mealsData : [];
  const ingredients = Array.isArray(ingredientsData) ? ingredientsData : [];

  useEffect(() => {
    dispatch(fetchMeals({
      limit: 100,
      page: 1
    }));
    dispatch(fetchIngredients({
      limit: 100, 
      page: 1
    }));
  }, [dispatch]);

  const loading = activeTab === 'meals' ? mealsLoading : ingredientsLoading;
  const error = activeTab === 'meals' ? mealsError : ingredientsError;
  const items = activeTab === 'meals' ? meals : ingredients;

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
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-dwm-green-light overflow-hidden">
            <button
              onClick={() => setActiveTab('meals')}
              className={`px-8 py-3 font-semibold transition-colors ${
                activeTab === 'meals'
                  ? 'bg-dwm-green-deep text-white'
                  : 'bg-white text-dwm-green-deep hover:bg-dwm-green-pale'
              }`}
            >
              Meals ({meals.length})
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-8 py-3 font-semibold transition-colors ${
                activeTab === 'ingredients'
                  ? 'bg-dwm-green-deep text-white'
                  : 'bg-white text-dwm-green-deep hover:bg-dwm-green-pale'
              }`}
            >
              Ingredients ({ingredients.length})
            </button>
          </div>
        </div>

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

        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              activeTab === 'meals' ? (
                <MealCard key={item.id || item._id} meal={item} />
              ) : (
                <IngredientCard key={item.id || item._id} ingredient={item} />
              )
            ))}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dwm-text-mid text-lg">
              No {activeTab} available at the moment.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Marketplace;
