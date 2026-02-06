import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="system-404-container">
      {/* Background Graphic: Thin Rotating Circle */}
      <div className="graphic-layer">
        <motion.div 
          className="circle-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {/* Solid Accent Dot */}
        <div className="accent-dot" />
      </div>

      <div className="content-layer">
        <h1 className="status-code">404</h1>
        <div className="divider" />
        <p className="status-message">System failure. Coordinates not found.</p>
        
        <Link to="/" className="back-link">
          <span className="link-text">Return to Index</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
