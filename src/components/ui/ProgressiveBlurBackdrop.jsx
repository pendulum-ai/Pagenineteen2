import React from 'react';
import './ProgressiveBlurBackdrop.css';

/**
 * ProgressiveBlurBackdrop
 * 
 * A design system component that creates a "progressive" blur effect.
 * Instead of a single hard-edged blur, it layers multiple backdrop-filters
 * to create a smooth, non-linear fade out of the blur.
 * 
 * Configured via CSS variables in tokens.css:
 * --blur-layer-1-height / --blur-layer-1-radius (Tail)
 * --blur-layer-2-height / --blur-layer-2-radius (Body)
 * --blur-layer-3-height / --blur-layer-3-radius (Core)
 */
const ProgressiveBlurBackdrop = () => {
  return (
    <div className="progressive-blur-container">
      <div className="progressive-blur-layer layer-1"></div>
      <div className="progressive-blur-layer layer-2"></div>
      <div className="progressive-blur-layer layer-3"></div>
    </div>
  );
};

export default ProgressiveBlurBackdrop;
