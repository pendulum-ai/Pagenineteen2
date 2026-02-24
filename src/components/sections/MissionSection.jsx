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
                Page Nineteen is a small London based team building new ways for people to learn and create.
              </h2>
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
                We design, ship, and operate products from model to interface.
              </p>
            </BlurReveal>


          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionSection;
