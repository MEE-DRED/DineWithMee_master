import { useSelector, useDispatch } from 'react-redux';
import {
  selectAuth,
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
  clearAuthState,
} from '../redux';

export interface UseReduxAuthReturn {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  logout: () => void;
  register: (userData: any) => Promise<any>;
  refreshUser: () => Promise<any>;
  clearError: () => void;
  hasRole: (role: string) => boolean;
}

export const useReduxAuth = (): UseReduxAuthReturn => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const isAuthenticated = !!auth.user && !!auth.token;

  // Helper function to check user role
  const hasRole = (role: string): boolean => {
    if (!isAuthenticated || !auth.user?.role) return false;
    // Normalize both to lowercase for comparison
    return auth.user.role.toLowerCase() === role.toLowerCase();
  };

  return {
    user: auth.user,
    isAuthenticated,
    isLoading: auth.loading,
    error: auth.error,
    token: auth.token,
    login: (credentials) => dispatch(loginUser(credentials) as any),
    logout: () => dispatch(logoutUser()),
    register: (userData) => dispatch(registerUser(userData) as any),
    refreshUser: () => dispatch(getCurrentUser() as any),
    clearError: () => dispatch(clearAuthState()),
    hasRole,
  };
};

export default useReduxAuth;
