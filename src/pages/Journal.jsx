import React, { useState, useEffect, useRef } from 'react';
import './Journal.css';
import BlurReveal from '../components/ui/BlurReveal';
import JournalCard from '../components/ui/JournalCard';
import { request } from '../lib/datocms';

// GraphQL query to fetch all articles from DatoCMS
const ARTICLES_QUERY = `
  query AllArticles {
    allArticles(orderBy: date_DESC) {
      id
      slug
      title
      date
      tag
      excerpt
      readingTime
      content {
        value
      }
    }
  }
`;

// Helper to format date from DatoCMS (YYYY-MM-DD) to display format (Dec 2025)
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const Journal = () => {
  const BATCH_SIZE = 6;
  const [allArticles, setAllArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const observerTarget = useRef(null);

  // Fetch articles from DatoCMS on mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const data = await request({ query: ARTICLES_QUERY });
        
        // Transform DatoCMS response to match our component expectations
        const articles = data.allArticles.map(article => ({
          id: article.id,
          slug: article.slug,
          title: article.title,
          date: formatDate(article.date),
          tag: article.tag,
          excerpt: article.excerpt,
          readingTime: article.readingTime,
          content: article.content,
        }));
        
        setAllArticles(articles);
        setVisibleArticles(articles.slice(0, BATCH_SIZE));
        setHasMore(articles.length > BATCH_SIZE);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
        setError('Failed to load articles. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Infinite scroll handler
  const loadMoreArticles = React.useCallback(() => {
    setVisibleArticles(prev => {
      const currentLength = prev.length;
      const nextBatch = allArticles.slice(currentLength, currentLength + BATCH_SIZE);
      
      if (nextBatch.length === 0) {
        setHasMore(false);
        return prev;
      }
      
      if (currentLength + nextBatch.length >= allArticles.length) {
        setHasMore(false);
      }
      
      return [...prev, ...nextBatch];
    });
  }, [allArticles]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading && allArticles.length > 0) {
          loadMoreArticles();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    
    const currentTarget = observerTarget.current;
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMoreArticles, allArticles.length]);

  return (
    <div className="journal-container">
      {/* React 19 native document metadata */}
      <title>Journal — Page Nineteen</title>
      <meta name="description" content="Articles, notes, and updates from Page Nineteen — an applied multimodal AI lab based in London." />
      <div className="journal-header">
        <BlurReveal delay={0}>
            <h1 className="journal-title">Journal</h1>
        </BlurReveal>
      </div>

      {error && (
        <div className="journal-error">
          <p>{error}</p>
        </div>
      )}

      {isLoading && visibleArticles.length === 0 && (
        <div className="journal-loading">
          <div className="loading-indicator">
            <span className="loader-dot"></span>
            <span className="loader-dot"></span>
            <span className="loader-dot"></span>
          </div>
        </div>
      )}

      <div className="journal-list">
        {visibleArticles.map((article, index) => (
            <BlurReveal key={article.id} delay={index * 0.1} yOffset={20}>
               <JournalCard article={article} />
            </BlurReveal>
        ))}
      </div>

      <div ref={observerTarget} className="journal-loader-area">
        {isLoading && visibleArticles.length > 0 && (
            <div className="loading-indicator">
                <span className="loader-dot"></span>
                <span className="loader-dot"></span>
                <span className="loader-dot"></span>
            </div>
        )}
        {!hasMore && visibleArticles.length > 0 && (
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
