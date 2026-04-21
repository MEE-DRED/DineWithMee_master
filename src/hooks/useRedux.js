import { useSelector, useDispatch } from 'react-redux';
import { store } from '../redux';

// Auth hooks
export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  
  return {
    ...auth,
    dispatch,
  };
};

// Cart hooks
export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  
  return {
    ...cart,
    dispatch,
  };
};

// UI hooks
export const useUI = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  
  return {
    ...ui,
    dispatch,
  };
};

// Meals hooks
export const useMeals = () => {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.meals);
  
  return {
    ...meals,
    dispatch,
  };
};

// Generic selector hook
export const useAppSelector = useSelector;

// Generic dispatch hook
export const useAppDispatch = () => useDispatch;

// Store access hook
export const useStore = () => store;

export default {
  useAuth,
  useCart,
  useUI,
  useMeals,
  useAppSelector,
  useAppDispatch,
  useStore,
};
