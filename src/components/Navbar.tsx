import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useReduxAuth } from '../hooks/useReduxAuth';
import { useReduxCart } from '../hooks/useReduxCart';
import logo from '../assets/image/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const { totalItems, toggleCartOpen } = useReduxCart();
  const { isAuthenticated, user, logout } = useReduxAuth();
  const location = useLocation();

  // Handle scroll for navbar backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserDropdown(false);
    };
    if (showUserDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserDropdown]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    setShowUserDropdown(false);
  };

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'nutritionist':
        return '/nutritionist/dashboard';
      case 'pharmacy':
        return '/pharmacy/dashboard';
      default:
        return '/customer/dashboard';
    }
  };

  const hasPrivilegedRole = () => {
    const privilegedRoles = ['admin', 'nutritionist', 'pharmacy'];
    const hasPrivilege = isAuthenticated && user?.role && privilegedRoles.includes(user.role);

    // Debug logging (can be removed in production)
    if (isAuthenticated) {
      console.log('[Navbar] Auth State:', {
        isAuthenticated,
        userRole: user?.role,
        userName: user?.name,
        hasPrivilege,
        privilegedRoles,
      });
    }

    return hasPrivilege;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-emerald-900/97 backdrop-blur-md shadow-lg'
            : 'bg-emerald-900/95 backdrop-blur-md'
        } border-b border-amber-500/20`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <img src={logo} alt="Dine with Mee" className="h-10" />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-2">
              <li>
                <Link
                  to="/"
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive('/')
                      ? 'text-amber-400 bg-emerald-800/40'
                      : 'text-white/90 hover:text-amber-400 hover:bg-emerald-800/40'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/health"
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive('/health')
                      ? 'text-amber-400 bg-emerald-800/40'
                      : 'text-white/90 hover:text-amber-400 hover:bg-emerald-800/40'
                  }`}
                >
                  Health Hub
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace"
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive('/marketplace')
                      ? 'text-amber-400 bg-emerald-800/40'
                      : 'text-white/90 hover:text-amber-400 hover:bg-emerald-800/40'
                  }`}
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive('/contact')
                      ? 'text-amber-400 bg-emerald-800/40'
                      : 'text-white/90 hover:text-amber-400 hover:bg-emerald-800/40'
                  }`}
                >
                  Contact
                </Link>
              </li>

              {/* Dashboard Link - Only for privileged roles */}
              {hasPrivilegedRole() && (
                <li>
                  <Link
                    to={getDashboardLink()}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive(getDashboardLink())
                        ? 'text-amber-400 bg-emerald-800/40'
                        : 'text-white/90 hover:text-amber-400 hover:bg-emerald-800/40'
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <button
                onClick={toggleCartOpen}
                className="relative bg-white/8 border border-white/15 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/15 transition-all duration-300"
                aria-label="Shopping cart"
              >
                <span className="hidden sm:inline">Cart</span>
                <span className="sm:hidden">🛒</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-emerald-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-3 relative">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setShowUserDropdown(!showUserDropdown);
                    }}
                    className="flex items-center gap-3 bg-emerald-800/60 border border-amber-500/30 hover:bg-emerald-700/60 hover:border-amber-500/50 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    {/* Enhanced Avatar with gradient and ring */}
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-500 to-amber-400 flex items-center justify-center text-sm font-bold text-emerald-900 ring-2 ring-amber-400/30">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>

                    {/* User Info (two lines) */}
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm font-medium text-white leading-tight">
                        {user?.name?.split(' ')[0] || 'Account'}
                      </span>
                      <span className="text-xs text-amber-400 capitalize leading-tight">
                        {user?.role || 'member'}
                      </span>
                    </div>

                    {/* Chevron */}
                    <svg
                      className={`w-4 h-4 transition-transform text-amber-400 ${showUserDropdown ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Enhanced User Dropdown */}
                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-emerald-800 border border-amber-500/20 rounded-xl shadow-2xl overflow-hidden"
                      >
                        {/* User Info Header */}
                        <div className="p-4 bg-emerald-900/40 border-b border-amber-500/10">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-amber-400 flex items-center justify-center text-base font-bold text-emerald-900 ring-2 ring-amber-400/30">
                              {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-semibold text-sm leading-tight">
                                {user?.name || 'User'}
                              </p>
                              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 capitalize mt-1">
                                {user?.role || 'member'}
                              </span>
                            </div>
                          </div>
                          <p className="text-white/60 text-xs truncate">{user?.email}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <Link
                            to={getDashboardLink()}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/90 hover:text-white hover:bg-emerald-700/60 transition-all group"
                          >
                            <svg
                              className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>
                            <span className="text-sm">Dashboard</span>
                          </Link>

                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/90 hover:text-white hover:bg-emerald-700/60 transition-all group"
                          >
                            <svg
                              className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <span className="text-sm">Profile Settings</span>
                          </Link>

                          <Link
                            to="/orders"
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/90 hover:text-white hover:bg-emerald-700/60 transition-all group"
                          >
                            <svg
                              className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                              />
                            </svg>
                            <span className="text-sm">My Orders</span>
                          </Link>
                        </div>

                        {/* Logout Section */}
                        <div className="p-2 border-t border-amber-500/10">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all group"
                          >
                            <svg
                              className="w-4 h-4 group-hover:scale-110 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            <span className="text-sm font-medium">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="group relative px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white border border-white/20 hover:border-amber-400/40 transition-all overflow-hidden"
                  >
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  <Link
                    to="/signup"
                    className="group relative px-5 py-2 rounded-lg text-sm font-semibold bg-linear-to-r from-amber-500 to-amber-400 text-emerald-900 hover:shadow-lg hover:shadow-amber-500/20 transition-all hover:scale-105"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      Join Free
                      <svg
                        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 max-w-full bg-emerald-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:text-amber-400 text-3xl leading-none mb-8 transition-colors"
                    aria-label="Close menu"
                  >
                    ×
                  </button>
                </div>

                {/* Navigation Links */}
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className={`block py-3 px-4 rounded-lg text-base font-medium transition-all ${
                        isActive('/')
                          ? 'text-amber-400 bg-emerald-800/40'
                          : 'text-white/90 hover:text-amber-400 hover:bg-emerald-800/40'
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/health"
                      className={`block py-3 px-4 rounded-lg text-base font-medium transition-all ${
                        isActive('/health')
                          ? 'text-amber-400 bg-emerald-800/40'
                          : 'text-white/90 hover:text-amber-400 hover:bg-emerald-800/40'
                      }`}
                    >
                      Health Hub
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/marketplace"
                      className={`block py-3 px-4 rounded-lg text-base font-medium transition-all ${
                        isActive('/marketplace')
                          ? 'text-amber-400 bg-emerald-800/40'
                          : 'text-white/90 hover:text-amber-400 hover:bg-emerald-800/40'
                      }`}
                    >
                      Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={`block py-3 px-4 rounded-lg text-base font-medium transition-all ${
                        isActive('/contact')
                          ? 'text-amber-400 bg-emerald-800/40'
                          : 'text-white/90 hover:text-amber-400 hover:bg-emerald-800/40'
                      }`}
                    >
                      Contact
                    </Link>
                  </li>

                  {/* Dashboard Link - Only for privileged roles */}
                  {hasPrivilegedRole() && (
                    <li>
                      <Link
                        to={getDashboardLink()}
                        className={`block py-3 px-4 rounded-lg text-base font-medium transition-all ${
                          isActive(getDashboardLink())
                            ? 'text-amber-400 bg-emerald-800/40'
                            : 'text-white/90 hover:text-amber-400 hover:bg-emerald-800/40'
                        }`}
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                </ul>

                {/* Auth Section */}
                <div className="mt-8 pt-8 border-t border-amber-500/20">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      {/* Enhanced User Card */}
                      <div className="p-4 bg-emerald-800/60 rounded-xl border border-amber-500/20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-500 to-amber-400 flex items-center justify-center text-lg font-bold text-emerald-900 ring-2 ring-amber-400/30">
                            {user?.name?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-white text-base">{user?.name}</p>
                            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 capitalize">
                              {user?.role || 'member'}
                            </span>
                          </div>
                        </div>
                        <p className="text-white/60 text-xs">{user?.email}</p>
                      </div>

                      {/* Action Buttons */}
                      <Link
                        to={getDashboardLink()}
                        className="block w-full text-center bg-emerald-800/60 border border-amber-500/30 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700/60 hover:border-amber-500/50 transition-all"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block w-full text-center bg-transparent border border-white/30 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
                      >
                        Profile Settings
                      </Link>
                      <Link
                        to="/orders"
                        className="block w-full text-center bg-transparent border border-white/30 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-all"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/login"
                        className="block w-full text-center bg-transparent border border-white/30 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/signup"
                        className="block w-full text-center bg-linear-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-emerald-900 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md"
                      >
                        Join Free
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
