import React, { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

import Hero from '../components/sections/Hero';
import MissionSection from '../components/sections/MissionSection';

import CrossHair from '../components/ui/CrossHair';
import ScrollSection from '../components/sections/ScrollSection';
import GoalSection from '../components/sections/GoalSection';
import ThemeController from '../components/layout/ThemeController';


const Home = () => {
  const scrollSectionRef = useRef(null);
  const goalRef = useRef(null);

  // Logic to fade out the vertical line as we approach the Goal Section (Section 4)
  // Keeps it visible through the Scroll Section (Geometric Animation).
  const { scrollYProgress: lineFader } = useScroll({
    target: goalRef,
    offset: ["start 0.9", "start 0.5"] 
  });

  const lineOpacity = useTransform(lineFader, [0, 1], [1, 0]);


  return (
    <>
      <ThemeController targetRef={goalRef} />
      <CrossHair verticalLineOpacity={lineOpacity} />
      <Hero />

      <MissionSection />
      <div ref={scrollSectionRef}>
        <ScrollSection />
      </div>
      <div ref={goalRef} id="goal-section">
          <GoalSection />
      </div>
    </>
  );
};

export default Home;
