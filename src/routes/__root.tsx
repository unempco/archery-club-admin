import type { AuthContextValue } from '@/modules/auth/contexts/auth-provider';
import type { QueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useTranslation } from 'react-i18next';

import { Toaster } from '@/core/components/ui/sonner';
import { createRouteHead } from '@/layout/lib/create-route-head';
import {
  getUserLocalePreference,
  setLocaleInDocument,
} from '@/layout/lib/locales';
import { sessionQueryOptions } from '@/modules/auth/api/query-options';

type RootRouteContext = {
  queryClient: QueryClient;
  auth: AuthContextValue;
  i18n: ReturnType<typeof useTranslation>['i18n'];
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(sessionQueryOptions),
  head: createRouteHead({ type: 'root' }),
  component: RootLayout,
});

export function RootLayout() {
  const { i18n } = useTranslation();

  const loadedLocale = getUserLocalePreference();

  useEffect(() => {
    i18n.changeLanguage(loadedLocale).then();
    setLocaleInDocument(loadedLocale);
  }, []);

  return (
    <>
      <HeadContent />
      <Outlet />
      <Toaster duration={5_000} />
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
