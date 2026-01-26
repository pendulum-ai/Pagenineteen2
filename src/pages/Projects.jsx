import React from 'react';
import './Projects.css';

const projects = [
  {
    id: 'lightnote',
    title: 'Lightnote',
    tagline: 'Composable creative workflows for generative media',
    description: 'A canvas-based environment that allows users to compose fine-tuned generative models and AI tools into repeatable creative workflows. Developed in partnership with WPP, Ogilvy, and AKQA.',
    link: '#',
    github: '#',
    focus: [
      'Automated LoRA fine-tuning pipelines',
      'Support for multiple model families (Flux, SDXL)',
      'Workflow-specific tools: Inpainting, style transfer',
      'Canvas-style interface for composing models'
    ],
    stack: ['React Flow', 'Diffusers', 'LoRA', 'Flux', 'SDXL'],
    bgColor: '#FAF9F6' // Warm off-white
  },
  {
    id: 'pendulum',
    title: 'Pendulum',
    tagline: 'Large-scale multimodal asset search and organization',
    description: 'A system for indexing, organizing, and retrieving multimodal assets across images and text. It solves the blank page problem by allowing creatives to instantly retrieve relevant assets from massive libraries using natural language.',
    link: '#',
    github: '#',
    focus: [
      'Metadata extraction using LLMs & vision models',
      'Plain-text indexing combined with vectors',
      'Scalable distributed ingestion pipeline',
      'Natural-language retrieval integrated into RAG'
    ],
    stack: ['Vector DB', 'CLIP', 'LLM Metadata', 'DAG', 'Kandji'],
    bgColor: '#F0F2F0' // Cool off-white
  },
  {
    id: 'amble',
    title: 'Amble',
    tagline: 'Real-time, personalised language learning',
    description: 'A voice-first language learning app that adapts to you in real-time. Amble converses with you, adjusts difficulty based on your pronunciation and vocabulary, and generates personalized listening and reading experiences on topics you care about.',
    link: '#',
    github: null,
    focus: [
      'Voice Activity Detection (VAD) & Diarization',
      'Low-latency speech-to-speech pipeline',
      'Adaptive curriculum generation',
      'Real-time pronunciation feedback'
    ],
    stack: ['WebRTC', 'VAD', 'Whisper', 'LLM', 'TTS'],
    bgColor: '#F5F0EB' // Warm beige
  }
];

const Projects = () => {
  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-description">
          Each system below is live and in active development, serving as a proving ground 
          for different aspects of the same underlying multimodal architecture.
        </p>
      </div>
      
      <div className="projects-list">
        {projects.map((project) => (
          <section key={project.id} className="project-section" style={{ backgroundColor: project.bgColor ? 'transparent' : 'transparent' }}>
            {/* 
                Note: We can apply the background color to a wrapping container if we want full-width stripes, 
                but based on the container constraints, we might just keep it clean or apply it to the card.
                For now, effectively transparent to respect the main bg, matching the clean aesthetic. 
                If the user image implies full-width backgrounds, we'd need to break out of the container. 
                Let's stay inside the container for layout consistency but using large blocks.
            */}
             <div className="project-layout-block" style={{ backgroundColor: project.bgColor, padding: '60px', borderRadius: '16px' }}>
                <div className="project-content-grid">
                  
                  {/* Left Column: Info */}
                  <div className="project-left">
                    <div className="project-icon">
                      {/* Placeholder Icon */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    
                    <h2 className="project-name">{project.title}</h2>
                    <p className="project-tagline">{project.tagline}</p>
                    <p className="project-summary">{project.description}</p>
                    
                    <div className="project-actions">
                      <a href={project.link} className="btn-pill">
                        Visit Site <span style={{ marginLeft: '4px' }}>↗</span>
                      </a>
                      {project.github && (
                        <a href={project.github} className="btn-pill secondary">
                          GitHub <span>↗</span>
                        </a>
                      )}
                    </div>
                    
                    <div className="system-focus-section">
                      <span className="section-label">System Focus</span>
                      <ul className="focus-list">
                        {project.focus.map((item, idx) => (
                          <li key={idx} className="focus-item">
                            <span className="focus-icon">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="core-stack-section">
                       <span className="section-label">Core Stack</span>
                       <div className="tech-stack-row">
                         {project.stack.map((tech, idx) => (
                           <span key={idx} className="tech-tag">{tech}</span>
                         ))}
                       </div>
                    </div>
                  </div>
                  
                  {/* Right Column: Visual */}
                  <div className="project-right">
                    <div className="project-media-placeholder">
                      {/* Image/Video would go here */}
                    </div>
                  </div>
                  
                </div>
             </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Projects;
