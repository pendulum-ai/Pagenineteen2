import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollRevealText = ({ children, className }) => {
  const containerRef = useRef(null);
  
  // Track scroll progress of the text container itself relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.5"] // Start revealing when top hits 90% view, finish when bottom hits 50%
  });

  const words = children.split(" ");

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline-block', flexWrap: 'wrap' }}>
      {words.map((word, wIndex) => {
        return (
          <span key={wIndex} style={{ display: 'inline-block', marginRight: '0.25em', whiteSpace: 'nowrap' }}>
            {word.split("").map((char, cIndex) => {
              // Calculate a unique "trigger point" for this character
              // We distribute them across the scroll range [0, 1]
              // Flat index helps normalize the progress logic
              const totalChars = children.length; 
              // Simple approximation of index in the whole string
              // (Not perfect but good enough for visual stagger)
              // We need a stable identifier. 
              // Let's just use local mapping for now.
              
              const globalIndex = wIndex * 5 + cIndex; // Rough estimate
              const percent = globalIndex / totalChars; 
              
              // Each char animates over a small slice of the scroll: e.g. [0.1, 0.2]
              // Start = percent * 0.8 (save 20% for buffer)
              // End = Start + 0.15
              const start = percent;
              const end = start + 0.2;

              return (
                <Char 
                  key={cIndex} 
                  char={char} 
                  range={[start, end]} 
                  progress={scrollYProgress} 
                />
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

const Char = ({ char, range, progress }) => {
  const opacity = useTransform(progress, [range[0] - 0.1, range[0], range[1]], [0.1, 0.1, 1]);
  const blur = useTransform(progress, [range[0], range[1]], ["10px", "0px"]);
  const y = useTransform(progress, [range[0], range[1]], ["10%", "0%"]);
  
  // Color shift from Dark Grey to White
  const color = useTransform(progress, [range[0], range[1]], ["#444", "#FFF"]);

  return (
    <motion.span style={{ opacity, filter: blur, y, color, display: 'inline-block' }}>
      {char}
    </motion.span>
  );
};

export default ScrollRevealText;
