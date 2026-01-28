import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ScrollSection.css';
import GeometricIllustration from '../illustrations/GeometricIllustration';

const FRAMES = [
  {
    range: [0.02, 0.20], // Extended duration (previously 0.14)
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

  // Opacity: Fade in, Hold through the sticky phase, Fade out


  // Y Moves: 4-point interpolation
  // [Start, HoldStart, HoldEnd, End]
  
  // Base values 
  const yStart = item.isIntro ? "20vh" : "30vh"; 
  const yEnd = item.isIntro ? "-60vh" : "-30vh"; 

  // Title: Stops in middle
  const yTitle = useTransform(
    progress,
    [start, holdStart, holdEnd, end],
    [yStart, "0vh", "0vh", yEnd] 
  );

  // Text: 
  // 1. Enter: Parallax (enters later/slower)
  // 2. Hold: Sync (no drift, rock solid)
  // 3. Exit: Sync (moves EXACTLY with title to prevent "glitchy" separation)
  const yText = useTransform(
    progress,
    [start, holdStart, holdEnd, end],
    [
      `calc(${yStart} + 3vh)`, // Enter: Parallax
      "0vh",                   // Hold: Locked
      "0vh",                   // Hold: Locked
      yEnd                     // Exit: Locked with Title
    ]
  );

  // Opacity: Fade out EARLY, before the "fly away" acceleration becomes jarring
  // We fade out at 'holdEnd' essentially
  const opacity = useTransform(
    progress,
    [start, start + fadeDuration, holdEnd, end],
    [0, 1, 1, 0]
  );

  // Blur: Clean during the entire hold phase
  const filter = useTransform(
    progress,
    [start, holdStart, holdEnd, end],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  );

  return (
    <div className={`scroll-text-block ${item.isIntro ? 'intro-block' : ''}`}>
      <motion.h3 style={{ opacity, y: yTitle, filter }}>
        {item.title}
      </motion.h3>
      <motion.p style={{ opacity, y: yText, filter }}>
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

