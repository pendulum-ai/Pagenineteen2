import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollSection.css';
import GeometricIllustration from './GeometricIllustration';

const ScrollTextBlock = ({ text, index, total, progress }) => {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;

  // Opacity: Fade in quickly, stay visible longer, fade out near the top
  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.2, end],
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
           <GeometricIllustration scrollYProgress={scrollYProgress} />
        </div>

      </div>
    </div>
  );
};



export default ScrollSection;
