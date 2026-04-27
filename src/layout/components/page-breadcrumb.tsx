import { Fragment } from 'react';
import { Link, useMatches } from '@tanstack/react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/core/components/ui/breadcrumb';

export function PageBreadcrumb() {
  const matches = useMatches();

  const hasTitleTag = (tag: unknown): tag is { title: string } =>
    !!tag && typeof tag === 'object' && 'title' in tag;

  const crumbs = matches
    .filter((m) => !m.routeId.includes('__root__'))
    .filter((m) => !m.routeId.endsWith('/'))
    .filter((m) => m.meta?.some(hasTitleTag))
    .map((m) => ({
      title: m.meta!.find(hasTitleTag)!.title.split(' | ')[0],
      pathname: m.pathname,
    }));

  if (crumbs.length === 0) return null;

  const showAnimation = "animate-in fill-mode-backwards slide-in-from-left-5 fade-in easy-out duration-500";
  const animationDelay = (idx: number) => ({animationDelay: `${idx*100}ms`})

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return isLast ? (
            <BreadcrumbItem className={showAnimation} style={animationDelay(index)} key={crumb.pathname}>
              <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={crumb.pathname}>
              <BreadcrumbItem className={showAnimation} style={animationDelay(index)}>
                <BreadcrumbLink asChild>
                  <Link to={crumb.pathname}>{crumb.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className={showAnimation} style={animationDelay(index)} />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
