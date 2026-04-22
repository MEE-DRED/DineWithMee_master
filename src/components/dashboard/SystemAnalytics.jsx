import React from 'react';

const SystemAnalytics = ({ analytics, users, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-dwm-green-pale rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-dwm-green-pale rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  // Mock analytics data
  const systemData = {
    totalUsers: users?.length || 1247,
    activeUsers: users?.filter(u => u.account_status === 'ACTIVE').length || 892,
    newUsersThisMonth: 156,
    systemUptime: '99.8%',
    avgResponseTime: '234ms',
    errorRate: '0.2%',
    storageUsed: '67%',
    bandwidthUsed: '45%'
  };

  const getChangeIndicator = (value, isPositive = true) => {
    return (
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
        isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isPositive ? '+' : ''}{value}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-dwm-green-pale rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl"></div>
            {getChangeIndicator('+12%')}
          </div>
          <div className="text-2xl font-bold text-dwm-green-deep">
            {systemData.totalUsers}
          </div>
          <div className="text-sm text-dwm-text-mid">Total Users</div>
        </div>

        <div className="p-4 bg-dwm-green-pale rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl"></div>
            {getChangeIndicator('+8%')}
          </div>
          <div className="text-2xl font-bold text-dwm-green-deep">
            {systemData.activeUsers}
          </div>
          <div className="text-sm text-dwm-text-mid">Active Users</div>
        </div>

        <div className="p-4 bg-dwm-green-pale rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl"></div>
            {getChangeIndicator('+23%')}
          </div>
          <div className="text-2xl font-bold text-dwm-green-deep">
            {systemData.newUsersThisMonth}
          </div>
          <div className="text-sm text-dwm-text-mid">New This Month</div>
        </div>

        <div className="p-4 bg-dwm-green-pale rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl"></div>
            {getChangeIndicator('+0.1%', true)}
          </div>
          <div className="text-2xl font-bold text-dwm-green-deep">
            {systemData.systemUptime}
          </div>
          <div className="text-sm text-dwm-text-mid">System Uptime</div>
        </div>
      </div>

      {/* System Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-content">
            <h3 className="text-lg font-semibold text-dwm-green-deep mb-4">
              System Performance
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-dwm-text-mid">Response Time</span>
                  <span className="font-medium text-dwm-green-deep">{systemData.avgResponseTime}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-dwm-text-mid">Error Rate</span>
                  <span className="font-medium text-dwm-green-deep">{systemData.errorRate}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '2%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-dwm-text-mid">Storage Used</span>
                  <span className="font-medium text-dwm-green-deep">{systemData.storageUsed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-dwm-text-mid">Bandwidth Used</span>
                  <span className="font-medium text-dwm-green-deep">{systemData.bandwidthUsed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h3 className="text-lg font-semibold text-dwm-green-deep mb-4">
              User Distribution
            </h3>
            <div className="space-y-3">
              {users && (
                <>
                  <div className="flex justify-between items-center p-3 bg-dwm-green-pale rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Customers</span>
                    </div>
                    <span className="text-sm font-bold text-dwm-green-deep">
                      {users.filter(u => u.role === 'CUSTOMER').length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-dwm-green-pale rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Nutritionists</span>
                    </div>
                    <span className="text-sm font-bold text-dwm-green-deep">
                      {users.filter(u => u.role === 'NUTRITIONIST').length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-dwm-green-pale rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">Admins</span>
                    </div>
                    <span className="text-sm font-bold text-dwm-green-deep">
                      {users.filter(u => u.role === 'ADMIN').length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-dwm-green-pale rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium">Pharmacy Partners</span>
                    </div>
                    <span className="text-sm font-bold text-dwm-green-deep">
                      {users.filter(u => u.role === 'PHARMACY_PARTNER').length}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
