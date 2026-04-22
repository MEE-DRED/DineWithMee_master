/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getCurrentUser,
  selectAuth 
} from '../redux';

const AuthContext = createContext();

export const ROLES = {
  CUSTOMER: 'CUSTOMER',
  NUTRITIONIST: 'NUTRITIONIST', 
  ADMIN: 'ADMIN',
  PHARMACY_PARTNER: 'PHARMACY_PARTNER'
};

export const ACCOUNT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE', 
  SUSPENDED: 'SUSPENDED',
  PENDING_VERIFICATION: 'PENDING_VERIFICATION'
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  // Initialize auth state on mount
  useEffect(() => {
    const token = localStorage.getItem('dwm-token');
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  const login = async (credentials) => {
    const result = await dispatch(loginUser(credentials));
    if (result.meta.requestStatus === 'fulfilled') {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: result.error?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    const result = await dispatch(registerUser(userData));
    if (result.meta.requestStatus === 'fulfilled') {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: result.error?.message || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    await dispatch(logoutUser());
  };

  // Role-based permission checking
  const hasRole = (role) => {
    return auth.user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(auth.user?.role);
  };

  const isVerified = () => {
    return auth.user?.is_verified === true;
  };

  const isActive = () => {
    return auth.user?.account_status === ACCOUNT_STATUS.ACTIVE;
  };

  const canAccess = (requiredRole) => {
    if (!auth.isAuthenticated) return false;
    if (!auth.user) return false;
    if (!isVerified()) return false;
    if (!isActive()) return false;
    
    // Admin can access everything
    if (auth.user.role === ROLES.ADMIN) return true;
    
    // Check specific role requirements
    return auth.user.role === requiredRole;
  };

  const getDashboardRoute = () => {
    if (!auth.user) return '/login';
    
    switch (auth.user.role) {
      case ROLES.CUSTOMER:
        return '/customer/dashboard';
      case ROLES.NUTRITIONIST:
        return '/nutritionist/dashboard';
      case ROLES.ADMIN:
        return '/admin/dashboard';
      case ROLES.PHARMACY_PARTNER:
        return '/pharmacy/dashboard';
      default:
        return '/dashboard';
    }
  };

  const getProfileRoute = () => {
    if (!auth.user) return '/login';
    
    switch (auth.user.role) {
      case ROLES.CUSTOMER:
        return '/customer/profile';
      case ROLES.NUTRITIONIST:
        return '/nutritionist/profile';
      case ROLES.ADMIN:
        return '/admin/profile';
      case ROLES.PHARMACY_PARTNER:
        return '/pharmacy/profile';
      default:
        return '/profile';
    }
  };

  const value = {
    ...auth,
    login,
    register,
    logout,
    hasRole,
    hasAnyRole,
    isVerified,
    isActive,
    canAccess,
    getDashboardRoute,
    getProfileRoute,
    ROLES,
    ACCOUNT_STATUS
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component for route protection
export const withRoleProtection = (requiredRole) => (Component) => {
  return (props) => {
    const { canAccess, getDashboardRoute } = useAuth();
    
    if (!canAccess(requiredRole)) {
      // Redirect to appropriate dashboard or login
      window.location.href = getDashboardRoute();
      return null;
    }
    
    return <Component {...props} />;
  };
};
