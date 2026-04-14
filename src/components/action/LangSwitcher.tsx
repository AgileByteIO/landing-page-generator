import { useState, useEffect } from 'react';

interface Props {
  supportedLanguages: string[];
  defaultLang?: string;
}

export default function LangSwitcher({ supportedLanguages, defaultLang = 'en' }: Props) {
  const [lang, setLang] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const pathMatch = path.match(/^\/([a-z]{2})(\/|$)/);
    const currentLangInPath = pathMatch ? pathMatch[1] : null;

    const cookies = document.cookie.split(';');
    const langCookie = cookies.find(c => c.trim().startsWith('lang='));
    const cookieLang = langCookie ? langCookie.split('=')[1] : null;

    if (cookieLang && supportedLanguages.includes(cookieLang)) {
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

    if (currentLangInPath && supportedLanguages.includes(currentLangInPath)) {
      document.cookie = `lang=${currentLangInPath}; path=/; max-age=${60 * 60 * 24 * 365}`;
      setLang(currentLangInPath);
      setIsReady(true);
      return;
    }

    if (currentLangInPath && !supportedLanguages.includes(currentLangInPath)) {
      const browserLang = navigator.language.split('-')[0];
      const detected = supportedLanguages.includes(browserLang) ? browserLang : defaultLang;
      document.cookie = `lang=${detected}; path=/; max-age=${60 * 60 * 24 * 365}`;
      window.location.href = `/${detected}/`;
      return;
    }

    const browserLang = navigator.language.split('-')[0];
    const detected = supportedLanguages.includes(browserLang) ? browserLang : defaultLang;
    document.cookie = `lang=${detected}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setLang(detected);
    setIsReady(true);
  }, [defaultLang, supportedLanguages]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    document.cookie = `lang=${newLang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    window.location.href = `/${newLang}/`;
  };

  if (!isReady) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Redirecting...</p>
      </div>
    );
  }

return (
    <>
      <select
        id="lang-switcher"
        value={lang}
        onChange={handleChange}
        className="lang-switcher"
      >
        {supportedLanguages.map(l => (
          <option id={l} key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
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
          color: var(--primary);
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
          border-radius: 0.5rem;
          padding: 0.25rem;
        }

        .lang-switcher::picker(option) {
          padding: 0.5rem 1rem;
          background-color: var(--background);
          color: var(--secondary);
          border-radius: 0.25rem;
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
