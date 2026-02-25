import React from 'react';
import './Team.css';
import BlurReveal from '../components/ui/BlurReveal';

import { teamMembers } from '../data/team';

const Team = () => {
  return (
    <div className="team-container">
      {/* React 19 native document metadata */}
      <title>Team — Page Nineteen</title>
      <meta name="description" content="Meet the team behind Page Nineteen — a small, senior team with experience building and operating AI systems at scale." />

      <div className="team-header-section">
        <BlurReveal>
           <h1 className="team-title">Team</h1>
        </BlurReveal>
        <BlurReveal delay={0.1}>
           <p className="team-subtitle">
             Engineering, product, and applied ML working as one.
           </p>
        </BlurReveal>
      </div>
      
      <div className="team-content-wrapper">
        {/* Team Grid - Full Width */}
        <div className="team-grid-section">
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <BlurReveal key={member.id} delay={0.3 + (index * 0.1)}>
                <a 
                  href={member.linkedin}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="team-card"
                >
                  <div className="card-top-section">
                    <h3 className="card-name">{member.name}</h3>
                    <div className="card-separator"></div>
                  </div>

                  <div className="card-visual">
                     <img 
                       src={member.image} 
                       alt={member.name} 
                       className="card-image"
                       loading="lazy"
                       decoding="async"
                     />
                  </div>
                  
                  <div className="card-info">
                    <div className="info-header">
                      {/* Name moved up */}
                      <p className="card-role">{member.role}</p>
                    </div>
                    
                    <div className="card-details">
                      <p className="detail-bio">
                        {member.bio}
                      </p>
                      <p className="detail-previous">
                        <span className="label-previous">Previously</span> 
                        {member.previously}
                      </p>
                    </div>

                    <div className="card-linkedin-link">
                      LINKEDIN
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="link-arrow">
                        <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </a>
              </BlurReveal>
            ))}
          </div>
        </div>
      </div>
      
      <BlurReveal delay={0.4}>
        <div className="team-section-divider"></div>
      </BlurReveal>
    </div>
  );
};

export default Team;
