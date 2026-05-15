import type { Locale } from '@/layout/constants/locales';

import {
  defaultProjectLocale,
  localeData,
  locales,
} from '@/layout/constants/locales';

const LOCALE_LOCAL_STORAGE_KEY = 'preferences.app.lang' as const;

export function getUserLocalePreference(): Locale {
  const localStorageLocale = localStorage.getItem(LOCALE_LOCAL_STORAGE_KEY);

  if (locales.some((l) => l === localStorageLocale)) {
    return localStorageLocale as Locale;
  }

  const browserLocaleKey = navigator?.language;
  const browserLocale = locales.find((l) =>
    browserLocaleKey.startsWith(localeData[l].langKey),
  );

  return browserLocale ?? defaultProjectLocale;
}

export function setUserLocalePreference(locale: Locale) {
  localStorage.setItem(LOCALE_LOCAL_STORAGE_KEY, locale);
}

export function setLocaleInDocument(locale: Locale) {
  document.documentElement.setAttribute('lang', localeData[locale].langKey);
}
