import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, useFormikContext } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, selectAuth } from '../redux';
import { useToast } from '../hooks/useToast';
import FormField from '../components/common/FormField';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { signupSchema } from '../schemas/authSchemas';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error } = useToast();
  const { isLoading, error: authError } = useSelector(selectAuth);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(registerUser(values));
      if (result.meta.requestStatus === 'fulfilled') {
        success('Registration successful! Please check your email to verify your account.');
        navigate('/login');
      } else if (result.meta.requestStatus === 'rejected') {
        error(result.payload || 'Registration failed. Please try again.');
      }
    } catch (err) {
      error('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const steps = [
    {
      number: 1,
      title: 'Personal Information',
      description: 'Tell us about yourself'
    },
    {
      number: 2,
      title: 'Contact Details',
      description: 'How can we reach you?'
    },
    {
      number: 3,
      title: 'Security',
      description: 'Create a secure password'
    },
    {
      number: 4,
      title: 'Agreement',
      description: 'Review and accept terms'
    }
  ];

  const StepForm = () => {
    const { values, errors, touched, isSubmitting } = useFormikContext();

    return (
      <Form className="auth-form max-w-md mx-auto w-full" noValidate>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <FormField
              name="firstName"
              type="text"
              label="First Name"
              placeholder="Enter your first name"
              required
            />
            <FormField
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Enter your last name"
              required
            />
          </div>
        )}

        {/* Step 2: Contact Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <FormField
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              required
            />
          </div>
        )}

        {/* Step 3: Security */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="form-group">
              <FormField
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                className="auth-password-toggle absolute right-3 top-1/2 -translate-y-1/2 text-dwm-text-mid hover:text-dwm-text-dark"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="form-group">
              <FormField
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="auth-password-toggle absolute right-3 top-1/2 -translate-y-1/2 text-dwm-text-mid hover:text-dwm-text-dark"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Agreement */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <FormField
              name="agreeToTerms"
              type="checkbox"
              label={
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="text-dwm-gold hover:text-dwm-gold-light underline">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-dwm-gold hover:text-dwm-gold-light underline">
                    Privacy Policy
                  </Link>
                </span>
              }
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && (!values.firstName || !values.lastName)) ||
                (currentStep === 2 && !values.email) ||
                (currentStep === 3 && (!values.password || !values.confirmPassword || values.password !== values.confirmPassword))
              }
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || isLoading || !values.agreeToTerms}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {(isSubmitting || isLoading) ? (
                <>
                  <LoadingSpinner size="sm" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          )}
        </div>
      </Form>
    );
  };

  return (
    <div className="auth-page min-h-screen bg-dwm-off-white">
      <div className="auth-shell min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Visual */}
        <section className="auth-panel auth-panel-visual flex-1 bg-dwm-green-deep text-dwm-white p-12 flex flex-col justify-center">
          <div className="mb-12">
            <Link to="/" className="nav-logo inline-flex items-center gap-2.5 mb-8">
              <div className="logo-mark">D</div>
              <span className="logo-text">Dine with <span className="text-dwm-gold-light">Mee</span></span>
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Join Our Health Community
            </h1>
            <p className="text-xl mb-8 text-dwm-white/90">
              Start your journey to better health with personalized nutrition plans and therapeutic African meals.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dwm-gold rounded-full flex items-center justify-center">
                  <span className="text-dwm-green-deep font-bold">✓</span>
                </div>
                <div>
                  <strong className="block text-dwm-gold-light mb-1">Personalized Health Plans</strong>
                  <span className="text-dwm-white/80">Get nutrition recommendations tailored to your health goals</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dwm-gold rounded-full flex items-center justify-center">
                  <span className="text-dwm-green-deep font-bold">✓</span>
                </div>
                <div>
                  <strong className="block text-dwm-gold-light mb-1">Therapeutic Meals</strong>
                  <span className="text-dwm-white/80">Access clinically-designed African meal plans</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dwm-gold rounded-full flex items-center justify-center">
                  <span className="text-dwm-green-deep font-bold">✓</span>
                </div>
                <div>
                  <strong className="block text-dwm-gold-light mb-1">Expert Support</strong>
                  <span className="text-dwm-white/80">Connect with nutritionists and health professionals</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Panel - Form */}
        <section className="auth-panel auth-panel-form flex-1 bg-white p-12 flex flex-col justify-center">
          <div className="auth-form-header max-w-md mx-auto w-full mb-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    currentStep >= step.number 
                      ? 'bg-dwm-gold text-dwm-green-deep' 
                      : 'bg-dwm-green-pale text-dwm-text-mid'
                  }`}>
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  {step.number < steps.length && (
                    <div className={`w-16 h-1 mx-2 transition-colors ${
                      currentStep > step.number ? 'bg-dwm-gold' : 'bg-dwm-green-pale'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <span className="auth-kicker text-dwm-gold font-semibold text-sm uppercase tracking-wider mb-4">
              Step {currentStep} of {steps.length}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-dwm-green-deep mb-4">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-dwm-text-mid">
              {steps[currentStep - 1].description}
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            <StepForm />
          </Formik>

          <div className="auth-divider text-center my-8">
            <span className="text-dwm-text-mid">Already have an account?</span>
          </div>
          <div className="text-center">
            <Link 
              to="/login" 
              className="auth-secondary-link text-dwm-gold hover:text-dwm-gold-light font-medium"
            >
              Sign in to your account
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
