import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ProgressiveBlurBackdrop from "../ui/ProgressiveBlurBackdrop";
import MobileMenu from "./MobileMenu";
// import { navLinks } from '../../config/navigation'; // Optional if we want to map over links in desktop nav too

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      {/* 
        Independent fixed container for the blur effect. 
        Separated from the header to avoid mix-blend-mode conflicts and z-index isolation.
      */}
      <div 
        className="header-blur-backdrop" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 'var(--header-height)',
          zIndex: 90, // Below header (100)
          pointerEvents: 'none'
        }}
      >
        <ProgressiveBlurBackdrop />
      </div>

      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <Link to="/" className="logo-link">pagenineteen.ai</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
             {/* Using hardcoded for now or import. Let's use the explicit links to match the previous structure for safety unless user wants refactor. 
                 User asked for "elegant", let's keep it simple first. 
                 Actually, let's just leave the links as they are in my previous tool call, which was manual.
                 Wait, I noticed I used hardcoded links in the previous `Header.jsx` update tool output.
                 I will stick to that to be safe. */ }
             <Link to="/" className="nav-link">HOME</Link>
             <Link to="/projects" className="nav-link">PROJECTS</Link>
             <Link to="/journal" className="nav-link">JOURNAL</Link>
             <Link to="/team" className="nav-link">TEAM</Link>
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
