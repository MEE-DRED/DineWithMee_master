import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, toggleCart, isOpen } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <div className="logo-mark">D</div>
          <span className="logo-text">Dine with <span>Mee</span></span>
        </Link>

        <ul className="nav-links hidden md:flex">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/health" className={isActive('/health') ? 'active' : ''}>
              Health Hub
            </Link>
          </li>
          <li>
            <Link to="/marketplace" className={isActive('/marketplace') ? 'active' : ''}>
              Marketplace
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>
              Contact
            </Link>
          </li>
        </ul>

        <div className="nav-actions flex items-center gap-3">
          <button 
            onClick={toggleCart}
            className="btn-cart"
            aria-label="Shopping cart"
          >
            Cart
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-dwm-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link 
                to={user?.role === 'admin' ? '/admin-dashboard' : '/dashboard'}
                className="btn-login"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="btn-primary text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn-login">
                Log in
              </Link>
              <Link to="/signup" className="btn-primary text-sm">
                Join Free
              </Link>
            </div>
          )}

          <button
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 gap-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-dwm-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-dwm-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-dwm-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-64 bg-dwm-green-deep shadow-xl">
            <div className="p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-dwm-white hover:text-dwm-gold-light text-2xl leading-none mb-6"
                aria-label="Close menu"
              >
                ×
              </button>
              
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/" 
                    className={`block text-dwm-white hover:text-dwm-gold-light py-2 ${isActive('/') ? 'text-dwm-gold-light' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/health" 
                    className={`block text-dwm-white hover:text-dwm-gold-light py-2 ${isActive('/health') ? 'text-dwm-gold-light' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Health Hub
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/marketplace" 
                    className={`block text-dwm-white hover:text-dwm-gold-light py-2 ${isActive('/marketplace') ? 'text-dwm-gold-light' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className={`block text-dwm-white hover:text-dwm-gold-light py-2 ${isActive('/contact') ? 'text-dwm-gold-light' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-dwm-gold/20">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="text-dwm-white/80 text-sm">
                      Signed in as {user?.email}
                    </div>
                    <Link 
                      to={user?.role === 'admin' ? '/admin-dashboard' : '/dashboard'}
                      className="block btn-login text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full btn-primary text-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link 
                      to="/login" 
                      className="block btn-login text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block btn-primary text-sm text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join Free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
