import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { regionsAPI } from '../api/regions';

// Async thunks for region operations
export const fetchRegions = createAsyncThunk(
  'regions/fetchRegions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await regionsAPI.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch regions');
    }
  }
);

export const fetchRegionById = createAsyncThunk(
  'regions/fetchRegionById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await regionsAPI.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch region');
    }
  }
);

const initialState = {
  regions: [],
  currentRegion: null,
  loading: false,
  error: null,
};

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentRegion: (state, action) => {
      state.currentRegion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch regions
      .addCase(fetchRegions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.loading = false;
        state.regions = action.payload;
        state.error = null;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch region by ID
      .addCase(fetchRegionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRegion = action.payload;
        state.error = null;
      })
      .addCase(fetchRegionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentRegion } = regionsSlice.actions;

// Selectors
export const selectRegions = (state) => state.regions.regions;
export const selectCurrentRegion = (state) => state.regions.currentRegion;
export const selectRegionsLoading = (state) => state.regions.loading;
export const selectRegionsError = (state) => state.regions.error;

export default regionsSlice.reducer;
