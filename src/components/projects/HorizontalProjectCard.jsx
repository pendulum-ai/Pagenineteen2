import React, { useState, useRef, useEffect } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';
import './HorizontalProjectCard.css';

const HorizontalProjectCard = ({ project, index, scrollProgress }) => {
  const { setCursor } = useCursor();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(index === 0); // First card starts visible
  const cardRef = useRef(null);

  // Intersection Observer to detect when card enters viewport
  useEffect(() => {
    if (index === 0) return; // First card already visible
    
    // Fallback: if Observer doesn't fire within 3s, show anyway
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(fallbackTimer);
          observer.disconnect(); // Only trigger once
        }
      },
      { 
        threshold: 0.3,  // 30% visible
        rootMargin: '0px -100px 0px 0px'  // Trigger slightly before fully in view
      }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [index]);

  // Strong per-card parallax effect
  // Each subsequent card moves faster, creating "catch up" effect
  // Card 0: offset 0, Card 1: offset 15vw, Card 2: offset 30vw
  const parallaxOffset = index * 15;
  
  // Cards have different speed curves
  // Earlier cards slow down, later cards catch up faster
  const cardX = useTransform(
    scrollProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [
      parallaxOffset,           // Start offset (staggered)
      parallaxOffset * 0.7,     // Slow start
      parallaxOffset * 0.3,     // Converging
      -parallaxOffset * 0.2,    // Passing each other
      -parallaxOffset * 0.5     // Final offset
    ]
  );
  
  // Smooth spring for organic movement
  const smoothCardX = useSpring(cardX, { 
    stiffness: 60, 
    damping: 25,
    mass: 0.8
  });

  return (
    <motion.div 
      ref={cardRef}
      className={`h-project-card ${isVisible ? 'visible' : 'blur-hidden'}`}
      style={{ 
        x: smoothCardX
      }}
    >
      {/* Image */}
      <div 
        className="h-project-image-wrapper"
        onMouseEnter={() => {
          setCursor('project-view', 'View Project');
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setCursor('default');
          setIsHovered(false);
        }}
        onClick={() => project.link && window.open(project.link, '_blank')}
        style={{ cursor: 'none' }}
      >
        <picture>
          {project.screenshotUrl?.endsWith('.webp') && (
            <source srcSet={project.screenshotUrl} type="image/webp" />
          )}
          <img 
            src={project.screenshotFallback || project.screenshotUrl} 
            alt={project.title} 
            className={`h-project-image ${isHovered ? 'hovered' : ''}`}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, 455px"
          />
        </picture>
      </div>

      {/* Content */}
      <div className="h-project-content">
        <h3 className="h-project-title">{project.title}</h3>
        <p className="h-project-tagline">{project.tagline}</p>
        
        <div className="h-project-description">
          {Array.isArray(project.description) ? (
            project.description.map((desc, i) => (
              <p key={i}>{desc}</p>
            ))
          ) : (
            <p>{project.description}</p>
          )}
        </div>

        <div className="h-project-meta">
            {/* 
            <div className="h-project-meta-col">
              <span className="h-meta-label">System Focus</span>
              <ul className="h-meta-list">
                {project.focus.slice(0, 3).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            */}

          <div className="h-project-meta-col">
            <span className="h-meta-label">Core Stack</span>
            <div className="h-stack-tags">
              {project.stack.map((tech, idx) => (
                <span key={idx} className="h-stack-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="h-project-links">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="h-project-link">
              View Project <span className="arrow">↗</span>
            </a>
          )}
          {project.github && project.github.startsWith('http') && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="h-project-link">
              View Repo <span className="arrow">↗</span>
            </a>
          )}
          {project.github && !project.github.startsWith('http') && (
            <span className="h-project-link secondary" style={{ opacity: 0.4, cursor: 'default' }}>
              View Repo <span className="arrow">↗</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HorizontalProjectCard;
