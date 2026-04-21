import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ingredientsAPI } from '../api/ingredients';

// Async thunks for ingredient operations
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await ingredientsAPI.getAll(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch ingredients');
    }
  }
);

export const searchIngredients = createAsyncThunk(
  'ingredients/searchIngredients',
  async (query, { rejectWithValue }) => {
    try {
      const response = await ingredientsAPI.search(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search ingredients');
    }
  }
);

export const fetchIngredientSuitability = createAsyncThunk(
  'ingredients/fetchIngredientSuitability',
  async (params, { rejectWithValue }) => {
    try {
      const response = await ingredientsAPI.getSuitability(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch ingredient suitability');
    }
  }
);

export const fetchIngredientById = createAsyncThunk(
  'ingredients/fetchIngredientById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ingredientsAPI.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch ingredient');
    }
  }
);

const initialState = {
  ingredients: [],
  searchResults: [],
  suitabilityData: null,
  currentIngredient: null,
  loading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch ingredients
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search ingredients
      .addCase(searchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.error = null;
      })
      .addCase(searchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch ingredient suitability
      .addCase(fetchIngredientSuitability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientSuitability.fulfilled, (state, action) => {
        state.loading = false;
        state.suitabilityData = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredientSuitability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch ingredient by ID
      .addCase(fetchIngredientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentIngredient = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSearchResults, setCurrentIngredient } = ingredientsSlice.actions;

// Selectors
export const selectIngredients = (state) => state.ingredients.ingredients;
export const selectSearchResults = (state) => state.ingredients.searchResults;
export const selectSuitabilityData = (state) => state.ingredients.suitabilityData;
export const selectCurrentIngredient = (state) => state.ingredients.currentIngredient;
export const selectIngredientsLoading = (state) => state.ingredients.loading;
export const selectIngredientsError = (state) => state.ingredients.error;

export default ingredientsSlice.reducer;
