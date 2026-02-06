import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './CrossHair.css';

const CrossHair = ({ verticalLineOpacity, verticalLineScaleY }) => {
  // Track scroll on the whole page to drive the animation over Hero + Mission
  const { scrollY } = useScroll();

  // 1. Rotation Logic (Refined)
  // Rays start vertical (-90deg) and "open up" clockwise into the top-right quadrant.
  // Parallax: They rotate at different speeds/to different end angles.
  
  // Ray 1 (Upper-Right): Starts at -70deg (Top-Right) and rotates to 0deg (Right Horizontal)
  const rotateRay1Raw = useTransform(scrollY, [0, 2000], [-70, 0]);
  const rotateRay1 = useSpring(rotateRay1Raw, { stiffness: 60, damping: 30 }); 

  // Ray 2 (Lower-Right): Starts at -35deg and rotates to 0deg
  // Both converge to the right.
  const rotateRay2Raw = useTransform(scrollY, [0, 2000], [-35, 0]);
  const rotateRay2 = useSpring(rotateRay2Raw, { stiffness: 60, damping: 30 });

  // 1b. Center Circle Scale
  // Expands as we scroll down. Continuous. 
  // Animate WIDTH/HEIGHT directly (not scale) to keep border 1px.
  const circleSizeRaw = useTransform(scrollY, [0, 1500, 4000], [32, 80, 128]);
  const circleSize = useSpring(circleSizeRaw, { stiffness: 50, damping: 20 });

  // 1c. Horizontal Dot Movement
  // moves left (negative x) as we scroll. Continuous.
  const dotXRaw = useTransform(scrollY, [0, 1500, 4000], [0, -100, -250]); 
  const dotX = useSpring(dotXRaw, { stiffness: 50, damping: 20 });

  // 1d. Ray Growth (Growing from center)
  // Ray 1: Slow growth (over 4000px)
  const rayLength1Raw = useTransform(scrollY, [0, 4000], ["0vmax", "150vmax"]);
  const rayLength1 = useSpring(rayLength1Raw, { stiffness: 60, damping: 30 });

  // Ray 2: Fast growth (over 2000px) - "Overtakes" or grows differently
  const rayLength2Raw = useTransform(scrollY, [0, 2000], ["0vmax", "150vmax"]);
  const rayLength2 = useSpring(rayLength2Raw, { stiffness: 60, damping: 30 });

  // 2b. Parallax Vertical Lift (Background movement of the whole group)
  // Restored: Move UP slowly as we scroll.
  const yParallax = useTransform(scrollY, [0, 3000], [0, -250]); 

  // 3. Opacity Logic
  // Fade out earlier to avoid overlap with Section 3 (Geometric).
  // Reverted range to 1600-2200px.
  const opacity = useTransform(scrollY, [1600, 2200], [1, 0]);

  // Ray Opacity: Fade in immediately
  // We want to see them growing from 0, so we fade in right away.
  // At scroll=100, length is only ~3vmax (small), so it looks like it's coming from center.
  const rayOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  // Entrance Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.5 }
    }
  };

  return (
    <motion.div 
      className="crosshair-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 
        Vertical Line (Static relative to screen) 
        Now synced with horizontal lines using the same opacity logic.
        ScaleY collapses to center for dramatic exit.
      */}
      <motion.div 
        style={{ 
          opacity: verticalLineOpacity || 1,
          scaleY: verticalLineScaleY || 1,
          transformOrigin: 'center center'
        }} 
        className="cross-vertical-line"
      ></motion.div>

      <motion.div style={{ opacity, width: '100%', height: '100%' }} className="crosshair-scroll-wrapper">

      {/* 
        Horizontal Line Group 
        Moves with Parallax (yParallax)
      */}
      <motion.div style={{ y: yParallax }} className="crosshair-horizontal-group">
        
        {/* Horizontal Line (Restored) */}
        <div className="cross-horizontal-line">
            {/* Decoration Dot on the line */}
             <motion.div style={{ x: dotX, left: '20%' }} className="line-dot"></motion.div>
        </div>
        
        {/*
          Intersection Point Group
          Centred horizontally (handled by CSS .crosshair-center)
          Moves vertically WITH the horizontal line
        */}
        <div className="crosshair-center">
          
          {/* Central Orange Dot */}
          <div className="center-dot"></div>
          
          {/* Decorative Outer Circle */}
          <motion.div style={{ width: circleSize, height: circleSize }} className="center-circle"></motion.div>

          {/* 
             Rotating Rays Container 
             Anchored to this center point
             NOTE: Container no longer rotates. Rays rotate individually.
          */}
          <div className="rays-container">
            {/* Ray 1: Slow & Wide */}
            <motion.div style={{ rotate: rotateRay1, opacity: rayOpacity, width: rayLength1 }} className="ray ray-1">
               {/* Dot on the ray */}
               <div className="ray-dot"></div>
            </motion.div>
            
            {/* Ray 2: Fast & Narrow */}
            <motion.div style={{ rotate: rotateRay2, opacity: rayOpacity, width: rayLength2 }} className="ray ray-2"></motion.div>
          </div>

        </div>
      </motion.div>

      {/* Vertical Line is static/global, but we can include it here if we want to replace the global one.
          For now, let's assume we rely on the global split-line or overlay it.
          If we want the intersection to track perfectly, we need to know where the vertical line is.
          Global CSS puts .split-line at left: 50%. Our .crosshair-center is also centered.
      */}
      
      </motion.div>
    </motion.div>
  );
};

export default CrossHair;
