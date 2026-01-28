import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HorizontalCircles = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Neural Grid Configuration
  // MASSIVE width to guarantee edge-to-edge
  const cols = 40; 
  const rows = 8;  
  const gap = 80; 
  
  // Extra wide viewBox
  const viewBoxWidth = 3200; 
  const viewBoxHeight = 700;
  
  const gridWidth = (cols - 1) * gap;
  const gridHeight = (rows - 1) * gap;
  const startX = (viewBoxWidth - gridWidth) / 2;
  const startY = (viewBoxHeight - gridHeight) / 2;

  // Memoize grid generation
  const { nodes, connections } = useMemo(() => {
    const n = [];
    const c = [];
    
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        // Random "Active Neuron" Pattern
        const isCenterY = Math.abs(r - rows/2) < 2;
        let probability = 0.85; 
        if (isCenterY) probability = 0.82; 

        // Fix impure Math.random issue by seeding or just accepting it triggers on render (it's memoized so stable)
        // We will keep Math.random inside useMemo, which is fine as it runs once.
        const isActive = Math.random() > probability;
        
        n.push({ 
          r, c: col, 
          id: `node-${r}-${col}`,
          x: startX + col * gap, 
          y: startY + r * gap,
          isActive: isActive 
        });

        // Generate Connections
        if (col < cols - 1) { // Horizontal
           c.push({ 
             id: `h-${r}-${col}`, 
             x1: startX + col * gap, y1: startY + r * gap,
             x2: startX + (col+1) * gap, y2: startY + r * gap,
             r, c: col, type: 'horizontal'
           });
        }
        if (r < rows - 1) { // Vertical
           c.push({ 
             id: `v-${r}-${col}`,
             x1: startX + col * gap, y1: startY + r * gap,
             x2: startX + col * gap, y2: startY + (r+1) * gap,
             r, c: col, type: 'vertical'
           });
        }
      }
    }
    return { nodes: n, connections: c };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg 
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid slice" 
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        {/* CONNECTIONS LAYER */}
        {connections.map((conn) => (
          <NeuralConnection 
            key={conn.id} 
            data={conn} 
            progress={scrollYProgress} 
            cols={cols}
          />
        ))}

        {/* NODES LAYER */}
        {nodes.map((node) => (
          <NeuralNode 
            key={node.id} 
            data={node} 
            progress={scrollYProgress} 
            cols={cols}
          />
        ))}
      </svg>
    </div>
  );
};

// --- Subcomponents ---

const NeuralConnection = ({ data, progress, cols }) => {
  // Wave Logic
  const normPos = data.c / cols;
  
  // Adjusted timing: finishes much earlier to avoid getting stuck
  // Start ranges from -0.1 to 0.4 (approx)
  const start = -0.1 + normPos * 0.5;
  const end = start + 0.3;

  const opacity = useTransform(progress, [start, start + 0.15, end], [0.1, 0.6, 0.1]);
  
  return (
    <motion.line
      x1={data.x1} y1={data.y1}
      x2={data.x2} y2={data.y2}
      stroke="rgba(255,255,255,0.15)"
      strokeWidth="1"
      style={{ opacity }}
    />
  );
};

const NeuralNode = ({ data, progress, cols }) => {
  const normPos = data.c / cols;
  
  // Synced with connections
  const start = -0.1 + normPos * 0.5;
  const end = start + 0.3;

  // Visuals
  const baseColor = data.isActive ? "#FF5500" : "#FFFFFF";
  const baseRadius = data.isActive ? 4 : 2;
  const baseOpacity = data.isActive ? 0.9 : 0.3;

  // Animation
  const scale = useTransform(progress, [start, start + 0.15, end], [0.8, 1.5, 1]);
  const opacity = useTransform(progress, [start, start + 0.15, end], [0.1, 1, baseOpacity]);

  return (
    <motion.circle
      cx={data.x} cy={data.y} r={baseRadius}
      fill={baseColor}
      style={{ scale, opacity }}
    />
  );
};

export default HorizontalCircles;
