import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const { scrollY } = useScroll();

  // "Advanced" Parallax Configuration
  // Title moves slower than scroll (pushes down as you scroll), creating "depth" / background feel
  const yTitle = useTransform(scrollY, [0, 1000], [0, 250]);
  
  // Description moves faster than scroll (pulls up), creating "foreground" feel
  const yDesc = useTransform(scrollY, [0, 1000], [0, -150]);
  
  return (
    <section className="hero split-layout">
      {/* Background Interactive Field Removed as requested */}

      <div className="hero-left">
        <motion.h1 
          style={{ y: yTitle }}
          className="hero-title"
        >
          An applied<br />
          multimodal AI lab
        </motion.h1>
        <div className="hero-footer">
          ONLINE - LONDON - SAN FRANCISCO
        </div>
      </div>

      <div className="hero-right">
        <motion.p 
          style={{ y: yDesc }}
          className="hero-description"
        >
          We design, ship, and operate end-to-end<br />
          AI systems. From creative tooling to<br />
          large-scale asset intelligence.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
