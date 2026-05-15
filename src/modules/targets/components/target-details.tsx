import type { Target } from '@/modules/targets/types';

import {
  BuildingsIcon,
  CalendarXIcon,
  ClockIcon,
  HashIcon,
  PulseIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { formatDate } from '@/core/lib/dates';
import { cn } from '@/core/lib/utils';
import { DetailFieldItem } from '@/modules/shared/components/detail-field-item';
import { TargetStatusBadge } from '@/modules/targets/components/target-status';

export function TargetDetails({ target, className }: TargetDetailsProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-2',
        className,
      )}
    >
      <DetailFieldItem
        icon={PulseIcon}
        label={t('targets:fields.status')}
        value={<TargetStatusBadge status={target.status} />}
      />
      <DetailFieldItem
        icon={BuildingsIcon}
        label={t('targets:fields.branch')}
        value={`#${target.branchId}`}
      />
      <DetailFieldItem
        icon={HashIcon}
        label={t('targets:fields.usageCount')}
        value={target.usageCount.toLocaleString()}
      />
      {target.retiredAt && (
        <DetailFieldItem
          icon={ClockIcon}
          label={t('targets:fields.retiredAt')}
          value={formatDate(target.retiredAt)}
        />
      )}

      {target.isDeleted && (
        <DetailFieldItem
          icon={CalendarXIcon}
          label={t('targets:fields.deletedAt')}
          value={formatDate(target.deletedAt as string)}
        />
      )}
    </div>
  );
}

export type TargetDetailsProps = {
  target: Target;
  className?: string;
};
