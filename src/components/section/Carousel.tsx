import { createSignal, onMount, onCleanup, For, Show } from 'solid-js';
import FeatherIcon from '../ui/FeatherIcon';
import { getCurrentLang, t } from '../../lib/i18n';

interface CarouselItem {
  title: string;
  description?: string;
  href: string;
}

interface CarouselProps {
  id?: string;
  title?: string;
  items: CarouselItem[];
  background?: string;
}

export default function Carousel(props: CarouselProps) {
  const lang = getCurrentLang();
  const viewDetailsText = () => t('carousel.view_details');
  
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [isAnimating, setIsAnimating] = createSignal(false);
  const [direction, setDirection] = createSignal<'next' | 'prev'>('next');
  const [cardsPerView, setCardsPerView] = createSignal(1);

  onMount(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) setCardsPerView(1);
      else if (width < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    onCleanup(() => window.removeEventListener('resize', updateCardsPerView));
  });

  const maxIndex = () => Math.max(0, props.items.length - cardsPerView());
  const canNavigate = () => props.items.length > cardsPerView();

  const handleNext = () => {
    if (isAnimating() || props.items.length <= cardsPerView()) return;
    setDirection('next');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev >= maxIndex() ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    if (isAnimating() || props.items.length <= cardsPerView()) return;
    setDirection('prev');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex() : prev - 1));
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating() || index === currentIndex() || props.items.length <= cardsPerView()) return;
    setDirection(index > currentIndex() ? 'next' : 'prev');
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const visibleItems = () => {
    const start = currentIndex();
    return props.items.slice(start, start + cardsPerView());
  };

  return (
    <Show when={props.items.length > 0}>
      <section id={props.id} class={`carousel-section ${props.background || ''}`}>
        <div class="section-content">
          <Show when={props.title}>
            <h2>{props.title}</h2>
          </Show>
          <div class="carousel-wrapper">
            <Show when={canNavigate()}>
              <button onClick={handlePrev} class="carousel-nav carousel-nav-prev" aria-label="Previous slide">
                <FeatherIcon name="chevron-left" size={24} />
              </button>
            </Show>

            <div class="carousel-cards-wrapper">
              <div class="carousel-cards-container">
                <For each={visibleItems()}>{(item, idx) => (
                  <a href={item.href} class="carousel-card-link">
                    <div class="carousel-card-inner">
                      <span class="carousel-card-index">{String(currentIndex() + idx() + 1).padStart(2, '0')}</span>
                      <h3 class="carousel-card-title">{item.title}</h3>
                      <Show when={item.description}>
                        <p class="carousel-card-description">{item.description}</p>
                      </Show>
                      <span class="carousel-card-cta">
                        {viewDetailsText()}
                        <FeatherIcon name="arrow-right" size={16} />
                      </span>
                    </div>
                  </a>
                )}</For>
              </div>
            </div>

            <Show when={canNavigate()}>
              <button onClick={handleNext} class="carousel-nav carousel-nav-next" aria-label="Next slide">
                <FeatherIcon name="chevron-right" size={24} />
              </button>
            </Show>
          </div>

          <Show when={canNavigate()}>
            <div class="carousel-dots">
              <For each={props.items.slice(0, maxIndex() + 1)}>{(_, i) => (
                <button 
                  onClick={() => handleDotClick(i)} 
                  class={`carousel-dot ${i === currentIndex() ? 'active' : ''}`} 
                  aria-label={`Go to slide ${i + 1}`} 
                />
              )}</For>
            </div>
          </Show>

          <style>{`
            .carousel-section {
              width: 100%;
              max-width: 100%;
            }

            .carousel-wrapper {
              display: flex;
              align-items: center;
              gap: 1rem;
              width: 100%;
            }

            .carousel-cards-wrapper {
              flex: 1;
              max-width: 80%;
              margin: 0 auto;
            }

            .carousel-cards-container {
              display: flex;
              gap: 1rem;
              min-width: 0;
            }

            .carousel-card-link {
              flex: 1 1 0;
              min-width: 0;
              display: block;
              background: var(--background);
              border-radius: var(--border-radius);
              border: var(--border-width) solid oklch(from var(--secondary) 0.7 c);
              box-shadow: var(--box-shadow);
              text-decoration: none;
              color: inherit;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              min-height: 280px;
              max-width: 100%;
              box-sizing: border-box;
            }

            .carousel-card-link:hover {
              transform: translateY(-4px);
              box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
              border-color: var(--primary);
            }

            .carousel-card-inner {
              padding: 2rem;
              display: flex;
              flex-direction: column;
              height: 100%;
              justify-content: center;
              position: relative;
              box-sizing: border-box;
              min-width: 0;
            }

            .carousel-card-index {
              font-size: 3rem;
              font-weight: 800;
              color: var(--primary);
              opacity: 0.15;
              position: absolute;
              top: 1rem;
              right: 1.5rem;
              font-family: system-ui, -apple-system, sans-serif;
              line-height: 1;
            }

            .carousel-card-title {
              margin-bottom: 0.75rem;
            }

            .carousel-card-description {
              font-size: 1rem;
              color: var(--secondary);
              opacity: 0.7;
              line-height: 1.6;
              margin-bottom: 0.5rem;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            .carousel-card-cta {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              color: var(--primary);
              font-weight: 600;
              font-size: 0.95rem;
              margin-top: 1rem;
              transition: gap 0.2s ease;
            }

            .carousel-card-link:hover .carousel-card-cta {
              gap: 0.75rem;
            }

            .carousel-nav {
              flex-shrink: 0;
              width: 48px;
              height: 48px;
              border-radius: 50%;
              border: var(--border-width) solid oklch(from var(--secondary) 0.7 c);
              background: var(--background);
              color: var(--secondary);
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.2s ease;
            }

            .carousel-nav:hover {
              border-color: var(--primary);
              color: var(--primary);
              transform: scale(1.05);
            }

            .carousel-dots {
              display: flex;
              justify-content: center;
              gap: 0.5rem;
              margin-top: 1.5rem;
            }

            .carousel-dot {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              border: none;
              background: oklch(from var(--secondary) 0.7 c);
              cursor: pointer;
              transition: all 0.25s ease;
              padding: 0;
            }

            .carousel-dot:hover {
              background: oklch(from var(--secondary) 0.5 c);
            }

            .carousel-dot.active {
              background: var(--primary);
              transform: scale(1.2);
            }

            @media (max-width: 767px) {
              .carousel-wrapper {
                gap: 0.5rem;
              }

              .carousel-cards-wrapper {
                max-width: 80%;
              }

              .carousel-cards-container {
                gap: 0.5rem;
              }

              .carousel-card-link {
                min-height: 260px;
                flex: 1 1 100%;
              }

              .carousel-card-inner {
                padding: 1.25rem;
              }

              .carousel-card-title {
                font-size: 1.25rem;
              }

              .carousel-nav {
                width: 40px;
                height: 40px;
              }
            }

            @media (min-width: 768px) and (max-width: 1023px) {
              .carousel-wrapper {
                gap: 0.25rem;
              }

              .carousel-cards-wrapper {
                max-width: 80%;
              }

              .carousel-card-link {
                flex: 1 1 calc(50% - 0.375rem);
                max-width: calc(50% - 0.375rem);
              }

              .carousel-nav {
                width: 3rem;
                height: 3rem;
              }
            }
          `}</style>
        </div>
      </section>
    </Show>
  );
}