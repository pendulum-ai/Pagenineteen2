import React from 'react';
import './Projects.css';
import { projects } from '../data/projects';
import ProjectCard from '../components/projects/ProjectCard';
import BlurReveal from '../components/ui/BlurReveal';

const Projects = () => {
  return (
    <div className="projects-container">
      {/* React 19 native document metadata */}
      <title>Projects — Page Nineteen</title>
      <meta name="description" content="Amble, Pendulum, Lightnote — applied AI projects by Page Nineteen. Real-time language learning, multimodal asset search, and composable creative workflows." />
      <div className="projects-header">
        <BlurReveal delay={0}>
          <h1 className="projects-title">Projects</h1>
        </BlurReveal>
        <BlurReveal delay={0.1}>
          <p className="projects-description">
            Each system below is live and in active development, serving as a proving ground 
            for different aspects of the same underlying multimodal architecture.
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
  );
};

export default Projects;
