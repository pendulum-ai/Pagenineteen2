import React from 'react';

const GlobalBackground = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--color-bg)',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default GlobalBackground;
