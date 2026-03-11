import type { EnumValues } from '@/core/types';

export const ItemStatus = {
  ACTIVE: 'active',
  ENABLED: 'enabled',
  DRAFT: 'draft',
  SUCCESS: 'success',
  COMPLETED: 'completed',
  INACTIVE: 'inactive',
  DISABLED: 'disabled',
  DELETED: 'deleted',
  CANCELED: 'canceled',
  FAILED: 'failed',
  RUNNING: 'running',
  WAITING: 'waiting',
  PENDING: 'pending',
  SCHEDULED: 'scheduled',
  READY_TO_SYNC: 'readyToSync',
  SYNCED: 'synced',
} as const;

export type ItemStatus = EnumValues<typeof ItemStatus>;
