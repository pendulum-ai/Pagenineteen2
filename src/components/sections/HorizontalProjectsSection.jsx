import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects } from '../../data/projects';
import HorizontalProjectCard from '../projects/HorizontalProjectCard';
import ProjectCard from '../projects/ProjectCard';
import BlurReveal from '../ui/BlurReveal';
import useIsMobile from '../../hooks/useIsMobile';
import './HorizontalProjectsSection.css';

const HorizontalProjectsSection = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile(1024);

  // Track scroll for the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // PHASE 1 (0-12%): Entry - intro appears with blur fade, NO horizontal movement
  // PHASE 2 (12-95%): Horizontal scroll
  // PHASE 3 (95-100%): Exit with blur
  
  // Horizontal scroll: DELAYED start - begins after intro is visible
  // Maps 12%-100% of scroll to full horizontal movement
  const baseX = useTransform(scrollYProgress, [0.12, 1], [0, -350]);
  
  // Smooth spring
  const smoothX = useSpring(baseX, { 
    stiffness: 70, 
    damping: 25,
    mass: 0.8
  });

  // Transform to CSS value (must be before conditional return)
  const xValue = useTransform(smoothX, v => `${v}vw`);

  // Entry/Exit blur and opacity effects
  // Fade in: 0-8% of scroll (before horizontal starts)
  // Visible: 8-88%, Fade out: 88-95%
  const trackOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.88, 0.95],
    [0, 1, 1, 0]
  );
  
  // Blur at entry and exit
  const trackBlur = useTransform(
    scrollYProgress,
    [0, 0.08, 0.88, 0.95],
    [12, 0, 0, 12]
  );
  
  // Y offset for parallax feel at entry (vertical movement before horizontal starts)
  const trackY = useTransform(
    scrollYProgress,
    [0, 0.10],
    [60, 0]
  );

  // Parallax for intro text elements (different speeds create depth)
  // Title: starts higher, ends sooner (faster)
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.06],
    [80, 0]
  );
  
  // Description: starts lower, ends later (slower) - creates lag effect
  const descriptionY = useTransform(
    scrollYProgress,
    [0, 0.10],
    [120, 0]
  );

  // Combine into filter string
  const filterValue = useTransform(trackBlur, v => `blur(${v}px)`);

  // Mobile fallback
  if (isMobile) {
    return (
      <section className="horizontal-projects-mobile-fallback">
        <div className="container">
          <div className="projects-header">
            <BlurReveal delay={0}>
              <h2 className="projects-section-title">Projects</h2>
            </BlurReveal>
            <BlurReveal delay={0.1}>
              <p className="projects-section-description">
                Exploring how new technology can address longstanding human needs.
              </p>
            </BlurReveal>
          </div>
          
          <div className="projects-list">
            {projects.map((project, index) => (
              <BlurReveal key={project.id} delay={0.2 + (index * 0.1)} yOffset={30}>
                <ProjectCard project={project} index={index} priority={index === 0} />
              </BlurReveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: One unified horizontal track
  // Element 0: "Projects" intro
  // Elements 1-3: Project cards
  return (
    <div 
      ref={containerRef} 
      className="horizontal-projects-container"
      style={{ height: "400vh" }}
    >
      <div className="horizontal-sticky-wrapper">
        <motion.div 
          className="horizontal-track"
          style={{ 
            x: xValue,
            y: trackY,
            opacity: trackOpacity,
            filter: filterValue
          }}
        >
          {/* First element: Projects intro with parallax */}
          <div className="horizontal-intro-card">
            <motion.h2 
              className="horizontal-intro-title"
              style={{ y: titleY }}
            >
              Projects
            </motion.h2>
            <motion.p 
              className="horizontal-intro-description"
              style={{ y: descriptionY }}
            >
              Exploring how new technology <br /> can address longstanding human needs.
            </motion.p>
          </div>
          
          {/* Project cards */}
          {projects.map((project, index) => (
            <HorizontalProjectCard 
              key={project.id} 
              project={project}
              index={index}
              scrollProgress={scrollYProgress}
              totalProjects={projects.length}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalProjectsSection;
