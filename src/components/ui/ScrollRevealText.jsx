import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollRevealText = ({ children, className }) => {
  const containerRef = useRef(null);
  
  // Track scroll progress of the text container
  // Adjusted for slower typing: Ends when text is closer to top (0.25)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.25"] 
  });

  const words = children.split(" ");
  // Calculate total characters ignoring spaces (visual characters)
  const totalChars = words.reduce((acc, word) => acc + word.length, 0);
  
  let charCount = 0;

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline-block', flexWrap: 'wrap' }}>
      {words.map((word, wIndex) => {
        return (
          <span key={wIndex} style={{ display: 'inline-block', marginRight: '0.25em', whiteSpace: 'nowrap' }}>
            {word.split("").map((char, cIndex) => {
              // Accurate Global Index
              const globalIndex = charCount;
              charCount++; // Increment for next char

              const percent = globalIndex / totalChars; 
              
              // Each char appears at its specific percentage
              // We compress the distribution to [0, 0.8] so all animations have time to finish by 1.0
              // This fixes the "nd" issue where characters ran out of timeline to dim.
              const start = percent * 0.8;

              return (
                <Char 
                  key={cIndex} 
                  char={char} 
                  start={start} 
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

// Helper to interpolate between White and Grey based on available intensity (0 to 1)
const getTargetColor = (intensity) => {
  // 0 = White (#FFFFFF), 1 = Grey (#555555)
  // Simple linear interpolation for Grey channel
  const startVal = 255;
  const endVal = 85; // Decimal for 0x55
  
  const currentVal = Math.round(startVal - (startVal - endVal) * intensity);
  const hex = currentVal.toString(16).padStart(2, '0');
  return `#${hex}${hex}${hex}`;
};

const Char = ({ char, start, progress }) => {
  const opacity = useTransform(progress, [start, start + 0.001], [0, 1]);
  
  const holdTime = 0.1; 
  const restoreStart = 0.9; // Push restore slightly later to keep text dimmed longer
  const fadeStart = start + holdTime;
  const timeToFade = restoreStart - fadeStart;
  
  let inputs, outputs;

  if (timeToFade <= 0) {
      // Not enough time to fade before restoration hits.
      // Behavior: Just stay white.
      inputs = [start, 1];
      outputs = ["#FFFFFF", "#FFFFFF"];
  } else {
      // Calculate how "deep" the grey should be.
      // If we have > 0.15s, go full grey.
      // If we have 0.01s, hardly fade at all to prevent blinking.
      const rampUp = 0.15;
      const intensity = Math.min(timeToFade / rampUp, 1);
      
      const midColor = getTargetColor(intensity);

      inputs = [start, fadeStart, restoreStart, 1];
      outputs = ["#FFFFFF", "#FFFFFF", midColor, "#FFFFFF"];
  }
  
  const color = useTransform(progress, inputs, outputs);

  return (
    <motion.span style={{ opacity, color, display: 'inline-block' }}>
      {char}
    </motion.span>
  );
};

export default ScrollRevealText;
