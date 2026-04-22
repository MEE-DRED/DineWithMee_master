import React from 'react';

const RecommendedMeals = ({ meals, loading, healthProfile }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-48 bg-dwm-green-pale rounded-t-lg"></div>
            <div className="card-content">
              <div className="h-4 bg-dwm-green-pale rounded mb-2"></div>
              <div className="h-4 bg-dwm-green-pale rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4"></div>
        <p className="text-dwm-text-mid mb-4">
          No recommended meals available at the moment
        </p>
        <button className="btn-primary">
          Browse All Meals
        </button>
      </div>
    );
  }

  const getSuitableMeals = () => {
    if (!healthProfile) return meals.slice(0, 6);
    
    // Filter meals based on health conditions
    return meals.filter(meal => {
      // For hypertension patients
      if (healthProfile.bp_category && healthProfile.bp_category !== 'NORMAL') {
        if (meal.htn_suitability === 'AVOID') return false;
      }
      
      // For diabetes patients
      if (healthProfile.diabetes_category && healthProfile.diabetes_category !== 'NORMAL') {
        if (meal.diabetes_suitability === 'AVOID') return false;
      }
      
      return true;
    }).slice(0, 6);
  };

  const getSuitabilityBadge = (meal) => {
    if (!healthProfile) return null;
    
    const badges = [];
    
    if (healthProfile.bp_category && healthProfile.bp_category !== 'NORMAL') {
      if (meal.htn_suitability === 'HIGHLY_RECOMMENDED') {
        badges.push({ text: 'BP Friendly', color: 'green' });
      } else if (meal.htn_suitability === 'RECOMMENDED') {
        badges.push({ text: 'BP Safe', color: 'blue' });
      } else if (meal.htn_suitability === 'MODERATE') {
        badges.push({ text: 'BP Moderate', color: 'yellow' });
      }
    }
    
    if (healthProfile.diabetes_category && healthProfile.diabetes_category !== 'NORMAL') {
      if (meal.diabetes_suitability === 'HIGHLY_RECOMMENDED') {
        badges.push({ text: 'Diabetes Friendly', color: 'green' });
      } else if (meal.diabetes_suitability === 'RECOMMENDED') {
        badges.push({ text: 'Diabetes Safe', color: 'blue' });
      } else if (meal.diabetes_suitability === 'MODERATE') {
        badges.push({ text: 'Diabetes Moderate', color: 'yellow' });
      }
    }
    
    return badges;
  };

  const recommendedMeals = getSuitableMeals();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendedMeals.map((meal) => {
        const badges = getSuitabilityBadge(meal);
        
        return (
          <div key={meal.id} className="card hover:shadow-lg transition-shadow">
            {meal.featured_image ? (
              <div className="h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={meal.featured_image} 
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="h-48 bg-dwm-green-pale rounded-t-lg flex items-center justify-center">
                <div className="text-4xl"></div>
              </div>
            )}
            
            <div className="card-content">
              <div className="mb-2">
                <h4 className="font-semibold text-dwm-green-deep">{meal.name}</h4>
                {meal.description && (
                  <p className="text-sm text-dwm-text-mid line-clamp-2">
                    {meal.description}
                  </p>
                )}
              </div>
              
              {/* Suitability Badges */}
              {badges.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {badges.map((badge, index) => (
                    <span 
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium bg-${badge.color}-100 text-${badge.color}-800`}
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Nutritional Info */}
              <div className="grid grid-cols-2 gap-2 text-sm text-dwm-text-mid mb-3">
                {meal.calories_per_serving && (
                  <div>
                    <span className="font-medium text-dwm-green-deep">
                      {meal.calories_per_serving}
                    </span>
                    <span className="ml-1">cal</span>
                  </div>
                )}
                {meal.sodium_per_serving && (
                  <div>
                    <span className="font-medium text-dwm-green-deep">
                      {meal.sodium_per_serving}
                    </span>
                    <span className="ml-1">mg Na</span>
                  </div>
                )}
                {meal.protein_per_serving && (
                  <div>
                    <span className="font-medium text-dwm-green-deep">
                      {meal.protein_per_serving}
                    </span>
                    <span className="ml-1">g protein</span>
                  </div>
                )}
                {meal.preparation_time_min && (
                  <div>
                    <span className="font-medium text-dwm-green-deep">
                      {meal.preparation_time_min}
                    </span>
                    <span className="ml-1">min</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="btn-primary flex-1 text-sm">
                  View Details
                </button>
                <button className="btn-secondary flex-1 text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedMeals;
