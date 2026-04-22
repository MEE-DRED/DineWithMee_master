import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useDispatch } from 'react-redux';
import { fetchHealthProfile, fetchMyAssessments } from '../redux/slices/healthSlice';

const CustomerContext = createContext();

const customerReducer = (state, action) => {
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

    case 'SET_HEALTH_SUMMARY':
      return {
        ...state,
        healthSummary: action.payload,
        loading: false,
      };

    case 'SET_ACTIVE_MEAL_PLAN':
      return {
        ...state,
        activeMealPlan: action.payload,
      };

    case 'SET_PROGRESS_DATA':
      return {
        ...state,
        progressData: action.payload,
      };

    case 'SET_UPCOMING_CONSULTATIONS':
      return {
        ...state,
        upcomingConsultations: action.payload,
      };

    case 'SET_RECOMMENDED_CONTENT':
      return {
        ...state,
        recommendedContent: action.payload,
      };

    case 'SET_CART_ITEMS':
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: null,
  healthSummary: null,
  activeMealPlan: null,
  progressData: [],
  upcomingConsultations: [],
  recommendedContent: [],
  cartItems: [],
};

export const CustomerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(customerReducer, initialState);
  const { user } = useAuth();
  const reduxDispatch = useDispatch();

  // Load customer data when user is available
  useEffect(() => {
    if (user?.role === 'CUSTOMER') {
      loadCustomerData();
    }
  }, [user]);

  const loadCustomerData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Load health profile and assessments
      await Promise.all([
        reduxDispatch(fetchHealthProfile()),
        reduxDispatch(fetchMyAssessments()),
      ]);

      // Mock additional customer data
      const mockHealthSummary = {
        bmi: 24.5,
        bloodPressure: '120/80',
        bloodSugar: 95,
        healthScore: 85,
        lastAssessment: new Date().toISOString(),
      };

      const mockProgressData = [
        { date: '2024-01-01', weight: 70, bp: 120, glucose: 95 },
        { date: '2024-02-01', weight: 69, bp: 118, glucose: 92 },
        { date: '2024-03-01', weight: 68, bp: 115, glucose: 90 },
      ];

      const mockUpcomingConsultations = [
        {
          id: 1,
          nutritionist: 'Dr. Sarah Johnson',
          date: '2024-04-15T10:00:00Z',
          type: 'Video Call',
          status: 'confirmed',
        },
      ];

      const mockRecommendedContent = [
        {
          id: 1,
          title: 'Managing Hypertension Through Diet',
          type: 'article',
          category: 'health',
          readTime: '5 min',
        },
        {
          id: 2,
          title: 'Diabetes-Friendly Recipe Collection',
          type: 'video',
          category: 'recipes',
          duration: '12 min',
        },
      ];

      dispatch({ type: 'SET_HEALTH_SUMMARY', payload: mockHealthSummary });
      dispatch({ type: 'SET_PROGRESS_DATA', payload: mockProgressData });
      dispatch({ type: 'SET_UPCOMING_CONSULTATIONS', payload: mockUpcomingConsultations });
      dispatch({ type: 'SET_RECOMMENDED_CONTENT', payload: mockRecommendedContent });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const bookConsultation = async (consultationData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newConsultation = {
        id: Date.now(),
        ...consultationData,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      dispatch({ 
        type: 'SET_UPCOMING_CONSULTATIONS', 
        payload: [...state.upcomingConsultations, newConsultation] 
      });

      return { success: true, consultation: newConsultation };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const updateHealthData = async (healthData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSummary = {
        ...state.healthSummary,
        ...healthData,
        lastUpdated: new Date().toISOString(),
      };

      dispatch({ type: 'SET_HEALTH_SUMMARY', payload: updatedSummary });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const addToCart = (meal) => {
    const existingItem = state.cartItems.find(item => item.id === meal.id);
    if (existingItem) {
      dispatch({
        type: 'SET_CART_ITEMS',
        payload: state.cartItems.map(item =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      dispatch({
        type: 'SET_CART_ITEMS',
        payload: [...state.cartItems, { ...meal, quantity: 1 }],
      });
    }
  };

  const removeFromCart = (mealId) => {
    dispatch({
      type: 'SET_CART_ITEMS',
      payload: state.cartItems.filter(item => item.id !== mealId),
    });
  };

  const value = {
    ...state,
    loadCustomerData,
    bookConsultation,
    updateHealthData,
    addToCart,
    removeFromCart,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
