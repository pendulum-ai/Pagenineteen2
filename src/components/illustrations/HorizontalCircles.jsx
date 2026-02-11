import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HorizontalCircles = ({ isMobile = false }) => {
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
            isMobile={isMobile}
          />
        ))}

        {/* NODES LAYER */}
        {nodes.map((node) => (
          <NeuralNode 
            key={node.id} 
            data={node} 
            progress={scrollYProgress} 
            cols={cols}
            isMobile={isMobile}
          />
        ))}
      </svg>
    </div>
  );
};

// --- Subcomponents ---

const NeuralConnection = ({ data, progress, cols, isMobile }) => {
  // Wave Logic
  const normPos = data.c / cols;
  
  // Adjusted timing: finishes much earlier to avoid getting stuck
  const start = -0.1 + normPos * 0.5;
  const end = start + 0.3;

  // Mobile: dampen peak opacity to reduce visual noise under text
  const peakOpacity = isMobile ? 0.25 : 0.6;
  const restOpacity = isMobile ? 0.05 : 0.1;

  const opacity = useTransform(progress, [start, start + 0.15, end], [restOpacity, peakOpacity, restOpacity]);
  
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

const NeuralNode = ({ data, progress, cols, isMobile }) => {
  const normPos = data.c / cols;
  
  // Synced with connections
  const start = -0.1 + normPos * 0.5;
  const end = start + 0.3;

  // Visuals — mobile: less intense colors and smaller radii
  const baseColor = data.isActive ? "#FF5500" : "#FFFFFF";
  const baseRadius = data.isActive ? (isMobile ? 3 : 4) : 2;

  // Mobile: much lower peak opacity so dots don't compete with text
  const baseOpacity = data.isActive
    ? (isMobile ? 0.3 : 0.9)
    : (isMobile ? 0.15 : 0.3);
  const peakOpacity = isMobile ? 0.4 : 1;
  const restOpacity = isMobile ? 0.05 : 0.1;

  // Animation — mobile: subtler scale pulse
  const peakScale = isMobile ? 1.15 : 1.5;
  const scale = useTransform(progress, [start, start + 0.15, end], [0.8, peakScale, 1]);
  const opacity = useTransform(progress, [start, start + 0.15, end], [restOpacity, peakOpacity, baseOpacity]);

  return (
    <motion.circle
      cx={data.x} cy={data.y} r={baseRadius}
      fill={baseColor}
      style={{ scale, opacity }}
    />
  );
};

export default HorizontalCircles;
