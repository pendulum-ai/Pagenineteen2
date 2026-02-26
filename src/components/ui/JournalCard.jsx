import React from 'react';
import { Link } from 'react-router-dom';

const JournalCard = ({ article, variant = 'default', label }) => {
  const isMinimal = variant === 'minimal';

  return (
    <Link 
      to={`/journal/${article.slug}`} 
      className={`journal-item ${isMinimal ? 'journal-item-minimal' : ''}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      {!isMinimal && (
        <div className="journal-meta">
            <span className="journal-date">{article.date}</span>
            <span className="journal-date">{article.readingTime}</span>
            <span className="journal-tag-badge">{article.tag}</span>
        </div>
      )}
      
      <div className="journal-content">
        {isMinimal && <span className="journal-label-minimal">{label || 'READ NEXT'}</span>}
        <h2 className="journal-item-title">{article.title}</h2>
        {article.subcopy && (
          <p className="journal-item-subcopy">{article.subcopy}</p>
        )}
        {article.authorName && (
          <span className="journal-item-author">{article.authorName}</span>
        )}
        <p className="journal-item-excerpt">{article.excerpt}</p>
      </div>

      <div className="journal-action">
        <div className="icon-circle">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default JournalCard;
