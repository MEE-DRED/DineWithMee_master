import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NutritionistContext = createContext();

const nutritionistReducer = (state, action) => {
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

    case 'SET_CLIENTS':
      return {
        ...state,
        clients: action.payload,
        loading: false,
      };

    case 'SET_SCHEDULE':
      return {
        ...state,
        schedule: action.payload,
      };

    case 'SET_CONSULTATIONS':
      return {
        ...state,
        consultations: action.payload,
      };

    case 'SET_MEAL_PLANS':
      return {
        ...state,
        mealPlans: action.payload,
      };

    case 'SET_ANALYTICS':
      return {
        ...state,
        analytics: action.payload,
      };

    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };

    case 'ADD_CLIENT':
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };

    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map(client =>
          client.id === action.payload.id ? action.payload : client
        ),
      };

    case 'ADD_CONSULTATION':
      return {
        ...state,
        consultations: [...state.consultations, action.payload],
      };

    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: null,
  clients: [],
  schedule: [],
  consultations: [],
  mealPlans: [],
  analytics: null,
  profile: null,
};

export const NutritionistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(nutritionistReducer, initialState);
  const { user } = useAuth();

  const loadNutritionistData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Mock client data
      const mockClients = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          healthProfile: {
            bmi: 24.5,
            conditions: ['Hypertension'],
            lastAssessment: '2024-03-15',
          },
          status: 'active',
          joinDate: '2024-01-15',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          healthProfile: {
            bmi: 28.2,
            conditions: ['Diabetes Type 2', 'Hypertension'],
            lastAssessment: '2024-03-20',
          },
          status: 'active',
          joinDate: '2024-02-01',
        },
      ];

      // Mock schedule
      const mockSchedule = [
        {
          id: 1,
          clientId: 1,
          clientName: 'John Doe',
          date: '2024-04-15T10:00:00Z',
          type: 'Initial Consultation',
          status: 'scheduled',
          duration: 60,
        },
        {
          id: 2,
          clientId: 2,
          clientName: 'Jane Smith',
          date: '2024-04-16T14:00:00Z',
          type: 'Follow-up',
          status: 'scheduled',
          duration: 30,
        },
      ];

      // Mock consultations
      const mockConsultations = [
        {
          id: 1,
          clientId: 1,
          clientName: 'John Doe',
          date: '2024-04-10T10:00:00Z',
          type: 'Initial Consultation',
          status: 'completed',
          notes: 'Client shows good motivation for lifestyle changes',
          duration: 60,
        },
      ];

      // Mock meal plans
      const mockMealPlans = [
        {
          id: 1,
          clientId: 1,
          clientName: 'John Doe',
          name: 'Hypertension Management Plan',
          duration: '4 weeks',
          status: 'active',
          meals: 28,
          createdDate: '2024-04-01',
        },
      ];

      // Mock analytics
      const mockAnalytics = {
        totalClients: 12,
        activeClients: 8,
        consultationsThisMonth: 24,
        revenueThisMonth: 2400,
        clientSatisfaction: 4.8,
        healthImprovementRate: 85,
      };

      // Mock profile
      const mockProfile = {
        id: user?.id,
        name: 'Dr. Sarah Johnson',
        email: 'sarah@nutrition.com',
        license: 'LN-2024-001',
        specializations: ['Hypertension', 'Diabetes', 'Weight Management'],
        experience: '8 years',
        rating: 4.9,
        totalConsultations: 342,
        availability: {
          monday: ['09:00-17:00'],
          tuesday: ['09:00-17:00'],
          wednesday: ['09:00-17:00'],
          thursday: ['09:00-17:00'],
          friday: ['09:00-15:00'],
        },
      };

      dispatch({ type: 'SET_CLIENTS', payload: mockClients });
      dispatch({ type: 'SET_SCHEDULE', payload: mockSchedule });
      dispatch({ type: 'SET_CONSULTATIONS', payload: mockConsultations });
      dispatch({ type: 'SET_MEAL_PLANS', payload: mockMealPlans });
      dispatch({ type: 'SET_ANALYTICS', payload: mockAnalytics });
      dispatch({ type: 'SET_PROFILE', payload: mockProfile });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    if (user?.role === 'NUTRITIONIST') {
      loadNutritionistData();
    }
  }, [user, loadNutritionistData]);

  const createMealPlan = async (mealPlanData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMealPlan = {
        id: Date.now(),
        ...mealPlanData,
        status: 'draft',
        createdDate: new Date().toISOString(),
      };

      dispatch({ 
        type: 'SET_MEAL_PLANS', 
        payload: [...state.mealPlans, newMealPlan] 
      });

      return { success: true, mealPlan: newMealPlan };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const scheduleConsultation = async (consultationData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newConsultation = {
        id: Date.now(),
        ...consultationData,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
      };

      dispatch({ 
        type: 'SET_CONSULTATIONS', 
        payload: [...state.consultations, newConsultation] 
      });

      return { success: true, consultation: newConsultation };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const updateClientProfile = async (clientId, profileData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedClient = {
        ...state.clients.find(c => c.id === clientId),
        ...profileData,
        lastUpdated: new Date().toISOString(),
      };

      dispatch({ type: 'UPDATE_CLIENT', payload: updatedClient });
      return { success: true, client: updatedClient };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const value = {
    ...state,
    loadNutritionistData,
    createMealPlan,
    scheduleConsultation,
    updateClientProfile,
  };

  return (
    <NutritionistContext.Provider value={value}>
      {children}
    </NutritionistContext.Provider>
  );
};

export const useNutritionist = () => {
  const context = useContext(NutritionistContext);
  if (!context) {
    throw new Error('useNutritionist must be used within a NutritionistProvider');
  }
  return context;
};
