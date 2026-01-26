import React from 'react';
import { Link } from 'react-router-dom';
import './Journal.css';

const articles = [
  { 
    id: 1, 
    slug: 'immersive-language-learning', 
    title: 'An immersive language learning company', 
    date: 'Dec 2025', 
    tag: 'Vision',
    excerpt: 'Why we believe the next generation of language learning won\'t be flashcards, but immersive, real-time conversations with AI agents that understand context and nuance.'
  },
  { 
    id: 2, 
    slug: 'lightnote-future-creative-software', 
    title: 'Lightnote - a present future of creative software', 
    date: 'Nov 2025', 
    tag: 'Product',
    excerpt: 'Exploring the shift from \'prompting\' to \'composing\'. How creative professionals need interfaces that allow for iterative refinement rather than slot-machine generation.'
  },
  { 
    id: 3, 
    slug: 'agentic-workflows', 
    title: 'Agentic workflows for creative teams', 
    date: 'Oct 2025', 
    tag: 'Systems',
    excerpt: 'How we implement evaluation loops in production. Moving beyond simple chains to agents that can critique their own outputs.'
  },
  { 
    id: 4, 
    slug: 'amble-lite-paper', 
    title: 'Amble Lite Paper - November ‘25', 
    date: 'Nov 2025', 
    tag: 'Research',
    excerpt: 'Technical deep dive into the architecture behind Amble. Latency optimization, voice activity detection, and the challenge of real-time correction.'
  },
];

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
