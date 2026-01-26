import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ArticleDetail = () => {
  const { slug } = useParams();

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <Link to="/journal" style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'underline' }}>
        &larr; Back to Journal
      </Link>
      <h1 style={{ textTransform: 'capitalize' }}>{slug.replace(/-/g, ' ')}</h1>
      <p style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '1.1rem' }}>
        This is the content for the article with slug: <strong>{slug}</strong>.
        In a real implementation, this would fetch data from a CMS or local markdown files.
      </p>
    </div>
  );
};

export default ArticleDetail;
