import React from 'react';
import './MissionSection.css';
import BlurReveal from '../ui/BlurReveal';

const MissionSection = () => {
  return (
    <section className="mission-section">
      <div className="mission-content split-layout">
        
        {/* LEFT COLUMN */}
        <div className="mission-left">
          <div className="mission-text-block text-align-fix">
            <BlurReveal>
              <h2>
                Page Nineteen is a small, London based lab exploring how AI changes the way we learn and the way we create.
              </h2>
            </BlurReveal>
            <BlurReveal delay={0.2}>
              <p className="mission-secondary-text">
                We're principally interested in how AI changes the way we learn and the way we create. We build products to find out.
              </p>
            </BlurReveal>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="mission-right">
          <div className="mission-text-block">
            {/* Delays significantly after left text to guide focus */ }
            {/* Part 1 */}
            <BlurReveal delay={0.3}>
              <p className="mission-belief-text">
                Our belief is that multimodal AI becomes valuable when models, tooling, and evaluation are designed as one system.
              </p>
            </BlurReveal>


          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionSection;
