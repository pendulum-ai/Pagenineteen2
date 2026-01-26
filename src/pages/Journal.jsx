import React from 'react';
import { Link } from 'react-router-dom';
import './Journal.css';

import { articles } from '../data/journal';

const Journal = () => {
  return (
    <div className="journal-container">
      <div className="journal-header">
        <h1 className="journal-title">Journal</h1>
        <p className="journal-description">
          Ongoing writing, research papers, and exploration notes from the team. 
          We believe in building in public and sharing our architectural learnings.
        </p>
      </div>
      
      <div className="journal-list">
        {articles.map((article) => (
          <Link to={`/journal/${article.slug}`} key={article.id} className="journal-item">
            <div className="journal-meta">
              <span className="journal-date">{article.date}</span>
              <span className="journal-tag-badge">{article.tag}</span>
            </div>
            
            <div className="journal-content">
              <h2 className="journal-item-title">{article.title}</h2>
              <p className="journal-item-excerpt">{article.excerpt}</p>
            </div>
            
            <div className="journal-action">
              <div className="icon-circle">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Journal;
