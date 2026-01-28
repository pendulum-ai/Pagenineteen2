import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ScrollSection.css';
import GeometricIllustration from '../illustrations/GeometricIllustration';

const FRAMES = [
  {
    range: [0.02, 0.20],
    title: "What we build.",
    text: "We don't just train models; we focus on the integration work required to make them true in production.",
    isIntro: true
  },
  {
    range: [0.23, 0.33],
    title: "Multimodal Orchestration",
    text: "Designing shared architectures that bridge vision, language, and speech models seamlessly. We don't just glue APIs together; we build unified inference pipelines."
  },
  {
    range: [0.36, 0.46],
    title: "Fine-tuning Pipelines",
    text: "Building automated workflows for LoRA adaptation and continuous model improvement. From dataset curation to validation, entirely in code."
  },
  {
    range: [0.49, 0.59],
    title: "Real-time Systems",
    text: "Pushing the boundaries of latency with streaming inference and instant voice interfaces. Because truly interactive AI must feel instantaneous."
  },
  {
    range: [0.62, 0.72],
    title: "Agentic Workflows",
    text: "Creating systems that evaluate themselves, with feedback loops embedded directly in production. Agents that critique, refine, and improve their own outputs."
  },
  {
    range: [0.75, 0.85],
    title: "(Pro)sumer Interfaces",
    text: "Crafting tools that don't just work, but feel intuitive and empowering to creative professionals. The interface is the model."
  }
];

const ScrollTextBlock = ({ item, progress }) => {
  const [start, end] = item.range;
  const duration = end - start;
  
  // "Stick" logic: Define a central plateau
  // Item enters (35%), Holds (30%), Exits (35%)
  const holdStart = start + duration * 0.35;
  const holdEnd = end - duration * 0.35;

  const fadeDuration = 0.025; 
  
  // Parallax Delay: Proportional to duration
  const textDelay = duration * 0.15; 

  // Base Y values - Symmetric and Tight
  // "Unfolds from center" -> "Folds to center"
  const yStart = item.isIntro ? "10vh" : "5vh"; 
  const yEnd = item.isIntro ? "-10vh" : "-5vh"; 

  // --- TRANSFORMS ---

  // 1. Vertical Movement (Y): SYNCHRONIZED
  // Symmetric movement: Enters from +Y, Exits to -Y
  const yMove = useTransform(
    progress,
    [start, holdStart, holdEnd, end],
    [yStart, "0vh", "0vh", yEnd] 
  );

  // 2. Opacity: STAGGERED & SYMMETRIC
  // Title: Fades in Fast, Fades out Fast (at the end of the holding phase)
  // To "Close" properly, it should probably fade out as it starts to move away, mirroring the entry.
  const opacityTitle = useTransform(
    progress,
    [start, start + fadeDuration, holdEnd, holdEnd + fadeDuration],
    [0, 1, 1, 0]
  );

  // Text: Fades in later, Fades out with Title (or slightly later? No, strict sync on close usually looks cleaner)
  // User asked for "close like start". Start has delay. Exit with delay might look "trailing".
  // Let's keep strict sync on exit for a clean "disappear".
  const opacityText = useTransform(
    progress,
    [start + textDelay, start + fadeDuration + textDelay, holdEnd, holdEnd + fadeDuration],
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
        0.80, 0.80    // Hold Ring until end
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
  // Stiffness 120 / Damping 30
  // Returning to softer physics to round off the sharp corners of the snap animation.
  const smoothTextProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="scroll-section-container">
      <div className="sticky-wrapper split-layout">
        
        <motion.div 
            className="scroll-dot-container"
            style={{ 
                opacity: useTransform(scrollYProgress, [0.85, 0.95], [1, 0]) 
            }}
        >
           <motion.div 
             className="dot scroll-dot"
             style={{
               top: useTransform(smoothTextProgress, [0, 1], ["20%", "80%"]) // Also smooth the dot
             }}
           />
        </motion.div>

        <div className="content-area hero-left">
           {FRAMES.map((item, index) => (
             <ScrollTextBlock 
               key={index}
               item={item} 
               progress={smoothTextProgress} // Use smooth progress for text
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

