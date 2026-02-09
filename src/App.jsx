import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/utils/ScrollToTop';
import Header from './components/layout/Header';
import GlobalBackground from './components/layout/GlobalBackground';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/utils/ErrorBoundary';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/ui/CustomCursor';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const HomeV2 = lazy(() => import('./pages/HomeV2'));
const Projects = lazy(() => import('./pages/Projects'));
const Journal = lazy(() => import('./pages/Journal'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Team = lazy(() => import('./pages/Team'));
const NotFound = lazy(() => import('./pages/NotFound'));

// PostHog Analytics
import Analytics from './components/utils/Analytics';

// Minimal loading state (matches site background)
const PageLoader = () => (
  <div style={{ 
    minHeight: '100vh', 
    backgroundColor: 'var(--color-bg, #FDFCF8)' 
  }} />
);

// Wrapper to handle footer visibility with reliable scroll detection
function AppContent() {
  const [footerVisible, setFooterVisible] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const location = useLocation();
  
  // Reset state on route change
  useEffect(() => {
    setFooterVisible(false);
    setPageReady(false);
    
    // Wait for page to fully render before enabling detection
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  // Scroll position checker
  const checkPosition = useCallback(() => {
    if (!pageReady) return;
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // Safety check: page must be scrollable and user must have scrolled some
    const isPageScrollable = scrollHeight > clientHeight + 200;
    const hasScrolled = scrollTop > 100;
    
    // Distance from bottom
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    
    // Show footer only if:
    // 1. Page is ready
    // 2. Page is scrollable (has content)
    // 3. User has scrolled past the hero
    // 4. Within 150px of bottom
    const shouldShow = isPageScrollable && hasScrolled && distanceFromBottom < 150;
    
    setFooterVisible(shouldShow);
  }, [pageReady]);
  
  // Listen to scroll
  useEffect(() => {
    if (!pageReady) return;
    
    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition, { passive: true });
    
    // Initial check after ready
    checkPosition();
    
    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    };
  }, [pageReady, checkPosition]);

  return (
    <div className="App">
      <GlobalBackground />
      <Header />
      
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<HomeV2 />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<ArticleDetail />} />
            
            {/* Hidden pages (still accessible via direct URL) */}
            <Route path="/home-legacy" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      
      <Footer isVisible={footerVisible} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <CursorProvider>
          <CustomCursor />
          <ScrollToTop />
          <Analytics />
          <AppContent />
        </CursorProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
