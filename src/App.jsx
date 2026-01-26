import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ScrollSection from './components/ScrollSection';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <ScrollSection />
      </main>
      {/* Additional footer or spacer if needed */}

    </div>
  );
}

export default App;
