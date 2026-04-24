import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { aiRecommendationsAPI } from '../api/aiRecommendations';

// Async thunks
export const sendChatMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await aiRecommendationsAPI.chat(messageData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

export const getMealSuggestions = createAsyncThunk(
  'chat/getMealSuggestions',
  async (recommendationData, { rejectWithValue }) => {
    try {
      const response = await aiRecommendationsAPI.getSuggestions(recommendationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get suggestions');
    }
  }
);

export const fetchConversationHistory = createAsyncThunk(
  'chat/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await aiRecommendationsAPI.getConversationHistory();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch conversation history');
    }
  }
);

const initialState = {
  messages: [],
  suggestions: [],
  conversationHistory: [],
  userProfile: {
    name: '',
    email: '',
    gender: '',
    occupation: '',
    religion: '',
    location: '',
    dietaryRestrictions: [],
  },
  healthScreening: {
    conditions: [],
    hypertension: null,
    diabetes: null,
    riskScore: 0,
  },
  currentStep: 'greeting', // greeting, profiling, dietary, screening, recommendations
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateUserProfile: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
    updateHealthScreening: (state, action) => {
      state.healthScreening = { ...state.healthScreening, ...action.payload };
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.suggestions = [];
      state.userProfile = initialState.userProfile;
      state.healthScreening = initialState.healthScreening;
      state.currentStep = 'greeting';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send chat message
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        // Add AI response to messages
        if (action.payload.message) {
          state.messages.push({
            id: Date.now(),
            sender: 'nia',
            text: action.payload.message,
            timestamp: new Date().toISOString(),
          });
        }
        state.error = null;
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get meal suggestions
      .addCase(getMealSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMealSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
        state.error = null;
      })
      .addCase(getMealSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch conversation history
      .addCase(fetchConversationHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversationHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.conversationHistory = action.payload;
        state.error = null;
      })
      .addCase(fetchConversationHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addMessage,
  updateUserProfile,
  updateHealthScreening,
  setCurrentStep,
  clearChat,
  clearError,
} = chatSlice.actions;

// Selectors
export const selectMessages = (state) => state.chat.messages;
export const selectSuggestions = (state) => state.chat.suggestions;
export const selectUserProfile = (state) => state.chat.userProfile;
export const selectHealthScreening = (state) => state.chat.healthScreening;
export const selectCurrentStep = (state) => state.chat.currentStep;
export const selectConversationHistory = (state) => state.chat.conversationHistory;
export const selectChatLoading = (state) => state.chat.loading;
export const selectChatError = (state) => state.chat.error;

export default chatSlice.reducer;
