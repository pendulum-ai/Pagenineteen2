import React from 'react';
import './Team.css';

import { teamMembers } from '../data/team';

const Team = () => {
  return (
    <div className="team-container">
      <div className="team-header">
        <h1 className="team-title">Team</h1>
        <p className="team-description">
          We are a small, senior team with experience building and operating AI systems at scale.
          <br /><br />
          The team emerged from the South Park Commons Founder Fellowship and is backed by 
          Shine Capital. We operate as a tightly integrated unit, working best when owning complex 
          surfaces end-to-end.
        </p>
      </div>
      
      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member">
            <div className="member-image-placeholder"></div>
            
            <div className="member-info">
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              
              <div className="member-details">
                <p className="detail-row">
                  <span className="detail-label">Previously:</span>
                  <span className="detail-text">{member.previously}</span>
                </p>
                <p className="member-bio">{member.bio}</p>
              </div>
              
              <div className="member-social">
                <a href={member.linkedin} className="social-link">
                  Linkedin
                  <svg className="social-arrow" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
