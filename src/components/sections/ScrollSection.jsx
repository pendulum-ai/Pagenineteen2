import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ScrollSection.css';
import GeometricIllustration from '../illustrations/GeometricIllustration';
import { FRAMES } from '../../data/scrollData';

const ScrollTextBlock = ({ item }) => {
  return (
    <div className={`scroll-text-block ${item.isIntro ? 'intro-block' : ''}`}>
      <motion.h3 
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ amount: 0.5, margin: "-10% 0px -10% 0px", once: false }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {item.title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ amount: 0.5, margin: "-10% 0px -10% 0px", once: false }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
      >
        {item.text}
      </motion.p>
    </div>
  );
};

const ScrollSection = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Track scroll of the entire container to drive the illustration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the raw scroll progress for the animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    mass: 1,
    restDelta: 0.001
  });

  // Calculate stepped frames for the illustration based on scroll progress
  // Since we have N frames spread over the height, we can map 0-1 to the frames.
  const animatedProgress = useTransform(
    smoothProgress,
    // Input: Evenly spaced intervals for each text block
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    // Output: Matches the states in GeometricIllustration
    // 0: Singularity
    // 0.16: Square
    // 0.32: Snail
    // 0.48: Nucleus
    // 0.64: Frames
    // 0.80: Ring/Isometric
    [0, 0.16, 0.32, 0.48, 0.64, 0.85] 
  );

  // Mobile Delay: Fade in visual AFTER the first text block (What we build)
  // First block ends around 0.2. So we fade in 0.15 -> 0.25.
  const mobileOpacityRaw = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const visualOpacity = isMobile ? mobileOpacityRaw : 1;

  return (
    <div ref={containerRef} className="scroll-section-container">
      <div className="sticky-wrapper">
        
        {/* Left Column: Text (Scrolls naturally) */}
        <div className="scroll-content">
           {FRAMES.map((item, index) => (
             <ScrollTextBlock key={index} item={item} />
           ))}
        </div>

        {/* Right Column: Visual (Sticky) */}
        <motion.div style={{ opacity: visualOpacity }} className="visual-area scroll-visual">
           <GeometricIllustration scrollYProgress={animatedProgress} />
        </motion.div>
        
        {/* Decorative Line (Desktop only) */}
        <div className="scroll-dot-container" />

      </div>
    </div>
  );
};

export default ScrollSection;

