const DEFAULT_LANG = 'en';

const translationsCache: Map<string, I18nData> = new Map();

interface I18nTranslations {
  [section: string]: {
    [key: string]: string;
  };
}

interface I18nData extends I18nTranslations {
  dynamic: {
    [key: string]: string;
  };
}

const builtinTranslations: I18nData = {
  carousel: { view_details: 'View details' },
  common: { redirecting: 'Redirecting...' },
  cookies: {
    title: 'Cookie Preferences',
    description: 'Manage your cookie settings. Essential cookies cannot be disabled.',
    required_badge: 'Required',
    save_button: 'Save Preferences',
  },
  hero: { read_more: 'Read more' },
  footer: {
    cookie_policy: 'Cookie Policy',
    copyright_suffix: 'All rights reserved.',
    vat_prefix: 'VAT:',
  },
  dynamic: { copyright: '{0} {1}. All rights reserved.' },
};

function getLangFromPath(): string {
  try {
    if (typeof window !== 'undefined' && window.location?.pathname) {
      const urlPath = window.location.pathname;
      const match = urlPath.match(/^\/([a-z]{2})(\/|$)/);
      return match ? match[1] : DEFAULT_LANG;
    }
  } catch {
  }
  return DEFAULT_LANG;
}

function getTranslations(lang: string): I18nData {
  let translations = translationsCache.get(lang);

  if (!translations) {
    translations = loadTranslationsFromServer(lang);

    if (!translations) {
      const fallbackLang = DEFAULT_LANG;
      if (lang !== fallbackLang) {
        translations = loadTranslationsFromServer(fallbackLang);
      }
    }

    if (!translations) {
      translations = builtinTranslations;
    }

    translationsCache.set(lang, translations);
  }

  return translations;
}

function loadTranslationsFromServer(lang: string): I18nData | null {
  try {
    const fs = require('node:fs');
    const path = require('node:path');
    const basePath = (globalThis as any).import?.meta?.env?.I18N_PATH || './private/i18n';
    const filePath = path.join(basePath, lang, 'i18n.toml');

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    return parseToml(content);
  } catch {
    return null;
  }
}

function parseToml(content: string): I18nData {
  const result: I18nData = {
    dynamic: {},
  };

  let currentSection = '';

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const sectionMatch = trimmed.match(/^\[(\w+)\]$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1];
      if (!result[currentSection]) {
        result[currentSection] = {};
      }
      continue;
    }

    const keyMatch = trimmed.match(/^(\w+)\s*=\s*"([^"]*)"$/);
    if (keyMatch && currentSection) {
      result[currentSection][keyMatch[1]] = keyMatch[2];
    }
  }

  return result;
}

export function t(key: string, ...values: (string | number)[]): string {
  const lang = getLangFromPath();
  return tWithLang(lang, key, ...values);
}

export function tWithLang(lang: string, key: string, ...values: (string | number)[]): string {
  const translations = getTranslations(lang);

  const [section, k] = key.split('.');
  const translation = section && k ? translations[section]?.[k] : null;

  if (!translation) {
    return key;
  }

  if (values.length === 0) {
    return translation;
  }

  return values.reduce((acc, val, idx) => {
    return acc.replace(new RegExp(`\\{${idx}\\}`, 'g'), String(val));
  }, translation);
}

export function getCurrentLang(): string {
  return getLangFromPath();
}

export type { I18nData };