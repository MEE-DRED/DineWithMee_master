import React from 'react';

const PatientList = ({ patients, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-dwm-green-pale rounded mb-4"></div>
        <div className="h-4 bg-dwm-green-pale rounded mb-2"></div>
        <div className="h-4 bg-dwm-green-pale rounded"></div>
      </div>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4"></div>
        <p className="text-dwm-text-mid">
          No patients assigned yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {patients.slice(0, 5).map((patient) => (
        <div key={patient.id} className="flex items-center justify-between p-4 bg-dwm-green-pale rounded-lg hover:bg-dwm-green-light transition-colors">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="w-12 h-12 bg-dwm-green-deep rounded-full flex items-center justify-center text-white font-semibold">
              {patient.first_name?.[0] || 'U'}
            </div>
            
            {/* Patient Info */}
            <div>
              <div className="font-semibold text-dwm-green-deep">
                {patient.first_name} {patient.last_name}
              </div>
              <div className="text-sm text-dwm-text-mid">
                {patient.email}
              </div>
              <div className="text-xs text-dwm-text-mid mt-1">
                Last assessment: 2 days ago
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
              Stable
            </div>
            <div className="text-sm text-dwm-text-mid">
              {patient.health_profile?.last_assessment_date ? 
                new Date(patient.health_profile.last_assessment_date).toLocaleDateString() : 
                'No assessment'
              }
            </div>
          </div>
        </div>
      ))}
      
      {patients.length > 5 && (
        <div className="text-center pt-4">
          <button className="btn-secondary">
            View All Patients ({patients.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientList;
