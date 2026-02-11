import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';
import './CustomCursor.css';

// Module-level touch detection (evaluated once, stable reference)
const IS_TOUCH_DEVICE = typeof window !== 'undefined' && (
  'ontouchstart' in window || navigator.maxTouchPoints > 0
);

const CustomCursor = () => {

  const { cursorType, cursorText, setCursor } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const cursorTypeRef = useRef(cursorType);
  
  // Keep ref in sync with state for event listeners
  useEffect(() => {
    cursorTypeRef.current = cursorType;
  }, [cursorType]);
  
  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);


  // Removed spring physics for instant movement as requested
  const cursorX = mouseX;
  const cursorY = mouseY;

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => document.body.classList.add('cursor-clicked');
    const handleMouseUp = () => document.body.classList.remove('cursor-clicked');
    
    // Hide cursor when leaving window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
        // If we are in a specific mode like project-view, ignore general link hovers
        // unless the potential target is high priority? 
        if (cursorTypeRef.current === 'project-view') return;

        const target = e.target.closest('a, button, input[type="submit"], input[type="button"], .link, .clickable');
        if (target) {
            setCursor('hover');
        } else {
            // Only reset if we were in 'hover' state
            if (cursorTypeRef.current === 'hover') {
                setCursor('default');
            }
        }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]); // Dependencies for effect

  // Framer Motion variants for different cursor states
  const variants = {
    default: {
      width: 12,
      height: 12,
      borderRadius: 99,
      backgroundColor: "#ff5500",
      mixBlendMode: "normal"
    },
    hover: {
      width: 20,
      height: 20,
      borderRadius: 99,
      backgroundColor: "rgba(255, 85, 0, 0.4)",
      mixBlendMode: "normal"
    },
    'project-view': {
      width: 140,
      height: 48,
      borderRadius: 99,
      backgroundColor: "#ff5500",
      mixBlendMode: "normal",
    }
  };

  // Don't render on touch devices or when cursor is outside window
  if (IS_TOUCH_DEVICE || !isVisible) return null;

  return (
    <motion.div
      className={`custom-cursor ${cursorType}`}
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: "-50%",
        y: "-50%"
      }}
      variants={variants}
      animate={cursorType}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 28,
        mass: 0.8
      }} // Smooth spring-based morphing without jelly wobble
    >
      {cursorType === 'project-view' && (
        <span className="cursor-text">{cursorText || 'View'}</span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
