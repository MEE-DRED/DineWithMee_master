import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contentAPI } from '../api/content';

// Async thunks for content operations
export const fetchContentByTopic = createAsyncThunk(
  'content/fetchContentByTopic',
  async (topic, { rejectWithValue }) => {
    try {
      const response = await contentAPI.getByTopic(topic);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch content');
    }
  }
);

export const fetchFeaturedContent = createAsyncThunk(
  'content/fetchFeaturedContent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await contentAPI.getFeatured();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured content');
    }
  }
);

export const fetchContentById = createAsyncThunk(
  'content/fetchContentById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await contentAPI.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch content');
    }
  }
);

const initialState = {
  content: [],
  featuredContent: [],
  currentContent: null,
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentContent: (state, action) => {
      state.currentContent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch content by topic
      .addCase(fetchContentByTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentByTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
        state.error = null;
      })
      .addCase(fetchContentByTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch featured content
      .addCase(fetchFeaturedContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedContent.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredContent = action.payload;
        state.error = null;
      })
      .addCase(fetchFeaturedContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch content by ID
      .addCase(fetchContentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContent = action.payload;
        state.error = null;
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentContent } = contentSlice.actions;

// Selectors
export const selectContent = (state) => state.content.content;
export const selectFeaturedContent = (state) => state.content.featuredContent;
export const selectCurrentContent = (state) => state.content.currentContent;
export const selectContentLoading = (state) => state.content.loading;
export const selectContentError = (state) => state.content.error;

export default contentSlice.reducer;
