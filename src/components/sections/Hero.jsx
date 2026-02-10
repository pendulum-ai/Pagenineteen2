import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';
import BlurReveal from '../ui/BlurReveal';

const Hero = () => {
  const { scrollY } = useScroll();

  // "Advanced" Parallax Configuration
  // Both move UP (negative Y) to "fly away" as requested.
  // Title moves slower.
  const yTitle = useTransform(scrollY, [0, 1000], [0, -300]);
  
  // Description moves faster.
  const yDesc = useTransform(scrollY, [0, 1000], [0, -500]);
  
  return (
    <section className="hero split-layout">
      {/* Background Interactive Field Removed as requested */}

      <div className="hero-left">
        <BlurReveal>
          <motion.h1 
            style={{ y: yTitle }}
            className="hero-title"
          >
            An applied <br /> multimodal <br /> AI lab
          </motion.h1>
        </BlurReveal>
        <div className="hero-footer">
          <BlurReveal delay={0}>
            London / New York
          </BlurReveal>
        </div>
      </div>

      <div className="hero-right">
        <BlurReveal delay={0.2}>
          <motion.p 
            style={{ y: yDesc }}
            className="hero-description"
          >
            Building at the intersection of language, <br className="desktop-br" /> vision, and sound.
          </motion.p>
        </BlurReveal>
      </div>
    </section>
  );
};

export default Hero;
