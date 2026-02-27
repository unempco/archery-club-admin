import type { Locale } from '@/layout/constants/locales';

import { useMemo, useState } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import { localeData, locales } from '@/layout/constants/locales';
import {
  setLocaleInDocument,
  setUserLocalePreference,
} from '@/layout/lib/locales';

export function LocaleSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  const selectedLocale = useMemo(
    () => locales.find((l) => localeData[l].langKey === i18n.language)!,
    [i18n.language],
  );

  async function selectLocale(locale: Locale) {
    await i18n.changeLanguage(locale);
    setUserLocalePreference(locale);
    setLocaleInDocument(locale);
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {localeData[selectedLocale].langLabel}
          <CaretDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={selectedLocale}
          onValueChange={(value) =>
            selectLocale(locales.find((locale) => locale === value)!)
          }
        >
          {locales.map((l) => (
            <DropdownMenuRadioItem value={l} key={l}>
              {localeData[l].langLabel}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
