import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, useFormikContext } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, selectAuth } from '../redux';
import { useToast } from '../hooks/useToast';
import FormField from '../components/common/FormField';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { signupSchema, signupStepSchemas } from '../schemas/authSchemas';

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

  const validationSchema = signupSchema;

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

          <form className="auth-form max-w-md mx-auto w-full" onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="form-group">
                  <label htmlFor="firstName" className="block text-dwm-text-dark font-medium mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-dwm-green-pale rounded-dwm-sm focus:outline-none focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="block text-dwm-text-dark font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-dwm-green-pale rounded-dwm-sm focus:outline-none focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="form-group">
                  <label htmlFor="email" className="block text-dwm-text-dark font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-dwm-green-pale rounded-dwm-sm focus:outline-none focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Security */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="form-group">
                  <label htmlFor="password" className="block text-dwm-text-dark font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 pr-12 border border-dwm-green-pale rounded-dwm-sm focus:outline-none focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dwm-text-mid hover:text-dwm-text-dark"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <p className="text-sm text-dwm-text-mid mt-2">
                    Must be at least 8 characters long
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="block text-dwm-text-dark font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-12 border border-dwm-green-pale rounded-dwm-sm focus:outline-none focus:ring-2 focus:ring-dwm-gold focus:border-transparent"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dwm-text-mid hover:text-dwm-text-dark"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-600 mt-2">
                      Passwords do not match
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Agreement */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="form-group">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                      className="mt-1 w-4 h-4 text-dwm-gold border-dwm-green-pale rounded focus:ring-dwm-gold"
                    />
                    <span className="text-dwm-text-mid">
                      I agree to the Dine with Mee{' '}
                      <Link to="/terms" className="text-dwm-gold hover:text-dwm-gold-light">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-dwm-gold hover:text-dwm-gold-light">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            )}

            {error && (
              <div className="auth-inline-error mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-dwm-sm">
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn-secondary flex-1"
                >
                  Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!validateStep(currentStep)}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !validateStep(4)}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>

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
