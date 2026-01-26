import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ScrollSection.css';
import GeometricIllustration from './GeometricIllustration';

const ScrollTextBlock = ({ text, index, total, progress }) => {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;

  // Opacity: Fade in quickly, stay visible longer, fade out near the end
  // Fixed range logic: start -> start+0.1 (fade in), end-0.1 -> end (fade out)
  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0]
  );

  // Y position: Move from slightly below center to way up top
  const y = useTransform(
    progress,
    [start, end],
    ["10vh", "-60vh"]
  );

  // Blur: Only blur during entrance/exit
  const filter = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  );

  return (
    <motion.div 
      className="scroll-text-block"
      style={{ opacity, y, filter }}
    >
      <p>{text}</p>
    </motion.div>
  );
};

const ScrollSection = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Data for the blocks
  const blocks = [
    "We're a small, London based team building multimodal AI products in production.",
    "We're principally interested in how AI changes the way we learn and the way we create. We build products to find out.",
    "Our belief is that multimodal AI becomes valuable when models, tooling, and evaluation are designed as one system.",
    "We focus on the integration work that makes this true in production."
  ];

  // STEPPED ANIMATION LOGIC
  // Instead of linear mapping, we "snap" to specific target values based on scroll sections.
  // Ranges roughly correspond to where the text blocks are active.
  const steppedProgress = useTransform(
    scrollYProgress,
    // Input ranges (approximate "active" zones for each of the 4 blocks)
    // Shifted EARLIER to synchronize with text appearance (0-0.1 opacity ramp)
    // 0-0.05: Intro -> State 1 (Rapid start)
    // 0.28-0.32: Block 1 -> State 2
    // 0.53-0.57: Block 2 -> State 3
    // 0.78-0.82: Block 3 -> State 4
    [0, 0.01, 0.05, 0.28, 0.32, 0.53, 0.57, 0.78, 0.82, 1],
    // Output targets
    [0, 0, 0.15, 0.15, 0.38, 0.38, 0.62, 0.62, 0.85, 0.85] 
  );

  // Smooth the stepped jumps with spring physics to create the "S-curve" / "gliding" effect
  const smoothProgress = useSpring(steppedProgress, {
    stiffness: 50, // Controls speed of the snap (higher = faster)
    damping: 15,   // Controls "bounciness" (lower = bouncier, higher = syrupy)
    mass: 1,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="scroll-section-container">
      <div className="sticky-wrapper split-layout">
        
        <div className="split-line">
           <motion.div 
             className="dot scroll-dot"
             style={{
               top: useTransform(scrollYProgress, [0, 1], ["20%", "80%"])
             }}
           />
        </div>

        <div className="content-area hero-left">
           {blocks.map((text, index) => (
             <ScrollTextBlock 
               key={index}
               text={text}
               index={index}
               total={blocks.length}
               progress={scrollYProgress}
             />
           ))}
        </div>

        <div className="visual-area hero-right">
           <GeometricIllustration scrollYProgress={smoothProgress} />
        </div>

      </div>
    </div>
  );
};

export default ScrollSection;
