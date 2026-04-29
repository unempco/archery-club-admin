import type { DummiesSearchParams } from '@/modules/dummies/types';

import { useState } from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DataPaginator } from '@/core/components/data/data-paginator';
import { DataSearch } from '@/core/components/data/data-search';
import { DataTable } from '@/core/components/data/data-table';
import { Button } from '@/core/components/ui/button';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { dummiesIndexQueryOptions } from '@/modules/dummies/api/query-options';
import { CreateDummyDialogTrigger } from '@/modules/dummies/componentes/dialogs/create-dummy-dialog-trigger';
import {
  dummiesColumnsDefaultState,
  dummiesTableColumns,
} from '@/modules/dummies/data/data-table-settings';
import { dummiesSearchSchema } from '@/modules/dummies/schemas';
import { PageHeader } from '@/modules/shared/components/page-header';

export const Route = createFileRoute('/app/dummies/')({
  validateSearch: dummiesSearchSchema,
  loaderDeps: ({ search }): DummiesSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(dummiesIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'layout:navItems.dummies',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  const search = useSearch({ from: '/app/dummies/' });
  const { data } = useSuspenseQuery(dummiesIndexQueryOptions(search));

  // Should be part of columns settings schema
  const [columnVisibility, setColumnVisibility] = useState(
    dummiesColumnsDefaultState,
  );

  return (
    <div className="min-h-full flex flex-col gap-4">
      <PageHeader title={t('layout:navItems.dummies')}>
        <CreateDummyDialogTrigger>
          <Button>
            <PlusIcon />
            {t('dummies:actions.addNew')}
          </Button>
        </CreateDummyDialogTrigger>
      </PageHeader>
      <DataTable
        data={data.items}
        columns={dummiesTableColumns}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
      >
        <DataSearch />
      </DataTable>
      <DataPaginator
        className="mt-auto"
        currentPage={search.page}
        pageSize={search.pageSize}
        totalItems={data.meta.total}
      />
    </div>
  );
}
