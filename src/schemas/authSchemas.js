import * as yup from 'yup';

// Password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Name validation regex (letters only, spaces allowed)
const nameRegex = /^[a-zA-Z\s]+$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(1, 'Password is required'),
});

export const signupSchema = yup.object().shape({
  // Step 1: Personal Information
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .matches(nameRegex, 'First name can only contain letters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .matches(nameRegex, 'Last name can only contain letters'),
  
  // Step 2: Contact Information
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Please enter a valid email address')
    .email('Please enter a valid email address'),
  
  // Step 3: Security
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      passwordRegex,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  
  // Step 4: Agreement
  agreeToTerms: yup
    .boolean()
    .required('You must agree to the terms and conditions')
    .oneOf([true], 'You must agree to the terms and conditions'),
});

// Step-specific validation schemas for multi-step form
export const signupStepSchemas = {
  1: yup.object().shape({
    firstName: signupSchema.fields.firstName,
    lastName: signupSchema.fields.lastName,
  }),
  2: yup.object().shape({
    email: signupSchema.fields.email,
  }),
  3: yup.object().shape({
    password: signupSchema.fields.password,
    confirmPassword: signupSchema.fields.confirmPassword,
  }),
  4: yup.object().shape({
    agreeToTerms: signupSchema.fields.agreeToTerms,
  }),
};
