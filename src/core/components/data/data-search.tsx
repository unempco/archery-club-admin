import { useState } from 'react';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/core/components/ui/input-group';
import { cn, isStringValid } from '@/core/lib/utils';

export function DataSearch({
  searchParamKey = 'search',
  className,
  ...restOfProps
}: DataSearchProps) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false });
  const [searchValue, setSearchValue] = useState<string>(searchParams.search);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    navigate({
      // @ts-expect-error Don't worry, we are just assuming that its being used inside a route with a "search" search param
      search: (prev) => ({ ...prev, [searchParamKey]: searchValue }),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('contents', className)}
      {...restOfProps}
    >
      <InputGroup className="max-w-xs">
        <InputGroupInput
          name="search_input"
          value={searchValue}
          placeholder={t('filters.search')}
          aria-label={t('filters.search')}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {isStringValid(searchValue) && (
          <InputGroupAddon align="inline-end" className="pr-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={t('actions.clear')}
              onClick={() => {
                setSearchValue('');
                navigate({
                  // @ts-expect-error Yes
                  search: (prev) => ({ ...prev, [searchParamKey]: undefined }),
                });
              }}
            >
              <XIcon />
            </Button>
          </InputGroupAddon>
        )}
      </InputGroup>
      <Button type="submit" size="icon" aria-label={t('actions.search')}>
        <MagnifyingGlassIcon />
      </Button>
    </form>
  );
}

export type DataSearchProps = React.ComponentProps<'form'> & {
  searchParamKey?: string;
};
