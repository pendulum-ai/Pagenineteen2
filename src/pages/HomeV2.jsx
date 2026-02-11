import React, { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

import Hero from '../components/sections/Hero';
import MissionSection from '../components/sections/MissionSection';
import HorizontalProjectsSection from '../components/sections/HorizontalProjectsSection';

import CrossHair from '../components/ui/CrossHair';
import ScrollSection from '../components/sections/ScrollSection';
import GoalSection from '../components/sections/GoalSection';
import ThemeController from '../components/layout/ThemeController';
import useIsMobile from '../hooks/useIsMobile';


const HomeV2 = () => {
  const scrollSectionRef = useRef(null);
  const goalRef = useRef(null);
  const horizontalProjectsRef = useRef(null);

  // Detect mobile for responsive timing
  const isMobile = useIsMobile();

  // CrossHair visibility: fade out BEFORE projects section enters
  const { scrollYProgress: projectsFader } = useScroll({
    target: horizontalProjectsRef,
    offset: ["start 1.2", "end 0.2"]  // Start when section is 20% below viewport
  });

  // Fade OUT quickly before projects appear, stay hidden, fade IN when projects section ends
  // Mobile: line returns later (90%) to not interfere with reading Lightnote
  // Desktop: line returns earlier (60%) when third project starts exiting
  const fadeInStart = isMobile ? 0.88 : 0.60;
  const fadeInEnd = isMobile ? 0.98 : 0.75;
  
  const projectsLineOpacity = useTransform(
    projectsFader, 
    [0, 0.02, fadeInStart, fadeInEnd],
    [1, 0, 0, 1]
  );
  
  // ScaleY: Line collapses to center (slower than opacity for dramatic effect)
  const projectsLineScaleY = useTransform(
    projectsFader,
    [0, 0.03, fadeInStart - 0.02, fadeInEnd],
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

