import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollRevealTextLightBg = ({ children, className }) => {
  const containerRef = useRef(null);
  
  // Track scroll progress of the text container
  // Animation starts when element enters viewport, ends when element is about to leave
  // Using "end" ensures animation can complete even on small screens
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.3"] // Start when entering, end when bottom of text reaches 30% from top
  });

  // Split by double newlines for paragraphs, then by spaces for words
  const paragraphs = children.split(/\n\n/);
  // Calculate total characters ignoring spaces (visual characters)
  const allWords = children.replace(/\n/g, ' ').split(/\s+/).filter(w => w);
  const totalChars = allWords.reduce((acc, word) => acc + word.length, 0);
  
  let charCount = 0;

  return (
    <span ref={containerRef} className={className} style={{ display: 'block', width: '100%' }}>
      {paragraphs.map((para, pIndex) => {
        const words = para.split(/\s+/).filter(w => w);
        return (
          <React.Fragment key={pIndex}>
            {pIndex > 0 && <><br /><br /></>}
            {words.map((word, wIndex) => {
              return (
                <span key={wIndex} style={{ display: 'inline', marginRight: '0.25em' }}>
                  {word.split("").map((char, cIndex) => {
                    // Accurate Global Index
                    const globalIndex = charCount;
                    charCount++; // Increment for next char

                    const percent = globalIndex / totalChars; 
                    
                    // Each char appears at its specific percentage
                    // We compress the distribution to [0, 0.8] so all animations have time to finish by 1.0
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
          </React.Fragment>
        );
      })}
    </span>
  );
};

// Helper to interpolate between Black and Grey based on available intensity (0 to 1)
const getTargetColor = (intensity) => {
  // 0 = Black (#1a1a1a - 26), 1 = Light Grey (#999999 - 153)
  // Simple linear interpolation
  const startVal = 26;
  const endVal = 153; 
  
  const currentVal = Math.round(startVal + (endVal - startVal) * intensity);
  const hex = currentVal.toString(16).padStart(2, '0');
  return `#${hex}${hex}${hex}`;
};

const Char = ({ char, start, progress }) => {
  const opacity = useTransform(progress, [start, start + 0.001], [0, 1]);
  
  const holdTime = 0.05; // Shorter hold before starting to fade
  const restoreStart = 0.7; // Start restoring to black earlier (was 0.9)
  const fadeStart = start + holdTime;
  const timeToFade = restoreStart - fadeStart;
  
  let inputs, outputs;

  // Dark Text Color Logic
  const primaryColor = "#1a1a1a";
  
  if (timeToFade <= 0) {
      // Not enough time to fade before restoration hits.
      inputs = [start, 1];
      outputs = [primaryColor, primaryColor];
  } else {
      // Calculate how "light" the grey should be.
      const rampUp = 0.15;
      const intensity = Math.min(timeToFade / rampUp, 1);
      
      const midColor = getTargetColor(intensity);

      inputs = [start, fadeStart, restoreStart, 1];
      outputs = [primaryColor, primaryColor, midColor, primaryColor];
  }
  
  const color = useTransform(progress, inputs, outputs);

  return (
    <motion.span style={{ opacity, color, display: 'inline-block' }}>
      {char}
    </motion.span>
  );
};

export default ScrollRevealTextLightBg;
