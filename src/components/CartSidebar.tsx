import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReduxCart } from '../hooks/useReduxCart';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiEye, FiShoppingCart } from 'react-icons/fi';

const CartSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { items, isOpen, totalPrice, closeCart, removeItem, updateItemQuantity } = useReduxCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleViewDetails = (slug: string) => {
    closeCart();
    navigate(`/meal/${slug}`);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-112.5 max-w-full bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-serif font-semibold text-gray-800">Your Cart</h3>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-all"
                aria-label="Close cart"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-28 h-28 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <FiShoppingCart size={50} className="text-gray-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h4>
                  <p className="text-gray-500 mb-6 max-w-xs">
                    Looks like you haven't added any meals yet. Let's find something delicious!
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Explore Meals
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
                      className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate mb-1">{item.name}</h4>
                        <p className="text-green-600 font-bold text-xl mb-3">
                          {item.currency || 'RWF'} {(item.price || 0).toLocaleString()}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-10 text-center font-bold text-lg text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewDetails(item.slug || '')}
                              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                              aria-label={`View details for ${item.name}`}
                            >
                              <FiEye size={18} />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">Subtotal</span>
                  <span className="text-2xl font-bold text-green-600">
                    {items[0]?.currency || 'RWF'} {totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Taxes and shipping calculated at checkout.</p>
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                  onClick={() => {
                    closeCart();
                    navigate('/checkout');
                  }}
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={closeCart}
                  className="w-full bg-transparent border-2 border-gray-300 text-gray-700 py-3.5 rounded-lg font-semibold text-base hover:bg-gray-100 hover:border-gray-400 transition-all"
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
