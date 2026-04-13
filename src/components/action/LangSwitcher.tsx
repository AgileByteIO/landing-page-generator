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
          <option className="lang-switcher-option" id={l} key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
      <style>{`
        .lang-switcher {
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          border: 3px solid transparent;
          background: transparent;
          color: var(--secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%231e293b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
          padding-right: 1.75rem;
        }
        .lang-switcher:hover {
          border-bottom: 3px solid var(--primary);
          color: var(--primary);
          background-color: transparent;
        }
        .lang-switcher:focus {
          outline: none;
          background-color: transparent;
        }

        .lang-switcher-option {
          background-color: var(--background);
        }

        .lang-switcher .lang-switcher-option:hover {
          background-color: var(--primary);
        }

        @media (max-width: 768px) {
          .lang-switcher {
            width: 100%;
            text-align: left;
          }
        }
      `}</style>
    </>
  );
}
