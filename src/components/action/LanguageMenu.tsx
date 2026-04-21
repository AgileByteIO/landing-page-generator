import { createSignal, For, Show } from 'solid-js';

interface LanguageMenuProps {
  supportedLanguages: string[];
  currentLang: string;
}

export default function LanguageMenu(props: LanguageMenuProps) {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleSelect = (lang: string) => {
    document.cookie = `lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    window.location.href = `/${lang}/`;
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.lang-menu')) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
  }

  return (
    <div class="lang-menu">
      <button
        type="button"
        class="lang-menu-trigger"
        onClick={() => setIsOpen(!isOpen())}
        aria-expanded={isOpen()}
        aria-haspopup="listbox"
      >
        <span class="lang-menu-current">{props.currentLang.toUpperCase()}</span>
        <svg
          class={`lang-menu-arrow ${isOpen() ? 'is-open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <Show when={isOpen()}>
        <ul class="lang-menu-dropdown" role="listbox">
          <For each={props.supportedLanguages}>
            {(lang) => (
              <li>
                <button
                  type="button"
                  class={`lang-menu-item ${lang === props.currentLang ? 'is-active' : ''}`}
                  onClick={() => handleSelect(lang)}
                  role="option"
                  aria-selected={lang === props.currentLang}
                >
                  {lang.toUpperCase()}
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>

      <style>{`
        .lang-menu {
          position: relative;
          display: inline-block;
        }

        .lang-menu-trigger {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem 0;
          color: var(--secondary);
          font-size: 0.95rem;
          font-weight: 500;
          position: relative;
          transition: color 0.2s ease;
        }

        .lang-menu-trigger::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.2s ease;
        }

        .lang-menu-trigger:hover {
          color: var(--primary);
        }

        .lang-menu-trigger:hover::after {
          width: 100%;
        }

        .lang-menu-current {
          text-transform: uppercase;
        }

        .lang-menu-arrow {
          transition: transform 0.2s ease;
        }

        .lang-menu-arrow.is-open {
          transform: rotate(180deg);
        }

        .lang-menu-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: var(--background);
          border: 2px solid var(--primary);
          border-radius: var(--border-radius, 8px);
          padding: 0.25rem;
          min-width: 80px;
          list-style: none;
          z-index: 1000;
          box-shadow: 0 4px 12px var(--foreground);
        }

        .lang-menu-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 0.5rem 1rem;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--secondary);
          font-size: 0.95rem;
          font-weight: 500;
          text-transform: uppercase;
          border-radius: calc(var(--border-radius, 8px) / 2);
          transition: all 0.15s ease;
        }

        .lang-menu-item:hover {
          background: var(--primary);
          color: var(--background);
        }

        .lang-menu-item.is-active {
          background: var(--accent);
          color: var(--background);
        }

        @media (max-width: 768px) {
          .lang-menu-trigger {
            padding: 0.75rem 0;
            width: 100%;
            justify-content: flex-start;
          }

          .lang-menu-dropdown {
            position: static;
            margin-top: 0.5rem;
            width: 100%;
            border: none;
            border-top: 2px solid var(--primary);
            border-radius: 0;
            padding: 0;
            box-shadow: none;
          }

          .lang-menu-item {
            padding: 0.75rem 0;
          }
        }
      `}</style>
    </div>
  );
}