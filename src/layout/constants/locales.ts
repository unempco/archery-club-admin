export const localeData = {
  'en-US': {
    langKey: 'en',
    countryKey: 'US',
    langLabel: 'English',
    countryLabel: 'United States',
  },
  'es-MX': {
    langKey: 'es',
    countryKey: 'MX',
    langLabel: 'Español',
    countryLabel: 'México',
  },
} as const;

export type Locale = keyof typeof localeData;
export type Language = (typeof localeData)[Locale]['langKey'];

export const locales = Object.keys(localeData) as Locale[];
export const languages = Object.values(localeData).map(
  (l) => l.langKey,
) as Language[];

export const defaultProjectLocale: Locale = locales[0];
