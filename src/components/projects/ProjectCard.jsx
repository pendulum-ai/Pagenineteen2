import React, { useRef } from 'react';
import { useScroll, useTransform } from "framer-motion";
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });



  // Parallax Transforms (Unified Direction & Softened)
  // All elements now move slightly UP (negative) or stay near 0 to avoid "splitting" the card.
  // We strictly avoid positive values (downward movement) which caused the crash.
  
  const yTitleRaw = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const ySeparatorRaw = useTransform(scrollYProgress, [0, 1], [0, -40]);
  
  const yTaglineRaw = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yDescRaw = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const yFocusRaw = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const yStackRaw = useTransform(scrollYProgress, [0, 1], [0, 0]); // Stack stays relatively grounded

  // Apply conditional logic AFTER hooks
  const yTitle = isMobile ? 0 : yTitleRaw;
  const ySeparator = isMobile ? 0 : ySeparatorRaw;
  const yTagline = isMobile ? 0 : yTaglineRaw;
  const yDesc = isMobile ? 0 : yDescRaw;
  const yFocus = isMobile ? 0 : yFocusRaw;
  const yStack = isMobile ? 0 : yStackRaw;

  return (
    <div ref={containerRef} className="project-card">
      {/* 1. Big Header Section */}
      <motion.div style={{ y: yTitle }} className="project-top-header">
        <h2 className="project-big-title">
          {project.title}
        </h2>
      </motion.div>

      {/* 2. Separator Line */}
      <motion.div style={{ y: ySeparator }} className="project-separator"></motion.div>

      {/* 3. Main Grid: Image (Left) + Content (Right) */}
      <div className="project-main-grid">
        <div className="project-media-col">
          <div className="project-image-wrapper">
            <picture>
              <source srcSet={project.screenshotUrl} type="image/webp" />
              <img 
                src={project.screenshotFallback || project.screenshotUrl.replace('.webp', '.jpg')} 
                alt={`${project.title} Interface`} 
                className="project-image" 
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        <div className="project-content-col">
          {/* Parallax Content Wrapper */}
          
          <motion.p style={{ y: yTagline }} className="project-tagline">{project.tagline}</motion.p>

          <motion.div style={{ y: yDesc }} className="project-description">
            {Array.isArray(project.description) ? (
              project.description.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))
            ) : (
              <p>{project.description}</p>
            )}
          </motion.div>

          {/* Separate Metadata Layers for Cascade Effect */}
          <motion.div style={{ y: yFocus }}>
            <div className="project-meta-col">
              <span className="meta-label">System Focus</span>
              <ul className="meta-list">
                {project.focus.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
            
          <motion.div style={{ y: yStack }}>
            <div className="project-meta-col">
              <span className="meta-label">Core Stack</span>
              <div className="stack-tags">
                  {project.stack.map((tech, idx) => (
                    <span key={idx} className="stack-tag">{tech}</span>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* Static Links - Anchored to bottom */}
          <div className="project-links">
             {project.link && (
               <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                 View Project <span className="arrow">↗</span>
               </a>
             )}
             {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link secondary">
                  Github <span className="arrow">↗</span>
                </a>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
