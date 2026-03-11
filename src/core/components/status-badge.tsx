import type { Icon } from '@phosphor-icons/react';

import {
  CalendarIcon,
  CheckIcon,
  CloudArrowUpIcon,
  CloudCheckIcon,
  FlagIcon,
  HourglassLowIcon,
  MinusIcon,
  PersonSimpleRunIcon,
  ProhibitIcon,
  SelectionIcon,
  TrashIcon,
  XIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/core/components/ui/badge';
import { ItemStatus } from '@/core/constants/misc';
import { snakeToCamelCase } from '@/core/lib/utils';

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation();

  const statuses: Record<
    ItemStatus,
    { variant: string; children: string; icon: Icon }
  > = {
    active: {
      variant: 'default',
      children: t('constants.status.active'),
      icon: CheckIcon,
    },
    enabled: {
      variant: 'default',
      children: t('constants.status.enabled'),
      icon: CheckIcon,
    },
    draft: {
      variant: 'secondary',
      children: t('constants.status.draft'),
      icon: SelectionIcon,
    },
    success: {
      variant: 'default',
      children: t('constants.status.success'),
      icon: FlagIcon,
    },
    completed: {
      variant: 'default',
      children: t('constants.status.completed'),
      icon: FlagIcon,
    },
    inactive: {
      variant: 'outline',
      children: t('constants.status.inactive'),
      icon: MinusIcon,
    },
    disabled: {
      variant: 'outline',
      children: t('constants.status.disabled'),
      icon: MinusIcon,
    },
    canceled: {
      variant: 'destructive',
      children: t('constants.status.canceled'),
      icon: ProhibitIcon,
    },
    failed: {
      variant: 'destructive',
      children: t('constants.status.failed'),
      icon: XIcon,
    },
    deleted: {
      variant: 'destructive',
      children: t('constants.status.deleted'),
      icon: TrashIcon,
    },
    running: {
      variant: 'outline',
      children: t('constants.status.running'),
      icon: PersonSimpleRunIcon,
    },
    waiting: {
      variant: 'secondary',
      children: t('constants.status.waiting'),
      icon: HourglassLowIcon,
    },
    scheduled: {
      variant: 'outline',
      children: t('constants.status.scheduled'),
      icon: CalendarIcon,
    },
    pending: {
      variant: 'secondary',
      children: t('constants.status.pending'),
      icon: HourglassLowIcon,
    },
    readyToSync: {
      variant: 'outline',
      children: t('constants.status.readyToSync'),
      icon: CloudArrowUpIcon,
    },
    synced: {
      variant: 'default',
      children: t('constants.status.synced'),
      icon: CloudCheckIcon,
    },
  };

  /* @ts-expect-error This is supposed to be undefined if status is not valid and will be validated*/
  const currentStatus = statuses[snakeToCamelCase(status)];

  if (currentStatus) {
    const { variant, children, icon: StatusIcon } = currentStatus;

    return (
      <Badge variant={variant}>
        <StatusIcon />
        {children}
      </Badge>
    );
  }

  return <Badge variant="secondary">{status}</Badge>;
}

export type StatusBadgeProps = {
  status: string | ItemStatus;
};
