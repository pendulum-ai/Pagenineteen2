import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ScrollSection.css';
import GeometricIllustration from '../illustrations/GeometricIllustration';

const ScrollTextBlock = ({ item, index, total, progress }) => {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;

  // Opacity: Fade in quickly (0.05), stay visible longer, fade out near the end
  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );

  // Y position: Move from slightly below center to slightly above
  // Reduced range for subtler "floating" effect rather than "flying"
  const y = useTransform(
    progress,
    [start, end],
    ["10vh", "-10vh"]
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
      <h3>{item.title}</h3>
      <p>{item.text}</p>
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

  // Updated Data with Title + Description (5 items)
  const blocks = [
    {
      title: "Multimodal Orchestration",
      text: "Designing shared architectures that bridge vision, language, and speech models seamlessly. We don't just glue APIs together; we build unified inference pipelines."
    },
    {
      title: "Fine-tuning Pipelines",
      text: "Building automated workflows for LoRA adaptation and continuous model improvement. From dataset curation to validation, entirely in code."
    },
    {
      title: "Real-time Systems",
      text: "Pushing the boundaries of latency with streaming inference and instant voice interfaces. Because truly interactive AI must feel instantaneous."
    },
    {
      title: "Agentic Workflows",
      text: "Creating systems that evaluate themselves, with feedback loops embedded directly in production. Agents that critique, refine, and improve their own outputs."
    },
    {
      title: "(Pro)sumer Interfaces",
      text: "Crafting tools that don't just work, but feel intuitive and empowering to creative professionals. The interface is the model."
    }
  ];

  // STEPPED ANIMATION LOGIC
  // New Ranges for 5 Items + Start + End
  // 0-0.05: Intro
  // 0.10-0.22: Item 1 (0.16 target)
  // 0.28-0.36: Item 2 (0.32 target)
  // 0.44-0.52: Item 3 (0.48 target)
  // 0.60-0.68: Item 4 (0.64 target)
  // 0.76-0.84: Item 5 (0.80 target)
  // 0.95-1.0: Outro
  const steppedProgress = useTransform(
    scrollYProgress,
    // Inputs
    [
        0, 0.01, 0.05, 
        0.10, 0.22, 
        0.28, 0.36, 
        0.44, 0.52, 
        0.60, 0.68, 
        0.76, 0.84, 
        1
    ],
    // Outputs (align with GeometricIllustration states)
    [
        0, 0, 0.16,   // Start -> State 1
        0.16, 0.32,   // State 1 -> State 2
        0.32, 0.48,   // State 2 -> State 3
        0.48, 0.64,   // State 3 -> State 4
        0.64, 0.80,   // State 4 -> State 5
        0.80, 0.80,   // State 5 Hold
        1             // End
    ] 
  );

  // Smooth the stepped jumps 
  const smoothProgress = useSpring(steppedProgress, {
    stiffness: 50,
    damping: 15, 
    mass: 1,
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
               top: useTransform(scrollYProgress, [0, 1], ["20%", "80%"])
             }}
           />
        </motion.div>

        <div className="content-area hero-left">
           {blocks.map((item, index) => (
             <ScrollTextBlock 
               key={index}
               item={item} // Pass full object
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
