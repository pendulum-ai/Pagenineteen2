import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/sections/Hero';
import MissionSection from '../components/sections/MissionSection';

import ScrollSection from '../components/sections/ScrollSection';
import GoalSection from '../components/sections/GoalSection';
import ThemeController from '../components/layout/ThemeController';

const Home = () => {
  const goalRef = useRef(null);

  // Logic to fade out the global split line as we approach the Goal Section
  const { scrollYProgress: lineFader } = useScroll({
    target: goalRef,
    offset: ["start 0.9", "start 0.5"] // Start fading earlier, fully gone by center
  });

  const lineOpacity = useTransform(lineFader, [0, 1], [1, 0]);

  return (
    <>
      <ThemeController targetRef={goalRef} />
      <motion.div style={{ opacity: lineOpacity }} className="split-line"></motion.div>
      <div className="cross-horizontal"></div>
      <Hero />
      <MissionSection />
      <ScrollSection />
      <div ref={goalRef} id="goal-section">
          <GoalSection />
      </div>
    </>
  );
};

export default Home;
