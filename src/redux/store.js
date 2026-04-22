import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import uiReducer from './slices/uiSlice';
import mealsReducer from './slices/mealsSlice';
import regionsReducer from './slices/regionsSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import usersReducer from './slices/usersSlice';
import contentReducer from './slices/contentSlice';
import healthReducer from './slices/healthSlice';
import roleManagementReducer from './slices/roleManagementSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    ui: uiReducer,
    meals: mealsReducer,
    regions: regionsReducer,
    ingredients: ingredientsReducer,
    users: usersReducer,
    content: contentReducer,
    health: healthReducer,
    roleManagement: roleManagementReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.DEV,
});

export default store;
