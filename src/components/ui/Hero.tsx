import React, { useRef, useState, useEffect } from 'react';
import { useShader, getShaderConfig, getShaderTypeFromEnv, getComponentStyleConfig, isWebGLAvailable } from './shaders';

interface HeroProps {
  title: string;
  description?: string;
  author?: string;
  href: string;
  /**
   * Layout of the hero content: 'stacked' (vertical) or 'side-by-side' (horizontal)
   * @default process.env.HERO_LAYOUT || 'stacked'
   */
  layout?: 'stacked' | 'side-by-side';
  /**
   * Text alignment: 'left', 'center', or 'right'
   * @default process.env.HERO_ALIGNMENT || 'left'
   */
  alignment?: 'left' | 'center' | 'right';
  /**
   * CTA button variant styling
   * @default process.env.HERO_CTA_VARIANT || 'primary'
   */
  ctaVariant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /**
   * Whether to show the author line
   * @default process.env.HERO_SHOW_AUTHOR === 'false' ? false : true
   */
  showAuthor?: boolean;
  /**
   * Maximum number of lines for description before truncation
   * @default process.env.HERO_DESCRIPTION_MAX_LINES || 3
   */
  descriptionMaxLines?: number;
  /**
   * Height behavior: 'full-screen' (100vh), 'fixed' (px), or 'auto' (content-based)
   * @default process.env.HERO_HEIGHT || 'full-screen'
   */
  height?: 'full-screen' | 'fixed' | 'auto';
  /**
   * Fixed height in pixels when height='fixed'
   * @default process.env.HERO_MIN_HEIGHT || 600
   */
  minHeight?: number;
  /**
   * Background type: 'shader', 'solid', 'gradient', or 'image'
   * @default process.env.HERO_BACKGROUND_TYPE || 'shader'
   */
  backgroundType?: 'shader' | 'solid' | 'gradient' | 'image';
  /**
   * Gradient color stops (CSS gradient format) when backgroundType='gradient'
   * @default ['var(--primary)', 'var(--secondary)']
   */
  gradientColors?: string[];
  /**
   * Image URL when backgroundType='image'
   */
  imageSrc?: string;
  /**
   * Top shape divider: false or 'wave' | 'curve' | 'angle'
   * @default process.env.HERO_SHAPE_DIVIDER_TOP === 'true' ? 'wave' : false
   */
  shapeDividerTop?: boolean | 'wave' | 'curve' | 'angle';
  /**
   * Bottom shape divider: false or 'wave' | 'curve' | 'angle'
   * @default process.env.HERO_SHAPE_DIVIDER_BOTTOM === 'true' ? 'wave' : false
   */
  shapeDividerBottom?: boolean | 'wave' | 'curve' | 'angle';
  /**
   * Social proof badge: { label: string; count: number }
   */
  socialProof?: { label: string; count: number };
}

