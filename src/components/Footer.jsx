import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="logo-text text-2xl mb-4 block">Dine with <span className="text-dwm-gold-light">Mee</span></span>
          <p className="text-dwm-white/80 mb-6">
            Premium African health-tech platform delivering clinically informed nutrition pathways and therapeutic meal discovery.
          </p>
          <div className="social-links flex gap-4">
            <a 
              href="#" 
              aria-label="X (Twitter)"
              className="w-8 h-8 bg-dwm-gold/20 hover:bg-dwm-gold/40 rounded-full flex items-center justify-center text-dwm-white hover:text-dwm-gold-light transition-colors"
            >
              X
            </a>
            <a 
              href="#" 
              aria-label="LinkedIn"
              className="w-8 h-8 bg-dwm-gold/20 hover:bg-dwm-gold/40 rounded-full flex items-center justify-center text-dwm-white hover:text-dwm-gold-light transition-colors"
            >
              in
            </a>
            <a 
              href="#" 
              aria-label="Facebook"
              className="w-8 h-8 bg-dwm-gold/20 hover:bg-dwm-gold/40 rounded-full flex items-center justify-center text-dwm-white hover:text-dwm-gold-light transition-colors"
            >
              F
            </a>
            <a 
              href="#" 
              aria-label="Instagram"
              className="w-8 h-8 bg-dwm-gold/20 hover:bg-dwm-gold/40 rounded-full flex items-center justify-center text-dwm-white hover:text-dwm-gold-light transition-colors"
            >
              IG
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h5>Clinical Areas</h5>
          <ul>
            <li>
              <Link to="/health#diabetes">Diabetes Care</Link>
            </li>
            <li>
              <Link to="/health#hypertension">Hypertension Support</Link>
            </li>
            <li>
              <Link to="/health#maternal-care-pathway">Maternal Health</Link>
            </li>
            <li>
              <Link to="/health#obesity">Weight Management</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Platform</h5>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/health">Health Hub</Link>
            </li>
            <li>
              <Link to="/marketplace">Marketplace</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Account</h5>
          <ul>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/signup">Join Free</Link>
            </li>
            <li>
              <Link to="/signup">Create Health Profile</Link>
            </li>
            <li>
              <Link to="/marketplace">Start Ordering</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom border-t border-dwm-gold/20 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-dwm-white/60 text-sm">
        <span>&copy; 2026 Dine with Mee. All rights reserved.</span>
        <span>Built by <span className="text-dwm-gold-light">Mee Technologies Ltd.</span></span>
      </div>
    </footer>
  );
};

export default Footer;
