import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { 
  fetchAllUsers, 
  selectUsers,
  selectUsersLoading,
  fetchUserAnalytics,
  selectUserAnalytics,
  fetchFeaturedContent,
  selectFeaturedContent
} from '../../redux';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import UserManagement from '../../components/dashboard/UserManagement';
import SystemAnalytics from '../../components/dashboard/SystemAnalytics';
import ContentManagement from '../../components/dashboard/ContentManagement';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user, hasRole } = useAuth();
  
  // Redux state
  const allUsers = useSelector(selectUsers);
  const usersLoading = useSelector(selectUsersLoading);
  const analytics = useSelector(selectUserAnalytics);
  const featuredContent = useSelector(selectFeaturedContent);

  useEffect(() => {
    if (hasRole('ADMIN')) {
      dispatch(fetchAllUsers());
      dispatch(fetchUserAnalytics());
      dispatch(fetchFeaturedContent());
    }
  }, [dispatch, hasRole]);

  if (!hasRole('ADMIN')) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Access denied. Admin dashboard only.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="page-hero bg-dwm-green-pale py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-dwm-green-deep">
                Admin Dashboard
              </h1>
              <p className="text-dwm-text-mid mt-2">
                System administration and management
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-dwm-text-mid">
                Admin Level: 
                <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  SUPER ADMIN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="max-w-7xl mx-auto px-6">
          {/* System Analytics */}
          <div className="mb-8">
            <SystemAnalytics 
              analytics={analytics}
              users={allUsers}
              loading={usersLoading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Management */}
            <div className="card">
              <div className="card-content">
                <h2 className="text-xl font-bold text-dwm-green-deep mb-4">
                  👥 User Management
                </h2>
                <UserManagement 
                  users={allUsers}
                  loading={usersLoading}
                />
              </div>
            </div>

            {/* Content Management */}
            <div className="card">
              <div className="card-content">
                <h2 className="text-xl font-bold text-dwm-green-deep mb-4">
                  📚 Content Management
                </h2>
                <ContentManagement 
                  content={featuredContent}
                />
              </div>
            </div>
          </div>

          {/* Admin Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  🔐 Security
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  System security settings
                </p>
                <button className="btn-primary w-full">
                  Security Settings
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  📊 System Reports
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Generate system reports
                </p>
                <button className="btn-primary w-full">
                  Generate Reports
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  ⚙️ System Config
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Configure system settings
                </p>
                <button className="btn-primary w-full">
                  Settings
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  🏥 Nutritionists
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Manage nutritionist accounts
                </p>
                <button className="btn-primary w-full">
                  Manage Nutritionists
                </button>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-8">
            <div className="card">
              <div className="card-content">
                <h2 className="text-xl font-bold text-dwm-green-deep mb-4">
                  🖥️ System Status
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <div className="text-sm text-green-800">System Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <div className="text-sm text-blue-800">Active Users</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">42</div>
                    <div className="text-sm text-purple-800">Pending Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
