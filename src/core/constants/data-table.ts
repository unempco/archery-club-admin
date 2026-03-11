import type { EnumValues } from '@/core/types';

/** Specifies the type of column to be displayed in the content table. */
export const DataTableColumnType = {
  ID: 'id',
  NUMBER: 'number',
  TEXT: 'text',
  BOOLEAN: 'boolean',
  PARAGRAPH: 'paragraph',
  DATETIME: 'datetime',
  IMAGE: 'image',
  BADGES: 'badges',
  STATUS: 'status',
  MONEY: 'money',
  URL: 'url',
  EMAIL: 'email',
  INSTAGRAM: 'instagram',
} as const;

export type DataTableColumnType = EnumValues<typeof DataTableColumnType>;
