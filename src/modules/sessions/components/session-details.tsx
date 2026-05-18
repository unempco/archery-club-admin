import type { Session } from '@/modules/sessions/types';

import {
  BuildingOfficeIcon,
  CalendarCheckIcon,
  ClockIcon,
  PulseIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { StatusBadge } from '@/core/components/status-badge';
import { formatDate } from '@/core/lib/dates';
import { cn } from '@/core/lib/utils';
import { DetailFieldItem } from '@/modules/shared/components/detail-field-item';
import projectConfig from '@/project.config';

export function SessionDetails({ session, className }: SessionDetailsProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4',
        className,
      )}
    >
      <DetailFieldItem
        icon={PulseIcon}
        label={t('sessions:fields.status')}
        value={<StatusBadge status={session.status} />}
      />
      <DetailFieldItem
        icon={ClockIcon}
        label={t('sessions:fields.duration')}
        value={session.durationMinutes}
      />
      <DetailFieldItem
        icon={CalendarCheckIcon}
        label={t('sessions:fields.scheduledAt')}
        value={formatDate(
          session.scheduledAt as string,
          projectConfig.time.dateTimeFormat,
        )}
      />
      <DetailFieldItem
        icon={UsersThreeIcon}
        label={t('sessions:fields.group')}
        value={t(session.groupId)}
      />
      <DetailFieldItem
        icon={BuildingOfficeIcon}
        label={t('sessions:fields.branch')}
        value={session.branchId}
      />
    </div>
  );
}

export type SessionDetailsProps = {
  session: Session;
  className?: string;
};
