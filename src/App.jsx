import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Journal from './pages/Journal';
import ArticleDetail from './pages/ArticleDetail';
import Team from './pages/Team';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        {/* Global Fixed Grid Lines - REMOVED, moving to Home.jsx */}
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<ArticleDetail />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
        
        {/* Additional footer or spacer if needed */}
      </div>
    </Router>
  );
}

export default App;
