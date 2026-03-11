import { ArrowSquareOutIcon, EnvelopeIcon } from '@phosphor-icons/react';

import { BadgeList } from '@/core/components/badge-list';
import { CheckMark } from '@/core/components/check-mark';
import { Money } from '@/core/components/money';
import { StatusBadge } from '@/core/components/status-badge';
import { Button } from '@/core/components/ui/button';
import { DataTableColumnType } from '@/core/constants/data-table';
import { formatDate } from '@/core/lib/dates';

export function DataTableCell({ value, type }: DataTableCellProps) {
  switch (type) {
    case DataTableColumnType.ID:
    case DataTableColumnType.NUMBER:
    case DataTableColumnType.TEXT:
    case DataTableColumnType.PARAGRAPH:
      return <span>{value as string}</span>;
    case DataTableColumnType.BOOLEAN:
      return <CheckMark value={value} />;
    case DataTableColumnType.MONEY:
      return <Money money={{ amount: Number(value), currencyCode: 'USD' }} />;
    case DataTableColumnType.BADGES:
      return <BadgeList values={value as Array<string>} />;
    case DataTableColumnType.STATUS:
      return <StatusBadge status={value as string} />;
    case DataTableColumnType.IMAGE:
      return (
        <img
          src={value as string}
          className="!aspect-[2] !h-auto !w-full max-w-[200px] rounded-lg object-cover object-top shadow-sm"
        />
      );
    case DataTableColumnType.DATETIME:
      return <span>{formatDate(value as string)}</span>;
    case DataTableColumnType.URL:
      return (
        <a href={value as string} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="xs">
            <ArrowSquareOutIcon />
            {value as string}
          </Button>
        </a>
      );
    case DataTableColumnType.EMAIL:
      return (
        <a href={`mailto:${value}`} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="xs">
            <EnvelopeIcon />
            {value as string}
          </Button>
        </a>
      );
    default:
      return <span>{JSON.stringify(value)}</span>;
  }
}

export type DataTableCellProps = {
  value: unknown;
  type?: DataTableColumnType;
};
