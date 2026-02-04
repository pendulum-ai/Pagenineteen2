import React from 'react';
import ProjectLoop from '../illustrations/ProjectLoop';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-header-text">
          <h2 className="project-title">{project.title}</h2>
          <p className="project-tagline">{project.tagline}</p>
        </div>
      </div>

      <div className="project-card-main">
        {/* Left: The Abstract Loop Lens */}
        <div className="project-lens" style={{ backgroundColor: project.bgColor }}>
          <ProjectLoop type={project.visualType} />
          <div className="lens-overlay"></div>
        </div>

        {/* Right: The Concrete Interface */}
        <div className="project-preview">
          <img 
            src={project.screenshotUrl} 
            alt={`${project.title} Interface`} 
            className="project-screenshot" 
          />
        </div>
      </div>

      <div className="project-card-footer">
        <div className="project-desc-col">
          {Array.isArray(project.description) ? (
            project.description.map((desc, i) => (
              <p key={i}>{desc}</p>
            ))
          ) : (
            <p>{project.description}</p>
          )}
          
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
        
        <div className="project-meta-col">
          <span className="meta-label">System Focus</span>
          <ul className="meta-list">
            {project.focus.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="project-meta-col">
          <span className="meta-label">Core Stack</span>
          <div className="stack-tags">
             {project.stack.map((tech, idx) => (
               <span key={idx} className="stack-tag">{tech}</span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
