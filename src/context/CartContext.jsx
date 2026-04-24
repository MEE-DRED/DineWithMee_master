// DEPRECATED: This file is kept for backwards compatibility
// Use useReduxCart from '../hooks/useReduxCart' instead
import { useReduxCart } from '../hooks/useReduxCart';

export const useCart = () => {
  const cart = useReduxCart();
  return {
    ...cart,
    addToCart: cart.addItem,
    getTotalPrice: () => cart.totalPrice,
    getTotalItems: () => cart.totalItems,
    toggleCart: cart.toggleCartOpen,
  };
};

export default useCart;
