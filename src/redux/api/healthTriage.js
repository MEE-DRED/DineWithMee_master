import api from './index';

/**
 * Health Triage API
 * AI-powered health risk assessment and triage
 */
export const healthTriageAPI = {
  /**
   * Perform health risk assessment
   * @param {Object} assessmentData - Health assessment data
   * @param {number} assessmentData.age - User age
   * @param {number} assessmentData.systolicBp - Systolic blood pressure
   * @param {number} assessmentData.diastolicBp - Diastolic blood pressure
   * @param {number} assessmentData.fastingGlucose - Fasting glucose level
   * @param {Array<string>} assessmentData.medications - Current medications
   * @param {Array<string>} assessmentData.healthConditions - Health conditions/family history
   * @param {boolean} assessmentData.highSodiumDiet - High sodium diet indicator
   * @param {boolean} assessmentData.irregularMeals - Irregular meals indicator
   * @param {boolean} assessmentData.highGiFoods - High GI foods indicator
   * @returns {Promise} Risk assessment with score, level, recommendations
   */
  assess: async (assessmentData) => {
    const response = await api.post('/health-triage/assess', assessmentData);
    return response.data;
  },

  /**
   * Get calculated risk score for a user
   * @param {string} userId - User ID
   * @returns {Promise} Risk score and level
   */
  getRiskScore: async (userId) => {
    const response = await api.get(`/health-triage/risk-score/${userId}`);
    return response.data;
  },
};
