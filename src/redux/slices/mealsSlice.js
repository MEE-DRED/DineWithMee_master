import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mealsAPI } from '../api/meals';

// Async thunks for meal operations
export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await mealsAPI.getAll(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch meals');
    }
  }
);

export const fetchMealById = createAsyncThunk(
  'meals/fetchMealById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await mealsAPI.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch meal');
    }
  }
);

export const searchMeals = createAsyncThunk(
  'meals/searchMeals',
  async (query, { rejectWithValue }) => {
    try {
      const response = await mealsAPI.search(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search meals');
    }
  }
);

export const fetchFeaturedMeals = createAsyncThunk(
  'meals/fetchFeaturedMeals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mealsAPI.getFeatured();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured meals');
    }
  }
);

const initialState = {
  meals: [],
  filteredMeals: [],
  loading: false,
  error: null,
  filters: {
    region: 'all',
    healthTags: [],
    priceRange: [0, 10000],
    searchTerm: '',
  },
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setRegionFilter: (state, action) => {
      state.filters.region = action.payload;
      mealsSlice.caseReducers.applyFilters(state);
    },
    setHealthTagFilter: (state, action) => {
      const tag = action.payload;
      if (state.filters.healthTags.includes(tag)) {
        state.filters.healthTags = state.filters.healthTags.filter(t => t !== tag);
      } else {
        state.filters.healthTags.push(tag);
      }
      mealsSlice.caseReducers.applyFilters(state);
    },
    clearHealthTagFilters: (state) => {
      state.filters.healthTags = [];
      mealsSlice.caseReducers.applyFilters(state);
    },
    setPriceRangeFilter: (state, action) => {
      state.filters.priceRange = action.payload;
      mealsSlice.caseReducers.applyFilters(state);
    },
    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload;
      mealsSlice.caseReducers.applyFilters(state);
    },
    clearAllFilters: (state) => {
      state.filters = {
        region: 'all',
        healthTags: [],
        priceRange: [0, 10000],
        searchTerm: '',
      };
      mealsSlice.caseReducers.applyFilters(state);
    },
    applyFilters: (state) => {
      let filtered = [...state.meals];

      // Region filter
      if (state.filters.region !== 'all') {
        filtered = filtered.filter(meal => meal.region === state.filters.region);
      }

      // Health tags filter
      if (state.filters.healthTags.length > 0) {
        filtered = filtered.filter(meal =>
          state.filters.healthTags.some(tag => meal.healthTags.includes(tag))
        );
      }

      // Price range filter
      filtered = filtered.filter(meal =>
        meal.price >= state.filters.priceRange[0] &&
        meal.price <= state.filters.priceRange[1]
      );

      // Search term filter
      if (state.filters.searchTerm) {
        filtered = filtered.filter(meal =>
          meal.name.toLowerCase().includes(state.filters.searchTerm) ||
          meal.desc.toLowerCase().includes(state.filters.searchTerm) ||
          meal.country.toLowerCase().includes(state.filters.searchTerm)
        );
      }

      state.filteredMeals = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch meals
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
        state.filteredMeals = action.payload;
        state.error = null;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch meal by ID
      .addCase(fetchMealById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMealById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMealById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search meals
      .addCase(searchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
        state.filteredMeals = action.payload;
        state.error = null;
      })
      .addCase(searchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch featured meals
      .addCase(fetchFeaturedMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
        state.filteredMeals = action.payload;
        state.error = null;
      })
      .addCase(fetchFeaturedMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setRegionFilter,
  setHealthTagFilter,
  clearHealthTagFilters,
  setPriceRangeFilter,
  setSearchTerm,
  clearAllFilters,
  applyFilters,
} = mealsSlice.actions;

// Selectors
export const selectMeals = (state) => state.meals.meals;
export const selectFilteredMeals = (state) => state.meals.filteredMeals;
export const selectMealsLoading = (state) => state.meals.loading;
export const selectMealsError = (state) => state.meals.error;
export const selectFilters = (state) => state.meals.filters;
export const selectAllRegions = (state) => 
  [...new Set(state.meals.meals.map(meal => meal.region))];
export const selectAllHealthTags = (state) => 
  [...new Set(state.meals.meals.flatMap(meal => meal.healthTags))];

export default mealsSlice.reducer;
