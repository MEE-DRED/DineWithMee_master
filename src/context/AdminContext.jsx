import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case 'SET_CONTENT':
      return {
        ...state,
        content: action.payload,
        loading: false,
      };

    case 'SET_ANALYTICS':
      return {
        ...state,
        analytics: action.payload,
        loading: false,
      };

    case 'SET_NUTRITIONISTS':
      return {
        ...state,
        nutritionists: action.payload,
        loading: false,
      };

    case 'SET_PARTNERS':
      return {
        ...state,
        partners: action.payload,
        loading: false,
      };

    case 'SET_SYSTEM_CONFIG':
      return {
        ...state,
        systemConfig: action.payload,
        loading: false,
      };

    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };

    case 'APPROVE_CONTENT':
      return {
        ...state,
        content: state.content.map(item =>
          item.id === action.payload ? { ...item, status: 'approved' } : item
        ),
      };

    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: null,
  users: [],
  content: [],
  analytics: null,
  nutritionists: [],
  partners: [],
  systemConfig: null,
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const { user } = useAuth();

  const loadAdminData = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Mock users data
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'CUSTOMER',
          status: 'ACTIVE',
          joinDate: '2024-01-15',
          lastLogin: '2024-04-10',
        },
        {
          id: 2,
          name: 'Dr. Sarah Johnson',
          email: 'sarah@nutrition.com',
          role: 'NUTRITIONIST',
          status: 'ACTIVE',
          joinDate: '2024-02-01',
          lastLogin: '2024-04-12',
        },
        {
          id: 3,
          name: 'Pharmacy Partner',
          email: 'pharmacy@health.com',
          role: 'PHARMACY_PARTNER',
          status: 'PENDING_VERIFICATION',
          joinDate: '2024-03-15',
          lastLogin: '2024-04-08',
        },
      ];

      // Mock content data
      const mockContent = [
        {
          id: 1,
          title: 'Managing Hypertension Through Diet',
          type: 'article',
          author: 'Dr. Sarah Johnson',
          status: 'approved',
          category: 'health',
          views: 1250,
          createdDate: '2024-03-01',
        },
        {
          id: 2,
          title: 'Diabetes-Friendly Recipe Collection',
          type: 'video',
          author: 'Dr. Mike Chen',
          status: 'pending',
          category: 'recipes',
          views: 890,
          createdDate: '2024-03-15',
        },
      ];

      // Mock analytics
      const mockAnalytics = {
        totalUsers: 1250,
        activeUsers: 890,
        newUsersThisMonth: 45,
        totalNutritionists: 12,
        activeNutritionists: 8,
        totalPartners: 5,
        consultationsThisMonth: 156,
        revenueThisMonth: 15600,
        contentViews: 12500,
        healthAssessmentsCompleted: 234,
      };

      // Mock nutritionists
      const mockNutritionists = [
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          email: 'sarah@nutrition.com',
          license: 'LN-2024-001',
          status: 'verified',
          specializations: ['Hypertension', 'Diabetes'],
          rating: 4.9,
          totalConsultations: 342,
          joinDate: '2024-02-01',
        },
        {
          id: 2,
          name: 'Dr. Mike Chen',
          email: 'mike@nutrition.com',
          license: 'LN-2024-002',
          status: 'pending',
          specializations: ['Weight Management', 'Sports Nutrition'],
          rating: 4.7,
          totalConsultations: 156,
          joinDate: '2024-03-01',
        },
      ];

      // Mock partners
      const mockPartners = [
        {
          id: 1,
          name: 'HealthPlus Pharmacy',
          email: 'contact@healthplus.com',
          status: 'verified',
          type: 'PHARMACY',
          location: 'New York',
          integrationStatus: 'active',
          joinDate: '2024-01-15',
        },
      ];

      // Mock system config
      const mockSystemConfig = {
        regions: ['North America', 'Europe', 'Asia'],
        supportedLanguages: ['English', 'Spanish', 'French'],
        consultationFee: 100,
        commissionRate: 0.15,
        maintenanceMode: false,
        featureFlags: {
          videoConsultations: true,
          mealPlanGeneration: true,
          healthAssessments: true,
        },
      };

      dispatch({ type: 'SET_USERS', payload: mockUsers });
      dispatch({ type: 'SET_CONTENT', payload: mockContent });
      dispatch({ type: 'SET_ANALYTICS', payload: mockAnalytics });
      dispatch({ type: 'SET_NUTRITIONISTS', payload: mockNutritionists });
      dispatch({ type: 'SET_PARTNERS', payload: mockPartners });
      dispatch({ type: 'SET_SYSTEM_CONFIG', payload: mockSystemConfig });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      loadAdminData();
    }
  }, [user, loadAdminData]);

  const createUser = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now(),
        ...userData,
        status: 'ACTIVE',
        joinDate: new Date().toISOString(),
        lastLogin: null,
      };

      dispatch({ type: 'ADD_USER', payload: newUser });
      return { success: true, user: newUser };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...state.users.find(u => u.id === userId),
        ...userData,
        lastUpdated: new Date().toISOString(),
      };

      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      return { success: true, user: updatedUser };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const deleteUser = async (userId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'DELETE_USER', payload: userId });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const approveContent = async (contentId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'APPROVE_CONTENT', payload: contentId });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const verifyNutritionist = async (nutritionistId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedNutritionist = {
        ...state.nutritionists.find(n => n.id === nutritionistId),
        status: 'verified',
        verifiedDate: new Date().toISOString(),
      };

      dispatch({ 
        type: 'SET_NUTRITIONISTS', 
        payload: state.nutritionists.map(n =>
          n.id === nutritionistId ? updatedNutritionist : n
        )
      });

      return { success: true, nutritionist: updatedNutritionist };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const updateSystemConfig = async (configData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedConfig = {
        ...state.systemConfig,
        ...configData,
        lastUpdated: new Date().toISOString(),
      };

      dispatch({ type: 'SET_SYSTEM_CONFIG', payload: updatedConfig });
      return { success: true, config: updatedConfig };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const value = {
    ...state,
    loadAdminData,
    createUser,
    updateUser,
    deleteUser,
    approveContent,
    verifyNutritionist,
    updateSystemConfig,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
