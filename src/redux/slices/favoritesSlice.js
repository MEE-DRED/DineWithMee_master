import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem('dwm-favorites');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadFavoritesFromStorage(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const mealId = action.payload;
      const index = state.items.indexOf(mealId);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(mealId);
      }
      localStorage.setItem('dwm-favorites', JSON.stringify(state.items));
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem('dwm-favorites');
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (mealId) => (state) =>
  state.favorites.items.includes(mealId);
export default favoritesSlice.reducer;
