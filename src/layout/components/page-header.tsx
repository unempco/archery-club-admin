import { Separator } from '@/core/components/ui/separator';
import { SidebarTrigger } from '@/core/components/ui/sidebar';
import { LocaleSelector } from '@/layout/components/locale-selector';
import { PageBreadcrumb } from '@/layout/components/page-breadcrumb';
import { ThemeSelector } from '@/layout/components/theme-selector';
import {cn} from "@/core/lib/utils";

export function PageHeader({className}: React.ComponentProps<"header">) {
  return (
    <header className={cn("flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)", className)}>
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 my-auto data-[orientation=vertical]:h-4"
        />
        <PageBreadcrumb />
        <div className="ml-auto flex items-center gap-2">
          <LocaleSelector />
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
