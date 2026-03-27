import { useMatches } from '@tanstack/react-router';

import { Separator } from '@/core/components/ui/separator';
import { SidebarTrigger } from '@/core/components/ui/sidebar';
import { LocaleSelector } from '@/layout/components/locale-selector';
import { ThemeSelector } from '@/layout/components/theme-selector';

export function PageHeader() {
  const matches = useMatches();

  // IA Solution
  const title = [...matches]
    .reverse()
    .flatMap((m) => m.meta ?? [])
    .filter((tag): tag is NonNullable<typeof tag> => tag != null)
    .find((tag): tag is { title: string } => 'title' in tag)
    ?.title.split(' | ')[0];

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 my-auto data-[orientation=vertical]:h-4"
        />
        {title && <h1 className="text-base font-medium">{title}</h1>}
        <div className="ml-auto flex items-center gap-2">
          <LocaleSelector />
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
