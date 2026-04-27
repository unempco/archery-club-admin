import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { NavigationProgress } from '@/core/components/navigation-progress';
import { SidebarInset, SidebarProvider } from '@/core/components/ui/sidebar';
import { NotFoundComponent } from '@/layout/components/not-found-component';
import { PageHeader } from '@/layout/components/page-header';
import { SidebarPrimary } from '@/layout/components/sidebar-primary';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { sessionQueryOptions } from '@/modules/auth/api/query-options';

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.ensureQueryData(sessionQueryOptions);

    if (!user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }
  },
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'layout:navItems.home',
  }),
  component: AppLayout,
  notFoundComponent: NotFoundComponent,
  errorComponent: () => <p>Ocurrió un error</p>,
});

function AppLayout() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <NavigationProgress />
      <SidebarPrimary className="animate-in fill-mode-backwards fade-in slide-in-from-left-10 duration-250 ease-out"/>
      <SidebarInset>
        <PageHeader className="animate-in fill-mode-backwards fade-in slide-in-from-top-10 duration-250 delay-250 ease-out"/>
        <main className="grow p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
