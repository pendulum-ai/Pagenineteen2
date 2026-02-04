import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// --- Visual Generators ---

// 1. PARTICLES (Lightnote) - Represents diffusion/generation
const generateParticles = (count = 25) => {
  return Array.from({ length: count }).map((_, i) => ({
    cx: 50 + (Math.random() * 60 - 30),
    cy: 50 + (Math.random() * 60 - 30),
    r: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 4
  }));
};

// 2. NETWORK (Pendulum) - Represents nodes/search/vector
const generateNetwork = (count = 12) => {
  // Create a pseudo-random grid structure
  const nodes = [];
  const rows = 3; 
  const cols = 4;
  for(let r=0; r<rows; r++) {
      for(let c=0; c<cols; c++) {
          nodes.push({
              x: 25 + c * 16 + (Math.random() * 5),
              y: 35 + r * 15 + (Math.random() * 5),
              r: 2,
              id: `${r}-${c}`
          });
      }
  }
  
  // Create connections
  const lines = [];
  nodes.forEach((n1, i) => {
      nodes.forEach((n2, j) => {
          if (i !== j) {
              const dist = Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2));
              if (dist < 25 && Math.random() > 0.5) {
                  lines.push({ x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y, id: `${i}-${j}` });
              }
          }
      });
  });
  
  return { nodes, lines };
};

// 3. WAVE (Amble) - Represents voice/audio
// Rendered dynamically in the component

const ProjectLoop = ({ type = 'particles' }) => {
  const visuals = useMemo(() => {
    return {
       particles: generateParticles(),
       network: generateNetwork()
    };
  }, []);

  return (
    <div className="project-loop-container" style={{ width: '100%', height: '100%' }}>
      <svg 
        viewBox="0 0 100 100" 
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        
        {/* --- TYPE: PARTICLES --- */}
        {type === 'particles' && visuals.particles.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="var(--color-text)"
            opacity={0.6}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay
            }}
          />
        ))}

        {/* --- TYPE: NETWORK --- */}
        {type === 'network' && (
            <>
                {visuals.network.lines.map((l, i) => (
                     <motion.line
                        key={l.id}
                        x1={l.x1} 
                        y1={l.y1}
                        x2={l.x2} 
                        y2={l.y2}
                        stroke="var(--color-text)"
                        strokeWidth="0.5"
                        strokeOpacity="0.15"
                        animate={{
                            strokeOpacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 3 + (i % 2),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.1
                        }}
                     />
                ))}
                {visuals.network.nodes.map((n, i) => (
                    <motion.circle
                        key={n.id}
                        cx={n.x}
                        cy={n.y}
                        r={n.r}
                        fill="var(--color-text)"
                        animate={{
                             scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                    />
                ))}
            </>
        )}

        {/* --- TYPE: WAVE --- */}
        {type === 'wave' && Array.from({ length: 5 }).map((_, i) => (
             <motion.path
                key={i}
                fill="none"
                stroke="var(--color-text)"
                strokeWidth="0.8"
                d={`M 10 50 Q 30 50 50 50 T 90 50`}
                animate={{
                    d: [
                        `M 10 50 Q 30 ${40 + i*2} 50 50 T 90 50`,
                        `M 10 50 Q 30 ${60 - i*2} 50 50 T 90 50`,
                        `M 10 50 Q 30 ${40 + i*2} 50 50 T 90 50`
                    ],
                    opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                    duration: 2 + i * 0.2, // Offset phases
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
             />
        ))}

      </svg>
    </div>
  );
};

export default ProjectLoop;
