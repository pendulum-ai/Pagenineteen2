import React, { useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';

// Interpolate array of points with extra properties (r: radius, o: opacity)
const useMorphPoints = (progress, states) => {
  // Create a static array of indices to map over, ensuring hook order is preserved.
  // We know there are exactly 12 points in the layouts.
  const indices = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  return indices.map(i => {
    const xRange = states.map(s => s[i].x);
    const yRange = states.map(s => s[i].y);
    const rRange = states.map(s => s[i].r);
    const oRange = states.map(s => s[i].o);
    
    // PER-POINT STAGGERING (The "Organic Explosion" logic)
    const delay = ((i * 7) % 5) * 0.015; // 0 to 0.06
    
    const inputRange = [
        0 + delay,       // Start
        0.16,            // State 1
        0.32,            // State 2
        0.48,            // State 3
        0.64,            // State 4
        0.78,            // State 5
        0.86 - delay     // End 
    ];

    // ESLint rule disabled because we are mapping over a constant array
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const x = useTransform(progress, inputRange, xRange);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const y = useTransform(progress, inputRange, yRange);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const r = useTransform(progress, inputRange, rRange);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const o = useTransform(progress, inputRange, oRange);

    return { x, y, r, o, id: i };
  });
};

// 12 points is a good balance for these shapes
const getLayouts = () => {
    // Helper to create point
    const p = (x, y, r = 15, o = 1) => ({ x, y, r, o });

    // State 0: "The Singularity"
    const layoutZero = [];
    for(let i=0; i<12; i++) {
        // Only show the first point to avoid visual stacking of 12 translucent rings
        // creating a dark artifact.
        layoutZero.push(p(50, 50, 3, i === 0 ? 1 : 0)); 
    }

    // State 1: "Foundation" - The Cube/Square
    const layout1 = [];
    const cols = 3;
    const rows = 4;
    for(let r=0; r<rows; r++) {
        for(let c=0; c<cols; c++) {
            layout1.push(p(35 + c*15, 25 + r*15, 12, 1));
        }
    }

    // State 2: "Process" - The Snail/Diagonal
    const layout2 = [];
    for(let i=0; i<12; i++) {
        const t = i / 11; 
        const x = 20 + t * 60; 
        const y = 80 - t * 60;
        const r = 15; 
        layout2.push(p(x, y, r, 1));
    }

    // State 3: "Core" - The Nucleus
    const layout3 = [];
    for(let i=0; i<12; i++) {
        if (i < 4) {
             layout3.push(p(50 + (i%2 ? -2:2), 50 + (i>1 ? -2:2), 2, 1));
        } else {
             const angle = ((i - 4) / 8) * Math.PI * 2;
             layout3.push(p(50 + Math.cos(angle) * 35, 50 + Math.sin(angle) * 35, 10, 0.8));
        }
    }

    // State 4: "Structure" - The Frames
    const layout4 = [];
    for(let i=0; i<12; i++) {
        if (i < 6) {
            const col = i % 3;
            const row = Math.floor(i / 3);
            layout4.push(p(25 + col*10, 25 + row*10, 15, 1));
        } else {
            const j = i - 6;
            const col = j % 3;
            const row = Math.floor(j / 3);
            layout4.push(p(55 + col*10, 55 + row*10, 15, 1));
        }
    }

    // State 5: "Interfaces" - The Cube (3D Isometric)
    const layout5 = [];

    // Perfect Isometric Cube Coordinates centered at 50,50
    // Generated via rotation matrices to ensure equal edge lengths
    const visiblePoints = [
        { x: 50, y: 50 },
        { x: 87.3, y: 28.4 },
        { x: 87.3, y: 71.6 },
        { x: 50, y: 93.1 },
        { x: 12.7, y: 28.4 },
        { x: 50, y: 6.9 },
        { x: 50, y: 50 },
        { x: 12.7, y: 71.6 }
    ];

    visiblePoints.forEach(p => {
        layout5.push({ x: p.x, y: p.y, r: 4, o: 1 });
    });

    // Fill remaining 4 points (hidden at center)
    for(let i=0; i<4; i++) {
        layout5.push({ x: 50, y: 50, r: 0, o: 0 });
    }

    // Return 7 states: Start -> 5 Shapes -> End
    return [layoutZero, layout1, layout2, layout3, layout4, layout5, layoutZero];
};

const GeometricIllustration = ({ scrollYProgress }) => {
  const states = useMemo(() => getLayouts(), []);
  const points = useMorphPoints(scrollYProgress, states);

  // Sync overall visibility with the content flow
  // Simply fade in at the start and keep it visible.
  // UPDATE: User reported issues with visibility. Removed fade-in to ensure it's always seen.
  const containerOpacity = useTransform(scrollYProgress, [0, 0.01], [1, 1]);

  // DYNAMIC TOPOLOGY LOGIC
  // We want lines to appear when points are close.
  // Instead of checking positions in a loop every frame (expensive in React),
  // We pre-calculate the opacity of every possible connection pair based on the known layouts.
  
  // Generate all unique pairs
  const connections = useMemo(() => {
    const pairs = [];
    const numPoints = states[0].length;
    
    for (let i = 0; i < numPoints; i++) {
        for (let j = i + 1; j < numPoints; j++) {
            pairs.push([i, j]);
        }
    }
    return pairs;
  }, [states]);

  // For each pair, create a MotionValue for their line's opacity
  // This is efficient because it's set up once and runs on the compositor/animation frame
  const animatedLines = connections.map(([i, j]) => {
      // Calculate distance between Point I and Point J at each keyframe
      const dists = states.map((layout, k) => {
          // CLEANUP: Disable lines for State 3 ("Core")
          // We force distance to infinity for this specific state index (3)
          if (k === 3) return 10000;

          const p1 = layout[i];
          const p2 = layout[j];

          // If either point is hidden (opacity ~0), don't connect
          if (p1.o < 0.1 || p2.o < 0.1) return 10000;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          return Math.sqrt(dx*dx + dy*dy);
      });

      // Threshold for connection
      // Increased to 50 to accommodate the longer diagonals of the isometric cube (max edge ~43)
      const THRESHOLD = 50;  
      
      // Map distances to opacity (0 to 1)
      const opacities = dists.map(d => {
          // If points are too far, no line.
          if (d > THRESHOLD) return 0;
          // If points are overlapping (singularity), no line (prevents black knot at center).
          if (d < 0.5) return 0;
          
          return 1 - (d / THRESHOLD); // Linear falloff
      });

      // Map scroll progress to this pair's specific opacity curve
      // eslint-disable-next-line
      const opacity = useTransform(scrollYProgress, [0, 0.16, 0.32, 0.48, 0.64, 0.80, 1], opacities);
      
      return { i, j, opacity };
  });

  return (
    <motion.div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        opacity: containerOpacity 
    }}>
      <svg viewBox="0 0 100 100" style={{ width: '80%', height: '80%', overflow: 'visible' }}>
        
        {/* Dynamic Lines */}
        {animatedLines.map(({ i, j, opacity }, key) => {
            const start = points[i];
            const end = points[j];
            
            // Only render if there is some non-zero opacity at some point? 
            // Framer motion handles 0 opacity fine.
            return (
                <motion.line
                    key={`dyn-line-${key}`}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="var(--color-text)" 
                    strokeOpacity={0.15}
                    vectorEffect="non-scaling-stroke"
                    strokeWidth="1px" 
                    style={{ opacity }} 
                />
            );
        })}

        {/* Halo Circles */}
        {points.map((point, i) => (
            <motion.circle
                key={`halo-${i}`}
                cx={point.x}
                cy={point.y}
                r={point.r}
                fill="transparent"
                stroke="var(--color-text)"
                strokeOpacity={0.08}
                vectorEffect="non-scaling-stroke"
                strokeWidth="1px"
                style={{ opacity: point.o }}
            />
        ))}

        {/* Core Orange Dots */}
        {points.map((point, i) => (
            <motion.circle
                key={`dot-${i}`}
                cx={point.x}
                cy={point.y}
                r="0.4" // Tiny, crisp dots
                fill="var(--color-accent)"
                style={{ opacity: point.o }}
            />
        ))}

      </svg>
    </motion.div>
  );
};

export default GeometricIllustration;
