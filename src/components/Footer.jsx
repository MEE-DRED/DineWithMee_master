import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';
import logo from '../assets/image/logo_white.png';
import { FiHome, FiHeart, FiShoppingCart, FiMail, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-white border-t-2 border-amber-500/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="Dine with Mee" className="h-12" />
            </Link>
            <p className="text-emerald-200/80 text-sm leading-relaxed">
              Clinically informed nutrition pathways and therapeutic meal discovery for a healthier
              you.
            </p>
            <div className="flex gap-3 pt-2">
              <SocialLink href="#" icon={<FaTwitter />} label="Twitter" />
              <SocialLink href="#" icon={<FaLinkedinIn />} label="LinkedIn" />
              <SocialLink href="#" icon={<FaFacebookF />} label="Facebook" />
              <SocialLink href="#" icon={<FaInstagram />} label="Instagram" />
            </div>
          </div>

          {/* Clinical Areas */}
          <FooterColumn title="Clinical Areas">
            <FooterLink to="/health#diabetes" icon={<FiHeart />} label="Diabetes Care" />
            <FooterLink to="/health#hypertension" icon={<FiHeart />} label="Hypertension Support" />
            <FooterLink
              to="/health#maternal-care-pathway"
              icon={<FiHeart />}
              label="Maternal Health"
            />
            <FooterLink to="/health#obesity" icon={<FiHeart />} label="Weight Management" />
          </FooterColumn>

          {/* Platform */}
          <FooterColumn title="Platform">
            <FooterLink to="/" icon={<FiHome />} label="Home" />
            <FooterLink to="/health" icon={<FiHeart />} label="Health Hub" />
            <FooterLink to="/marketplace" icon={<FiShoppingCart />} label="Marketplace" />
            <FooterLink to="/contact" icon={<FiMail />} label="Contact" />
          </FooterColumn>

          {/* Account */}
          <FooterColumn title="Account">
            <FooterLink to="/login" icon={<FiLogIn />} label="Log In" />
            <FooterLink to="/signup" icon={<FiUserPlus />} label="Join Free" />
            <FooterLink to="/signup" icon={<FiUserPlus />} label="Create Health Profile" />
            <FooterLink to="/marketplace" icon={<FiShoppingCart />} label="Start Ordering" />
          </FooterColumn>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-500/20 pt-6 mt-10 flex flex-col md:flex-row justify-between items-center text-sm text-emerald-300/70">
          <span>&copy; {new Date().getFullYear()} Dine with Mee. All rights reserved.</span>
          <span>
            Built by <span className="font-semibold text-amber-400">Mee Technologies Ltd.</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

// Helper components for cleaner structure
const FooterColumn = ({ title, children }) => (
  <div>
    <h5 className="font-serif text-xl font-semibold mb-5 text-white tracking-wider">{title}</h5>
    <ul className="space-y-3">{children}</ul>
  </div>
);

const FooterLink = ({ to, icon, label }) => (
  <li>
    <Link
      to={to}
      className="flex items-center gap-3 text-emerald-200/90 hover:text-amber-400 hover:translate-x-1 transition-all duration-300"
    >
      {React.cloneElement(icon, { className: 'w-4 h-4 text-white' })}
      <span className="text-sm">{label}</span>
    </Link>
  </li>
);

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    className="w-9 h-9 bg-emerald-800/70 hover:bg-amber-500/20 rounded-full flex items-center justify-center text-white hover:text-white transition-all duration-300 transform hover:scale-110"
  >
    {icon}
  </a>
);

export default Footer;
