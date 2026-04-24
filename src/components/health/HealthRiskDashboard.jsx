import React, { useState, useEffect } from 'react';
import { healthTriageAPI } from '../../redux/api/healthTriage';

/**
 * Health Risk Dashboard Component
 * Displays visual risk assessment based on PDF specification:
 * - Risk Score: 0.0-0.3 (Low), 0.3-0.6 (Moderate), 0.6-1.0 (High)
 * - Color-coded risk indicators
 * - Personalized recommendations
 */

const HealthRiskDashboard = ({ userHealthData }) => {
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userHealthData && Object.keys(userHealthData).length > 0) {
      performRiskAssessment();
    }
  }, [userHealthData]);

  const performRiskAssessment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await healthTriageAPI.assess({
        age: userHealthData.age,
        systolicBp: userHealthData.systolicBp,
        diastolicBp: userHealthData.diastolicBp,
        fastingGlucose: userHealthData.fastingGlucose,
        medications: userHealthData.medications || [],
        healthConditions: userHealthData.healthConditions || [],
        highSodiumDiet: userHealthData.highSodiumDiet || false,
        irregularMeals: userHealthData.irregularMeals || false,
        highGiFoods: userHealthData.highGiFoods || false
      });

      setRiskAssessment(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to assess health risk');
      console.error('Risk assessment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevelConfig = (riskScore) => {
    if (riskScore < 0.3) {
      return {
        level: 'LOW',
        color: 'green',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-300',
        textColor: 'text-green-800',
        icon: '✅',
        message: 'Your health metrics are within acceptable ranges. Keep up the good work!'
      };
    } else if (riskScore < 0.6) {
      return {
        level: 'MODERATE',
        color: 'yellow',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-300',
        textColor: 'text-yellow-800',
        icon: '⚠️',
        message: 'Some health metrics need attention. Consider lifestyle modifications and consult a nutritionist.'
      };
    } else {
      return {
        level: 'HIGH',
        color: 'red',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-300',
        textColor: 'text-red-800',
        icon: '🚨',
        message: 'Immediate attention required. We strongly recommend consulting with a healthcare professional.'
      };
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-6 h-6 border-3 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Analyzing your health metrics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">❌</span>
          <div>
            <h4 className="font-semibold text-red-800">Assessment Error</h4>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!riskAssessment) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 p-8">
        <div className="text-center">
          <div className="text-5xl mb-4">🏥</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Complete Your Health Assessment</h3>
          <p className="text-gray-600 mb-6">
            Get personalized meal recommendations based on your health profile
          </p>
          <button
            onClick={performRiskAssessment}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition font-medium shadow-md"
          >
            Start Health Assessment
          </button>
        </div>
      </div>
    );
  }

  const riskConfig = getRiskLevelConfig(riskAssessment.riskScore);
  const riskPercentage = Math.round(riskAssessment.riskScore * 100);

  return (
    <div className="space-y-6">
      {/* Main Risk Card */}
      <div className={`${riskConfig.bgColor} border-2 ${riskConfig.borderColor} rounded-2xl shadow-lg p-6`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-3xl">{riskConfig.icon}</span>
              <h3 className="text-2xl font-bold ${riskConfig.textColor}">
                {riskConfig.level} RISK
              </h3>
            </div>
            <p className={`text-sm ${riskConfig.textColor} opacity-90`}>
              Health Risk Score: {riskPercentage}/100
            </p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${riskConfig.textColor}`}>
              {riskPercentage}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white rounded-full h-4 mb-4 overflow-hidden shadow-inner">
          <div
            className={`h-full bg-gradient-to-r transition-all duration-1000 ${
              riskConfig.color === 'green'
                ? 'from-green-400 to-green-600'
                : riskConfig.color === 'yellow'
                ? 'from-yellow-400 to-yellow-600'
                : 'from-red-400 to-red-600'
            }`}
            style={{ width: `${riskPercentage}%` }}
          ></div>
        </div>

        <p className={`text-sm ${riskConfig.textColor} font-medium`}>
          {riskConfig.message}
        </p>
      </div>

      {/* Risk Factors Breakdown */}
      {riskAssessment.riskFactors && riskAssessment.riskFactors.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-xl mr-2">📊</span>
            Risk Factors Identified
          </h4>
          <div className="space-y-3">
            {riskAssessment.riskFactors.map((factor, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <span className="text-red-500 text-lg">⚠️</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{factor.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{factor.description}</p>
                  {factor.contribution && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Impact on risk</span>
                        <span className="font-medium">+{Math.round(factor.contribution * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-red-500 h-1.5 rounded-full"
                          style={{ width: `${factor.contribution * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {riskAssessment.recommendations && riskAssessment.recommendations.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-200 p-6">
          <h4 className="font-bold text-blue-900 mb-4 flex items-center">
            <span className="text-xl mr-2">💡</span>
            Personalized Recommendations
          </h4>
          <div className="space-y-3">
            {riskAssessment.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-blue-200"
              >
                <span className="text-2xl">{recommendation.icon || '✓'}</span>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-800 mb-1">{recommendation.title}</h5>
                  <p className="text-sm text-gray-600">{recommendation.description}</p>
                  {recommendation.dietaryFocus && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {recommendation.dietaryFocus.map((focus, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => window.location.href = '/customer/meals'}
          className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition font-medium shadow-md text-center"
        >
          <div className="text-2xl mb-1">🍽️</div>
          <div className="font-semibold">View Recommended Meals</div>
          <div className="text-xs opacity-90 mt-1">Tailored to your health</div>
        </button>

        <button
          onClick={() => window.location.href = '/customer/consultations/book'}
          className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-medium shadow-md text-center"
        >
          <div className="text-2xl mb-1">👨‍⚕️</div>
          <div className="font-semibold">Book Consultation</div>
          <div className="text-xs opacity-90 mt-1">Talk to a nutritionist</div>
        </button>
      </div>

      {/* Health Metrics Summary */}
      {userHealthData && (
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-xl mr-2">📋</span>
            Your Health Metrics
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userHealthData.age && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800">{userHealthData.age}</div>
                <div className="text-xs text-gray-600 mt-1">Age (years)</div>
              </div>
            )}
            {userHealthData.systolicBp && userHealthData.diastolicBp && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800">
                  {userHealthData.systolicBp}/{userHealthData.diastolicBp}
                </div>
                <div className="text-xs text-gray-600 mt-1">Blood Pressure</div>
              </div>
            )}
            {userHealthData.fastingGlucose && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800">{userHealthData.fastingGlucose}</div>
                <div className="text-xs text-gray-600 mt-1">Fasting Glucose</div>
              </div>
            )}
            {userHealthData.bmi && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800">{userHealthData.bmi}</div>
                <div className="text-xs text-gray-600 mt-1">BMI</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRiskDashboard;
