import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const PaymentProcessing = ({ 
  paymentMethod, 
  amount, 
  onPaymentComplete, 
  onPaymentFailed, 
  onPaymentCancel 
}) => {
  const [status, setStatus] = useState('processing'); // processing, success, failed, cancelled
  const [message, setMessage] = useState('Processing payment...');
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate payment processing
      if (paymentMethod === 'mobile-money') {
        processMobileMoneyPayment();
      } else if (paymentMethod === 'card') {
        processCardPayment();
      } else if (paymentMethod === 'cash-on-delivery') {
        processCashOnDelivery();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [paymentMethod]);

  const processMobileMoneyPayment = () => {
    setMessage('Waiting for mobile money confirmation...');
    
    // Simulate mobile money payment flow
    setTimeout(() => {
      setStatus('success');
      setMessage('Payment confirmed successfully!');
      setTimeout(() => onPaymentComplete(), 1500);
    }, 3000);
  };

  const processCardPayment = () => {
    setMessage('Processing card payment...');
    
    // Simulate card payment processing
    setTimeout(() => {
      setStatus('success');
      setMessage('Payment processed successfully!');
      setTimeout(() => onPaymentComplete(), 1500);
    }, 2500);
  };

  const processCashOnDelivery = () => {
    setMessage('Order confirmed for cash on delivery');
    
    // Cash on delivery is instantly confirmed
    setTimeout(() => {
      setStatus('success');
      setMessage('Order placed successfully!');
      setTimeout(() => onPaymentComplete(), 1500);
    }, 1500);
  };

  const handleCancel = () => {
    setStatus('cancelled');
    onPaymentCancel();
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <LoadingSpinner size="md" />;
      case 'success':
        return (
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'failed':
        return (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'cancelled':
        return (
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'processing': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'cancelled': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getPaymentMethodDetails = () => {
    switch (paymentMethod) {
      case 'mobile-money':
        return {
          title: 'Mobile Money Payment',
          description: 'Please check your phone for the payment prompt',
          steps: [
            'Enter your PIN to confirm the payment',
            'Wait for payment confirmation',
            'You will receive an SMS confirmation'
          ]
        };
      case 'card':
        return {
          title: 'Card Payment',
          description: 'Your card is being processed securely',
          steps: [
            'Card details are being encrypted',
            'Payment is being authorized',
            'Transaction will be confirmed shortly'
          ]
        };
      case 'cash-on-delivery':
        return {
          title: 'Cash on Delivery',
          description: 'Your order is confirmed for cash payment on delivery',
          steps: [
            'Order has been placed successfully',
            'Prepare cash for delivery',
            'Pay when you receive your order'
          ]
        };
      default:
        return {
          title: 'Payment Processing',
          description: 'Processing your payment...',
          steps: []
        };
    }
  };

  const paymentDetails = getPaymentMethodDetails();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {getStatusIcon()}
        </div>

        {/* Status Message */}
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${getStatusColor()}`}>
            {paymentDetails.title}
          </h2>
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">{paymentDetails.description}</p>
            
            {paymentDetails.steps.length > 0 && (
              <div className="mt-4 space-y-2">
                {paymentDetails.steps.map((step, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-4 h-4 bg-dwm-gold rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-xs text-dwm-green-deep font-bold">{index + 1}</span>
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Amount Display */}
        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount:</span>
            <span className="text-xl font-bold text-dwm-gold">
              RWF {amount?.toLocaleString() || '0'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {status === 'processing' && (
            <button
              onClick={handleCancel}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel Payment
            </button>
          )}

          {status === 'failed' && (
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-dwm-gold text-dwm-green-deep rounded-lg font-bold hover:bg-dwm-gold-light transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleCancel}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {status === 'cancelled' && (
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Return to Checkout
            </button>
          )}
        </div>

        {/* Help Section */}
        {status === 'processing' && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Need help? Contact our support team
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <a href="tel:+250788123456" className="text-dwm-gold hover:text-dwm-gold-light">
                📞 Call
              </a>
              <a href="https://wa.me/250788123456" className="text-dwm-gold hover:text-dwm-gold-light">
                💬 WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentProcessing;
