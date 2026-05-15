import { ArrowLeftIcon } from '@phosphor-icons/react';
import { Link, useCanGoBack, useRouter } from '@tanstack/react-router';

import { Button } from '@/core/components/ui/button';
import { Typography } from '@/core/components/ui/typography';
import { cn } from '@/core/lib/utils';

export function PageHeader({
  title,
  titleVariant = 'h1',
  itemId,
  enableBack,
  backToFallback,
  className,
  afterTitleSlot,
  children,
  ...restOfProps
}: PageHeaderProps) {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-2 sm:flex-row',
        className,
      )}
      {...restOfProps}
    >
      <div className="flex items-center gap-2">
        {enableBack && canGoBack && (
          <Button
            variant="secondary"
            size="icon"
            className="animate-in fade-in duration-300"
            onClick={() => router.history.back()}
          >
            <ArrowLeftIcon />
          </Button>
        )}
        {enableBack && !canGoBack && backToFallback && (
          <Button
            asChild
            variant="secondary"
            size="icon"
            className="animate-in fade-in duration-300"
          >
            <Link to={backToFallback}>
              <ArrowLeftIcon />
            </Link>
          </Button>
        )}
        <Typography
          variant={titleVariant}
          as="h1"
          className="text-left line-clamp-1 animate-in fade-in slide-in-from-left-5 duration-300"
        >
          {title}
        </Typography>
        {itemId && (
          <Typography
            variant={titleVariant}
            as="span"
            className="font-normal text-muted-foreground"
          >
            {`#${itemId}`}
          </Typography>
        )}
        {afterTitleSlot && (
          <div className="animate-in fade-in duration-300">
            {afterTitleSlot}
          </div>
        )}
      </div>

      {children && (
        <div
          className={cn(
            'flex gap-2',
            'animate-in fade-in slide-in-from-right-5 duration-300',
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export type PageHeaderProps = React.ComponentProps<'div'> & {
  title: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4';
  itemId?: string | number;
  enableBack?: boolean;
  backToFallback?: string;
  afterTitleSlot?: React.ReactNode;
  children?: React.ReactNode;
};
