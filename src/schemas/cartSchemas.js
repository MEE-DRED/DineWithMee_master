import * as yup from 'yup';

export const quantitySchema = yup.object().shape({
  quantity: yup
    .number()
    .required('Quantity is required')
    .integer('Quantity must be a whole number')
    .min(1, 'Quantity must be at least 1')
    .max(99, 'Quantity cannot exceed 99'),
});

export const cartItemSchema = yup.object().shape({
  id: yup.string().required('Item ID is required'),
  name: yup.string().required('Item name is required'),
  price: yup.number().required('Price is required').min(0, 'Price must be positive'),
  quantity: quantitySchema.fields.quantity,
});

export const checkoutSchema = yup.object().shape({
  // Customer Information
  customerName: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  
  customerEmail: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  customerPhone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  
  // Delivery Information
  deliveryAddress: yup
    .string()
    .required('Delivery address is required')
    .min(10, 'Please enter a complete address')
    .max(500, 'Address cannot exceed 500 characters'),
  
  deliveryCity: yup
    .string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City cannot exceed 100 characters'),
  
  deliveryPostalCode: yup
    .string()
    .required('Postal code is required')
    .matches(/^\d+$/, 'Postal code must contain only numbers')
    .min(4, 'Postal code must be at least 4 digits')
    .max(10, 'Postal code cannot exceed 10 digits'),
  
  // Order Details
  deliveryNotes: yup
    .string()
    .optional()
    .max(500, 'Delivery notes cannot exceed 500 characters'),
  
  paymentMethod: yup
    .string()
    .required('Please select a payment method')
    .oneOf(['cash', 'card', 'mobile_money', 'bank_transfer'], 'Please select a valid payment method'),
  
  // Terms
  agreeToTerms: yup
    .boolean()
    .required('You must agree to the terms and conditions')
    .oneOf([true], 'You must agree to the terms and conditions'),
  
  // Special Instructions
  specialInstructions: yup
    .string()
    .optional()
    .max(1000, 'Special instructions cannot exceed 1000 characters'),
});

export const promoCodeSchema = yup.object().shape({
  code: yup
    .string()
    .required('Promo code is required')
    .min(3, 'Promo code must be at least 3 characters')
    .max(20, 'Promo code cannot exceed 20 characters')
    .matches(/^[A-Z0-9]+$/, 'Promo code can only contain uppercase letters and numbers'),
});
