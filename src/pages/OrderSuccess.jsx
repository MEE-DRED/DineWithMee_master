import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReduxAuth } from '../hooks/useReduxAuth';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useReduxAuth();
  const [orderData, setOrderData] = useState(null);
  const [countdown, setCountdown] = useState(10);

  // Get order data from location state or generate mock data
  useEffect(() => {
    if (location.state?.orderId) {
      setOrderData(location.state);
    } else {
      // Fallback data if state is lost
      setOrderData({
        orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        total: 0,
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
      });
    }
  }, [location]);

  // Countdown timer for redirect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/marketplace');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dwm-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dwm-green-pale to-dwm-green-light py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-dwm-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-dwm-green-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-dwm-green-deep mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-dwm-text-mid mb-2">
            Thank you for your order, {user?.name || 'Valued Customer'}!
          </p>
          <p className="text-dwm-text-mid">
            Your order has been received and is being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Information */}
            <div>
              <h2 className="text-xl font-semibold text-dwm-green-deep mb-4">Order Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Order Number:</span>
                  <span className="font-semibold">{orderData.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Order Date:</span>
                  <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Total Amount:</span>
                  <span className="font-semibold text-dwm-gold">
                    RWF {orderData.total?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Payment Method:</span>
                  <span className="font-semibold">Mobile Money</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Status:</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                    Processing
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div>
              <h2 className="text-xl font-semibold text-dwm-green-deep mb-4">Delivery Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Estimated Delivery:</span>
                  <span className="font-semibold">
                    {orderData.estimatedDelivery || '3-5 business days'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwm-text-mid">Delivery Method:</span>
                  <span className="font-semibold">Home Delivery</span>
                </div>
                <div className="mt-4 p-4 bg-dwm-green-pale rounded-lg">
                  <p className="text-sm text-dwm-text-mid">
                    <strong>Next Steps:</strong> You will receive a confirmation email and SMS with your order details and tracking information once your order is shipped.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="bg-dwm-gold/10 border border-dwm-gold/30 rounded-lg p-4">
            <p className="text-dwm-text-mid mb-2">
              Redirecting to marketplace in <span className="font-bold text-dwm-gold">{countdown}</span> seconds...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-dwm-gold h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(countdown / 10) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/marketplace')}
              className="px-8 py-3 bg-dwm-gold text-dwm-green-deep rounded-lg font-bold hover:bg-dwm-gold-light transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="px-8 py-3 border border-dwm-green-deep text-dwm-green-deep rounded-lg font-bold hover:bg-dwm-green-pale transition-colors"
            >
              View Order History
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-dwm-green-deep mb-6">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-dwm-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-dwm-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-dwm-green-deep mb-2">Order Confirmation</h3>
              <p className="text-sm text-dwm-text-mid">
                You'll receive an email confirmation within minutes with your order details.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dwm-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-dwm-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-dwm-green-deep mb-2">Order Processing</h3>
              <p className="text-sm text-dwm-text-mid">
                Our team will prepare your order with care. This usually takes 1-2 business days.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dwm-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-dwm-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-dwm-green-deep mb-2">Delivery</h3>
              <p className="text-sm text-dwm-text-mid">
                Your order will be delivered to your doorstep within 3-5 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="mt-8 text-center">
          <p className="text-dwm-text-mid mb-4">
            Questions about your order? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+250788123456"
              className="px-6 py-2 border border-dwm-green-deep text-dwm-green-deep rounded-lg font-medium hover:bg-dwm-green-pale transition-colors"
            >
              📞 Call Us
            </a>
            <a
              href="mailto:orders@dinewithmee.rw"
              className="px-6 py-2 border border-dwm-green-deep text-dwm-green-deep rounded-lg font-medium hover:bg-dwm-green-pale transition-colors"
            >
              ✉️ Email Us
            </a>
            <a
              href="https://wa.me/250788123456"
              className="px-6 py-2 border border-dwm-green-deep text-dwm-green-deep rounded-lg font-medium hover:bg-dwm-green-pale transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
