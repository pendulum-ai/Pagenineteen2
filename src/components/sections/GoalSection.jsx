import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './GoalSection.css';
import ScrollRevealText from '../ui/ScrollRevealText';
import HorizontalCircles from '../illustrations/HorizontalCircles';

const GoalSection = ({ id }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax for text: Moves slightly slower than scroll to feel "heavy"
  const yText = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={containerRef} id={id} className="goal-section" data-theme="dark">
      <div className="goal-content container">
        <motion.div style={{ y: yText }} className="goal-text-wrapper">
          <ScrollRevealText className="goal-title">
            Our principle goal is to ship reliable, repeatable systems across research, infrastructure, and product
          </ScrollRevealText>
        </motion.div>
      </div>

      <div className="goal-illustration-wrapper">
          <HorizontalCircles />
      </div>
    </section>
  );
};

export default GoalSection;
