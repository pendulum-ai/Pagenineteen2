import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ProgressiveBlurBackdrop from "../ui/ProgressiveBlurBackdrop";

const Header = () => {
  return (
    <header className="header">
      <ProgressiveBlurBackdrop />

      <div className="container header-content">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>pagenineteen.ai</Link>
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
  );
};

export default Header;
