import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { 
  fetchAllUsers, 
  selectUsers,
  selectUsersLoading,
  fetchUserAnalytics,
  selectUserAnalytics
} from '../../redux';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ClientList from '../../components/consultation/ClientList';
import ConsultationSchedule from '../../components/consultation/ConsultationSchedule';
import AnalyticsWidget from '../../components/dashboard/AnalyticsWidget';

const NutritionistDashboard = () => {
  const dispatch = useDispatch();
  const { user, hasRole } = useAuth();
  
  // Redux state
  const clients = useSelector(selectUsers);
  const clientsLoading = useSelector(selectUsersLoading);
  const analytics = useSelector(selectUserAnalytics);

  useEffect(() => {
    if (hasRole('NUTRITIONIST')) {
      dispatch(fetchAllUsers({ role: 'CUSTOMER' })); // Get only customer clients
      dispatch(fetchUserAnalytics());
    }
  }, [dispatch, hasRole]);

  if (!hasRole('NUTRITIONIST')) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Access denied. Nutritionist dashboard only.</p>
      </div>
    );
  }

  return (
    <div className="nutritionist-dashboard">
      <div className="page-hero bg-dwm-green-pale py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-dwm-green-deep">
                Nutritionist Dashboard
              </h1>
              <p className="text-dwm-text-mid mt-2">
                Manage your clients and consultations
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-dwm-text-mid">
                Professional Status: 
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="max-w-7xl mx-auto px-6">
          {/* Analytics Overview */}
          <div className="mb-8">
            <AnalyticsWidget 
              analytics={analytics}
              loading={clientsLoading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Client Management */}
            <div className="card">
              <div className="card-content">
                <h2 className="text-xl font-bold text-dwm-green-deep mb-4">
                  👥 My Clients
                </h2>
                <ClientList 
                  clients={clients}
                  loading={clientsLoading}
                />
              </div>
            </div>

            {/* Consultation Schedule */}
            <div className="card">
              <div className="card-content">
                <h2 className="text-xl font-bold text-dwm-green-deep mb-4">
                  📅 Today's Schedule
                </h2>
                <ConsultationSchedule 
                  nutritionistId={user?.id}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  👤 Client Profiles
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  View detailed health profiles
                </p>
                <button className="btn-primary w-full">
                  View All
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  📋 Meal Planning
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Create custom meal plans
                </p>
                <button className="btn-primary w-full">
                  Create Plan
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  📊 Reports
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Generate client progress reports
                </p>
                <button className="btn-primary w-full">
                  Generate Report
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  💬 Messages
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Client communications
                </p>
                <button className="btn-primary w-full">
                  View Messages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionistDashboard;
