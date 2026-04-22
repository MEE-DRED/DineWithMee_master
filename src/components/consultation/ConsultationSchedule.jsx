import React, { useState } from 'react';

const ConsultationSchedule = ({ nutritionistId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock data - in real app this would come from Redux/API
  const todayConsultations = [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      time: '09:00 AM',
      type: 'FOLLOW_UP',
      status: 'SCHEDULED',
      duration: 45
    },
    {
      id: '2', 
      clientName: 'Michael Chen',
      time: '10:30 AM',
      type: 'INITIAL',
      status: 'SCHEDULED',
      duration: 60
    },
    {
      id: '3',
      clientName: 'Emma Wilson',
      time: '02:00 PM', 
      type: 'FOLLOW_UP',
      status: 'COMPLETED',
      duration: 45
    },
    {
      id: '4',
      clientName: 'James Brown',
      time: '03:30 PM',
      type: 'URGENT',
      status: 'SCHEDULED',
      duration: 30
    }
  ];

  const getConsultationTypeLabel = (type) => {
    const labels = {
      'INITIAL': 'Initial',
      'FOLLOW_UP': 'Follow-up',
      'URGENT': 'Urgent'
    };
    return labels[type] || type;
  };

  const getStatusColor = (status) => {
    const colors = {
      'SCHEDULED': 'blue',
      'IN_PROGRESS': 'yellow', 
      'COMPLETED': 'green',
      'CANCELLED': 'red',
      'NO_SHOW': 'gray'
    };
    return colors[status] || 'gray';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'SCHEDULED': 'Scheduled',
      'IN_PROGRESS': 'In Progress',
      'COMPLETED': 'Completed', 
      'CANCELLED': 'Cancelled',
      'NO_SHOW': 'No Show'
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-4">
      {/* Date Selector */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-dwm-green-deep">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h4>
        <div className="flex space-x-2">
          <button className="btn-secondary text-sm px-3 py-1">
            Previous
          </button>
          <button className="btn-secondary text-sm px-3 py-1">
            Next
          </button>
        </div>
      </div>

      {/* Consultations List */}
      {todayConsultations.length > 0 ? (
        <div className="space-y-3">
          {todayConsultations.map((consultation) => (
            <div key={consultation.id} className="border-l-4 border-dwm-green-deep pl-4 py-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-lg font-semibold text-dwm-green-deep">
                      {consultation.time}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${getStatusColor(consultation.status)}-100 text-${getStatusColor(consultation.status)}-800`}>
                      {getStatusLabel(consultation.status)}
                    </div>
                    <div className="px-2 py-1 bg-dwm-green-pale text-dwm-green-deep rounded text-xs font-medium">
                      {getConsultationTypeLabel(consultation.type)}
                    </div>
                  </div>
                  
                  <div className="font-medium text-dwm-green-deep mb-1">
                    {consultation.clientName}
                  </div>
                  
                  <div className="text-sm text-dwm-text-mid">
                    Duration: {consultation.duration} minutes
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  {consultation.status === 'SCHEDULED' && (
                    <>
                      <button className="btn-primary text-sm px-3 py-1">
                        Start
                      </button>
                      <button className="btn-secondary text-sm px-3 py-1">
                        Reschedule
                      </button>
                    </>
                  )}
                  {consultation.status === 'COMPLETED' && (
                    <button className="btn-secondary text-sm px-3 py-1">
                      View Notes
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4"></div>
          <p className="text-dwm-text-mid">
            No consultations scheduled for {selectedDate.toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t">
        <div className="grid grid-cols-2 gap-2">
          <button className="btn-secondary text-sm">
            Schedule New
          </button>
          <button className="btn-secondary text-sm">
            View Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSchedule;
