import React from 'react';
import { motion } from 'framer-motion';

const BlurReveal = ({ children, delay = 0, duration = 0.8, className = "" }) => {
  return (
    <motion.div
      className={className}
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
      viewport={{ once: false, margin: "-10%" }}
      transition={{ 
        duration: 1.0, 
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1] // Smooth ease-out
      }}
    >
      {children}
    </motion.div>
  );
};

export default BlurReveal;
