import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// Error Boundary
// --------------------------------------------------------
class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error) { 
    console.error("WebGL Crash:", error); 
    this.setState({ hasError: true });
  }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

// --------------------------------------------------------
// Particle System Shader
// --------------------------------------------------------
const particleVertexShader = `
  uniform float uTime;
  uniform float uHover;
  uniform sampler2D uTexture;
  uniform vec2 uGrid;
  
  attribute vec3 aOffset; // Grid position (0..1)
  attribute float aRandom;
  
  varying vec2 vUv;
  varying vec3 vColor;
  varying float vAlpha;
  
  // Random function
  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  void main() {
    vUv = aOffset.xy;
    
    // Sample color from texture at this grid position
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Original Position (Flat Grid)
    vec3 pos = position; // Local particle vertex
    
    // Instance Base Position 
    // Map aOffset (0..1) to World Space centered at 0
    vec3 instancePos = vec3((aOffset.x - 0.5), (aOffset.y - 0.5), 0.0);
    
    // --- Disintegration Effect ---
    // Hover State logic
    float t = uHover;
    
    // Noise/Displacement
    float noise = rand(aOffset.xy + t);
    
    // Z-Axis Explosion
    // Particles move towards camera and scatter
    float zDisp = t * (noise * 0.5); 
    
    // XY Scatter
    // Particles drift slightly apart
    float spread = t * 0.1;
    vec3 scatter = vec3((aOffset.x - 0.5) * spread, (aOffset.y - 0.5) * spread, zDisp);
    
    // Apply position
    // Scale instance positions to fit the viewport (passed via uniforms or calculated)
    // Here we assume scene scaling handles the container size
    
    vec3 finalPos = instancePos + scatter + pos;
    
    // Scale Particle Size
    // Small when image, larger when 'digital'
    float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    float baseScale = 1.0;
    
    // Morph scale: 
    // State 0: Full coverage (squares touching)
    // State 1: Dots (circles separated)
    
    // Vertex displacement for scale (simplified)
    /* Ideally we do this by scaling 'pos' */
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
    
    // Pass color to fragment
    vColor = texColor.rgb;
    vAlpha = texColor.a;
  }
`;

const particleFragmentShader = `
  uniform float uHover;
  uniform vec3 uAccentColor;
  
  varying vec2 vUv;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Circle Shape Logic for Particles
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    
    // Soft Circle / Hard Circle depending on look
    // Let's make them soft glowing data points
    float delta = fwidth(r);
    float alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
    
    // If we want square pixels at rest?
    // Let's stick to "Holographic Dots" style always for this 'Particle' version
    // Or morph shape?
    // Simple approach: Always circular dots for "Data" look.
    
    // Color Morph
    // From Original Color -> Orange Accent
    vec3 finalColor = mix(vColor, uAccentColor, uHover * 0.8);
    
    // Alpha
    // Discard transparent parts of original image
    if (vAlpha < 0.1) discard;
    
    gl_FragColor = vec4(finalColor, alpha * vAlpha);
  }
`;


// Shader Material (RawShaderMaterial or ShaderMaterial)
// We need access to instancing attributes, so ShaderMaterial is good.

const ParticleMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uHover: { value: 0 },
    uTexture: { value: null },
    uAccentColor: { value: new THREE.Color('#FF4D00') }, // Orange
    uGrid: { value: new THREE.Vector2(100, 100) }
  },
  vertexShader: particleVertexShader,
  fragmentShader: particleFragmentShader,
  transparent: true,
  depthTest: false, // For "hologram" feel
  blending: THREE.NormalBlending // Changed from Additive to ensure visibility on light variations
});


