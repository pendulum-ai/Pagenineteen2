import React from 'react';
import { motion } from 'framer-motion';

const HorizontalCircles = () => {
  // Config
  const numCircles = 5;
  const radius = 60; // Base radius size

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <svg 
        viewBox="0 0 1000 300" 
        preserveAspectRatio="xMidYMid meet" 
        style={{ width: '100%', height: '100%' }}
      >
        {/* Horizontal Line */}
        <line 
          x1="0" y1="150" x2="1000" y2="150" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="1" 
        />

        {/* Circles */}
        {[...Array(numCircles)].map((_, i) => {
          // Calculate center positions
          // Spread them out centered:
          // Total width approx = numCircles * diameter - overlap?
          // Let's just place them manually or mathematically relative to center 500
          const spacing = 100; 
          const startX = 500 - ((numCircles - 1) * spacing) / 2;
          const cx = startX + i * spacing;

          return (
            <motion.circle
              key={i}
              cx={cx}
              cy="150"
              r={radius}
              fill="transparent"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 1 }}
            />
          );
        })}

        {/* Orange Dot Animation */}
        {/* Moves across the circles? Or follows the line? */}
        {/* Design shows dot in the last circle. Let's animate it traversing. */}
        <motion.circle
          r="6"
          fill="#FF5500" // Orange accent
          initial={{ cx: 300, cy: 150, opacity: 0 }}
          whileInView={{ 
            cx: 700, // Move from left to right across the group
            opacity: 1 
          }}
          transition={{ 
            duration: 4, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        
      </svg>
    </div>
  );
};

export default HorizontalCircles;
