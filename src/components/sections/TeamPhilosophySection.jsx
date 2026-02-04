import React, { useRef } from 'react';
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
              Page Nineteen operates as a tightly integrated AI systems team. We work best when embedded, owning complex surfaces end-to-end from models to product.
             </ScrollRevealTextLightBg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPhilosophySection;
