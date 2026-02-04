import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Journal.css';
import { articles as allArticles } from '../data/journal';
import BlurReveal from '../components/ui/BlurReveal';
import JournalCard from '../components/ui/JournalCard';


const Journal = () => {
  // Initialize with first batch directly to avoid sync effect warning
  const BATCH_SIZE = 6; // BATCH_SIZE needs to be defined before its use in useState
  const [visibleArticles, setVisibleArticles] = useState(() => allArticles.slice(0, BATCH_SIZE));
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);
  

  // Infinite scroll handler
  const loadMoreArticles = React.useCallback(() => {
    setIsLoading(true);
    
    setVisibleArticles(prev => {
      const currentLength = prev.length;
      const nextBatch = allArticles.slice(currentLength, currentLength + BATCH_SIZE);
      
      if (nextBatch.length === 0) {
        // We defer this slightly to ensure the render cycle completes
        // but strictly speaking, we can just set it.
        setHasMore(false);
        return prev;
      }
      
      return [...prev, ...nextBatch];
    });
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreArticles();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    
    // Copy ref to variable for cleanup to satisfy React/Lint
    const currentTarget = observerTarget.current;
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMoreArticles]);

  return (
    <div className="journal-container">
      <div className="journal-header">
        <BlurReveal delay={0}>
            <h1 className="journal-title">Journal</h1>
        </BlurReveal>
        <BlurReveal delay={0.1}>
            <p className="journal-description">
            Ongoing writing, research papers, and exploration notes from the team. We believe in building in public and sharing our architectural learnings.
            </p>
        </BlurReveal>
      </div>

      <div className="journal-list">
        {visibleArticles.map((article, index) => (
            // DEV NOTE: All links temporarily point to the same article for design refinement
            // We override the slug here just for the Link, but pass the real article data for display
            <BlurReveal key={article.id} delay={index * 0.1} yOffset={20}>
               <JournalCard article={{ ...article, slug: 'immersive-language-learning' }} />
            </BlurReveal>
        ))}
      </div>

      <div ref={observerTarget} className="journal-loader-area">
        {isLoading && (
            <div className="loading-indicator">
                <span className="loader-dot"></span>
                <span className="loader-dot"></span>
                <span className="loader-dot"></span>
            </div>
        )}
        {!hasMore && (
             <div className="end-of-journal">
                  <BlurReveal delay={0.2} yOffset={20}>
                    <span className="end-text">All articles loaded</span>
                  </BlurReveal>
             </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
