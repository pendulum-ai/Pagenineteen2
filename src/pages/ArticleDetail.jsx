import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlurReveal from '../components/ui/BlurReveal';
import JournalCard from '../components/ui/JournalCard';
import AudioNarration from '../components/ui/AudioNarration';
import { request } from '../lib/datocms';
import { StructuredText, Image } from 'react-datocms';
import './Journal.css';

// GraphQL query to fetch a single article by slug (with image blocks)
const ARTICLE_QUERY = `
  query ArticleBySlug($slug: String!) {
    article(filter: { slug: { eq: $slug } }) {
      id
      slug
      title
      date
      tag
      excerpt
      readingTime
      authorName
      subcopy
      content {
        value
        blocks {
          __typename
          ... on ImageBlockRecord {
            id
            image {
              url
              alt
              width
              height
            }
            caption
          }
        }
      }
    }
    allArticles(first: 10, orderBy: date_DESC) {
      id
      slug
      title
      date
      tag
      excerpt
      readingTime
      authorName
      subcopy
    }
  }
`;

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [nextArticle, setNextArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wordTimestamps, setWordTimestamps] = useState(null);
  const activeWordRef = useRef(-1);
  const articleBodyRef = useRef(null);
  const wordsWrappedRef = useRef(false);

  // Fetch word timestamps JSON (404 is fine — just means no highlighting)
  useEffect(() => {
    if (!slug) return;
    wordsWrappedRef.current = false;
    fetch(`/audio/${slug}.json`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setWordTimestamps(data))
      .catch(() => setWordTimestamps(null));
  }, [slug]);

  // After both article + timestamps are in the DOM, walk text nodes and wrap words in spans
  useEffect(() => {
    const el = articleBodyRef.current;
    if (!el || !wordTimestamps || wordsWrappedRef.current) return;

    let wordIndex = 0;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    for (const textNode of textNodes) {
      const text = textNode.textContent;
      if (!text || !text.trim()) continue;

      const parts = text.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      for (const part of parts) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.setAttribute('data-word-index', String(wordIndex++));
          span.textContent = part;
          frag.appendChild(span);
        }
      }
      textNode.parentNode.replaceChild(frag, textNode);
    }

    wordsWrappedRef.current = true;
  }, [article, wordTimestamps]);

  // Toggle .word-active class via direct DOM manipulation (no React re-renders)
  const handleWordChange = useCallback((index) => {
    const prev = activeWordRef.current;
    if (prev === index) return;
    if (prev >= 0) {
      const el = document.querySelector(`[data-word-index="${prev}"]`);
      if (el) el.classList.remove('word-active');
    }
    if (index >= 0) {
      const el = document.querySelector(`[data-word-index="${index}"]`);
      if (el) el.classList.add('word-active');
    }
    activeWordRef.current = index;
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const data = await request({ 
          query: ARTICLE_QUERY,
          variables: { slug }
        });
        
        if (!data.article) {
          setError('Article not found');
          setIsLoading(false);
          return;
        }

        // Transform article data
        const articleData = {
          ...data.article,
          date: formatDate(data.article.date),
        };
        
        setArticle(articleData);

        // Find next article
        const allArticles = data.allArticles.map(a => ({
          ...a,
          date: formatDate(a.date),
        }));
        
        const currentIndex = allArticles.findIndex(a => a.slug === slug);
        const next = allArticles[currentIndex + 1] || allArticles[0];
        setNextArticle(next);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch article:', err);
        setError('Failed to load article. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="journal-container article-detail-container">
        <div className="journal-loading">
          <div className="loading-indicator">
            <span className="loader-dot"></span>
            <span className="loader-dot"></span>
            <span className="loader-dot"></span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="journal-container article-detail-container">
        <div className="journal-error">
          <p>{error || 'Article not found'}</p>
          <Link to="/journal" className="back-link">← Back to Journal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-container article-detail-container">
      {/* React 19 native document metadata — dynamic per article */}
      <title>{article.title} — Page Nineteen Journal</title>
      <meta name="description" content={article.excerpt || `${article.title} — an article from Page Nineteen's journal.`} />
      <div className="sticky-back-nav">
        <div className="sticky-back-content">
            <Link to="/journal" className="sticky-back-link">
                <span className="sticky-arrow">&larr;</span> Go back to articles
            </Link>
        </div>
      </div>

      <header className="article-header">
        <BlurReveal delay={0}>
            <div className="article-meta-top">
            <span className="article-tag">{article.tag}</span>
            </div>
        </BlurReveal>
        
        <BlurReveal delay={0.1}>
            <h1 className="article-title">{article.title}</h1>
        </BlurReveal>

        {article.subcopy && (
            <BlurReveal delay={0.2}>
              <p className="article-subtitle">{article.subcopy}</p>
            </BlurReveal>
        )}

        {article.authorName && (
            <BlurReveal delay={0.3}>
              <span className="article-author">{article.authorName}</span>
            </BlurReveal>
        )}

      </header>

      <article className="article-body" ref={articleBodyRef}>
         {/* Render DatoCMS Structured Text content with image block support */}
         {article.content && article.content.value && (
           <StructuredText
             data={article.content}
             renderBlock={({ record }) => {
               if (record.__typename === 'ImageBlockRecord') {
                 return (
                   <figure className="article-image-block">
                     {record.image && (
                       <img
                         src={record.image.url}
                         alt={record.image.alt || ''}
                         width={record.image.width}
                         height={record.image.height}
                       />
                     )}
                     {record.caption && (
                       <figcaption>{record.caption}</figcaption>
                     )}
                   </figure>
                 );
               }
               return null;
             }}
           />
         )}
      </article>

      {article.content && (
        <AudioNarration
          content={article.content}
          slug={article.slug}
          wordTimestamps={wordTimestamps}
          onWordChange={handleWordChange}
        />
      )}

      {nextArticle && (
        <div className="article-footer">
          <div className="next-article-config">
              <BlurReveal delay={0.2} yOffset={20}>
                  <JournalCard 
                      article={nextArticle} 
                      variant="minimal" 
                      label="READ NEXT" 
                  />
              </BlurReveal>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
