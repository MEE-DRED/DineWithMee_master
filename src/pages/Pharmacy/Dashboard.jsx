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
import PatientList from '../../components/consultation/PatientList';
import MedicationManagement from '../../components/dashboard/MedicationManagement';
import ComplianceTracker from '../../components/dashboard/ComplianceTracker';

const PharmacyDashboard = () => {
  const dispatch = useDispatch();
  const { user, hasRole } = useAuth();
  
  // Redux state
  const patients = useSelector(selectUsers);
  const patientsLoading = useSelector(selectUsersLoading);
  const analytics = useSelector(selectUserAnalytics);

  useEffect(() => {
    if (hasRole('PHARMACY_PARTNER')) {
      dispatch(fetchAllUsers({ role: 'CUSTOMER' })); // Get patients
      dispatch(fetchUserAnalytics());
    }
  }, [dispatch, hasRole]);

  if (!hasRole('PHARMACY_PARTNER')) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Access denied. Pharmacy partner dashboard only.</p>
      </div>
    );
  }

  return (
    <div className="pharmacy-dashboard">
      <div className="page-hero bg-dwm-green-pale py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-dwm-green-deep">
                Pharmacy Partner Dashboard
              </h1>
              <p className="text-dwm-text-mid mt-2">
                Patient medication and health management
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-dwm-text-mid">
                Partner Status: 
                <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                  VERIFIED PARTNER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="max-w-7xl mx-auto px-6">
          {/* Patient Overview */}
          <div className="mb-8">
            <div className="card">
              <div className="card-content">
                <h2 className="text-xl font-bold text-dwm-green-deep mb-4">
                  🏥 Patient Overview
                </h2>
                <PatientList 
                  patients={patients}
                  loading={patientsLoading}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Medication Management */}
            <div className="card">
              <div className="card-content">
                <h2 className="text-xl font-bold text-dwm-green-deep mb-4">
                  💊 Medication Management
                </h2>
                <MedicationManagement />
              </div>
            </div>

            {/* Compliance Tracking */}
            <div className="card">
              <div className="card-content">
                <h2 className="text-xl font-bold text-dwm-green-deep mb-4">
                  📈 Compliance Tracking
                </h2>
                <ComplianceTracker 
                  analytics={analytics}
                />
              </div>
            </div>
          </div>

          {/* Pharmacy Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  📋 Prescriptions
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Manage patient prescriptions
                </p>
                <button className="btn-primary w-full">
                  View Prescriptions
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  📊 Health Data Sync
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Sync patient health metrics
                </p>
                <button className="btn-primary w-full">
                  Sync Data
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  💬 Consultation Coordination
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Coordinate with nutritionists
                </p>
                <button className="btn-primary w-full">
                  Coordinate Care
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  📦 Inventory
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Manage medication stock
                </p>
                <button className="btn-primary w-full">
                  Manage Inventory
                </button>
              </div>
            </div>
          </div>

          {/* Health Integration Status */}
          <div className="mt-8">
            <div className="card">
              <div className="card-content">
                <h2 className="text-xl font-bold text-dwm-green-deep mb-4">
                  🔄 Integration Status
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">Active</div>
                    <div className="text-sm text-green-800">DWM Integration</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">247</div>
                    <div className="text-sm text-blue-800">Patients Synced</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">89%</div>
                    <div className="text-sm text-purple-800">Medication Adherence</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">12</div>
                    <div className="text-sm text-orange-800">Pending Reviews</div>
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

export default PharmacyDashboard;
