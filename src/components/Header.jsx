import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">Pagenineteen.ai</div>
        <nav className="nav">
          <a href="#home" className="nav-link">
            HOME
          </a>
          <a href="#projects" className="nav-link">
            PROJECTS
          </a>
          <a href="#journal" className="nav-link">
            JOURNAL
          </a>
          <a href="#team" className="nav-link">
            TEAM
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
