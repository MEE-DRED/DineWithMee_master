import React, { useState, useEffect } from 'react';
import { healthAPI } from '../../redux/api/health';
import { healthTriageAPI } from '../../redux/api/healthTriage';
import LoadingSpinner from '../common/LoadingSpinner';

const HealthProfileBuilder = ({ onComplete, existingProfile }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [riskAssessment, setRiskAssessment] = useState(null);

  const [formData, setFormData] = useState({
    // Basic Information
    age: existingProfile?.age || '',
    gender: existingProfile?.gender || '',
    height: existingProfile?.height || '',
    weight: existingProfile?.weight || '',

    // Health Conditions
    healthConditions: existingProfile?.healthConditions || [],
    allergies: existingProfile?.allergies || '',
    medications: existingProfile?.medications || '',

    // Vital Signs
    systolicBp: '',
    diastolicBp: '',
    fastingGlucose: '',

    // Dietary Information
    dietaryPreferences: existingProfile?.dietaryPreferences || [],
    foodAllergies: existingProfile?.foodAllergies || [],
    mealsPerDay: existingProfile?.mealsPerDay || 3,

    // Lifestyle
    activityLevel: existingProfile?.activityLevel || 'MODERATE',
    sleepHours: existingProfile?.sleepHours || 7,
    stressLevel: existingProfile?.stressLevel || 'MODERATE',

    // Dietary Habits
    highSodiumDiet: false,
    irregularMeals: false,
    highGiFoods: false,

    // Goals
    healthGoals: existingProfile?.healthGoals || []
  });

  const healthConditionOptions = [
    { value: 'HYPERTENSION', label: 'Hypertension (High Blood Pressure)', icon: '💓' },
    { value: 'DIABETES', label: 'Diabetes', icon: '🩸' },
    { value: 'OBESITY', label: 'Obesity', icon: '⚖️' },
    { value: 'HEART_DISEASE', label: 'Heart Disease', icon: '❤️' },
    { value: 'KIDNEY_DISEASE', label: 'Kidney Disease', icon: '🫘' },
    { value: 'NONE', label: 'None', icon: '✅' }
  ];

  const dietaryPreferenceOptions = [
    { value: 'VEGETARIAN', label: 'Vegetarian', icon: '🥗' },
    { value: 'VEGAN', label: 'Vegan', icon: '🌱' },
    { value: 'HALAL', label: 'Halal', icon: '🕌' },
    { value: 'KOSHER', label: 'Kosher', icon: '✡️' },
    { value: 'NO_PORK', label: 'No Pork', icon: '🚫' },
    { value: 'NO_BEEF', label: 'No Beef', icon: '🐄' },
    { value: 'LOW_SODIUM', label: 'Low Sodium (DASH)', icon: '🧂' },
    { value: 'LOW_GI', label: 'Low Glycemic Index', icon: '📉' }
  ];

  const healthGoalOptions = [
    { value: 'WEIGHT_LOSS', label: 'Weight Loss', icon: '📉' },
    { value: 'WEIGHT_GAIN', label: 'Weight Gain', icon: '📈' },
    { value: 'BLOOD_PRESSURE_CONTROL', label: 'Control Blood Pressure', icon: '💓' },
    { value: 'BLOOD_SUGAR_CONTROL', label: 'Control Blood Sugar', icon: '🩸' },
    { value: 'GENERAL_WELLNESS', label: 'General Wellness', icon: '🌟' },
    { value: 'DISEASE_PREVENTION', label: 'Disease Prevention', icon: '🛡️' }
  ];

  const activityLevels = [
    { value: 'SEDENTARY', label: 'Sedentary', description: 'Little to no exercise' },
    { value: 'LIGHT', label: 'Light', description: 'Exercise 1-3 days/week' },
    { value: 'MODERATE', label: 'Moderate', description: 'Exercise 3-5 days/week' },
    { value: 'ACTIVE', label: 'Active', description: 'Exercise 6-7 days/week' },
    { value: 'VERY_ACTIVE', label: 'Very Active', description: 'Intense exercise daily' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [field]: newValues
      };
    });
  };

  const handleNext = async () => {
    if (currentStep === 2 && formData.systolicBp && formData.diastolicBp) {
      // Perform risk assessment
      await performRiskAssessment();
    }

    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const performRiskAssessment = async () => {
    try {
      const assessmentData = {
        age: parseInt(formData.age),
        systolicBp: parseInt(formData.systolicBp),
        diastolicBp: parseInt(formData.diastolicBp),
        fastingGlucose: formData.fastingGlucose ? parseInt(formData.fastingGlucose) : undefined,
        medications: formData.medications ? [formData.medications] : [],
        healthConditions: formData.healthConditions,
        highSodiumDiet: formData.highSodiumDiet,
        irregularMeals: formData.irregularMeals,
        highGiFoods: formData.highGiFoods
      };

      const response = await healthTriageAPI.assess(assessmentData);
      setRiskAssessment(response.data);
    } catch (err) {
      console.error('Risk assessment failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      if (existingProfile?.id) {
        response = await healthAPI.update(existingProfile.id, formData);
      } else {
        response = await healthAPI.create(formData);
      }

      if (onComplete) {
        onComplete(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save health profile');
      console.error('Failed to save profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      return bmi;
    }
    return null;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { text: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { text: 'Overweight', color: 'text-yellow-600' };
    return { text: 'Obese', color: 'text-red-600' };
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5].map((step) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep >= step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
              <span className={`text-xs mt-2 ${currentStep >= step ? 'text-green-600' : 'text-gray-500'}`}>
                {['Basic', 'Vitals', 'Diet', 'Lifestyle', 'Goals'][step - 1]}
              </span>
            </div>
            {step < 5 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all ${
                  currentStep > step ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-green-700 mb-4">📋 Basic Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            placeholder="Enter your age"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Prefer not to say</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height (cm) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => handleChange('height', e.target.value)}
            placeholder="e.g., 170"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (kg) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            placeholder="e.g., 70"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {calculateBMI() && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-gray-700">
            Your BMI: <span className={`font-bold text-lg ${getBMICategory(calculateBMI()).color}`}>
              {calculateBMI()} - {getBMICategory(calculateBMI()).text}
            </span>
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Health Conditions <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {healthConditionOptions.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleMultiSelect('healthConditions', option.value)}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                formData.healthConditions.includes(option.value)
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <span className="text-2xl mr-2">{option.icon}</span>
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Food Allergies
        </label>
        <textarea
          value={formData.allergies}
          onChange={(e) => handleChange('allergies', e.target.value)}
          placeholder="List any food allergies (e.g., peanuts, shellfish, dairy)"
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Medications
        </label>
        <textarea
          value={formData.medications}
          onChange={(e) => handleChange('medications', e.target.value)}
          placeholder="List any medications you're currently taking"
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-green-700 mb-4">💓 Vital Signs & Health Screening</h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> If you don't know your exact readings, you can skip these fields.
          However, providing accurate data helps us give better recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Systolic Blood Pressure (mmHg)
          </label>
          <input
            type="number"
            value={formData.systolicBp}
            onChange={(e) => handleChange('systolicBp', e.target.value)}
            placeholder="e.g., 120"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Normal: 90-120 mmHg</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diastolic Blood Pressure (mmHg)
          </label>
          <input
            type="number"
            value={formData.diastolicBp}
            onChange={(e) => handleChange('diastolicBp', e.target.value)}
            placeholder="e.g., 80"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Normal: 60-80 mmHg</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fasting Blood Glucose (mg/dL)
          </label>
          <input
            type="number"
            value={formData.fastingGlucose}
            onChange={(e) => handleChange('fastingGlucose', e.target.value)}
            placeholder="e.g., 95"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Normal: 70-100 mg/dL</p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dietary Habits Assessment
        </label>

        <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.highSodiumDiet}
            onChange={(e) => handleChange('highSodiumDiet', e.target.checked)}
            className="w-5 h-5 text-green-600"
          />
          <span>I often consume high-sodium foods (processed foods, salty snacks, fast food)</span>
        </label>

        <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.irregularMeals}
            onChange={(e) => handleChange('irregularMeals', e.target.checked)}
            className="w-5 h-5 text-green-600"
          />
          <span>I eat meals at irregular times or skip meals frequently</span>
        </label>

        <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.highGiFoods}
            onChange={(e) => handleChange('highGiFoods', e.target.checked)}
            className="w-5 h-5 text-green-600"
          />
          <span>I frequently eat high glycemic foods (white bread, white rice, sugary drinks)</span>
        </label>
      </div>

      {riskAssessment && (
        <div className={`p-6 rounded-lg border-2 ${
          riskAssessment.riskLevel === 'HIGH'
            ? 'bg-red-50 border-red-300'
            : riskAssessment.riskLevel === 'MODERATE'
            ? 'bg-yellow-50 border-yellow-300'
            : 'bg-green-50 border-green-300'
        }`}>
          <h4 className="font-bold text-lg mb-3">Health Risk Assessment Results</h4>
          <div className="space-y-2">
            <p>
              <strong>Risk Score:</strong> {riskAssessment.riskScore}/10
            </p>
            <p>
              <strong>Risk Level:</strong> <span className={`font-bold ${
                riskAssessment.riskLevel === 'HIGH' ? 'text-red-600' :
                riskAssessment.riskLevel === 'MODERATE' ? 'text-yellow-600' : 'text-green-600'
              }`}>{riskAssessment.riskLevel}</span>
            </p>
            <p>
              <strong>Urgency:</strong> {riskAssessment.urgency}
            </p>

            {riskAssessment.conditions?.length > 0 && (
              <div className="mt-4">
                <strong>Identified Conditions:</strong>
                <ul className="list-disc list-inside mt-2">
                  {riskAssessment.conditions.map((condition, index) => (
                    <li key={index}>
                      {condition.condition} - {condition.risk} risk
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {riskAssessment.recommendations?.length > 0 && (
              <div className="mt-4">
                <strong>Recommendations:</strong>
                <ul className="list-disc list-inside mt-2">
                  {riskAssessment.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-green-700 mb-4">🥗 Dietary Preferences</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select your dietary preferences (select all that apply)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dietaryPreferenceOptions.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleMultiSelect('dietaryPreferences', option.value)}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                formData.dietaryPreferences.includes(option.value)
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <span className="text-2xl mr-2">{option.icon}</span>
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How many meals do you eat per day?
        </label>
        <select
          value={formData.mealsPerDay}
          onChange={(e) => handleChange('mealsPerDay', parseInt(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value={1}>1 meal</option>
          <option value={2}>2 meals</option>
          <option value={3}>3 meals</option>
          <option value={4}>4 meals</option>
          <option value={5}>5+ meals</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specific Food Allergies or Intolerances
        </label>
        <input
          type="text"
          value={formData.foodAllergies.join(', ')}
          onChange={(e) => handleChange('foodAllergies', e.target.value.split(',').map(s => s.trim()))}
          placeholder="e.g., peanuts, shellfish, lactose"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-green-700 mb-4">🏃 Lifestyle Information</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Physical Activity Level
        </label>
        <div className="space-y-2">
          {activityLevels.map(level => (
            <button
              key={level.value}
              type="button"
              onClick={() => handleChange('activityLevel', level.value)}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                formData.activityLevel === level.value
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="font-medium">{level.label}</div>
              <div className="text-sm text-gray-600">{level.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Average Sleep Duration (hours per night)
        </label>
        <input
          type="number"
          value={formData.sleepHours}
          onChange={(e) => handleChange('sleepHours', parseInt(e.target.value))}
          min="1"
          max="24"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Stress Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['LOW', 'MODERATE', 'HIGH'].map(level => (
            <button
              key={level}
              type="button"
              onClick={() => handleChange('stressLevel', level)}
              className={`p-4 border-2 rounded-lg transition-all ${
                formData.stressLevel === level
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="font-medium capitalize">{level.toLowerCase()}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-green-700 mb-4">🎯 Health Goals</h3>

      <p className="text-gray-600">
        Select your primary health goals. We'll personalize your meal plans and recommendations based on these goals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {healthGoalOptions.map(goal => (
          <button
            key={goal.value}
            type="button"
            onClick={() => handleMultiSelect('healthGoals', goal.value)}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              formData.healthGoals.includes(goal.value)
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <span className="text-2xl mr-2">{goal.icon}</span>
            <span className="font-medium">{goal.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-bold text-lg mb-3">Profile Summary</h4>
        <div className="space-y-2 text-sm">
          <p><strong>Age:</strong> {formData.age} years</p>
          <p><strong>BMI:</strong> {calculateBMI()} ({getBMICategory(calculateBMI())?.text})</p>
          <p><strong>Health Conditions:</strong> {formData.healthConditions.join(', ') || 'None'}</p>
          <p><strong>Dietary Preferences:</strong> {formData.dietaryPreferences.join(', ') || 'None'}</p>
          <p><strong>Activity Level:</strong> {formData.activityLevel}</p>
          <p><strong>Health Goals:</strong> {formData.healthGoals.map(g =>
            healthGoalOptions.find(opt => opt.value === g)?.label
          ).join(', ')}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-700 mb-2">
            {existingProfile ? 'Update Your Health Profile' : 'Build Your Health Profile'}
          </h2>
          <p className="text-gray-600">
            Help us understand your health better to provide personalized recommendations.
          </p>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Back
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all shadow-md hover:shadow-lg font-medium"
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <LoadingSpinner size="small" />
                    <span>Saving...</span>
                  </span>
                ) : (
                  'Complete Profile'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthProfileBuilder;
