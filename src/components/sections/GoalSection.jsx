import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './GoalSection.css';
import ScrollRevealText from '../ui/ScrollRevealText';
import HorizontalCircles from '../illustrations/HorizontalCircles';
import useIsMobile from '../../hooks/useIsMobile';

const GoalSection = ({ id }) => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]  // Extended range: entire section visibility
  });

  // Parallax for text: Moves UP slower than scroll (feels "heavy")
  // Increased from ±10% to ±20% for more noticeable effect
  const yText = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  // Parallax for pattern: Moves opposite direction (UP faster)
  // Creates depth separation between text and background
  const yPattern = useTransform(scrollYProgress, [0, 1], ["-15%", "25%"]);

  return (
    <section ref={containerRef} id={id} className="goal-section" data-theme="dark">
      <div className="goal-content container">
        <motion.div style={{ y: yText }} className="goal-text-wrapper">
          <ScrollRevealText className="goal-title">
            The best technology starts with very old human needs. From model to interface, it disappears into the experience.
          </ScrollRevealText>
        </motion.div>
      </div>

      <motion.div style={{ y: yPattern }} className="goal-illustration-wrapper">
          <HorizontalCircles isMobile={isMobile} />
      </motion.div>
    </section>
  );
};

export default GoalSection;