export default function Hero({
  title,
  description,
  author,
  href,
  layout,
  alignment,
  ctaVariant,
  showAuthor,
  descriptionMaxLines,
  height,
  minHeight,
  backgroundType,
  gradientColors,
  imageSrc,
  shapeDividerTop,
  shapeDividerBottom,
  socialProof,
}: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasShader, setHasShader] = useState(true);
  const [containerHeight, setContainerHeight] = useState(400);

  // Get values from props or fallback to environment variables or defaults
  const effectiveLayout = layout ?? (process.env.HERO_LAYOUT as 'stacked' | 'side-by-side') ?? 'stacked';
  const effectiveAlignment = alignment ?? (process.env.HERO_ALIGNMENT as 'left' | 'center' | 'right') ?? 'left';
  const effectiveCtaVariant = ctaVariant ?? (process.env.HERO_CTA_VARIANT as 'primary' | 'secondary' | 'outline' | 'ghost') ?? 'primary';
  const effectiveShowAuthor = showAuthor ?? (process.env.HERO_SHOW_AUTHOR === 'false' ? false : true);
  const effectiveDescriptionMaxLines = descriptionMaxLines ?? (() => {
      const envValue = Number(process.env.HERO_DESCRIPTION_MAX_LINES);
      return Number.isNaN(envValue) ? 3 : envValue;
  })();
  const effectiveHeight = height ?? (process.env.HERO_HEIGHT as 'full-screen' | 'fixed' | 'auto') ?? 'full-screen';
  const effectiveMinHeight = minHeight ?? Number(process.env.HERO_MIN_HEIGHT) ?? 600;
  const effectiveBackgroundType = backgroundType ?? (process.env.HERO_BACKGROUND_TYPE as 'shader' | 'solid' | 'gradient' | 'image') ?? 'shader';
  const effectiveGradientColors = gradientColors ?? (process.env.HERO_GRADIENT_COLORS?.split(',') ?? ['var(--primary)', 'var(--secondary)']);
  const effectiveImageSrc = imageSrc ?? process.env.HERO_IMAGE_SRC;
  const effectiveShapeDividerTop = shapeDividerTop ?? (process.env.HERO_SHAPE_DIVIDER_TOP === 'true' ? (process.env.HERO_SHAPE_DIVIDER_TOP_VALUE as 'wave' | 'curve' | 'angle') ?? 'wave' : false);
  const effectiveShapeDividerBottom = shapeDividerBottom ?? (process.env.HERO_SHAPE_DIVIDER_BOTTOM === 'true' ? (process.env.HERO_SHAPE_DIVIDER_BOTTOM_VALUE as 'wave' | 'curve' | 'angle') ?? 'wave' : false);

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

  // Calculate container height based on height prop
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let calculatedHeight = 400; // fallback
      
      if (effectiveHeight === 'full-screen') {
        calculatedHeight = window.innerHeight;
      } else if (effectiveHeight === 'fixed') {
        calculatedHeight = effectiveMinHeight;
      } else {
        // 'auto' - will be content-based, min height still applies
        calculatedHeight = effectiveMinHeight;
      }
      
      setContainerHeight(calculatedHeight);
    }
  }, [effectiveHeight, effectiveMinHeight, window.innerHeight]);

  // Update height on resize for full-screen mode
  useEffect(() => {
    if (effectiveHeight === 'full-screen' && typeof window !== 'undefined') {
      const handleResize = () => {
        setContainerHeight(window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [effectiveHeight]);

  // CTA button class based on variant
  const getCtaClass = () => {
    const base = 'hero-link';
    switch (effectiveCtaVariant) {
      case 'primary': return `${base} hero-link-primary`;
      case 'secondary': return `${base} hero-link-secondary`;
      case 'outline': return `${base} hero-link-outline`;
      case 'ghost': return `${base} hero-link-ghost`;
      default: return base;
    }
  };

  // Background style based on type
  const getBackgroundStyle = () => {
    switch (effectiveBackgroundType) {
      case 'solid':
        return { backgroundColor: 'var(--background)' };
      case 'gradient':
        return { 
          background: `linear-gradient(135deg, ${effectiveGradientColors.join(', ')})` 
        };
      case 'image':
        if (effectiveImageSrc) {
          return { 
            backgroundImage: `url(${effectiveImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          };
        }
        return { backgroundColor: 'var(--background)' };
      case 'shader':
      default:
        return {}; // Handled by shader or fallback div
    }
  };

  // Shape divider component
  const ShapeDivider = ({ position }: { position: 'top' | 'bottom' }) => {
    const dividerType = position === 'top' ? effectiveShapeDividerTop : effectiveShapeDividerBottom;
    if (!dividerType) return null;

    // SVG path data for different divider types
    const paths: Record<string, string> = {
      wave: 'M0 64C34.3 96 102.9 128 192 128C281.1 128 349.7 96 384 64L384 0H0Z',
      curve: 'M0 32C48 48 96 80 144 96C192 112 240 112 288 96C336 80 384 64 384 32L384 0H0Z',
      angle: 'M0 0L384 0L384 100L0 100Z'
    };

    const path = paths[dividerType] || paths.wave;

    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 384 100" 
        preserveAspectRatio="none"
        style={{ 
          position: 'absolute', 
          left: 0, 
          width: '100%', 
          height: position === 'top' ? 0 : '100px',
          bottom: position === 'top' ? '100px' : 0,
          zIndex: 2
        }}
      >
        <path fill="var(--background)" d={path} />
      </svg>
    );
  };

  return (
    <div 
      className="hero" 
      style={{ 
        position: 'relative', 
        minHeight: `${containerHeight}px`,
        overflow: 'hidden',
        border: `${styleConfig.borderWidth} solid var(--primary)`,
        borderRadius: styleConfig.borderRadius,
        boxShadow: styleConfig.boxShadow,
        ...getBackgroundStyle()
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
      
      {/* Shape dividers */}
      <ShapeDivider position="top" />
      <ShapeDivider position="bottom" />
      
      <div 
        className="hero-content" 
        style={{ 
          position: 'relative', 
          zIndex: 3, 
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: effectiveAlignment === 'left' ? 'flex-start' : 
                        effectiveAlignment === 'center' ? 'center' : 'flex-end',
          textAlign: effectiveAlignment,
          padding: '2rem',
          gap: effectiveLayout === 'side-by-side' ? '4rem' : 0,
          flexDirection: effectiveLayout === 'side-by-side' ? 'row' : 'column'
        }}
      >
        {/* Content column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {socialProof && (
            <div className="hero-social-proof" style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--secondary)',
              marginBottom: '1rem'
            }}>
              <span>{socialProof.label}</span>
              <span>{socialProof.count.toLocaleString()}</span>
            </div>
          )}
          
          <h1 className="hero-title" style={{ 
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            {title}
          </h1>
          
          {description && (
            <p 
              className="hero-description" 
              style={{ 
                marginBottom: effectiveShowAuthor && author ? '1.5rem' : '2rem',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: effectiveDescriptionMaxLines,
                overflow: 'hidden'
              }}
            >
              {description}
            </p>
          )}
          
          {effectiveShowAuthor && author && (
            <p className="hero-author" style={{ 
              fontSize: '0.875rem',
              fontStyle: 'italic',
              color: 'var(--secondary)'
            }}>
              By {author}
            </p>
          )}
          
          <a 
            href={href} 
            className={getCtaClass()}
            style={{ 
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Read more
          </a>
        </div>
        
        {/* Image column for side-by-side layout */}
        {effectiveLayout === 'side-by-side' && effectiveImageSrc && (
          <div 
            style={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src={effectiveImageSrc} 
              alt={`${title} illustration`}
              style={{ 
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}