import { CheckIcon } from '@phosphor-icons/react';

import { Button } from '@/core/components/ui/button';
import { parseBoolean } from '@/core/lib/utils';

export function CheckMark({ value }: CheckMarkProps) {
  if (parseBoolean(value))
    return (
      <Button size="icon-xs" className="cursor-default">
        <CheckIcon />
      </Button>
    );
  else
    return (
      <Button
        variant="outline"
        size="icon-xs"
        disabled
        className="cursor-default"
      >
        <CheckIcon />
      </Button>
    );
}

type CheckMarkProps = {
  /** Any value can be parsed boolean */
  value: unknown;
};
