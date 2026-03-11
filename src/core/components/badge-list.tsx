import clsx from 'clsx';

import { Badge } from '@/core/components/ui/badge';

export function BadgeList({
  values = '',
  className,
  tagClassName = '',
  tagSeverity = 'secondary',
}: BadgeListProps) {
  if (Array.isArray(values) && values.length) {
    return (
      <div className={clsx('flex flex-wrap gap-1', className)}>
        {values.map((item) => (
          <Badge key={item} variant={tagSeverity} className={tagClassName}>
            {item}
          </Badge>
        ))}
      </div>
    );
  } else {
    return (
      <Badge variant={tagSeverity} className={tagClassName}>
        {values}
      </Badge>
    );
  }
}

type BadgeListProps = {
  values: string | string[];
  className?: string;
  tagClassName?: string;
  tagSeverity?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'ghost'
    | null;
};
