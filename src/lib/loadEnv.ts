import 'dotenv/config';

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  borderWidth: string;
  borderRadius: string;
  boxShadow: string;
}

interface CompanyMetadata {
  brandName: string;
  companyName: string;
  companyLegalAddress: string;
  companyVatNo: string;
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
  };

  const company: CompanyMetadata = {
    brandName: process.env.BRAND_NAME || 'AgileByte',
    companyName: process.env.COMPANY_NAME || 'AgileByte Ltd.',
    companyLegalAddress: process.env.COMPANY_LEGAL_ADDRESS || '',
    companyVatNo: process.env.COMPANY_VAT_NO || '',
  };

  return { theme, company };
}