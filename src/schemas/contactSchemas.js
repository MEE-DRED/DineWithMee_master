import * as yup from 'yup';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (basic international format)
const phoneRegex = /^[\d\s\-\+\(\)]+$/;

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address')
    .email('Please enter a valid email address'),
  
  phone: yup
    .string()
    .optional()
    .matches(phoneRegex, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  
  subject: yup
    .string()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject cannot exceed 200 characters'),
  
  message: yup
    .string()
    .required('Message is required')
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message cannot exceed 2000 characters'),
  
  inquiryType: yup
    .string()
    .required('Please select an inquiry type')
    .oneOf(['general', 'support', 'partnership', 'feedback', 'other'], 'Please select a valid inquiry type'),
  
  preferredContact: yup
    .string()
    .optional()
    .oneOf(['email', 'phone', 'both'], 'Please select a valid contact preference'),
  
  urgency: yup
    .string()
    .optional()
    .oneOf(['low', 'medium', 'high', 'urgent'], 'Please select a valid urgency level'),
});

export const quickContactSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address')
    .email('Please enter a valid email address'),
  
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message cannot exceed 500 characters'),
});
