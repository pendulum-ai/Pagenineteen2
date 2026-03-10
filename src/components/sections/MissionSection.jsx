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
                Page Nineteen is a small team based in London building AI products to change how people learn and create.
              </h2>
            </BlurReveal>

          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="mission-right">
          <div className="mission-text-block">
            <BlurReveal delay={0.3}>
              <p className="mission-belief-text">
                Designed and built as unified systems,<br className="desktop-br" />{' '}from model orchestration<br className="desktop-br" />{' '}to interface design.
              </p>
            </BlurReveal>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionSection;
