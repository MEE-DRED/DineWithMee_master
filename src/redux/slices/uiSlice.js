import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [],
  loading: {
    login: false,
    register: false,
    cart: false,
    meals: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast: (state, action) => {
      const toast = {
        id: Date.now() + Math.random(),
        ...action.payload,
      };
      state.toasts.push(toast);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
    setGlobalLoading: (state, action) => {
      Object.keys(state.loading).forEach(key => {
        state.loading[key] = action.payload;
      });
    },
  },
});

export const {
  addToast,
  removeToast,
  clearToasts,
  setLoading,
  setGlobalLoading,
} = uiSlice.actions;

// Selectors
export const selectToasts = (state) => state.ui.toasts;
export const selectLoading = (state) => state.ui.loading;
export const selectIsLoading = (state, key) => state.ui.loading[key] || false;

// Toast action creators
export const showSuccessToast = (message) => ({ 
  type: 'ui/addToast', 
  payload: {
    type: 'success', 
    message,
    duration: 3000 
  }
});

export const showErrorToast = (message) => ({ 
  type: 'ui/addToast', 
  payload: {
    type: 'error', 
    message,
    duration: 5000 
  }
});

export const showWarningToast = (message) => ({ 
  type: 'ui/addToast', 
  payload: {
    type: 'warning', 
    message,
    duration: 4000 
  }
});

export const showInfoToast = (message) => ({ 
  type: 'ui/addToast', 
  payload: {
    type: 'info', 
    message,
    duration: 3000 
  }
});

export default uiSlice.reducer;
