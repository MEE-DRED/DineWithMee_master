import React from 'react';

const NutritionInfo = ({ nutrition, showChart = true, className = '' }) => {
  if (!nutrition) return null;

  const { calories, protein, carbs, fats, fiber } = nutrition;
  const total = protein + carbs + fats;

  const renderNutritionBar = (value, label, color, max) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-dwm-text-mid">{label}</span>
          <span className="font-medium">{value}g ({Math.round(percentage)}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${color}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  const renderCompactInfo = () => (
    <div className="flex items-center justify-between text-xs text-dwm-text-mid">
      <span className="flex items-center gap-1">
        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
        {calories} cal
      </span>
      {protein && (
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          P: {protein}g
        </span>
      )}
      {carbs && (
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          C: {carbs}g
        </span>
      )}
      {fats && (
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          F: {fats}g
        </span>
      )}
      {fiber && (
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          Fiber: {fiber}g
        </span>
      )}
    </div>
  );

  const renderDetailedInfo = () => (
    <div className="space-y-4">
      {/* Calories */}
      <div className="text-center p-4 bg-orange-50 rounded-lg">
        <div className="text-3xl font-bold text-orange-600">{calories}</div>
        <div className="text-sm text-gray-600">Calories</div>
        <div className="text-xs text-gray-500">per serving</div>
      </div>

      {/* Macronutrients Chart */}
      {showChart && total > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-dwm-green-deep">Macronutrients</h4>
          {protein > 0 && renderNutritionBar(protein, 'Protein', 'bg-blue-500', total)}
          {carbs > 0 && renderNutritionBar(carbs, 'Carbohydrates', 'bg-green-500', total)}
          {fats > 0 && renderNutritionBar(fats, 'Fats', 'bg-yellow-500', total)}
          {fiber > 0 && renderNutritionBar(fiber, 'Fiber', 'bg-purple-500', Math.max(total, fiber))}
        </div>
      )}

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-2 gap-4">
        {protein > 0 && (
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">{protein}g</div>
            <div className="text-xs text-gray-600">Protein</div>
          </div>
        )}
        {carbs > 0 && (
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">{carbs}g</div>
            <div className="text-xs text-gray-600">Carbs</div>
          </div>
        )}
        {fats > 0 && (
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-xl font-bold text-yellow-600">{fats}g</div>
            <div className="text-xs text-gray-600">Fats</div>
          </div>
        )}
        {fiber > 0 && (
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">{fiber}g</div>
            <div className="text-xs text-gray-600">Fiber</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={className}>
      {showChart ? renderDetailedInfo() : renderCompactInfo()}
    </div>
  );
};

export default NutritionInfo;
