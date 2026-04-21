import { createSignal, onMount, onCleanup, For, Show } from 'solid-js';
import FeatherIcon from '../ui/FeatherIcon';
import DomainIcon from '../ui/DomainIcon';

interface CarouselItem {
  title: string;
  description?: string;
  href: string;
  'domain-icon'?: string;
}

interface CarouselProps {
  id?: string;
  lang?: string;
  title?: string;
  items: CarouselItem[];
  background?: string;
}

export default function Carousel(props: CarouselProps) {
  let containerRef: HTMLDivElement | undefined;

  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [isDragging, setIsDragging] = createSignal(false);
  const [startX, setStartX] = createSignal(0);
  const [scrollLeft, setScrollLeft] = createSignal(0);
  const [cardsPerView, setCardsPerView] = createSignal(3);

  const lang = () => props.lang || 'en';

  const totalPages = () => Math.max(1, Math.ceil(props.items.length / cardsPerView()));

  const goTo = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, totalPages() - 1));
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const next = () => goTo(currentIndex() + 1);
  const prev = () => goTo(currentIndex() - 1);

  const scrollToIndex = (index: number) => {
    if (!containerRef) return;
    const cardWidth = getCardWidth();
    const targetScroll = index * cardWidth * cardsPerView();
    containerRef.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  const getCardWidth = () => {
    if (!containerRef) return 300;
    const containerWidth = containerRef.offsetWidth;
    return containerWidth / cardsPerView();
  };

  const goToFromScroll = () => {
    if (!containerRef || isDragging()) return;
    const cardWidth = getCardWidth();
    const scrollLeftPos = containerRef.scrollLeft;
    const newIndex = Math.round(scrollLeftPos / (cardWidth * cardsPerView()));
    const safeIndex = Math.max(0, Math.min(newIndex, totalPages() - 1));
    if (safeIndex !== currentIndex()) {
      setCurrentIndex(safeIndex);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!containerRef) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.offsetLeft);
    setScrollLeft(containerRef.scrollLeft);
    containerRef.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging() || !containerRef) return;
    e.preventDefault();
    const x = e.pageX - containerRef.offsetLeft;
    const walk = (x - startX()) * 1.5;
    containerRef.scrollLeft = scrollLeft() - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef) containerRef.style.cursor = 'grab';
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!containerRef) return;
    setStartX(e.touches[0].pageX);
    setScrollLeft(containerRef.scrollLeft);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!containerRef) return;
    const walk = (startX() - e.touches[0].pageX) * 1.5;
    containerRef.scrollLeft = scrollLeft() + walk;
  };

  const updateCardsPerView = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    if (width < 640) {
      setCardsPerView(1);
    } else if (width < 1024) {
      setCardsPerView(2);
    } else {
      setCardsPerView(3);
    }
  };

  onMount(() => {
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    onCleanup(() => window.removeEventListener('resize', updateCardsPerView));

    if (containerRef && props.items.length > 0) {
      scrollToIndex(0);
    }
  });

  return (
    <Show when={props.items.length > 0}>
      <section id={props.id} class={`carousel-section ${props.background || ''}`}>
        <div class="section-content">
          <Show when={props.title}>
            <h2 class="carousel-title">{props.title}</h2>
          </Show>

          <div class="carousel-wrapper">
            <button
              class="carousel-nav carousel-nav-prev"
              onClick={prev}
              disabled={currentIndex() === 0}
              aria-label="Previous"
            >
              <FeatherIcon name="chevron-left" size={20} />
            </button>

            <div
              ref={containerRef}
              class="carousel-container"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onScroll={goToFromScroll}
            >
              <div class="carousel-track">
                <For each={props.items}>{(item, idx) => (
                  <a
                    href={item.href}
                    class="carousel-card"
                    style={{ 'animation-delay': `${idx() * 50}ms` }}
                  >
                    <div class="carousel-card-inner">
                      <Show when={item['domain-icon']}>
                        <div class="carousel-card-icon">
                          <DomainIcon name={item['domain-icon']!} size={32} />
                        </div>
                      </Show>
                      <h3 class="carousel-card-title">{item.title}</h3>
                      <Show when={item.description}>
                        <p class="carousel-card-description">{item.description}</p>
                      </Show>
                      <FeatherIcon name="arrow-right" size={20} className="carousel-card-link" />
                    </div>
                  </a>
                )}</For>
              </div>
            </div>

            <button
              class="carousel-nav carousel-nav-next"
              onClick={next}
              disabled={currentIndex() >= totalPages() - 1}
              aria-label="Next"
            >
              <FeatherIcon name="chevron-right" size={20} />
            </button>
          </div>

          <div class="carousel-pagination" role="tablist" aria-label="Carousel navigation">
            <For each={Array.from({ length: totalPages() }, (_, i) => i)}>
              {(pageIdx) => (
                <button
                  class={`carousel-dot ${currentIndex() === pageIdx ? 'active' : ''}`}
                  onClick={() => goTo(pageIdx)}
                  role="tab"
                  aria-selected={currentIndex() === pageIdx}
                  aria-label={`Go to slide ${pageIdx + 1}`}
                />
              )}
            </For>
          </div>
        </div>

        <style>{`
          .carousel-section {
            width: 100%;
            padding: var(--space-section, 2rem) 0;
          }

          .section-content {
            width: 100%;
            max-width: 85rem;
            margin: 0 auto;
            padding: 0 var(--space-content, 1rem);
          }

          .carousel-title {
            font-size: clamp(1.25rem, 2.5vw, 1.75rem);
            font-weight: 700;
            color: var(--secondary);
            margin-bottom: 1.5rem;
            text-align: left;
            padding: 0 0.5rem;
          }

          .carousel-wrapper {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            position: relative;
          }

          .carousel-container {
            flex: 1;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            cursor: grab;
          }

          .carousel-container::-webkit-scrollbar {
            display: none;
          }

          .carousel-container:active {
            cursor: grabbing;
          }

          .carousel-track {
            display: flex;
            gap: 0.75rem;
            padding: 0.5rem;
          }

          .carousel-card {
            flex: 0 0 calc((100% - 1.5rem) / 3);
            min-width: 260px;
            max-width: 360px;
            display: flex;
            flex-direction: column;
            background: white;
            border-radius: var(--border-radius);
            border: var(--border-width) solid var(--card-border);
            box-shadow: var(--card-shadow);
            text-decoration: none;
            color: inherit;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            min-height: 240px;
            scroll-snap-align: start;
            animation: cardFadeIn 0.4s ease-out both;
          }

          .carousel-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @keyframes cardFadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .carousel-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--hover-shadow);
            border-color: var(--primary);
          }

          .carousel-card:hover::before {
            transform: scaleX(1);
          }

          .carousel-card-inner {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            height: 100%;
            position: relative;
          }

          .carousel-card-icon {
            margin-bottom: 1rem;
            color: var(--primary);
          }

          .carousel-card-number {
            display: none;
          }

          .carousel-card-title {
            margin-bottom: 0.75rem;
            color: var(--secondary);
            line-height: 1.3;
          }

          .carousel-card:hover .carousel-card-title {
            color: var(--primary);
          }

          .carousel-card-description {
            font-size: 0.95rem;
            color: var(--text-muted);
            line-height: 1.6;
            flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: auto;
          }

          .carousel-card-link {
            position: absolute;
            bottom: 1.5rem;
            right: 1.5rem;
            color: var(--primary);
            opacity: 0;
            transform: translateX(-8px);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .carousel-card:hover .carousel-card-link {
            opacity: 1;
            transform: translateX(0);
          }

          .carousel-nav {
            flex-shrink: 0;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: var(--border-width, 1px) solid var(--primary);
            background: var(--background);
            color: var(--primary);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            z-index: 10;
          }

          .carousel-nav:hover:not(:disabled) {
            background: var(--primary);
            color: var(--background);
            transform: scale(1.05);
          }

          .carousel-nav:disabled {
            opacity: 0.25;
            cursor: not-allowed;
            transform: none;
          }

          .carousel-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            margin-top: 1.5rem;
          }

          .carousel-dot {
            width: 8px;
            height: 8px;
            min-width: 8px;
            border-radius: 50%;
            border: none;
            background: var(--secondary);
            opacity: 0.3;
            cursor: pointer;
            transition: all 0.2s ease;
            padding: 0;
          }

          .carousel-dot:hover {
            opacity: 0.5;
            transform: scale(1.1);
          }

          .carousel-dot.active {
            opacity: 1;
            background: var(--primary);
            transform: scale(1.25);
          }

          @media (min-width: 768px) and (max-width: 1023px) {
            .carousel-card {
              flex: 0 0 calc((100% - 0.75rem) / 2);
              min-width: 220px;
            }

            .carousel-nav {
              width: 40px;
              height: 40px;
            }
          }

          @media (min-width: 1280px) {
            .section-content {
              padding: 0 2rem;
            }

            .carousel-card {
              flex: 0 0 calc((100% - 1.5rem) / 3);
              max-width: 400px;
            }
          }

          @media (max-width: 767px) {
            .carousel-section {
              padding: var(--space-section, 1.5rem) 0;
            }

            .section-content {
              padding: 0;
            }

            .carousel-wrapper {
              gap: 0;
              position: relative;
            }

            .carousel-track {
              gap: 0;
              padding: 0;
            }

            .carousel-card {
              flex: 0 0 100%;
              min-width: 100%;
              max-width: 100%;
              min-height: 200px;
              padding: 1rem;
              border-radius: 0;
              border-left: none;
              border-right: none;
            }

            .carousel-card:first-child {
              border-left: var(--border-width, 1px) solid oklch(from var(--secondary) l 0.85);
              border-radius: var(--border-radius, 8px) 0 0 var(--border-radius, 8px);
            }

            .carousel-card:last-child {
              border-right: var(--border-width, 1px) solid oklch(from var(--secondary) l 0.85);
              border-radius: 0 var(--border-radius, 8px) var(--border-radius, 8px) 0;
            }

            .carousel-card-number {
              font-size: 1.5rem;
              top: 0.75rem;
              right: 0.75rem;
            }

            .carousel-card-title {
              font-size: 0.95rem;
            }

            .carousel-card-description {
              font-size: 0.8rem;
              -webkit-line-clamp: 2;
            }

            .carousel-nav {
              display: none;
            }

            .carousel-dot {
              width: 20px;
              height: 20px;
              border-radius: 4px;
              opacity: 0.4;
            }

            .carousel-dot.active {
              opacity: 1;
              border-radius: 4px;
            }

            .carousel-pagination {
              gap: 0.75rem;
              margin-top: 1rem;
            }
          }

          @media (max-width: 400px) {
            .carousel-title {
              font-size: 1.1rem;
              margin-bottom: 1rem;
            }

            .carousel-card {
              min-height: 180px;
              padding: 0.875rem;
            }

            .carousel-card-title {
              font-size: 0.9rem;
            }
          }
        `}</style>
      </section>
    </Show>
  );
}