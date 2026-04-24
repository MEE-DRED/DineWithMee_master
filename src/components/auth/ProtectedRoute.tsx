import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useReduxAuth } from '../../hooks/useReduxAuth';
import { canAccessRoute, getRoleBasedRedirect, requiresAuth } from '../../utils/roleRouting';
import { ROLE_ROUTES } from '../../utils/authConstants';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | null;
  requiredPermissions?: string[];
  redirectTo?: string | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = null,
  requiredPermissions = [],
  redirectTo = null,
}) => {
  const { user, isAuthenticated } = useReduxAuth();
  const location = useLocation();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    const loginPath = redirectTo || `/login?redirect=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={loginPath} replace />;
  }

  // If specific role is required and user doesn't have it
  if (requiredRole && user?.role !== requiredRole) {
    const userDashboard = getRoleBasedRedirect(user);
    return <Navigate to={userDashboard} replace />;
  }

  // If specific permissions are required
  if (requiredPermissions.length > 0) {
    const userPermissions = user?.permissions || [];
    const hasAllPermissions = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasAllPermissions) {
      // User is authenticated but doesn't have required permissions
      return (
        <div className="min-h-screen flex items-center justify-center bg-dwm-off-white">
          <div className="max-w-md w-full bg-white shadow-dwm-lg rounded-dwm-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-serif font-semibold text-dwm-green-deep mb-2">Access Denied</h2>
            <p className="text-dwm-text-mid mb-6">
              You don't have the required permissions to access this page.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-dwm-gold hover:bg-dwm-gold-light text-dwm-green-deep px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  // Check if user can access the current route based on their role
  if (user && user.role && !canAccessRoute(user.role, location.pathname)) {
    const userDashboard = ROLE_ROUTES[user.role] || '/customer/dashboard';
    return <Navigate to={userDashboard} replace />;
  }

  // User is authenticated and has required permissions/role
  return <>{children}</>;
};

export default ProtectedRoute;
