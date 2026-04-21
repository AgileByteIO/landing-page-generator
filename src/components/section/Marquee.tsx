import { For, Show } from 'solid-js';
import ServiceIcon from '../ui/ServiceIcon';

interface BannerItem {
  text: string;
  link?: string;
  'service-icon'?: string;
}

interface MarqueeProps {
  id?: string;
  items: BannerItem[];
  direction?: 'left' | 'right';
  speed?: number;
  pauseOnHover?: boolean;
  separator?: string;
  background?: string;
}

export default function Marquee(props: MarqueeProps) {
  const direction = () => props.direction || 'left';
  const speed = () => props.speed || 50;
  const pauseOnHover = () => props.pauseOnHover !== false;
  const separator = () => props.separator || '•';

  const animationDuration = () => {
    const itemCount = props.items.length * 2;
    return `${itemCount * (1 / speed()) * 55}s`;
  };

  const repeatedItems = () => {
    const result: BannerItem[] = [];
    for (let i = 0; i < 6; i++) {
      props.items.forEach((item) => {
        result.push(item);
      });
    }
    return result;
  };

  return (
    <section
      id={props.id}
      class={`marquee-section ${props.background || ''}`}
      classList={{ 'pause-on-hover': pauseOnHover() }}
    >
      <div class="marquee-wrapper">
        <div
          class={`marquee-track ${direction()}`}
          style={{
            'animation-duration': animationDuration(),
          }}
        >
          <For each={repeatedItems()}>
            {(item) => (
              <span class="marquee-item">
                <Show when={item['service-icon']}>
                  <span class="marquee-icon">
                    <ServiceIcon name={item['service-icon']!} size={20} />
                  </span>
                </Show>
                <span class="marquee-text">
                  {item.link ? (
                    <a href={item.link} class="marquee-link">{item.text}</a>
                  ) : (
                    item.text
                  )}
                </span>
                <span class="marquee-separator">{separator()}</span>
              </span>
            )}
          </For>
        </div>
      </div>

      <style>{`
        .marquee-section {
          width: 100%;
          background-color: var(--accent);
          overflow: hidden;
          padding: 1.25rem 0;
        }

        .marquee-wrapper {
          width: 100%;
          max-width: 85rem;
          margin: 0 auto;
          padding: 0 1rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        .marquee-track {
          display: flex;
          width: max-content;
        }

        .marquee-track.left {
          animation: marquee-scroll-left linear infinite;
        }

        .marquee-track.right {
          animation: marquee-scroll-right linear infinite;
        }

        .marquee-section.pause-on-hover:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .marquee-text {
          font-size: 1rem;
          font-weight: 700;
          color: var(--secondary);
          text-transform: capitalize;
          display: inline-flex;
          align-items: center;
        }

        .marquee-icon {
          margin-right: 0.5rem;
          display: inline-flex;
          align-items: center;
          color: var(--primary);
        }

        .marquee-link {
          color: inherit;
          text-decoration: none;
        }

        .marquee-link:hover {
          opacity: 0.8;
        }

        .marquee-separator {
          color: var(--primary);
          font-size: 1rem;
          font-weight: 700;
          margin: 0 2.5rem;
          display: inline-flex;
          align-items: center;
        }

        @media (max-width: 640px) {
          .marquee-section {
            padding: 1rem 0;
          }

          .marquee-wrapper {
            padding: 0 0.5rem;
          }

          .marquee-separator {
            margin-left: 0.5rem;
            font-size: 0.875rem;
          }

          .marquee-text {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </section>
  );
}