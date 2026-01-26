import React from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';

import MissionSection from './components/sections/MissionSection';
import ScrollSection from './components/layout/ScrollSection';

function App() {
  return (
    <div className="App">
      <Header />
      {/* Global Fixed Grid Lines */}
      <div className="split-line"></div>
      <div className="cross-horizontal"></div>
      
      <main>
        <Hero />
        <MissionSection />
        <ScrollSection />
      </main>
      {/* Additional footer or spacer if needed */}

    </div>
  );
}

export default App;
