import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetail = () => {
  const { id } = useParams();

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <Link to="/projects" style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'underline' }}>
        &larr; Back to Projects
      </Link>
      <h1>Project {id}</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '20px 0' }}>
        Detailed case study content for project {id} will go here. This serves as a placeholder for the Project Detail page.
      </p>
    </div>
  );
};

export default ProjectDetail;
