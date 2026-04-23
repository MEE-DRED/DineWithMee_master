import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { consultationsAPI } from '../api/consultations';

// Async thunks
export const fetchConsultations = createAsyncThunk(
  'consultations/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await consultationsAPI.getAll(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch consultations');
    }
  }
);

export const fetchConsultationById = createAsyncThunk(
  'consultations/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await consultationsAPI.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch consultation');
    }
  }
);

export const createConsultation = createAsyncThunk(
  'consultations/create',
  async (consultationData, { rejectWithValue }) => {
    try {
      const response = await consultationsAPI.create(consultationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create consultation');
    }
  }
);

export const updateConsultation = createAsyncThunk(
  'consultations/update',
  async ({ id, consultationData }, { rejectWithValue }) => {
    try {
      const response = await consultationsAPI.update(id, consultationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update consultation');
    }
  }
);

export const fetchConsultationsByStatus = createAsyncThunk(
  'consultations/fetchByStatus',
  async (status, { rejectWithValue }) => {
    try {
      const response = await consultationsAPI.getByStatus(status);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch consultations');
    }
  }
);

const initialState = {
  consultations: [],
  currentConsultation: null,
  loading: false,
  error: null,
};

const consultationsSlice = createSlice({
  name: 'consultations',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentConsultation: (state, action) => {
      state.currentConsultation = action.payload;
    },
    clearCurrentConsultation: (state) => {
      state.currentConsultation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all consultations
      .addCase(fetchConsultations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultations.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations = action.payload;
        state.error = null;
      })
      .addCase(fetchConsultations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch consultation by ID
      .addCase(fetchConsultationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConsultation = action.payload;
        state.error = null;
      })
      .addCase(fetchConsultationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create consultation
      .addCase(createConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConsultation.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations.push(action.payload);
        state.currentConsultation = action.payload;
        state.error = null;
      })
      .addCase(createConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update consultation
      .addCase(updateConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConsultation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.consultations.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.consultations[index] = action.payload;
        }
        if (state.currentConsultation?.id === action.payload.id) {
          state.currentConsultation = action.payload;
        }
        state.error = null;
      })
      .addCase(updateConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch by status
      .addCase(fetchConsultationsByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultationsByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations = action.payload;
        state.error = null;
      })
      .addCase(fetchConsultationsByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentConsultation, clearCurrentConsultation } = consultationsSlice.actions;

// Selectors
export const selectConsultations = (state) => state.consultations.consultations;
export const selectCurrentConsultation = (state) => state.consultations.currentConsultation;
export const selectConsultationsLoading = (state) => state.consultations.loading;
export const selectConsultationsError = (state) => state.consultations.error;

export default consultationsSlice.reducer;
