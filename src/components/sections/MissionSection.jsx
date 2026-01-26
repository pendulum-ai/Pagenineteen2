import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './MissionSection.css';

const MissionSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animation Maps
  
  // Horizon Parallax:
  // Matches CSS padding-top of 75vh for right column.
  // Moves from 75vh up to 65vh to create "lift" effect.
  const horizonY = useTransform(scrollYProgress, [0, 1], ["75vh", "65vh"]); 

  // Dot zooms in
  const dotScale = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]); // Zoom in when comfortable in view
  
  // Rays fanning out
  const progressToFan = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  // "two rays are in the right upper chunk of the screen"
  const rays = [
    { id: 1, baseAngle: -5, targetRotation: -20 }, 
    { id: 2, baseAngle: -25, targetRotation: -50 }, 
  ];

  return (
    <section ref={containerRef} className="mission-section">
      <div className="mission-sticky-content">
        
        {/* LEFT COLUMN: Above the Horizon */}
        <div className="mission-left">
          <div className="mission-text-block text-align-fix">
            <motion.div
              initial={{ y: 50, opacity: 0 }} 
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <h2>
                We design, ship, and operate end-to-end<br />
                AI systems. From creative tooling to<br />
                large-scale asset intelligence.
              </h2>
              <p className="mission-secondary-text">
                We're principally interested in how AI<br />
                changes the way we learn and the way<br />
                we create. We build products to find out.
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN: Below the Horizon */}
        <div className="mission-right">
          <div className="mission-text-block">
            {/* Delays slightly after left text */}
            <motion.p
              className="mission-belief-text"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} // Faster, less delay
              viewport={{ once: false, amount: 0.2 }} // Trigger earlier
            >
              Our belief is that multimodal AI becomes valuable when models, tooling, and evaluation are designed as one system. We focus on the integration work that makes this true in production.
            </motion.p>
          </div>
        </div>

        {/* Parallax Horizon & Rays Wrapper */}
        {/* We animate the 'top' of this container using the horizonY transform */}
        <motion.div 
          className="mission-horizon-container"
          style={{ top: horizonY }}
        >
          <div className="horizontal-line-visual"></div>
          
          <div className="radial-center-local">
            <motion.div 
              className="radial-dot" 
              style={{ scale: dotScale }}
            />
            
            {/* Render Rays */}
            {rays.map((ray) => (
                <Ray 
                  key={ray.id} 
                  baseAngle={ray.baseAngle} 
                  targetRotation={ray.targetRotation} 
                  progress={progressToFan} 
                />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// Sub-component for individual ray to handle transform logic cleanly
const Ray = ({ baseAngle, targetRotation, progress }) => {
    // We interpolate between the baseAngle and the targetRotation based on scroll progress
    const rotation = useTransform(progress, [0, 1], [baseAngle, targetRotation]);
    
    return (
        <motion.div
            className="radial-ray"
            style={{ rotate: rotation }}
        />
    );
};

export default MissionSection;
