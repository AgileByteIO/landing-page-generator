import React, { useState } from 'react';
import Card from './Card';
import ArrowIconButton from '../action/ArrowIconButton';

interface CarouselItem {
  title: string;
  description?: string;
  author?: string;
  href: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const maxIndex = Math.max(0, items.length - 1);

  const goToPrevious = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="carousel-wrapper">
      <div className="carousel-content">
        {items.length > 1 && (
          <ArrowIconButton
            icon="left"
            onClick={goToPrevious}
            aria-label="Previous"
            className="carousel-btn carousel-btn-prev"
          />
        )}
        <div className={`carousel-card slide-${direction}`} key={currentIndex}>
          <Card {...currentItem} />
        </div>
        {items.length > 1 && (
          <ArrowIconButton
            icon="right"
            onClick={goToNext}
            aria-label="Next"
            className="carousel-btn carousel-btn-next"
          />
        )}
      </div>
      {items.length > 1 && (
        <div className="dots">
          {items.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
