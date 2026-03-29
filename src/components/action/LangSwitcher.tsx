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
      <select
        value={lang}
        onChange={handleChange}
        style={{
          padding: '0.5625rem 1.125rem',
          fontSize: '1rem',
          borderRadius: 'var(--border-radius)',
          border: 'var(--border-width) solid var(--primary)',
          backgroundColor: 'var(--background)',
          cursor: 'pointer',
        }}
      >
        {supportedLanguages.map(l => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
  );
}
