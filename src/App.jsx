import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useInView } from 'framer-motion';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Journal from './pages/Journal';
import ArticleDetail from './pages/ArticleDetail';
import Team from './pages/Team';
import Footer from './components/layout/Footer';

function App() {
  const footerSentinelRef = useRef(null);
  // Detect when the sentinel (bottom of page) is in view
  const isFooterInView = useInView(footerSentinelRef, { 
    amount: 0.1, // Trigger when even a little bit is visible
    margin: "0px 0px -50px 0px" // Slight offset adjustments if needed
  });

  return (
    <Router>
      <div className="App">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<ArticleDetail />} />
            <Route path="/team" element={<Team />} />
          </Routes>
          
          {/* Sentinel to trigger footer appearance */}
          <div 
            ref={footerSentinelRef} 
            className="footer-sentinel" 
            style={{ height: '50vh', width: '100%', pointerEvents: 'none' }} 
          />
        </main>
        
        <Footer isVisible={isFooterInView} />
      </div>
    </Router>
  );
}

export default App;
