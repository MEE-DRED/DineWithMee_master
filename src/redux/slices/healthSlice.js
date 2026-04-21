import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { healthAPI } from '../api/health';

// Async thunks for health profile operations
export const fetchHealthProfile = createAsyncThunk(
  'health/fetchHealthProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await healthAPI.getProfile();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch health profile');
    }
  }
);

export const fetchHealthProfileById = createAsyncThunk(
  'health/fetchHealthProfileById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await healthAPI.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch health profile');
    }
  }
);

export const createHealthProfile = createAsyncThunk(
  'health/createHealthProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await healthAPI.create(profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create health profile');
    }
  }
);

export const updateHealthProfile = createAsyncThunk(
  'health/updateHealthProfile',
  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      const response = await healthAPI.update(id, profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update health profile');
    }
  }
);

export const fetchNutritionalGoals = createAsyncThunk(
  'health/fetchNutritionalGoals',
  async (profileId, { rejectWithValue }) => {
    try {
      const response = await healthAPI.getNutritionalGoals(profileId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch nutritional goals');
    }
  }
);

export const fetchAnalyticsDistribution = createAsyncThunk(
  'health/fetchAnalyticsDistribution',
  async (_, { rejectWithValue }) => {
    try {
      const response = await healthAPI.getAnalyticsDistribution();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch analytics distribution');
    }
  }
);

export const fetchHealthAssessments = createAsyncThunk(
  'health/fetchHealthAssessments',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await healthAPI.getAssessments(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch health assessments');
    }
  }
);

export const fetchMyAssessments = createAsyncThunk(
  'health/fetchMyAssessments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await healthAPI.getMyAssessments();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch my assessments');
    }
  }
);

const initialState = {
  profile: null,
  profiles: [],
  nutritionalGoals: null,
  analytics: null,
  assessments: [],
  myAssessments: [],
  loading: false,
  error: null,
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch health profile
      .addCase(fetchHealthProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHealthProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchHealthProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch health profile by ID
      .addCase(fetchHealthProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHealthProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchHealthProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create health profile
      .addCase(createHealthProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHealthProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.profiles.push(action.payload);
        state.error = null;
      })
      .addCase(createHealthProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update health profile
      .addCase(updateHealthProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHealthProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        // Update in profiles array if exists
        const index = state.profiles.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateHealthProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch nutritional goals
      .addCase(fetchNutritionalGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNutritionalGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.nutritionalGoals = action.payload;
        state.error = null;
      })
      .addCase(fetchNutritionalGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch analytics distribution
      .addCase(fetchAnalyticsDistribution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
        state.error = null;
      })
      .addCase(fetchAnalyticsDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch health assessments
      .addCase(fetchHealthAssessments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHealthAssessments.fulfilled, (state, action) => {
        state.loading = false;
        state.assessments = action.payload;
        state.error = null;
      })
      .addCase(fetchHealthAssessments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch my assessments
      .addCase(fetchMyAssessments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAssessments.fulfilled, (state, action) => {
        state.loading = false;
        state.myAssessments = action.payload;
        state.error = null;
      })
      .addCase(fetchMyAssessments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentProfile } = healthSlice.actions;

// Selectors
export const selectHealthProfile = (state) => state.health.profile;
export const selectHealthProfiles = (state) => state.health.profiles;
export const selectNutritionalGoals = (state) => state.health.nutritionalGoals;
export const selectHealthAnalytics = (state) => state.health.analytics;
export const selectHealthAssessments = (state) => state.health.assessments;
export const selectMyAssessments = (state) => state.health.myAssessments;
export const selectHealthLoading = (state) => state.health.loading;
export const selectHealthError = (state) => state.health.error;

export default healthSlice.reducer;
