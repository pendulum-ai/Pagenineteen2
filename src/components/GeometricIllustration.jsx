import React, { useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';

// Interpolate array of points with extra properties (r: radius, o: opacity)
const useMorphPoints = (progress, states) => {
  const numPoints = states[0].length;
  const interpolatedPoints = [];

  for (let i = 0; i < numPoints; i++) {
    const xRange = states.map(s => s[i].x);
    const yRange = states.map(s => s[i].y);
    const rRange = states.map(s => s[i].r);
    const oRange = states.map(s => s[i].o);
    
    // PER-POINT STAGGERING (The "Organic Explosion" logic)
    // To avoid the "visual zoom" effect where everything moves linearly together,
    // we give each point a different start/end time for the Big Bang phase.
    
    // Delay: some points start moving at 0.00, others wait until ~0.08
    // We use a pseudo-random pattern based on index to distribute delays
    const delay = ((i * 7) % 5) * 0.015; // 0 to 0.06
    
    // MAPPING:
    // [0 + delay]: Point sits at Center (State 0) until this progress
    // [0.15]: Arrives at Grid (State 1) together (or we could stagger arrival too, but overlapping arrival is cleaner)
    // ... standard reading stops ...
    // [1 - delay]: Collapses back to Center
    
    // Standard stops: 0.15, 0.38, 0.62, 0.85
    const inputRange = [
        0 + delay,       // Start expanding (Singularity)
        0.15,            // State 1 (Grid)
        0.38,            // State 2 (Diagonal)
        0.62,            // State 3 (Core)
        0.85,            // State 4 (Frames)
        1 - delay        // Finish collapsing (Singularity)
    ];

    // Note: Since 'states' has 6 items: [Zero, L1, L2, L3, L4, Zero]
    // And inputRange has 6 items. Matches perfectly.
    // Framer Motion automatically clamps: if progress < 0+delay, it uses value at index 0 (Center).

    // eslint-disable-next-line
    const x = useTransform(progress, inputRange, xRange);
    // eslint-disable-next-line
    const y = useTransform(progress, inputRange, yRange);
    // eslint-disable-next-line
    const r = useTransform(progress, inputRange, rRange);
    // eslint-disable-next-line
    const o = useTransform(progress, inputRange, oRange);

    interpolatedPoints.push({ x, y, r, o, id: i });
  }

  return interpolatedPoints;
};

// 12 points is a good balance for these shapes
const getLayouts = () => {
    // Helper to create point
    const p = (x, y, r = 15, o = 1) => ({ x, y, r, o });

    // State 0: "The Singularity"
    // All points collapsed to the absolute center.
    // User requested "one orange point" look -> Opacity 1, Radius > 0
    const layoutZero = [];
    for(let i=0; i<12; i++) {
        // Radius 4 (small dot). When 12 stack, it looks like one solid dot.
        layoutZero.push(p(50, 50, 4, 1)); 
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
        const r = 15 + Math.sin(t * Math.PI) * 15; 
        layout2.push(p(x, y, r, 1));
    }

    // State 3: "Core" - The Nucleus
    const layout3 = [];
    for(let i=0; i<12; i++) {
        if (i < 4) {
             layout3.push(p(50 + (i%2 ? -2:2), 50 + (i>1 ? -2:2), 35, 1));
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
            layout4.push(p(25 + col*10, 25 + row*10, 8, 1));
        } else {
            const j = i - 6;
            const col = j % 3;
            const row = Math.floor(j / 3);
            layout4.push(p(55 + col*10, 55 + row*10, 20, 1));
        }
    }

    // Return 6 states: Start -> 4 Shapes -> End
    // Removed "layoutRing" as user didn't like the flower look. 
    // Staggering in useMorphPoints now handles the "non-zoom" requirement.
    return [layoutZero, layout1, layout2, layout3, layout4, layoutZero];
};

const GeometricIllustration = ({ scrollYProgress }) => {
  const states = useMemo(() => getLayouts(), []);
  const points = useMorphPoints(scrollYProgress, states);

  // Sync overall visibility with the content flow
  // Fade in at start (0-0.1) and fade out at end (0.9-1.0)
  const containerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

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
      const dists = states.map(layout => {
          const p1 = layout[i];
          const p2 = layout[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          return Math.sqrt(dx*dx + dy*dy);
      });

      // Threshold for connection
      // Reduced to 30 to avoid "ghost lines" appearing during dense phases (zoom/collapse)
      const THRESHOLD = 30;
      
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
      const opacity = useTransform(scrollYProgress, [0, 0.15, 0.38, 0.62, 0.85, 1], opacities);
      
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
