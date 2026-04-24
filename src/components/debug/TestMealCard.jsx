import React from 'react';
import MealCard from '../MealCard';

// Test data with potential object issues
const testMeal = {
  id: 'test-1',
  name: 'Test Meal',
  desc: 'A test meal for debugging',
  price: 1000,
  currency: 'RWF',
  image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
  region: 'Test Region',
  country: { name: 'Test Country' }, // This is an object that could cause issues
  healthTags: ['Test tag'],
  emoji: '🍽️'
};

const TestMealCard = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Testing MealCard Component</h2>
      <div className="max-w-sm">
        <MealCard meal={testMeal} />
      </div>
    </div>
  );
};

export default TestMealCard;
