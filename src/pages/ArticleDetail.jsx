import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/journal';
import BlurReveal from '../components/ui/BlurReveal';
import JournalCard from '../components/ui/JournalCard';
import './Journal.css'; // Reusing the journal styles

const ContentBlock = ({ block }) => {
  const isHeading = block.type === 'heading';
  const isQuote = block.type === 'quote';
  
  // User Feedback: Text should not jump. Removed BlurReveal for stable reading.
  // We use a simple div with the class for styling.
  return (
    <div className={`article-block block-${block.type}`}>
      {isHeading && <h2>{block.text}</h2>}
      {isQuote && <blockquote>"{block.text}"</blockquote>}
      {block.type === 'paragraph' && <p>{block.text}</p>}
    </div>
  );
};

const ArticleDetail = () => {
  const { slug } = useParams();
  
  // In a real CMS, we'd fetch based on slug. 
  // For now, we force the master article if the slug matches, or fallback to find.
  const article = articles.find(a => a.slug === slug) || articles[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return null;

  // Find next article for the "Read Next" section
  const currentIndex = articles.findIndex(a => a.id === article.id);
  const nextArticle = articles[currentIndex + 1] || articles[0];

  return (
    <div className="journal-container article-detail-container">
      <div className="article-nav">
        <Link to="/journal" className="back-link">
          &larr; Journal
        </Link>
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
         {/* 
            Modular Content Rendering:
            Static blocks for stable reading.
         */}
         {article.contentBlocks ? (
             article.contentBlocks.map((block, i) => (
                 <ContentBlock key={i} block={block} />
             ))
         ) : (
             <div dangerouslySetInnerHTML={{ __html: article.content }} />
         )}
      </article>

      <div className="article-footer">
        <div className="next-article-config">
            <BlurReveal delay={0.2} yOffset={20}>
                {/* Minimal variant with custom label in the first column */}
                <JournalCard 
                    // CMS PREPARATION:
                    // Currently forcing the link to the master article so the user
                    // always sees the rich "Immersive Language Learning" content.
                    // In the future, remove the `slug` override to link to the actual next article.
                    article={{ ...nextArticle, slug: 'immersive-language-learning' }} 
                    variant="minimal" 
                    label="READ NEXT" 
                />
            </BlurReveal>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
