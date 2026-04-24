import React, { useState } from 'react';

/**
 * Health Knowledge Blocks Component
 * Based on DinewithMee Nutritionist Corner Specification
 * Displays educational content for Diabetes and Hypertension
 */

const HealthKnowledgeBlocks = () => {
  const [activeTab, setActiveTab] = useState('diabetes');

  const knowledgeBlocks = {
    diabetes: {
      icon: '🩸',
      title: 'Diabetes Knowledge',
      color: 'blue',
      definition: {
        title: 'What is Diabetes?',
        content: 'Diabetes is a chronic metabolic disorder characterized by elevated blood glucose levels, typically measured in mmol/L or mg/dL.'
      },
      riskFactors: [
        { icon: '👴', text: 'Age', description: 'Risk increases with age' },
        { icon: '🚶‍♂️', text: 'Physical inactivity', description: 'Sedentary lifestyle' },
        { icon: '🍬', text: 'Poor dietary habits', description: 'High sugar/refined carbs' },
        { icon: '⚖️', text: 'Obesity', description: 'Excess body weight' }
      ],
      nutritionalManagement: {
        title: 'Nutritional Management',
        diet: 'A high-fibre, low-carbohydrate, low-fat, and moderate-protein diet is recommended.',
        components: [
          { icon: '💊', text: 'Prescribed medication (if applicable)' },
          { icon: '🏃', text: 'Regular physical activity' },
          { icon: '🧘', text: 'Lifestyle modification', details: 'Weight control, sleep, stress management' }
        ]
      },
      recommendedFoods: [
        { name: 'Beans', benefit: 'Low GI, high fiber' },
        { name: 'Brown rice', benefit: 'Low GI alternative' },
        { name: 'Sweet potatoes', benefit: 'Slow carbs' },
        { name: 'Leafy greens', benefit: 'High fiber, low carb' },
        { name: 'Lean proteins', benefit: 'Fish, chicken, eggs' }
      ],
      avoidFoods: [
        { name: 'White rice', reason: 'High GI' },
        { name: 'Sugary drinks', reason: 'Rapid glucose spike' },
        { name: 'Refined flour', reason: 'High GI, low fiber' },
        { name: 'Fried foods', reason: 'High fat content' }
      ]
    },
    hypertension: {
      icon: '💓',
      title: 'Hypertension Knowledge',
      color: 'red',
      definition: {
        title: 'What is Hypertension?',
        content: 'Hypertension (high blood pressure) is a chronic condition characterized by consistently elevated blood pressure readings ≥130/80 mmHg.'
      },
      riskFactors: [
        { icon: '⚖️', text: 'Obesity', description: 'Excess body weight' },
        { icon: '🧂', text: 'Unhealthy diet', description: 'High sodium intake' },
        { icon: '🚶', text: 'Physical inactivity', description: 'Lack of exercise' },
        { icon: '😰', text: 'Stress', description: 'Chronic stress levels' },
        { icon: '🧬', text: 'Genetic predisposition', description: 'Family history' }
      ],
      nutritionalManagement: {
        title: 'Nutritional Management',
        diet: 'A high-fibre, low-carbohydrate, low-fat, moderate-protein diet that is also low in sodium and high in potassium.',
        components: [
          { icon: '💊', text: 'Antihypertensive medications (if prescribed)' },
          { icon: '🏋️', text: 'Exercise', details: 'Regular physical activity' },
          { icon: '📉', text: 'Weight reduction', details: 'Maintain healthy BMI' },
          { icon: '🧘', text: 'Stress control', details: 'Meditation, relaxation' }
        ]
      },
      recommendedFoods: [
        { name: 'Leafy greens', benefit: 'High potassium' },
        { name: 'Garlic', benefit: 'BP control' },
        { name: 'Beans', benefit: 'Low sodium, high fiber' },
        { name: 'Fish', benefit: 'Omega-3 fatty acids' },
        { name: 'Avocado', benefit: 'Healthy fats' }
      ],
      avoidFoods: [
        { name: 'Salt/Seasoning cubes', reason: 'High sodium' },
        { name: 'Processed foods', reason: 'Hidden sodium' },
        { name: 'Fried foods', reason: 'High fat content' },
        { name: 'Alcohol', reason: 'Raises blood pressure' }
      ]
    }
  };

  const currentBlock = knowledgeBlocks[activeTab];
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      button: 'bg-blue-600 hover:bg-blue-700',
      badge: 'bg-blue-100 text-blue-700 border-blue-300'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      button: 'bg-red-600 hover:bg-red-700',
      badge: 'bg-red-100 text-red-700 border-red-300'
    }
  };

  const colors = colorClasses[currentBlock.color];

  return (
    <div className="space-y-6">
      {/* Tab Selector */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('diabetes')}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition ${
            activeTab === 'diabetes'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="text-2xl mb-1">🩸</div>
          <div>Diabetes</div>
        </button>
        <button
          onClick={() => setActiveTab('hypertension')}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition ${
            activeTab === 'hypertension'
              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="text-2xl mb-1">💓</div>
          <div>Hypertension</div>
        </button>
      </div>

      {/* Definition Card */}
      <div className={`${colors.bg} border-2 ${colors.border} rounded-2xl shadow-lg p-6`}>
        <div className="flex items-start space-x-4">
          <div className="text-5xl">{currentBlock.icon}</div>
          <div className="flex-1">
            <h2 className={`text-2xl font-bold ${colors.text} mb-3`}>
              {currentBlock.definition.title}
            </h2>
            <p className={`text-base ${colors.text} leading-relaxed`}>
              {currentBlock.definition.content}
            </p>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-2xl mr-2">⚠️</span>
          Risk Factors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentBlock.riskFactors.map((factor, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition"
            >
              <div className="text-3xl">{factor.icon}</div>
              <div>
                <div className="font-semibold text-gray-800">{factor.text}</div>
                <div className="text-sm text-gray-600 mt-1">{factor.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nutritional Management */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <span className="text-2xl mr-2">🍽️</span>
          {currentBlock.nutritionalManagement.title}
        </h3>

        <div className={`${colors.badge} border px-4 py-3 rounded-xl mb-6`}>
          <p className="font-medium leading-relaxed">
            {currentBlock.nutritionalManagement.diet}
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-semibold text-gray-800 mb-3">This should be combined with:</p>
          {currentBlock.nutritionalManagement.components.map((component, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-green-200"
            >
              <div className="text-2xl">{component.icon}</div>
              <div>
                <div className="font-semibold text-gray-800">{component.text}</div>
                {component.details && (
                  <div className="text-sm text-gray-600 mt-1">{component.details}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended & Foods to Avoid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recommended Foods */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
            <span className="text-xl mr-2">✅</span>
            Recommended Foods
          </h3>
          <div className="space-y-2">
            {currentBlock.recommendedFoods.map((food, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="font-medium text-green-800">{food.name}</div>
                <div className="text-xs text-green-600 ml-2">{food.benefit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Foods to Avoid */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
          <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
            <span className="text-xl mr-2">❌</span>
            Foods to Limit/Avoid
          </h3>
          <div className="space-y-2">
            {currentBlock.avoidFoods.map((food, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 bg-red-50 rounded-lg border border-red-200"
              >
                <div className="font-medium text-red-800">{food.name}</div>
                <div className="text-xs text-red-600 ml-2">{food.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-3">Need Personalized Guidance?</h3>
        <p className="mb-6 opacity-90">
          Chat with Nia or book a consultation with our expert nutritionists to create
          a meal plan tailored specifically for your health needs.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => window.location.href = '/customer/chat-with-nia'}
            className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition shadow-md"
          >
            🤖 Chat with Nia
          </button>
          <button
            onClick={() => window.location.href = '/customer/consultations/book'}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
          >
            👨‍⚕️ Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthKnowledgeBlocks;
