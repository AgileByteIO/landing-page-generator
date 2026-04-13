import React, { useState, useEffect, useCallback } from 'react';
import FeatherIcon from '../ui/FeatherIcon';

interface CarouselItem {
  title: string;
  description?: string;
  author?: string;
  href: string;
}

interface CarouselProps {
  id?: string;
  title?: string;
  items: CarouselItem[];
  background?: string;
}

export default function Carousel({ id, title, items, background = '' }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) setCardsPerView(1);
      else if (width < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, items.length - cardsPerView);

  useEffect(() => {
    if (items.length <= cardsPerView) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, items.length, cardsPerView]);

  const handleNext = useCallback(() => {
    if (isAnimating || items.length <= cardsPerView) return;
    setDirection('next');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, items.length, cardsPerView, maxIndex]);

  const handlePrev = useCallback(() => {
    if (isAnimating || items.length <= cardsPerView) return;
    setDirection('prev');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, items.length, cardsPerView, maxIndex]);

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex || items.length <= cardsPerView) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const canNavigate = items.length > cardsPerView;

  if (items.length === 0) return null;

  return (
    <section id={id} className={`carousel-section ${background}`}>
      <div className="section-content">
        {title && <h2>{title}</h2>}
        <div className="carousel-wrapper">
          {canNavigate && (
            <button onClick={handlePrev} className="carousel-nav carousel-nav-prev" aria-label="Previous slide">
              <FeatherIcon name="chevron-left" size={24} />
            </button>
          )}

          <div className="carousel-cards-wrapper">
            <div className="carousel-cards-container">
              {items.slice(currentIndex, currentIndex + cardsPerView).map((item, idx) => (
                <a key={`${currentIndex}-${idx}`} href={item.href} className="carousel-card-link">
                  <div className="carousel-card-inner">
                    <span className="carousel-card-index">{String(currentIndex + idx + 1).padStart(2, '0')}</span>
                    <h3 className="carousel-card-title">{item.title}</h3>
                    {item.description && <p className="carousel-card-description">{item.description}</p>}
                    {item.author && <small className="carousel-card-author">By {item.author}</small>}
                    <span className="carousel-card-cta">
                      View details
                      <FeatherIcon name="arrow-right" size={16} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {canNavigate && (
            <button onClick={handleNext} className="carousel-nav carousel-nav-next" aria-label="Next slide">
              <FeatherIcon name="chevron-right" size={24} />
            </button>
          )}
        </div>

        {canNavigate && (
          <div className="carousel-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button key={index} onClick={() => handleDotClick(index)} className={`carousel-dot ${index === currentIndex ? 'active' : ''}`} aria-label={`Go to slide ${index + 1}`} />
            ))}
          </div>
        )}

        <style>{`
          .carousel-section { width: 100%; max-width: 100%; }
          .carousel-wrapper { display: flex; align-items: center; gap: 1rem; width: 100%; }
          .carousel-cards-wrapper { flex: 1; max-width: 80%; margin: 0 auto; }
          .carousel-cards-container { display: flex; gap: 1rem; min-width: 0; }
          .carousel-card-link { flex: 1 1 0; min-width: 0; display: block; background: var(--background); border-radius: var(--border-radius); border: var(--border-width) solid #e2e8f0; box-shadow: var(--box-shadow); text-decoration: none; color: inherit; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); min-height: 280px; max-width: 100%; box-sizing: border-box; }
          .carousel-card-link:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12); border-color: var(--primary); }
          .carousel-card-inner { padding: 2rem; display: flex; flex-direction: column; height: 100%; justify-content: center; position: relative; box-sizing: border-box; min-width: 0; }
          .carousel-card-index { font-size: 3rem; font-weight: 800; color: var(--primary); opacity: 0.15; position: absolute; top: 1rem; right: 1.5rem; font-family: system-ui, -apple-system, sans-serif; line-height: 1; }
          .carousel-card-title { margin-bottom: 0.75rem; }
          .carousel-card-description { font-size: 1rem; color: #64748b; line-height: 1.6; margin-bottom: 0.5rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
          .carousel-card-author { color: var(--accent); font-style: italic; font-size: 0.875rem; margin-bottom: 1rem; }
          .carousel-card-cta { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--primary); font-weight: 600; font-size: 0.95rem; margin-top: 1rem; transition: gap 0.2s ease; }
          .carousel-card-link:hover .carousel-card-cta { gap: 0.75rem; }
          .carousel-nav { flex-shrink: 0; width: 48px; height: 48px; border-radius: 50%; border: var(--border-width) solid #e2e8f0; background: var(--background); color: var(--secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; }
          .carousel-nav:hover { border-color: var(--primary); color: var(--primary); transform: scale(1.05); }
          .carousel-dots { display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.5rem; }
          .carousel-dot { width: 10px; height: 10px; border-radius: 50%; border: none; background: #e2e8f0; cursor: pointer; transition: all 0.25s ease; padding: 0; }
          .carousel-dot:hover { background: #cbd5e1; }
          .carousel-dot.active { background: var(--primary); transform: scale(1.2); }
          @media (max-width: 767px) {
            .carousel-wrapper { gap: 0.5rem; }
            .carousel-cards-wrapper { max-width: 80%; }
            .carousel-cards-container { gap: 0.5rem; }
            .carousel-card-link { min-height: 260px; flex: 1 1 100%; }
            .carousel-card-inner { padding: 1.25rem; }
            .carousel-card-title { font-size: 1.25rem; }
            .carousel-nav { width: 40px; height: 40px; }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .carousel-wrapper { gap: 0.25rem; }
            .carousel-cards-wrapper { max-width: 80%;} 
            .carousel-card-link { flex: 1 1 calc(50% - 0.375rem); max-width: calc(50% - 0.375rem); }
            .carousel-nav { width: 3rem; height: 3rem; }
          }
        `}</style>
      </div>
    </section>
  );
}