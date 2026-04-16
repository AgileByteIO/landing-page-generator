import { createSignal, createEffect, onMount, onCleanup, For, Show } from 'solid-js';
import type { CollectionEntry } from 'astro:content';
import { getCurrentLang, t } from '../../lib/i18n';

interface CookieConsent {
  id: string;
  title: string;
  description: string;
  mandatory: boolean;
}

interface Props {
  cookies: CollectionEntry<'landingpage'>[];
}

const COOKIE_NAME = 'cookie-consents';

export default function CookieConsent(props: Props) {
  const lang = getCurrentLang();
  
  const titleText = () => t('cookies.title');
  const descText = () => t('cookies.description');
  const requiredBadge = () => t('cookies.required_badge');
  const saveButtonText = () => t('cookies.save_button');
  
  const [isOpen, setIsOpen] = createSignal(false);
  const [consents, setConsents] = createSignal<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = createSignal(false);

  const cookieItems: CookieConsent[] = props.cookies
    .filter((c) => c.id.includes('/cookie-consents/'))
    .map((c) => ({
      id: c.id,
      title: c.data.title,
      description: c.data.description,
      mandatory: c.data.mandatory || false,
    }));

  onMount(() => {
    const savedConsents = localStorage.getItem(COOKIE_NAME);
    if (savedConsents) {
      try {
        const parsed = JSON.parse(atob(savedConsents));
        setConsents(parsed);
      } catch {
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }
    setIsLoaded(true);

    const handleOpenCookieModal = () => setIsOpen(true);
    window.addEventListener('open-cookie-modal', handleOpenCookieModal);
    onCleanup(() => window.removeEventListener('open-cookie-modal', handleOpenCookieModal));
  });

  createEffect(() => {
    if (!isLoaded()) return;

    const currentConsents = consents();
    if (Object.keys(currentConsents).length === 0) {
      const initial: Record<string, boolean> = {};
      cookieItems.forEach((item) => {
        initial[item.id] = item.mandatory;
      });
      setConsents(initial);
    }
  });

  const handleToggle = (id: string) => {
    const item = cookieItems.find((c) => c.id === id);
    if (item?.mandatory) return;
    setConsents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    const encoded = btoa(JSON.stringify(consents()));
    localStorage.setItem(COOKIE_NAME, encoded);
    setIsOpen(false);
  };

  return (
    <>
      <Show when={isOpen()}>
        <div class="cookie-modal-overlay">
          <div class="cookie-modal">
            <div class="cookie-header">
              <h2>{titleText()}</h2>
              <p>{descText()}</p>
            </div>

            <div class="cookie-content">
              <div class="cookie-list">
                <For each={cookieItems}>{(item) => (
                  <div class="cookie-item">
                    <div class="cookie-info">
                      <span class="cookie-title">
                        {item.title}
                        <Show when={item.mandatory}>
                          <span class="cookie-badge">{requiredBadge()}</span>
                        </Show>
                      </span>
                      <span class="cookie-description">{item.description}</span>
                    </div>
                    <label class="cookie-toggle">
                      <input
                        type="checkbox"
                        checked={consents()[item.id] || false}
                        onChange={() => handleToggle(item.id)}
                        disabled={item.mandatory}
                      />
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                )}</For>
              </div>
            </div>

            <div class="cookie-footer">
              <button onClick={handleSave} class="cookie-save-btn">
                {saveButtonText()}
              </button>
            </div>
          </div>
        </div>
      </Show>

      <style>{`
        .cookie-modal-overlay {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          background: rgba(0 0 0 / 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
        }

        .cookie-modal {
          background: var(--background);
          border-radius: var(--border-radius);
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: var(--box-shadow), 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .cookie-header {
          padding: 1.5rem;
          border-bottom: var(--border-width) solid oklch(from var(--secondary) 0.5 c);
          flex-shrink: 0;
        }

        .cookie-header h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          color: var(--secondary);
        }

        .cookie-header p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--secondary);
          opacity: 0.7;
        }

        .cookie-content {
          overflow-y: auto;
          flex: 1;
        }

        .cookie-list {
          padding: 1rem 1.5rem;
        }

        .cookie-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: var(--border-width) solid oklch(from var(--secondary) 0.5 c);
        }

        .cookie-item:last-child {
          border-bottom: none;
        }

        .cookie-info {
          flex: 1;
          margin-right: 1rem;
        }

        .cookie-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--secondary);
          margin-bottom: 0.25rem;
        }

        .cookie-badge {
          font-size: 0.625rem;
          padding: 0.125rem 0.375rem;
          background: var(--primary);
          color: var(--background);
          border-radius: 9999px;
          font-weight: 500;
        }

        .cookie-description {
          font-size: 0.8rem;
          color: var(--secondary);
          opacity: 0.7;
          line-height: 1.4;
        }

        .cookie-toggle {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 26px;
          flex-shrink: 0;
        }

        .cookie-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: oklch(from var(--secondary) 0.7 c);
          border-radius: 26px;
          transition: 0.3s;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: var(--background);
          border-radius: 50%;
          transition: 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .cookie-toggle input:checked + .toggle-slider {
          background-color: var(--primary);
        }

        .cookie-toggle input:checked + .toggle-slider:before {
          transform: translateX(22px);
        }

        .cookie-toggle input:disabled + .toggle-slider {
          background-color: var(--primary);
          cursor: not-allowed;
        }

        .cookie-toggle input:disabled + .toggle-slider:before {
          transform: translateX(22px);
        }

        .cookie-footer {
          padding: 1rem 1.5rem 1.5rem;
          flex-shrink: 0;
        }

        .cookie-save-btn {
          width: 100%;
          padding: 0.875rem 1.5rem;
          background: var(--primary);
          color: var(--background);
          border: none;
          border-radius: var(--border-radius);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cookie-save-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        @media (max-width: 640px) {
          .cookie-modal {
            max-height: 85vh;
          }

          .cookie-header h2 {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </>
  );
}