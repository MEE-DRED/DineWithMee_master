import React from 'react';

const AnalyticsWidget = ({ analytics, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="card-content">
          <div className="animate-pulse">
            <div className="h-4 bg-dwm-green-pale rounded mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-dwm-green-pale rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mock analytics data - in real app this would come from Redux/API
  const mockAnalytics = {
    totalClients: 247,
    activeClients: 189,
    consultationsThisMonth: 156,
    revenueThisMonth: 156000,
    clientSatisfaction: 4.8,
    healthImprovementRate: 73
  };

  const data = analytics || mockAnalytics;

  const analyticsCards = [
    {
      title: 'Total Clients',
      value: data.totalClients || 0,
      icon: '',
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Clients',
      value: data.activeClients || 0,
      icon: '',
      color: 'green',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Consultations This Month',
      value: data.consultationsThisMonth || 0,
      icon: '',
      color: 'purple',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Revenue (RWF)',
      value: data.revenueThisMonth ? `${(data.revenueThisMonth).toLocaleString()}` : '0',
      icon: '',
      color: 'orange',
      change: '+18%',
      changeType: 'positive'
    },
    {
      title: 'Client Satisfaction',
      value: data.clientSatisfaction ? `${data.clientSatisfaction}/5` : '0/5',
      icon: '',
      color: 'pink',
      change: '+0.3',
      changeType: 'positive'
    },
    {
      title: 'Health Improvement Rate',
      value: data.healthImprovementRate ? `${data.healthImprovementRate}%` : '0%',
      icon: '',
      color: 'green',
      change: '+5%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="text-xl font-bold text-dwm-green-deep mb-6">
          Analytics Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analyticsCards.map((card, index) => (
            <div key={index} className="p-4 bg-dwm-green-pale rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl">{card.icon}</div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  card.changeType === 'positive' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {card.change}
                </div>
              </div>
              
              <div className="text-2xl font-bold text-dwm-green-deep mb-1">
                {card.value}
              </div>
              
              <div className="text-sm text-dwm-text-mid">
                {card.title}
              </div>
            </div>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold text-dwm-green-deep mb-4">
            Monthly Performance
          </h3>
          <div className="h-48 bg-dwm-green-pale rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2"></div>
              <p className="text-dwm-text-mid">
                Performance chart would be displayed here
              </p>
              <p className="text-sm text-dwm-text-mid">
                (Chart integration coming soon)
              </p>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold text-dwm-green-deep mb-4">
            Key Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="text-green-600 text-xl">Trending Up</div>
              <div>
                <div className="font-medium text-dwm-green-deep">Client Engagement</div>
                <div className="text-sm text-dwm-text-mid">
                  23% increase in active client participation
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 text-xl">Health Goal</div>
              <div>
                <div className="font-medium text-dwm-green-deep">Health Outcomes</div>
                <div className="text-sm text-dwm-text-mid">
                  73% of clients showing measurable improvement
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-purple-600 text-xl">Revenue</div>
              <div>
                <div className="font-medium text-dwm-green-deep">Revenue Growth</div>
                <div className="text-sm text-dwm-text-mid">
                  18% increase in monthly consultation revenue
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-orange-600 text-xl">Satisfaction</div>
              <div>
                <div className="font-medium text-dwm-green-deep">Client Satisfaction</div>
                <div className="text-sm text-dwm-text-mid">
                  4.8/5 average satisfaction rating this month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;
