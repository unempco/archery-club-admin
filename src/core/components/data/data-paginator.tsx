import type { PaginationSearchParams } from '@/core/types/search-params';

import { useId } from 'react';
import {
  CaretLeftIcon,
  CaretLineLeftIcon,
  CaretLineRightIcon,
  CaretRightIcon,
} from '@phosphor-icons/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Trans, useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { Label } from '@/core/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/core/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/core/components/ui/tooltip';
import { DEFAULT_PAGE_SIZES } from '@/core/constants/search-params';
import { useBreakpoint } from '@/core/hooks/use-breakpoint';
import { usePagination } from '@/core/hooks/use-pagination';
import { cn } from '@/core/lib/utils';

export function DataPaginator({
  totalItems,
  pageSize,
  currentPage,
  className,
  ...restOfProps
}: PaginatorProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const rowsSelectorId = useId();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const { pages, totalPages, isFirst, isLast, hasDots, firstItem, lastItem } =
    usePagination({
      totalItems,
      pageSize,
      currentPage,
      siblingCount: isMobile ? 0 : isTablet ? 1 : 2,
    });

  if (totalItems <= 1) return null;

  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-center justify-between gap-6 max-sm:justify-center',
        'animate-in fade-in slide-in-from-bottom-95 duration-300',
        className,
      )}
      {...restOfProps}
    >
      {!isMobile && (
        <div className="flex shrink-0 items-center gap-3">
          <Label htmlFor={rowsSelectorId}>{t('paginator.itemsPerPage')}</Label>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) =>
              navigate({
                /* @ts-expect-error Typescript is unable to know types from every route from here but search params update is hard to lead to critical errors*/
                search: (prev) => ({
                  ...prev,
                  page: 1,
                  pageSize: Number(value),
                }),
              })
            }
          >
            <SelectTrigger
              id={rowsSelectorId}
              className="w-fit whitespace-nowrap"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto">
              {DEFAULT_PAGE_SIZES.map((n) => (
                <SelectItem value={n.toString()} key={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {isDesktop && (
        <div className="text-muted-foreground flex grow items-center justify-end whitespace-nowrap max-sm:justify-center">
          <p
            className="text-muted-foreground text-sm whitespace-nowrap"
            aria-live="polite"
          >
            <Trans
              i18nKey="paginator.showingItems"
              values={{ firstItem, lastItem, totalItems }}
              components={{ i: <span className="text-foreground" /> }}
            />
          </p>
        </div>
      )}
      <Pagination className="w-fit max-md:mx-auto mr-0">
        <PaginationContent>
          {!isMobile && (
            <PaginationItem>
              <Button
                aria-label={t('paginator.goToFirstPage')}
                variant="ghost"
                size="icon"
                disabled={isFirst}
              >
                <Link
                  to="."
                  search={(prev: PaginationSearchParams) => ({
                    ...prev,
                    page: 1,
                  })}
                >
                  <CaretLineLeftIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
          )}
          <PaginationItem>
            <Button
              aria-label={t('paginator.gotoPreviousPage')}
              variant="ghost"
              size="icon"
              disabled={isFirst}
            >
              <Link
                to="."
                search={(prev: PaginationSearchParams) => ({
                  ...prev,
                  page: currentPage - 1,
                })}
              >
                <CaretLeftIcon className="size-4" />
              </Link>
            </Button>
          </PaginationItem>
          {pages.map((page, i) => {
            const hiddenCount = hasDots(page)
              ? (pages[i + 1] as number) - (pages[i - 1] as number) - 1
              : 0;

            return (
              <PaginationItem key={i}>
                {hasDots(page) ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PaginationEllipsis />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {t('core:paginator.otherPages', {
                            count: hiddenCount,
                          })}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Button
                    size="icon"
                    variant={
                      Number(page) === currentPage ? 'secondary' : 'ghost'
                    }
                    asChild
                  >
                    <Link
                      to="."
                      search={(prev: PaginationSearchParams) => ({
                        ...prev,
                        page,
                      })}
                    >
                      {page}
                    </Link>
                  </Button>
                )}
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <Button
              aria-label={t('paginator.goToNextPage')}
              variant="ghost"
              size="icon"
              disabled={isLast}
            >
              <Link
                to="."
                search={(prev: PaginationSearchParams) => ({
                  ...prev,
                  page: currentPage + 1,
                })}
              >
                <CaretRightIcon className="size-4" />
              </Link>
            </Button>
          </PaginationItem>
          {!isMobile && (
            <PaginationItem>
              <Button
                aria-label={t('paginator.goToLastPage')}
                variant="ghost"
                size="icon"
                disabled={isLast}
              >
                <Link
                  to="."
                  search={(prev: PaginationSearchParams) => ({
                    ...prev,
                    page: totalPages,
                  })}
                >
                  <CaretLineRightIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export type PaginatorProps = React.ComponentProps<'div'> & {
  totalItems: number;
  pageSize: number;
  currentPage: number;
};
