import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const BlurReveal = ({ children, delay = 0, duration = 0.8, className = "" }) => {
  const ref = useRef(null);
  
  const handleAnimationComplete = useCallback(() => {
    // Remove will-change after animation to free GPU memory
    if (ref.current) {
      ref.current.style.willChange = 'auto';
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ willChange: 'filter, opacity, transform' }}
      initial={{ 
        opacity: 0, 
        filter: "blur(10px)",
        y: 40 
      }}
      whileInView={{ 
        opacity: 1, 
        filter: "blur(0px)",
        y: 0 
      }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      {children}
    </motion.div>
  );
};

export default BlurReveal;

