import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { checkAuthState, loadCartFromStorage } from './redux';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
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
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 pt-18">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/health" element={<Health />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/programs" element={<Programs />} />
                  <Route path="/programs/:id" element={<ProgramDetail />} />
                  <Route path="/maternal" element={<Maternal />} />
                  <Route path="/research" element={<Research />} />
                  <Route path="/chef-partner" element={<ChefPartner />} />
                </Routes>
              </main>
              <Footer />
              <CartSidebar />
              <ToastContainer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
