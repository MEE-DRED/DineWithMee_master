import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../api/auth';

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login({ email, password });

      // Handle backend response format: { data: { user, tokens } }
      const userData = response.data?.user || response.user;
      const token = response.data?.tokens?.accessToken || response.token;

      // Normalize user data (convert role to lowercase for consistency)
      const normalizedUser = {
        ...userData,
        role: userData.role?.toLowerCase(),
        name: `${userData.firstName} ${userData.lastName}`.trim() || userData.name,
      };

      // Store JWT token and user data
      if (token) {
        localStorage.setItem('dwm-token', token);
      }
      if (normalizedUser) {
        localStorage.setItem('dwm-user', JSON.stringify(normalizedUser));
      }

      return { user: normalizedUser, token };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);

      // Handle backend response format: { data: { user, tokens } }
      const user = response.data?.user || response.user;
      const token = response.data?.tokens?.accessToken || response.token;

      // Normalize user data (convert role to lowercase for consistency)
      const normalizedUser = {
        ...user,
        role: user.role?.toLowerCase(),
        name: `${user.firstName} ${user.lastName}`.trim() || user.name,
      };

      // Store JWT token and user data
      if (token) {
        localStorage.setItem('dwm-token', token);
      }
      if (normalizedUser) {
        localStorage.setItem('dwm-user', JSON.stringify(normalizedUser));
      }

      return { user: normalizedUser, token };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getCurrentUser();

      // Handle backend response format
      const userData = response.data?.user || response.data || response;

      // Normalize user data (convert role to lowercase for consistency)
      const normalizedUser = {
        ...userData,
        role: userData.role?.toLowerCase(),
        name: userData.name || `${userData.firstName} ${userData.lastName}`.trim(),
      };

      // Update localStorage with fresh user data
      if (normalizedUser) {
        localStorage.setItem('dwm-user', JSON.stringify(normalizedUser));
      }

      return normalizedUser;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to get user data.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    }
    localStorage.removeItem('dwm-token');
    localStorage.removeItem('dwm-user');
    dispatch(clearAuthState());
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    checkAuthState: (state) => {
      const savedToken = localStorage.getItem('dwm-token');
      const savedUser = localStorage.getItem('dwm-user');
      if (savedToken && savedUser) {
        try {
          const userData = JSON.parse(savedUser);

          // Normalize role to lowercase for consistency
          const normalizedUser = {
            ...userData,
            role: userData.role?.toLowerCase(),
          };

          state.user = normalizedUser;
          state.token = savedToken;
          state.isAuthenticated = true;
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('dwm-token');
          localStorage.removeItem('dwm-user');
        }
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('dwm-token', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthState, clearError, checkAuthState, setToken } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
