import React from 'react';

const HealthProfileWidget = ({ profile, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="card-content">
          <div className="animate-pulse">
            <div className="h-4 bg-dwm-green-pale rounded mb-4"></div>
            <div className="h-4 bg-dwm-green-pale rounded mb-2"></div>
            <div className="h-4 bg-dwm-green-pale rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="card">
        <div className="card-content">
          <h3 className="text-lg font-semibold text-dwm-green-deep mb-4">
            📋 Health Profile
          </h3>
          <p className="text-dwm-text-mid text-center py-8">
            No health profile data available
          </p>
          <button className="btn-primary w-full">
            Complete Health Assessment
          </button>
        </div>
      </div>
    );
  }

  const getBMICategory = (bmi) => {
    if (!bmi) return 'Unknown';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const getBPCategory = (category) => {
    const categories = {
      'NORMAL': { color: 'green', text: 'Normal' },
      'ELEVATED': { color: 'yellow', text: 'Elevated' },
      'PREHYPERTENSIVE': { color: 'orange', text: 'Pre-Hypertensive' },
      'HYPERTENSIVE_STAGE_1': { color: 'red', text: 'Stage 1' },
      'HYPERTENSIVE_STAGE_2': { color: 'red', text: 'Stage 2' },
      'HYPERTENSIVE_URGENCY': { color: 'red', text: 'Urgent' }
    };
    return categories[category] || { color: 'gray', text: 'Unknown' };
  };

  const getDiabetesCategory = (category) => {
    const categories = {
      'NORMAL': { color: 'green', text: 'Normal' },
      'PREDIABETIC': { color: 'yellow', text: 'Pre-Diabetic' },
      'DIABETIC': { color: 'orange', text: 'Diabetic' },
      'DIABETIC_URGENCY': { color: 'red', text: 'Urgent' }
    };
    return categories[category] || { color: 'gray', text: 'Unknown' };
  };

  const bmiCategory = getBMICategory(Number(profile.bmi));
  const bpCategory = getBPCategory(profile.bp_category);
  const diabetesCategory = getDiabetesCategory(profile.diabetes_category);

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="text-lg font-semibold text-dwm-green-deep mb-4">
          📋 Your Health Profile
        </h3>
        
        <div className="space-y-4">
          {/* Basic Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-dwm-green-pale rounded-lg">
              <div className="text-sm text-dwm-text-mid">Weight</div>
              <div className="text-xl font-bold text-dwm-green-deep">
                {profile.weight_kg ? `${profile.weight_kg} kg` : '--'}
              </div>
            </div>
            <div className="text-center p-3 bg-dwm-green-pale rounded-lg">
              <div className="text-sm text-dwm-text-mid">BMI</div>
              <div className="text-xl font-bold text-dwm-green-deep">
                {profile.bmi ? profile.bmi.toFixed(1) : '--'}
              </div>
              <div className="text-xs text-dwm-text-mid">
                {bmiCategory}
              </div>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-dwm-text-mid mb-2">Blood Pressure</h4>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-dwm-green-deep">
                  {profile.systolic_bp || '--'}/{profile.diastolic_bp || '--'}
                </span>
                <span className="text-sm text-dwm-text-mid ml-2">mmHg</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${bpCategory.color}-100 text-${bpCategory.color}-800`}>
                {bpCategory.text}
              </div>
            </div>
          </div>

          {/* Diabetes Markers */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-dwm-text-mid mb-2">Diabetes Risk</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-dwm-text-mid">Fasting Glucose</div>
                <div className="text-lg font-bold text-dwm-green-deep">
                  {profile.fasting_blood_glucose ? `${profile.fasting_blood_glucose} mg/dL` : '--'}
                </div>
              </div>
              <div>
                <div className="text-sm text-dwm-text-mid">HbA1c</div>
                <div className="text-lg font-bold text-dwm-green-deep">
                  {profile.hba1c ? `${profile.hba1c}%` : '--'}
                </div>
              </div>
            </div>
            <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium bg-${diabetesCategory.color}-100 text-${diabetesCategory.color}-800`}>
              {diabetesCategory.text}
            </div>
          </div>

          {/* Health Score */}
          {profile.overall_health_score && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-dwm-text-mid mb-2">Overall Health Score</h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-dwm-green-deep">
                  {profile.overall_health_score}/100
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-dwm-green-deep h-2 rounded-full" 
                    style={{ width: `${profile.overall_health_score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Last Assessment */}
          {profile.last_assessment_date && (
            <div className="border-t pt-4">
              <div className="text-sm text-dwm-text-mid">
                Last Assessment: {new Date(profile.last_assessment_date).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t">
          <button className="btn-secondary w-full">
            Update Health Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthProfileWidget;
