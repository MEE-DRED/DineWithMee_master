import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
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
import consultationsReducer from './slices/consultationsSlice';
import mealPlansReducer from './slices/mealPlansSlice';
import chatReducer from './slices/chatSlice';
import ordersReducer from './slices/ordersSlice';

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
    consultations: consultationsReducer,
    mealPlans: mealPlansReducer,
    chat: chatReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    });

    // Add logger middleware in development only
    if (import.meta.env.DEV) {
      const logger = createLogger({
        collapsed: true,
        duration: true,
        diff: true,
      });
      return middlewares.concat(logger);
    }

    return middlewares;
  },
  devTools: import.meta.env.DEV,
});

export default store;
