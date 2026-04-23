import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mealPlansAPI } from '../api/mealPlans';

// Async thunks
export const fetchMealPlans = createAsyncThunk(
  'mealPlans/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mealPlansAPI.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch meal plans');
    }
  }
);

export const fetchMealPlanById = createAsyncThunk(
  'mealPlans/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await mealPlansAPI.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch meal plan');
    }
  }
);

export const createMealPlan = createAsyncThunk(
  'mealPlans/create',
  async (mealPlanData, { rejectWithValue }) => {
    try {
      const response = await mealPlansAPI.create(mealPlanData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create meal plan');
    }
  }
);

export const updateMealPlan = createAsyncThunk(
  'mealPlans/update',
  async ({ id, mealPlanData }, { rejectWithValue }) => {
    try {
      const response = await mealPlansAPI.update(id, mealPlanData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update meal plan');
    }
  }
);

export const addMealToMealPlan = createAsyncThunk(
  'mealPlans/addMeal',
  async ({ mealPlanId, mealData }, { rejectWithValue }) => {
    try {
      const response = await mealPlansAPI.addMeal(mealPlanId, mealData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add meal to plan');
    }
  }
);

export const removeMealFromMealPlan = createAsyncThunk(
  'mealPlans/removeMeal',
  async ({ mealPlanId, mealId }, { rejectWithValue }) => {
    try {
      const response = await mealPlansAPI.removeMeal(mealPlanId, mealId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove meal from plan');
    }
  }
);

const initialState = {
  mealPlans: [],
  currentMealPlan: null,
  loading: false,
  error: null,
};

const mealPlansSlice = createSlice({
  name: 'mealPlans',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentMealPlan: (state, action) => {
      state.currentMealPlan = action.payload;
    },
    clearCurrentMealPlan: (state) => {
      state.currentMealPlan = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all meal plans
      .addCase(fetchMealPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMealPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.mealPlans = action.payload;
        state.error = null;
      })
      .addCase(fetchMealPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch meal plan by ID
      .addCase(fetchMealPlanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMealPlanById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMealPlan = action.payload;
        state.error = null;
      })
      .addCase(fetchMealPlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create meal plan
      .addCase(createMealPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMealPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.mealPlans.push(action.payload);
        state.currentMealPlan = action.payload;
        state.error = null;
      })
      .addCase(createMealPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update meal plan
      .addCase(updateMealPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMealPlan.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.mealPlans.findIndex(mp => mp.id === action.payload.id);
        if (index !== -1) {
          state.mealPlans[index] = action.payload;
        }
        if (state.currentMealPlan?.id === action.payload.id) {
          state.currentMealPlan = action.payload;
        }
        state.error = null;
      })
      .addCase(updateMealPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add meal to plan
      .addCase(addMealToMealPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMealToMealPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMealPlan = action.payload;
        state.error = null;
      })
      .addCase(addMealToMealPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove meal from plan
      .addCase(removeMealFromMealPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMealFromMealPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMealPlan = action.payload;
        state.error = null;
      })
      .addCase(removeMealFromMealPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentMealPlan, clearCurrentMealPlan } = mealPlansSlice.actions;

// Selectors
export const selectMealPlans = (state) => state.mealPlans.mealPlans;
export const selectCurrentMealPlan = (state) => state.mealPlans.currentMealPlan;
export const selectMealPlansLoading = (state) => state.mealPlans.loading;
export const selectMealPlansError = (state) => state.mealPlans.error;

export default mealPlansSlice.reducer;
