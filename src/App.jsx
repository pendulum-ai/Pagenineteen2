import React, { useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useInView } from 'framer-motion';
import ScrollToTop from './components/utils/ScrollToTop';
import Header from './components/layout/Header';
import GlobalBackground from './components/layout/GlobalBackground';
import Footer from './components/layout/Footer';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Journal = lazy(() => import('./pages/Journal'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Team = lazy(() => import('./pages/Team'));

// Minimal loading state (matches site background)
const PageLoader = () => (
  <div style={{ 
    minHeight: '100vh', 
    backgroundColor: 'var(--color-bg, #FDFCF8)' 
  }} />
);

function App() {
  const footerSentinelRef = useRef(null);
  // Detect when the sentinel (bottom of page) is in view
  const isFooterInView = useInView(footerSentinelRef, { 
    amount: 0, // Trigger immediately when sentinel enters viewport
    margin: "0px" // Remove offset to ensure standard behavioral triggering
  });

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <GlobalBackground />
        <Header />
        
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:slug" element={<ArticleDetail />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          </Suspense>
          
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
