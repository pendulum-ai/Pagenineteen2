import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ProgressiveBlurBackdrop from "../ui/ProgressiveBlurBackdrop";

const Header = () => {
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
          <nav className="nav">
            <Link to="/" className="nav-link">
              HOME
            </Link>
            <Link to="/projects" className="nav-link">
              PROJECTS
            </Link>
            <Link to="/journal" className="nav-link">
              JOURNAL
            </Link>
            <Link to="/team" className="nav-link">
              TEAM
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
