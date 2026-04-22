import React from 'react';

const ClientList = ({ clients, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-dwm-green-pale rounded mb-2"></div>
            <div className="h-4 bg-dwm-green-pale rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4"></div>
        <p className="text-dwm-text-mid">
          No clients assigned yet
        </p>
      </div>
    );
  }

  const getClientStatus = (client) => {
    if (!client.health_profile) return { color: 'gray', text: 'No Data' };
    
    const profile = client.health_profile;
    
    if (profile.bp_category === 'HYPERTENSIVE_URGENCY' || profile.diabetes_category === 'DIABETIC_URGENCY') {
      return { color: 'red', text: 'Urgent Attention' };
    }
    
    if (profile.bp_category === 'HYPERTENSIVE_STAGE_2' || profile.diabetes_category === 'DIABETIC') {
      return { color: 'orange', text: 'High Risk' };
    }
    
    if (profile.bp_category === 'PREHYPERTENSIVE' || profile.diabetes_category === 'PREDIABETIC') {
      return { color: 'yellow', text: 'Moderate Risk' };
    }
    
    return { color: 'green', text: 'Good' };
  };

  const getRecentActivity = (client) => {
    // This would come from consultation data or assessment data
    return 'Last assessment: 2 days ago';
  };

  return (
    <div className="space-y-4">
      {clients.slice(0, 5).map((client) => {
        const status = getClientStatus(client);
        
        return (
          <div key={client.id} className="flex items-center justify-between p-4 bg-dwm-green-pale rounded-lg hover:bg-dwm-green-light transition-colors">
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-dwm-green-deep rounded-full flex items-center justify-center text-white font-semibold">
                {client.first_name?.[0] || 'U'}
              </div>
              
              {/* Client Info */}
              <div>
                <div className="font-semibold text-dwm-green-deep">
                  {client.first_name} {client.last_name}
                </div>
                <div className="text-sm text-dwm-text-mid">
                  {client.email}
                </div>
                <div className="text-xs text-dwm-text-mid mt-1">
                  {getRecentActivity(client)}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${status.color}-100 text-${status.color}-800 mb-2`}>
                {status.text}
              </div>
              <div className="text-sm text-dwm-text-mid">
                {client.health_profile?.last_assessment_date ? 
                  new Date(client.health_profile.last_assessment_date).toLocaleDateString() : 
                  'No assessment'
                }
              </div>
            </div>
          </div>
        );
      })}
      
      {clients.length > 5 && (
        <div className="text-center pt-4">
          <button className="btn-secondary">
            View All Clients ({clients.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientList;
