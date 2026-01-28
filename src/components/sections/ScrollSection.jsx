import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ScrollSection.css';
import GeometricIllustration from '../illustrations/GeometricIllustration';

import { FRAMES } from '../../data/scrollData';

const ScrollTextBlock = ({ item, progress }) => {
  const [start, end] = item.range;
  const duration = end - start;
  
  // "Stick" logic: Define a central plateau
  // Item enters (20%), Holds (60%), Exits (20%)
  const holdStart = start + duration * 0.20;
  const holdEnd = end - duration * 0.20;

  const fadeDuration = 0.025; 
  
  // Parallax Delay: Proportional to duration
  const textDelay = duration * 0.15; 

  // Base Y values - Asymmetric
  // "Unfolds from center" -> "Folds to center HIGHER"
  const yStart = item.isIntro ? "10vh" : "5vh"; 
  const yEnd = item.isIntro ? "-20vh" : "-15vh"; // User asked for "higher" exit

  // --- TRANSFORMS ---

  // 1. Vertical Movement (Y): SYNCHRONIZED
  // Symmetric movement: Enters from +Y, Exits to -Y
  const yMove = useTransform(
    progress,
    [start, holdStart, holdEnd, end],
    [yStart, "0vh", "0vh", yEnd] 
  );

  // 2. Opacity: ASYMMETRIC
  // Exit Logic: Disappear LATER.
  // The exit phase is from holdEnd to end.
  // We want to keep it visible for most of the exit travel.
  const exitDuration = end - holdEnd;
  const fadeOutStart = holdEnd + exitDuration * 0.6; // Start fading out after 60% of exit travel

  const opacityTitle = useTransform(
    progress,
    [start, start + fadeDuration, fadeOutStart, end],
    [0, 1, 1, 0]
  );

  // Text: Fades in later, Fades out with Title
  const opacityText = useTransform(
    progress,
    [start + textDelay, start + fadeDuration + textDelay, fadeOutStart, end],
    [0, 1, 1, 0]
  );

  // Blur: Symmetric
  const filter = useTransform(
    progress,
    [start, holdStart, holdEnd, holdEnd + fadeDuration],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  );

  return (
    <div className={`scroll-text-block ${item.isIntro ? 'intro-block' : ''}`}>
      <motion.h3 style={{ opacity: opacityTitle, y: yMove, filter }}>
        {item.title}
      </motion.h3>
      
      <motion.p style={{ opacity: opacityText, y: yMove, filter }}>
        {item.text}
      </motion.p>
    </div>
  );
};

const ScrollSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // STEPPED ANIMATION LOGIC - Synchronized with FRAMES (6 Items -> 6 Visual States)
  const steppedProgress = useTransform(
    scrollYProgress,
    // Keyframes align with the center of each text block's visibility
    [
        0, 0.11,      // Intro (Singularity)
        0.28,         // Tech 1 (Cube)
        0.41,         // Tech 2 (Snail)
        0.54,         // Tech 3 (Nucleus)
        0.67,         // Tech 4 (Frames)
        0.80,         // Tech 5 (Ring)
        0.95, 1       // End
    ],
    // Output Values for GeometricIllustration (0, 0.16, 0.32, 0.48, 0.64, 0.80)
    [
        0, 0,         // Intro = Singularity (0)
        0.16,         // Tech 1 = Cube
        0.32,         // Tech 2 = Snail
        0.48,         // Tech 3 = Nucleus
        0.64,         // Tech 4 = Frames
        0.80,         // Tech 5 = Ring
        1, 1          // Allow to collapse to Singularity (1)
    ] 
  );

  // Smooth the stepped jumps 
  const smoothProgress = useSpring(steppedProgress, {
    stiffness: 50,
    damping: 15, 
    mass: 1,
    restDelta: 0.001
  });

  // SMOOTH TEXT SCROLL
  // TUNED PHYSICS: "Buttery Control"
  // Stiffness 80 / Damping 25 (Softer)
  // Returning to softer physics to round off the sharp corners of the snap animation.
  const smoothTextProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="scroll-section-container">
      <div className="sticky-wrapper split-layout">
        
        <motion.div 
            className="scroll-dot-container"
            style={{ 
                opacity: useTransform(scrollYProgress, [0.95, 1], [1, 0]) 
            }}
        >
           <motion.div 
             className="dot scroll-dot"
             style={{
               top: useTransform(smoothTextProgress, [0, 1], ["20%", "80%"]) // Also smooth the dot
             }}
           />
        </motion.div>

        <div className="content-area scroll-content">
           {FRAMES.map((item, index) => (
             <ScrollTextBlock 
               key={index}
               item={item} 
               progress={smoothTextProgress} // Use smooth progress for text
             />
           ))}
        </div>

        <div className="visual-area scroll-visual">
           <GeometricIllustration scrollYProgress={smoothProgress} />
        </div>

      </div>
    </div>
  );
};

export default ScrollSection;

