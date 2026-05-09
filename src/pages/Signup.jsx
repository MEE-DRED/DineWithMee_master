import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, selectAuth } from '../redux';
import { useToast } from '../hooks/useToast';
import FormField from '../components/common/FormField';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { signupSchema } from '../schemas/authSchemas';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiUserPlus, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import ScrollToTopButton from '../components/common/ScrollToTopButton';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentStep >= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step}
          </div>
          {step < totalSteps && <div className="w-12 h-1 bg-gray-200 mx-2"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error } = useToast();
  const { isLoading } = useSelector(selectAuth);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setSubmitting(false);
      return;
    }

    try {
      const result = await dispatch(registerUser(values));
      if (result.meta.requestStatus === 'fulfilled') {
        success('Registration successful! Welcome to Dine with Mee.');
        const userRole = result.payload?.user?.role || 'customer';
        switch (userRole) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/customer/dashboard');
            break;
        }
      } else {
        error(result.payload || 'Registration failed. Please try again.');
      }
    } catch (err) {
      error('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100"
    >
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Visual */}
        <motion.section
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 40, delay: 0.2, duration: 0.8 }}
          className="flex-1 bg-green-700 text-white p-8 sm:p-12 flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            <span className="font-semibold text-sm text-green-200 uppercase tracking-wider mb-4">
              Start Your Wellness Journey
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold font-serif mb-6 leading-tight">
              Create Your Health Profile
            </h1>
            <p className="text-lg md:text-xl mb-12 text-green-100/90 max-w-2xl">
              Join a community focused on wellness through therapeutic African meals. Get
              personalized plans and expert support.
            </p>
            <div className="space-y-8">
              <article className="flex items-start gap-5">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <strong className="block text-green-100 mb-1 text-lg">Personalized Plans</strong>
                  <span className="text-green-200/80">
                    Tailored nutrition for your unique health goals.
                  </span>
                </div>
              </article>
              <article className="flex items-start gap-5">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <strong className="block text-green-100 mb-1 text-lg">Therapeutic Meals</strong>
                  <span className="text-green-200/80">
                    Clinically-designed African meal plans at your fingertips.
                  </span>
                </div>
              </article>
            </div>
          </motion.div>
        </motion.section>

        {/* Right Panel - Form */}
        <motion.section
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 40, delay: 0.2, duration: 0.8 }}
          className="w-full lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center"
        >
          <div className="max-w-md mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-2">
                Create Account
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 mb-4">
                Join Dine with Mee
              </h2>
              <p className="text-gray-600 mb-8">Fill in your details to get started.</p>
            </motion.div>

            <ProgressIndicator currentStep={currentStep} totalSteps={3} />

            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5" noValidate>
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-5"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <FormField
                          name="firstName"
                          type="text"
                          label="First Name"
                          placeholder="John"
                          required
                        />
                        <FormField
                          name="lastName"
                          type="text"
                          label="Last Name"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-5"
                    >
                      <FormField
                        name="email"
                        type="email"
                        label="Email Address"
                        placeholder="you@example.com"
                        required
                      />
                      <div className="relative">
                        <FormField
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          label="Password"
                          placeholder="Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-10 text-gray-400 hover:text-green-600"
                        >
                          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                      </div>
                      <div className="relative">
                        <FormField
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          label="Confirm Password"
                          placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-10 text-gray-400 hover:text-green-600"
                        >
                          {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <FormField
                        name="agreeToTerms"
                        type="checkbox"
                        label={
                          <span>
                            I agree to the{' '}
                            <Link
                              to="/terms"
                              className="font-medium text-green-600 hover:underline"
                            >
                              Terms
                            </Link>{' '}
                            &{' '}
                            <Link
                              to="/privacy"
                              className="font-medium text-green-600 hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </span>
                        }
                        required
                      />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="flex justify-between items-center pt-4"
                  >
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="flex items-center justify-center gap-2 text-gray-600 hover:text-green-700 font-bold py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        <FiArrowLeft />
                        <span>Previous</span>
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 ml-auto"
                    >
                      {isSubmitting || isLoading ? (
                        <>
                          <LoadingSpinner size="sm" />
                          <span>{currentStep === 3 ? 'Creating Account...' : 'Processing...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{currentStep === 3 ? 'Create Account' : 'Next Step'}</span>
                          {currentStep < 3 ? <FiArrowRight /> : <FiUserPlus size={20} />}
                        </>
                      )}
                    </button>
                  </motion.div>
                </Form>
              )}
            </Formik>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-center my-8"
            >
              <span className="text-gray-600">Already have an account? </span>
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-700 hover:underline"
              >
                Sign In
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
      <ScrollToTopButton />
    </motion.div>
  );
};

export default Signup;
