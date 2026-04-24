import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReduxCart } from '../hooks/useReduxCart';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { items, isOpen, totalPrice, closeCart, removeItem, updateItemQuantity } = useReduxCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 max-w-full bg-white shadow-dwm-lg z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dwm-green-pale">
              <h3 className="text-xl font-serif font-semibold text-dwm-green-deep">Your Cart</h3>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dwm-green-pale text-dwm-text-mid hover:text-dwm-green-deep transition-all"
                aria-label="Close cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-24 h-24 mb-6 rounded-full bg-dwm-green-pale flex items-center justify-center">
                    <svg className="w-12 h-12 text-dwm-green-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-dwm-green-deep mb-2">Your cart is empty</h4>
                  <p className="text-dwm-text-mid mb-6">
                    Browse our marketplace to find delicious, health-focused meals!
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-dwm-gold hover:bg-dwm-gold-light text-dwm-green-deep px-6 py-2.5 rounded-lg font-semibold transition-all"
                  >
                    Explore Meals
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-4 bg-dwm-off-white rounded-dwm-md hover:shadow-dwm-sm transition-all"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-dwm-sm"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-dwm-green-deep truncate">{item.name}</h4>
                        <p className="text-dwm-gold font-bold text-lg">
                          {item.currency || 'RWF'} {(item.price || 0).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-md bg-dwm-green-pale hover:bg-dwm-green-light hover:text-white text-dwm-green-deep transition-all"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-10 text-center font-semibold text-dwm-green-deep">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-md bg-dwm-green-pale hover:bg-dwm-green-light hover:text-white text-dwm-green-deep transition-all"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-dwm-green-pale p-6 space-y-4 bg-dwm-green-pale/30">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-dwm-green-deep">Subtotal</span>
                  <span className="text-2xl font-bold text-dwm-gold">
                    {items[0]?.currency || 'RWF'} {totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-dwm-text-mid">
                  Taxes and shipping calculated at checkout
                </p>
                <button
                  className="w-full bg-dwm-gold hover:bg-dwm-gold-light text-dwm-green-deep py-3.5 rounded-lg font-bold text-base transition-all shadow-dwm-sm hover:shadow-dwm-md"
                  onClick={() => {
                    closeCart();
                    navigate('/checkout');
                  }}
                >
                  Proceed to Checkout • {items[0]?.currency || 'RWF'} {totalPrice.toLocaleString()}
                </button>
                <button
                  onClick={closeCart}
                  className="w-full bg-transparent border-2 border-dwm-green-light text-dwm-green-deep py-3 rounded-lg font-semibold text-base hover:bg-dwm-green-pale transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
