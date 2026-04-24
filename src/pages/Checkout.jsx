import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useReduxCart } from '../hooks/useReduxCart';
import { useReduxAuth } from '../hooks/useReduxAuth';
import { createOrder, selectOrdersLoading } from '../redux';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice, clearCart } = useReduxCart();
  const { isAuthenticated, user } = useReduxAuth();
  const ordersLoading = useSelector(selectOrdersLoading);

  // Form states
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'Rwanda',
    deliveryInstructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('mobile-money');
  const [paymentInfo, setPaymentInfo] = useState({
    mobileMoneyProvider: 'mtn',
    mobileNumber: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [orderNotes, setOrderNotes] = useState('');
  const [errors, setErrors] = useState({});

  // Calculate totals
  const subtotal = totalPrice;
  const shippingFee = subtotal > 10000 ? 0 : 2000; // Free shipping over 10,000 RWF
  const tax = subtotal * 0.18; // 18% VAT
  const total = subtotal + shippingFee + tax;

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/marketplace');
    }
  }, [items.length, navigate]);

  // Pre-fill user info if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setShippingInfo(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [isAuthenticated, user]);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Validate shipping info
      if (!shippingInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) newErrors.email = 'Invalid email format';
      if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
      if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
      if (!shippingInfo.region.trim()) newErrors.region = 'Region is required';
    }

    if (step === 2) {
      // Validate payment info
      if (paymentMethod === 'mobile-money') {
        if (!paymentInfo.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
        if (!/^[0-9]{10}$/.test(paymentInfo.mobileNumber.replace(/\s/g, ''))) {
          newErrors.mobileNumber = 'Invalid mobile number format';
        }
      } else if (paymentMethod === 'card') {
        if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
        if (!paymentInfo.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
        if (!paymentInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
        if (!paymentInfo.cvv.trim()) newErrors.cvv = 'CVV is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(currentStep)) return;

    const orderData = {
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        type: item.type
      })),
      shippingInfo,
      paymentMethod,
      paymentInfo: paymentMethod === 'mobile-money' ? {
        provider: paymentInfo.mobileMoneyProvider,
        number: paymentInfo.mobileNumber
      } : {
        last4: paymentInfo.cardNumber.slice(-4),
        name: paymentInfo.cardName
      },
      subtotal,
      shippingFee,
      tax,
      total,
      orderNotes
    };

    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      clearCart();
      navigate('/order-success', { 
        state: { 
          orderId: result.orderId, 
          total: total 
        } 
      });
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to place order. Please try again.' });
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step
                  ? 'bg-dwm-gold text-dwm-green-deep'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`w-full h-1 mx-2 ${
                  currentStep > step ? 'bg-dwm-gold' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span className="text-dwm-text-mid">Shipping</span>
        <span className="text-dwm-text-mid">Payment</span>
        <span className="text-dwm-text-mid">Review</span>
      </div>
    </div>
  );

  const renderShippingStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-dwm-green-deep">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-dwm-text-mid mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={shippingInfo.fullName}
            onChange={(e) => setShippingInfo(prev => ({ ...prev, fullName: e.target.value }))}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-dwm-text-mid mb-2">
            Email *
          </label>
          <input
            type="email"
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-dwm-text-mid mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={shippingInfo.phone}
            onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+250 788 123 456"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-dwm-text-mid mb-2">
            Country
          </label>
          <select
            value={shippingInfo.country}
            onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
          >
            <option value="Rwanda">Rwanda</option>
            <option value="Kenya">Kenya</option>
            <option value="Uganda">Uganda</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="South Africa">South Africa</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-dwm-text-mid mb-2">
            Address *
          </label>
          <input
            type="text"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123 Main Street, Kiyovu"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-dwm-text-mid mb-2">
            City *
          </label>
          <input
            type="text"
            value={shippingInfo.city}
            onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Kigali"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-dwm-text-mid mb-2">
            Region/Province *
          </label>
          <input
            type="text"
            value={shippingInfo.region}
            onChange={(e) => setShippingInfo(prev => ({ ...prev, region: e.target.value }))}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent ${
              errors.region ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Kigali City"
          />
          {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-dwm-text-mid mb-2">
            Postal Code
          </label>
          <input
            type="text"
            value={shippingInfo.postalCode}
            onChange={(e) => setShippingInfo(prev => ({ ...prev, postalCode: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
            placeholder="250"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-dwm-text-mid mb-2">
            Delivery Instructions
          </label>
          <textarea
            value={shippingInfo.deliveryInstructions}
            onChange={(e) => setShippingInfo(prev => ({ ...prev, deliveryInstructions: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
            rows={3}
            placeholder="Any special delivery instructions..."
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-dwm-green-deep">Payment Method</h2>
      
      <div className="space-y-4">
        <div className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="mobile-money"
            checked={paymentMethod === 'mobile-money'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-3"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-dwm-green-deep">Mobile Money</h3>
            <p className="text-sm text-dwm-text-mid">Pay with MTN, Airtel Money, or other mobile money services</p>
          </div>
        </div>

        <div className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-3"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-dwm-green-deep">Credit/Debit Card</h3>
            <p className="text-sm text-dwm-text-mid">Pay with Visa, Mastercard, or other cards</p>
          </div>
        </div>

        <div className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            value="cash-on-delivery"
            checked={paymentMethod === 'cash-on-delivery'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-3"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-dwm-green-deep">Cash on Delivery</h3>
            <p className="text-sm text-dwm-text-mid">Pay when you receive your order</p>
          </div>
        </div>
      </div>

      {paymentMethod === 'mobile-money' && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-dwm-green-deep">Mobile Money Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-dwm-text-mid mb-2">
              Provider
            </label>
            <select
              value={paymentInfo.mobileMoneyProvider}
              onChange={(e) => setPaymentInfo(prev => ({ ...prev, mobileMoneyProvider: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
            >
              <option value="mtn">MTN Mobile Money</option>
              <option value="airtel">Airtel Money</option>
              <option value="tigocash">Tigo Cash</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dwm-text-mid mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              value={paymentInfo.mobileNumber}
              onChange={(e) => setPaymentInfo(prev => ({ ...prev, mobileNumber: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent ${
                errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0788 123 456"
            />
            {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
          </div>
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-dwm-green-deep">Card Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-dwm-text-mid mb-2">
              Card Number *
            </label>
            <input
              type="text"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-dwm-text-mid mb-2">
              Cardholder Name *
            </label>
            <input
              type="text"
              value={paymentInfo.cardName}
              onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardName: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent ${
                errors.cardName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
            {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dwm-text-mid mb-2">
                Expiry Date *
              </label>
              <input
                type="text"
                value={paymentInfo.expiryDate}
                onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent ${
                  errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-dwm-text-mid mb-2">
                CVV *
              </label>
              <input
                type="text"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-dwm-green-deep">Order Review</h2>
      
      {/* Order Items */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-dwm-green-deep mb-4">Order Items</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-dwm-text-mid">Qty: {item.quantity} × {item.currency || 'RWF'} {item.price.toLocaleString()}</p>
              </div>
              <p className="font-semibold">
                {item.currency || 'RWF'} {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-dwm-green-deep mb-4">Shipping Information</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {shippingInfo.fullName}</p>
          <p><strong>Email:</strong> {shippingInfo.email}</p>
          <p><strong>Phone:</strong> {shippingInfo.phone}</p>
          <p><strong>Address:</strong> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.region}</p>
          <p><strong>Country:</strong> {shippingInfo.country}</p>
          {shippingInfo.deliveryInstructions && (
            <p><strong>Delivery Instructions:</strong> {shippingInfo.deliveryInstructions}</p>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-dwm-green-deep mb-4">Payment Method</h3>
        <div className="capitalize">
          {paymentMethod === 'mobile-money' && (
            <p>Mobile Money ({paymentInfo.mobileMoneyProvider}) - {paymentInfo.mobileNumber}</p>
          )}
          {paymentMethod === 'card' && (
            <p>Credit/Debit Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
          )}
          {paymentMethod === 'cash-on-delivery' && (
            <p>Cash on Delivery</p>
          )}
        </div>
      </div>

      {/* Order Notes */}
      <div>
        <label className="block text-sm font-medium text-dwm-text-mid mb-2">
          Order Notes (Optional)
        </label>
        <textarea
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
          rows={3}
          placeholder="Any special requests or notes..."
        />
      </div>

      {/* Price Breakdown */}
      <div className="bg-dwm-green-pale rounded-lg p-6">
        <h3 className="font-semibold text-dwm-green-deep mb-4">Price Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{items[0]?.currency || 'RWF'} {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{shippingFee === 0 ? 'FREE' : `${items[0]?.currency || 'RWF'} ${shippingFee.toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (18%):</span>
            <span>{items[0]?.currency || 'RWF'} {tax.toLocaleString()}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-dwm-gold">{items[0]?.currency || 'RWF'} {total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dwm-green-deep mb-2">Checkout</h1>
          <p className="text-dwm-text-mid">Complete your order in a few simple steps</p>
        </div>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Error Message */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p>{errors.submit}</p>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {currentStep === 1 && renderShippingStep()}
          {currentStep === 2 && renderPaymentStep()}
          {currentStep === 3 && renderReviewStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={currentStep === 1 ? () => navigate('/marketplace') : handlePrevStep}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            {currentStep === 1 ? 'Back to Cart' : 'Previous'}
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNextStep}
              className="px-6 py-3 bg-dwm-gold text-dwm-green-deep rounded-lg font-bold hover:bg-dwm-gold-light transition-colors"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-3 bg-dwm-gold text-dwm-green-deep rounded-lg font-bold hover:bg-dwm-gold-light transition-colors"
            >
              Place Order • {items[0]?.currency || 'RWF'} {total.toLocaleString()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
