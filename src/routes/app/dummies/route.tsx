import { createFileRoute, Outlet } from '@tanstack/react-router';

import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/dummies')({
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'layout:navItems.dummies',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
