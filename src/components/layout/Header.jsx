import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import ProgressiveBlurBackdrop from "../ui/ProgressiveBlurBackdrop";
import MobileMenu from "./MobileMenu";
import LogoIcon from "../ui/LogoIcon";
import { navLinks } from '../../config/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <>


      {/* 
        Progressive Fade Blur.
        Starts effectively below the status bar (visually) or blends with it.
        We extend it to top: 0 still for desktop/other devices, but the status bar layer sits on top.
      */}
      <div 
        className="header-blur-backdrop" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 'var(--header-height)', // Revert to standard height, status bar layer handles the extra top bit if needed, or we can keep it extended. let's stick to standard to avoid double-darkening.
          zIndex: 90, // Below status bar layer
          pointerEvents: 'none'
        }}
      >
        <ProgressiveBlurBackdrop />
      </div>

      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <Link to="/" className="logo-link"><LogoIcon />pagenineteen.ai</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