const Particles = ({ img, active, onLoad }) => {
  const meshRef = useRef();
  const { viewport } = useThree();
  const texture = useTexture(img);
  
  // Notify parent that texture is loaded (suspense ensures this runs after)
  React.useLayoutEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  // Calculate Scale to Cover Viewport
  const imgAspect = texture.image.width / texture.image.height;
  const vpAspect = viewport.width / viewport.height;

  let scaleX, scaleY;
  if (vpAspect > imgAspect) {
    scaleX = viewport.width;
    scaleY = viewport.width / imgAspect;
  } else {
    scaleY = viewport.height;
    scaleX = viewport.height * imgAspect;
  }

  // Grid Density
  // Use fixed count for performance
  const count = 4096; // 64x64 equivalent
  const aspect = scaleX / scaleY;
  
  // derived grid - approximate square root
  const gridSizeY = Math.sqrt(count / aspect);
  const gridSizeX = gridSizeY * aspect;
  
  const widthCount = Math.floor(gridSizeX);
  const heightCount = Math.floor(gridSizeY);
  const totalParticles = widthCount * heightCount;

  // Generate Instanced Attributes
  const attributes = useMemo(() => {
    const offsets = new Float32Array(totalParticles * 3);
    const randoms = new Float32Array(totalParticles);
    
    for (let i = 0; i < totalParticles; i++) {
        const x = (i % widthCount) / widthCount;
        const y = Math.floor(i / widthCount) / heightCount;
        
        offsets[i * 3 + 0] = x;
        offsets[i * 3 + 1] = y;
        offsets[i * 3 + 2] = 0;
        
        randoms[i] = Math.random();
    }
    
    return { offsets, randoms };
  }, [widthCount, heightCount, totalParticles]);
  
  // Generate Geometry explicitly to avoid JSX nesting issues
  const particleGeometry = useMemo(() => {
    // Base Geometry (Quad)
    const geo = new THREE.PlaneGeometry(1/widthCount, 1/heightCount);
    
    // Add Instanced Attributes
    geo.setAttribute('aOffset', new THREE.InstancedBufferAttribute(attributes.offsets, 3));
    geo.setAttribute('aRandom', new THREE.InstancedBufferAttribute(attributes.randoms, 1));
    
    return geo;
  }, [widthCount, heightCount, attributes]);

  // Material
  const material = useMemo(() => {
      const mat = ParticleMaterial.clone();
      mat.uniforms.uTexture.value = texture;
      return mat;
  }, [texture]);

  useFrame((state, delta) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth Hover
      const target = active ? 1.0 : 0.0;
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value, 
        target, 
        delta * 3
      );
    }
  });

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[particleGeometry, material, totalParticles]}
      scale={[scaleX, scaleY, 1]}
      frustumCulled={false} // CRITICAL: Prevent culling of displaced particles
    />
  );
};


// --------------------------------------------------------
// Main Component
// --------------------------------------------------------
const DigitalImage = ({ src, alt, className, style, active }) => {
  const [contextLost, setContextLost] = useState(false);
  const [ready, setReady] = useState(false);

  // Fallback / Underlay Image
  // Always render this to prevent "Gray Box" during loading
  const FallbackImage = (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        display: 'block',
        pointerEvents: 'none', // Allow hover on canvas
        opacity: ready ? 0 : 1, // Fade out when WebGL is ready
        transition: 'opacity 0.5s ease',
        ...style 
      }} 
    />
  );

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }} aria-label={alt}>
      {/* 1. Underlying Static Image (Visible while loading / if fail) */}
      {FallbackImage}
      
      {/* 2. WebGL Layer (Transparent) */}
      {!contextLost && (
        <WebGLErrorBoundary fallback={null}>
          <Canvas
            key={src} 
            dpr={[1, 1.5]} 
            gl={{ 
              antialias: false,
              alpha: true,
              powerPreference: "high-performance",
            }}
            style={{ 
              position: 'absolute', // Sit on top
              top: 0,
              left: 0,
              width: '100%', 
              height: '100%', 
              display: 'block',
              zIndex: 1,
              opacity: ready ? 1 : 0, // Fade in
              transition: 'opacity 0.5s ease'
            }}
            onCreated={({ gl }) => {
               gl.domElement.addEventListener("webglcontextlost", (e) => {
                  e.preventDefault();
                  setContextLost(true);
               });
            }}
            camera={{ position: [0, 0, 1] }} 
            orthographic
          >
            <Suspense fallback={null}>
               <Particles 
                 img={src} 
                 active={active} 
                 onLoad={() => setReady(true)} 
               />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      )}
    </div>
  );
};

export default DigitalImage;
