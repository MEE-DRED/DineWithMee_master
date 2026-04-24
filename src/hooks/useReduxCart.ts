import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  selectCartIsOpen,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
} from '../redux';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  [key: string]: any;
}

export interface UseReduxCartReturn {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  addItem: (meal: any) => void;
  removeItem: (mealId: string) => void;
  updateItemQuantity: (mealId: string, quantity: number) => void;
  clearAllItems: () => void;
  toggleCartOpen: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useReduxCart = (): UseReduxCartReturn => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const isOpen = useSelector(selectCartIsOpen);

  return {
    items,
    totalItems,
    totalPrice,
    isOpen,
    addItem: (meal) => dispatch(addToCart(meal)),
    removeItem: (mealId) => dispatch(removeFromCart(mealId)),
    updateItemQuantity: (mealId, quantity) => dispatch(updateQuantity({ mealId, quantity })),
    clearAllItems: () => dispatch(clearCart()),
    toggleCartOpen: () => dispatch(toggleCart()),
    openCart: () => dispatch(setCartOpen(true)),
    closeCart: () => dispatch(setCartOpen(false)),
  };
};

export default useReduxCart;
