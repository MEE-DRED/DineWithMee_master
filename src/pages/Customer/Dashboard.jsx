import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { 
  fetchHealthProfile, 
  fetchMyAssessments,
  selectHealthProfile, 
  selectMyAssessments,
  selectHealthLoading,
  selectMeals,
  fetchMeals,
  selectMealsLoading
} from '../../redux';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import HealthProfileWidget from '../../components/health/HealthProfileWidget';
import ProgressTracker from '../../components/health/ProgressTracker';
import RecentAssessments from '../../components/health/RecentAssessments';
import RecommendedMeals from '../../components/health/RecommendedMeals';

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const { user, hasRole } = useAuth();
  
  // Redux state
  const healthProfile = useSelector(selectHealthProfile);
  const assessments = useSelector(selectMyAssessments);
  const healthLoading = useSelector(selectHealthLoading);
  const meals = useSelector(selectMeals);
  const mealsLoading = useSelector(selectMealsLoading);

  useEffect(() => {
    if (hasRole('CUSTOMER')) {
      dispatch(fetchHealthProfile());
      dispatch(fetchMyAssessments());
      dispatch(fetchMeals({ limit: 6 })); // Featured meals for homepage
    }
  }, [dispatch, hasRole]);

  if (!hasRole('CUSTOMER')) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Access denied. Customer dashboard only.</p>
      </div>
    );
  }

  return (
    <div className="customer-dashboard">
      <div className="page-hero bg-dwm-green-pale py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-dwm-green-deep">
                Welcome back, {user?.first_name || 'Customer'}!
              </h1>
              <p className="text-dwm-text-mid mt-2">
                Your personalized health and nutrition dashboard
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-dwm-text-mid">
                Account Status: 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  user?.account_status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user?.account_status || 'PENDING'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Health Profile Widget */}
            <div className="lg:col-span-1">
              <HealthProfileWidget 
                profile={healthProfile} 
                loading={healthLoading}
              />
            </div>

            {/* Progress Tracker */}
            <div className="lg:col-span-1">
              <ProgressTracker 
                profile={healthProfile}
                assessments={assessments}
              />
            </div>

            {/* Recent Assessments */}
            <div className="lg:col-span-1">
              <RecentAssessments 
                assessments={assessments}
                loading={healthLoading}
              />
            </div>
          </div>

          {/* Recommended Meals Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dwm-green-deep mb-6">
              Recommended for You
            </h2>
            <RecommendedMeals 
              meals={meals}
              loading={mealsLoading}
              healthProfile={healthProfile}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  📋 Health Assessment
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Complete your comprehensive health evaluation
                </p>
                <button className="btn-primary w-full">
                  Start Assessment
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  🥗 Meal Plans
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  View your personalized nutrition plans
                </p>
                <button className="btn-primary w-full">
                  View Plans
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  📊 Progress Tracking
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Track your health metrics over time
                </p>
                <button className="btn-primary w-full">
                  Track Progress
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="text-lg font-semibold text-dwm-green-deep mb-2">
                  👨‍⚕️ Book Consultation
                </h3>
                <p className="text-dwm-text-mid text-sm mb-4">
                  Schedule a session with a nutritionist
                </p>
                <button className="btn-primary w-full">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
