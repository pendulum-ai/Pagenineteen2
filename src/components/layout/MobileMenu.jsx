import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, socialLinks } from '../../config/navigation';
import LogoIcon from '../ui/LogoIcon';
import './MobileMenu.css';

const menuVariants = {
  initial: {
    y: '-100%',
    opacity: 0,
  },
  animate: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for "app-like" fluidity
    }
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1], // easeInOutQuart - starts slow, speeds up, slows down
      delay: 0 // Immediate response
    }
  }
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  initial: {
    y: 50,
    opacity: 0,
    filter: 'blur(10px)'
  },
  animate: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  exit: {
    y: 0, // Don't move down, just fade
    opacity: 0,
    filter: 'blur(5px)', // Reduced blur cost
    transition: {
      duration: 0.3,
      ease: "linear"
    }
  }
};

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    // We do NOT restore overflow here in an 'else' block or cleanup
    // because we want it to stay hidden until the exit animation finishes.
    // The cleanup is only for safety if the component completely unmounts.
    return () => {
       // Optional: safe guard, but usually managed by onExitComplete
       if (!isOpen) document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Use React Portal to render outside of the parent hierarchy (at the body level)
  // ensuring no z-index conflicts and proper overlay behavior.
  return createPortal(
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = '';
      }}
    >
      {isOpen && (
        <motion.div
          key="mobile-menu-overlay"
          className="mobile-menu-overlay"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={menuVariants}
        >
          <div className="mobile-menu-container">
            <div className="mobile-menu-header">
              <div className="logo">
                <Link to="/" className="logo-link" onClick={onClose}><LogoIcon />pagenineteen.ai</Link>
              </div>
              <button 
                className="mobile-close-btn" 
                onClick={onClose}
                aria-label="Close menu"
              >
                <span className="mobile-close-line"></span>
                <span className="mobile-close-line"></span>
              </button>
            </div>

            <motion.nav 
              className="mobile-nav"
              variants={containerVariants}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  variants={itemVariants}
                  className="mobile-nav-item-wrapper"
                >
                  <Link 
                    to={link.path} 
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={onClose}
                  >
                   {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            
            <motion.div 
              className="mobile-menu-footer"
              variants={itemVariants}
            >
              <div className="menu-divider" />
              <div className="social-links">
                {socialLinks.map((link) => (
                    <span key={link.label} className="social-link-item">{link.label}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MobileMenu;
