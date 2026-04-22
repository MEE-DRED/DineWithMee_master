import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, selectAuth } from '../redux';
import { useToast } from '../hooks/useToast';
import FormField from '../components/common/FormField';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { loginSchema } from '../schemas/authSchemas';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, error } = useToast();
  const { isLoading, isAuthenticated, user, error: authError } = useSelector(selectAuth);

  const initialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(loginUser(values));
      if (result.meta.requestStatus === 'fulfilled') {
        success('Login successful! Welcome back.');
        navigate(values.email.includes('admin') ? '/admin-dashboard' : '/dashboard');
      } else if (result.meta.requestStatus === 'rejected') {
        error(result.payload || 'Login failed. Please try again.');
      }
    } catch (err) {
      error('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-page min-h-screen bg-dwm-off-white">
      <div className="auth-shell min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Visual */}
        <section className="auth-panel auth-panel-visual flex-1 bg-dwm-green-deep text-dwm-white p-12 flex flex-col justify-center">
          <span className="auth-kicker text-dwm-gold-light font-semibold text-sm uppercase tracking-wider mb-4">
            Role-aware access
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            One sign in, two smart workspaces.
          </h1>
          <p className="text-xl mb-12 text-dwm-white/90">
            Customers land in a calm wellness dashboard. Admins land in an operations view built for member growth, order flow, and platform visibility.
          </p>

          <div className="auth-feature-stack space-y-6">
            <article className="auth-feature-card flex items-start gap-4">
              <div className="w-8 h-8 bg-dwm-gold rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-dwm-green-deep font-bold text-sm">1</span>
              </div>
              <div>
                <strong className="block text-dwm-gold-light mb-1">Customer dashboard</strong>
                <span className="text-dwm-white/80">Track meals, health filters, and recent orders in one place.</span>
              </div>
            </article>

            <article className="auth-feature-card flex items-start gap-4">
              <div className="w-8 h-8 bg-dwm-gold rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-dwm-green-deep font-bold text-sm">2</span>
              </div>
              <div>
                <strong className="block text-dwm-gold-light mb-1">Admin dashboard</strong>
                <span className="text-dwm-white/80">Monitor users, order status mix, and platform activity at a glance.</span>
              </div>
            </article>

            <article className="auth-feature-card flex items-start gap-4">
              <div className="w-8 h-8 bg-dwm-gold rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-dwm-green-deep font-bold text-sm">3</span>
              </div>
              <div>
                <strong className="block text-dwm-gold-light mb-1">Nutrition-first design</strong>
                <span className="text-dwm-white/80">Every view keeps health context, African meals, and operational clarity close together.</span>
              </div>
            </article>
          </div>
        </section>

        {/* Right Panel - Form */}
        <section className="auth-panel auth-panel-form flex-1 bg-white p-12 flex flex-col justify-center">
          <div className="auth-form-header max-w-md mx-auto w-full">
            <span className="auth-kicker text-dwm-gold font-semibold text-sm uppercase tracking-wider mb-4">
              Welcome back
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-dwm-green-deep mb-4">
              Sign in to your dashboard
            </h2>
            <p className="text-dwm-text-mid mb-8">
              Use your email and password to continue where you left off.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="auth-form max-w-md mx-auto w-full" noValidate>
                <FormField
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  required
                  className="mb-6"
                />

                <div className="form-group mb-6">
                  <FormField
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    placeholder="Enter your password"
                    required
                    className="mb-2"
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

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {(isSubmitting || isLoading) ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="auth-divider text-center my-8">
            <span className="text-dwm-text-mid">Need an account?</span>
          </div>
          <div className="text-center">
            <Link 
              to="/signup" 
              className="auth-secondary-link text-dwm-gold hover:text-dwm-gold-light font-medium"
            >
              Create your Dine with Mee account
            </Link>
          </div>

          <div className="mt-8 p-4 bg-dwm-green-pale rounded-dwm-sm">
            <p className="text-sm text-dwm-text-mid text-center">
              <strong>Demo Accounts:</strong><br />
              Customer: customer@example.com<br />
              Admin: admin@example.com
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
