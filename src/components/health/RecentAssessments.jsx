import React from 'react';

const RecentAssessments = ({ assessments, loading }) => {
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

  if (!assessments || assessments.length === 0) {
    return (
      <div className="card">
        <div className="card-content">
          <h3 className="text-lg font-semibold text-dwm-green-deep mb-4">
            Recent Assessments
          </h3>
          <div className="text-center py-8">
            <div className="text-4xl mb-4"></div>
            <p className="text-dwm-text-mid mb-4">
              No assessments completed yet
            </p>
            <button className="btn-primary">
              Start Your First Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getAssessmentTypeIcon = (type) => {
    const icons = {
      'INITIAL_SIGNUP': '',
      'PERIODIC_CHECK': '',
      'CONSULTATION': ''
    };
    return icons[type] || '';
  };

  const getAssessmentTypeLabel = (type) => {
    const labels = {
      'INITIAL_SIGNUP': 'Initial Assessment',
      'PERIODIC_CHECK': 'Periodic Check',
      'CONSULTATION': 'Consultation Assessment'
    };
    return labels[type] || 'Assessment';
  };

  const getHealthStatus = (assessment) => {
    if (assessment.bp_category === 'NORMAL' && assessment.diabetes_category === 'NORMAL') {
      return { color: 'green', text: 'Good' };
    }
    if (assessment.bp_category === 'HYPERTENSIVE_URGENCY' || assessment.diabetes_category === 'DIABETIC_URGENCY') {
      return { color: 'red', text: 'Urgent' };
    }
    return { color: 'yellow', text: 'Attention' };
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="text-lg font-semibold text-dwm-green-deep mb-4">
          Recent Assessments
        </h3>
        
        <div className="space-y-3">
          {assessments.slice(-3).reverse().map((assessment) => {
            const healthStatus = getHealthStatus(assessment);
            
            return (
              <div key={assessment.id} className="border-l-4 border-dwm-green-deep pl-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getAssessmentTypeIcon(assessment.assessment_type)}</span>
                      <span className="font-medium text-dwm-green-deep">
                        {getAssessmentTypeLabel(assessment.assessment_type)}
                      </span>
                    </div>
                    <div className="text-sm text-dwm-text-mid mb-2">
                      {new Date(assessment.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {assessment.weight_kg && (
                        <div>
                          <span className="text-dwm-text-mid">Weight:</span>
                          <span className="ml-1 font-medium">{assessment.weight_kg} kg</span>
                        </div>
                      )}
                      {assessment.systolic_bp && (
                        <div>
                          <span className="text-dwm-text-mid">BP:</span>
                          <span className="ml-1 font-medium">{assessment.systolic_bp}/{assessment.diastolic_bp}</span>
                        </div>
                      )}
                      {assessment.fasting_blood_glucose && (
                        <div>
                          <span className="text-dwm-text-mid">Glucose:</span>
                          <span className="ml-1 font-medium">{assessment.fasting_blood_glucose} mg/dL</span>
                        </div>
                      )}
                      {assessment.hba1c && (
                        <div>
                          <span className="text-dwm-text-mid">HbA1c:</span>
                          <span className="ml-1 font-medium">{assessment.hba1c}%</span>
                        </div>
                      )}
                    </div>
                    
                    {assessment.notes && (
                      <div className="mt-2 text-sm text-dwm-text-mid italic">
                        "{assessment.notes}"
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${healthStatus.color}-100 text-${healthStatus.color}-800`}>
                      {healthStatus.text}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t">
          <button className="btn-secondary w-full">
            View All Assessments
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentAssessments;
