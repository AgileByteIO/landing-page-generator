import { createSignal, onMount } from 'solid-js';
import LanguageMenu from './LanguageMenu';

interface Props {
  supportedLanguages: string[];
  defaultLang?: string;
}

export default function LangSwitcher(props: Props) {
  const [lang, setLang] = createSignal('');
  const [isReady, setIsReady] = createSignal(false);

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
      const browserLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : props.defaultLang || 'en';
      const detected = props.supportedLanguages.includes(browserLang) ? browserLang : props.defaultLang || 'en';
      document.cookie = `lang=${detected}; path=/; max-age=${60 * 60 * 24 * 365}`;
      window.location.href = `/${detected}/`;
      return;
    }

    const browserLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : props.defaultLang || 'en';
    const detected = props.supportedLanguages.includes(browserLang) ? browserLang : props.defaultLang || 'en';
    document.cookie = `lang=${detected}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setLang(detected);
    setIsReady(true);
  });

  if (!isReady) {
    return "...";
  }

  return <LanguageMenu supportedLanguages={props.supportedLanguages} currentLang={lang()} />;
}