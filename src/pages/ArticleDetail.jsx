import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlurReveal from '../components/ui/BlurReveal';
import JournalCard from '../components/ui/JournalCard';
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
            <span className="article-date">{article.date}</span>
            </div>
        </BlurReveal>
        
        <BlurReveal delay={0.1}>
            <h1 className="article-title">{article.title}</h1>
        </BlurReveal>
      </header>

      <article className="article-body">
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
