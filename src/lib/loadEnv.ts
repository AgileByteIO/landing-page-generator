import 'dotenv/config';

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  borderWidth: string;
  borderRadius: string;
  boxShadow: string;
  headerFont: string;
  textFont: string;
  hoverShadow: string;
  cardShadow: string;
  cardBorder: string;
  textMuted: string;
}

interface CompanyMetadata {
  brandName: string;
  companyName: string;
  contactEmail: string;
  companyLegalAddress: string;
  companyVatNo: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  socials: Record<string, string>;
}

interface Metadata {
  theme: ThemeConfig;
  company: CompanyMetadata;
}

export function loadEnv(): Metadata {
  const theme: ThemeConfig = {
    primaryColor: process.env.PRIMARY_COLOR || '#2563eb',
    secondaryColor: process.env.SECONDARY_COLOR || '#1e293b',
    accentColor: process.env.ACCENT_COLOR || '#f59e0b',
    backgroundColor: process.env.BACKGROUND_COLOR || '#f8fafc',
    borderWidth: process.env.BORDER_WIDTH || '1px',
    borderRadius: process.env.BORDER_RADIUS || '8px',
    boxShadow: process.env.BOX_SHADOW || '0 1px 3px rgba(0,0,0,0.1)',
    headerFont: process.env.HEADER_FONT || 'bebasNeue',
    textFont: process.env.TEXT_FONT || 'nunito',
    hoverShadow: process.env.HOVER_SHADOW || '0 4px 12px rgba(0, 0, 0, 0.15)',
    cardShadow: process.env.CARD_SHADOW || '0 1px 3px rgba(0, 0, 0, 0.06)',
    cardBorder: process.env.CARD_BORDER || '#e2e8f0',
    textMuted: process.env.TEXT_MUTED || '#64748b',
  };

  const company: CompanyMetadata = {
    brandName: process.env.BRAND_NAME || 'AgileByte',
    contactEmail: process.env.CONTACT_EMAIL || "shop@agilebyte.io",
    companyName: process.env.COMPANY_NAME || 'AgileByte OÜ',
    companyLegalAddress: process.env.COMPANY_LEGAL_ADDRESS || '',
    companyVatNo: process.env.COMPANY_VAT_NO || '',
    defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
    supportedLanguages: process.env.SUPPORTED_LANGUAGES 
      ? process.env.SUPPORTED_LANGUAGES.split(',').map(l => l.trim())
      : ['en', 'de'],
    socials: {
      linkedin: process.env.SOCIAL_LINKEDIN || 'https://www.linkedin.com/in/mario-jan%C3%9Fen-82b35038',
      github: process.env.SOCIAL_GITHUB || 'https://github.com/AgileByteIO',
      pinterest: process.env.SOCIAL_PINTEREST || 'https://de.pinterest.com/PRB2075/',
      mastodon: process.env.SOCIAL_MASTODON || 'https://defcon.social/@pixel',
    },
  };

  return { theme, company };
}