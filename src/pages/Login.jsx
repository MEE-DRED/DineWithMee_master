import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, selectAuth } from '../redux';
import { useToast } from '../hooks/useToast';
import FormField from '../components/common/FormField';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { loginSchema } from '../schemas/authSchemas';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import ScrollToTopButton from '../components/common/ScrollToTopButton';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error } = useToast();
  const { isLoading } = useSelector(selectAuth);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(loginUser(values));
      if (result.meta.requestStatus === 'fulfilled') {
        success('Login successful! Welcome back.');
        const userRole = result.payload?.user?.role || 'customer';
        switch (userRole) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'chef':
            navigate('/chef/dashboard');
            break;
          case 'nutritionist':
            navigate('/nutritionist/dashboard');
            break;
          case 'pharmacy':
            navigate('/pharmacy/dashboard');
            break;
          default:
            navigate('/customer/dashboard');
            break;
        }
      } else {
        error(result.payload || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      error('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
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
      className="min-h-screen bg-gray-100 overflow-x-hidden"
    >
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Visual */}
        <motion.section
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 40, delay: 0.2, duration: 0.8 }}
          className="flex-1 bg-green-700 text-white p-8 sm:p-12 flex flex-col justify-center relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            <span className="font-semibold text-sm text-green-200 uppercase tracking-wider mb-4">
              Role-aware access
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold font-serif mb-6 leading-tight">
              One sign in, two smart workspaces.
            </h1>
            <p className="text-lg md:text-xl mb-12 text-green-100/90 max-w-2xl">
              Customers land in a calm wellness dashboard. Admins land in an operations view built
              for member growth, order flow, and platform visibility.
            </p>

            <div className="space-y-8">
              <article className="flex items-start gap-5">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <strong className="block text-green-100 mb-1 text-lg">Customer dashboard</strong>
                  <span className="text-green-200/80">
                    Track meals, health filters, and recent orders in one place.
                  </span>
                </div>
              </article>

              <article className="flex items-start gap-5">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <strong className="block text-green-100 mb-1 text-lg">Admin dashboard</strong>
                  <span className="text-green-200/80">
                    Monitor users, order status mix, and platform activity at a glance.
                  </span>
                </div>
              </article>

              <article className="flex items-start gap-5">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div>
                  <strong className="block text-green-100 mb-1 text-lg">
                    Nutrition-first design
                  </strong>
                  <span className="text-green-200/80">
                    Every view keeps health context, African meals, and operational clarity close
                    together.
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
                Welcome back
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 mb-4">
                Sign in to your dashboard
              </h2>
              <p className="text-gray-600 mb-8">
                Use your email and password to continue where you left off.
              </p>
            </motion.div>

            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6" noValidate>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.7 }}
                    className="relative"
                  >
                    <FormField
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="you@example.com"
                      required
                      icon={<FaUser className="text-gray-400" />}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.7 }}
                    className="relative"
                  >
                    <FormField
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-10 text-gray-400 hover:text-green-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.7 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting || isLoading ? (
                        <>
                          <LoadingSpinner size="sm" />
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <FiLogIn size={20} />
                          <span>Sign In</span>
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
              transition={{ delay: 1.1, duration: 0.7 }}
              className="text-center my-8"
            >
              <span className="text-gray-600">Need an account? </span>
              <Link
                to="/signup"
                className="font-medium text-green-600 hover:text-green-700 hover:underline inline-flex items-center gap-2"
              >
                <FiUserPlus />
                <span>Sign Up</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <p className="text-sm text-green-800 text-center">
                <strong>Demo Accounts:</strong>
                <br />
                Customer: customer@example.com
                <br />
                Admin: admin@example.com
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>
      <ScrollToTopButton />
    </motion.div>
  );
};

export default Login;
