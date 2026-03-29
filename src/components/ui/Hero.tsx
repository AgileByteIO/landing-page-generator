import React, { useRef, useState, useEffect } from 'react';
import { useShader, getShaderConfig, getShaderTypeFromEnv, getComponentStyleConfig, isWebGLAvailable } from './shaders';

interface HeroProps {
  title: string;
  description?: string;
  author?: string;
  href: string;
}

export default function Hero({ title, description, author, href }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasShader, setHasShader] = useState(true);
  const [containerHeight, setContainerHeight] = useState(400);

  const shaderConfig = getShaderConfig(getShaderTypeFromEnv());
  const styleConfig = getComponentStyleConfig();

  const fallback = () => {
    setHasShader(false);
  };

  useShader(canvasRef, hasShader ? shaderConfig : null, fallback);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isWebGLAvailable()) {
      setHasShader(false);
    }
  }, []);

  return (
    <div 
      className="hero" 
      style={{ 
        position: 'relative', 
        minHeight: `${containerHeight}px`,
        overflow: 'hidden',
        border: `${styleConfig.borderWidth} solid var(--primary)`,
        borderRadius: styleConfig.borderRadius,
        boxShadow: styleConfig.boxShadow
      }}
    >
      {hasShader ? (
        <canvas 
          ref={canvasRef} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
          }}
        />
      ) : (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--background)',
            zIndex: 0
          }}
        />
      )}
      <div className="hero-content" style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
        <h1>{title}</h1>
        {description && <p className="hero-description">{description}</p>}
        {author && <p className="hero-author">By {author}</p>}
        <a href={href} className="hero-link">Read more</a>
      </div>
    </div>
  );
}