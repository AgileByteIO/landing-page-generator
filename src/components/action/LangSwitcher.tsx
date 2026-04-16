import { createSignal, onMount, For } from 'solid-js';

interface Props {
  supportedLanguages: string[];
  defaultLang?: string;
}

export default function LangSwitcher(props: Props) {
  const [lang, setLang] = createSignal('');
  const [isReady, setIsReady] = createSignal(false);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const newLang = target.value;
    document.cookie = `lang=${newLang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    window.location.href = `/${newLang}/`;
  };

  onMount(() => {
    const path = window.location.pathname;
    const pathMatch = path.match(/^\/([a-z]{2})(\/|$)/);
    const currentLangInPath = pathMatch ? pathMatch[1] : null;

    const cookies = document.cookie.split(';');
    const langCookie = cookies.find(c => c.trim().startsWith('lang='));
    const cookieLang = langCookie ? langCookie.split('=')[1] : null;

    if (cookieLang && props.supportedLanguages.includes(cookieLang)) {
      if (currentLangInPath && currentLangInPath !== cookieLang) {
        const newPath = path.replace(`/${currentLangInPath}`, `/${cookieLang}`);
        window.location.href = newPath;
        return;
      }
      if (!currentLangInPath) {
        window.location.href = `/${cookieLang}/`;
        return;
      }
      setLang(cookieLang);
      setIsReady(true);
      return;
    }

    if (currentLangInPath && props.supportedLanguages.includes(currentLangInPath)) {
      document.cookie = `lang=${currentLangInPath}; path=/; max-age=${60 * 60 * 24 * 365}`;
      setLang(currentLangInPath);
      setIsReady(true);
      return;
    }

    if (currentLangInPath && !props.supportedLanguages.includes(currentLangInPath)) {
      const browserLang = navigator.language.split('-')[0];
      const detected = props.supportedLanguages.includes(browserLang) ? browserLang : props.defaultLang || 'en';
      document.cookie = `lang=${detected}; path=/; max-age=${60 * 60 * 24 * 365}`;
      window.location.href = `/${detected}/`;
      return;
    }

    const browserLang = navigator.language.split('-')[0];
    const detected = props.supportedLanguages.includes(browserLang) ? browserLang : props.defaultLang || 'en';
    document.cookie = `lang=${detected}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setLang(detected);
    setIsReady(true);
  });

  return (
    <>
      <select
        id="lang-switcher"
        value={lang()}
        onChange={handleChange}
        class="lang-switcher"
      >
        <For each={props.supportedLanguages}>
          {(l: string) => (
            <option id={l} value={l}>
              {l.toUpperCase()}
            </option>
          )}
        </For>
      </select>
      <style>{`
        .lang-switcher {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--secondary);
          background: transparent;
          padding: 0.5rem 1.75rem 0.5rem 0;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          appearance: base-select;
          width: fit-content;
        }

        .lang-switcher:hover {
          border-bottom-color: var(--primary);
        }

        .lang-switcher:focus {
          outline: none;
          border-bottom-color: transparent;
        }

        .lang-switcher::picker(select) {
          width: fit-content;
          background-color: var(--background);
          color: var(--secondary);
          border: 2px solid var(--primary);
          border-radius: var(--border-radius, 8px);
          padding: 0.25rem;
        }

        .lang-switcher::picker(option) {
          padding: 0.5rem 1rem;
          background-color: var(--background);
          color: var(--secondary);
          border-radius: calc(var(--border-radius, 8px) / 2);
        }

        .lang-switcher::picker(option:checked) {
          background-color: var(--primary) !important;
          color: var(--background) !important;
        }

        .lang-switcher::picker(option:hover) {
          background-color: var(--primary) !important;
          color: var(--background) !important;
        }

        @media (max-width: 768px) {
          .lang-switcher {
            width: 100%;
            text-align: left;
            padding: 0.75rem 0;
          }
        }
      `}</style>
    </>
  );
}