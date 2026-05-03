import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { checkAuthState, loadCartFromStorage, getCurrentUser } from './redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import ToastContainer from './components/toast/ToastContainer';

// Import pages (we'll create these next)
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Health from './pages/Health';
import Marketplace from './pages/Marketplace';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Maternal from './pages/Maternal';
import Research from './pages/Research';
import ChefPartner from './pages/ChefPartner';
import TestDashboard from './pages/TestDashboard';
import MealDetail from './pages/MealDetail';
import IngredientDetail from './pages/IngredientDetail';
import TestMealCard from './components/debug/TestMealCard';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

import ProtectedRoute from './components/common/ProtectedRoute';

// Role-based dashboards with lazy loading
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { CustomerProvider } from './context/CustomerContext';
import { AdminProvider } from './context/AdminContext';
import { NutritionistProvider } from './context/NutritionistContext';
import { PharmacyProvider } from './context/PharmacyContext';

const CustomerDashboard = lazy(() => import('./pages/Customer/Dashboard'));
const NutritionistDashboard = lazy(() => import('./pages/Nutritionist/Dashboard'));
const AdminDashboardNew = lazy(() => import('./pages/Admin/Dashboard'));
const PharmacyDashboard = lazy(() => import('./pages/Pharmacy/Dashboard'));
const ChatWithMee = lazy(() => import('./components/ai/ChatwithMee'));

function App() {
  useEffect(() => {
    // Initialize Redux state from localStorage
    store.dispatch(checkAuthState());
    store.dispatch(loadCartFromStorage());

    // Get current user if token exists
    const token = localStorage.getItem('dwm-token');
    if (token) {
      store.dispatch(getCurrentUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/health" element={<Health />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/contact" element={<Contact />} />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:programId" element={<ProgramDetail />} />
                <Route path="/maternal" element={<Maternal />} />
                <Route path="/research" element={<Research />} />
                <Route path="/chef-partner" element={<ChefPartner />} />
                <Route path="/test-dashboard" element={<TestDashboard />} />
                <Route path="/meals/:mealId" element={<MealDetail />} />
                <Route path="/ingredients/:ingredientId" element={<IngredientDetail />} />
                <Route path="/debug-meal-card" element={<TestMealCard />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-success"
                  element={
                    <ProtectedRoute>
                      <OrderSuccess />
                    </ProtectedRoute>
                  }
                />

                {/* Role-based dashboards with lazy loading */}
                <Route
                  path="/customer/dashboard"
                  element={
                    <ProtectedRoute>
                      <CustomerProvider>
                        <Suspense fallback={<LoadingSpinner />}>
                          <CustomerDashboard />
                        </Suspense>
                      </CustomerProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/nutritionist/dashboard"
                  element={
                    <ProtectedRoute>
                      <NutritionistProvider>
                        <Suspense fallback={<LoadingSpinner />}>
                          <NutritionistDashboard />
                        </Suspense>
                      </NutritionistProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminProvider>
                        <Suspense fallback={<LoadingSpinner />}>
                          <AdminDashboardNew />
                        </Suspense>
                      </AdminProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/pharmacy/dashboard"
                  element={
                    <ProtectedRoute>
                      <PharmacyProvider>
                        <Suspense fallback={<LoadingSpinner />}>
                          <PharmacyDashboard />
                        </Suspense>
                      </PharmacyProvider>
                    </ProtectedRoute>
                  }
                />

                {/* Chat with Nia (AI Nutritionist) */}
                <Route
                  path="/chat"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <ChatWithMee />
                    </Suspense>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <CartSidebar />
            <ToastContainer />
          </div>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
