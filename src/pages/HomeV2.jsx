import React, { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

import Hero from '../components/sections/Hero';
import MissionSection from '../components/sections/MissionSection';
import HorizontalProjectsSection from '../components/sections/HorizontalProjectsSection';

import CrossHair from '../components/ui/CrossHair';
import ScrollSection from '../components/sections/ScrollSection';
import GoalSection from '../components/sections/GoalSection';
import ThemeController from '../components/layout/ThemeController';


const HomeV2 = () => {
  const scrollSectionRef = useRef(null);
  const goalRef = useRef(null);
  const horizontalProjectsRef = useRef(null);

  // CrossHair visibility: fade out BEFORE projects section enters
  const { scrollYProgress: projectsFader } = useScroll({
    target: horizontalProjectsRef,
    offset: ["start 1.2", "end 0.2"]  // Start when section is 20% below viewport
  });

  // Fade OUT quickly before projects appear, stay hidden, fade IN when third project exits
  const projectsLineOpacity = useTransform(
    projectsFader, 
    [0, 0.02, 0.60, 0.75],  // Fade back in from 60-75% (earlier reveal)
    [1, 0, 0, 1]
  );
  
  // ScaleY: Line collapses to center (slower than opacity for dramatic effect)
  const projectsLineScaleY = useTransform(
    projectsFader,
    [0, 0.03, 0.58, 0.75],  // Scale back slightly before opacity
    [1, 0, 0, 1]
  );

  // CrossHair visibility: fade out as we approach GoalSection
  const { scrollYProgress: goalFader } = useScroll({
    target: goalRef,
    offset: ["start 0.9", "start 0.5"]
  });
  
  const goalLineOpacity = useTransform(goalFader, [0, 1], [1, 0]);
  const goalLineScaleY = useTransform(goalFader, [0, 1], [1, 0]);

  // Combine: line visible only when BOTH allow it
  const lineOpacity = useTransform(
    [projectsLineOpacity, goalLineOpacity],
    ([projects, goal]) => Math.min(projects, goal)
  );
  
  // Combine scaleY
  const lineScaleY = useTransform(
    [projectsLineScaleY, goalLineScaleY],
    ([projects, goal]) => Math.min(projects, goal)
  );

  return (
    <>
      <ThemeController targetRef={goalRef} />
      <CrossHair verticalLineOpacity={lineOpacity} verticalLineScaleY={lineScaleY} />
      <Hero />

      <MissionSection />
      
      {/* Horizontal Projects Section */}
      <div ref={horizontalProjectsRef}>
        <HorizontalProjectsSection />
      </div>
      
      <div ref={scrollSectionRef}>
        <ScrollSection />
      </div>
      <div ref={goalRef} id="goal-section">
          <GoalSection />
      </div>
    </>
  );
};

export default HomeV2;

