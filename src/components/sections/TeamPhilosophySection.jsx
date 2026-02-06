import React from 'react';
import './TeamPhilosophySection.css';
import ScrollRevealTextLightBg from '../ui/ScrollRevealTextLightBg';
import BlurReveal from '../ui/BlurReveal';

const TeamPhilosophySection = () => {
  return (
    <section className="team-philosophy-section">
      <div className="philosophy-content">
        <div className="philosophy-text-wrapper">
          <div className="philosophy-title">
             <ScrollRevealTextLightBg>
              {"The team emerged from the South Park Commons Founder Fellowship and is backed by Shine Capital.\n\nWe operate as a tightly integrated AI systems team, working best when embedded and owning complex surfaces end-to-end from models to product."}
             </ScrollRevealTextLightBg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPhilosophySection;
