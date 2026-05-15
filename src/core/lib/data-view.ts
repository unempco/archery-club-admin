import type { ViewMode } from '@/core/types/data-view';
import type { VisibilityState } from '@tanstack/react-table';

import { z } from 'zod';

const COLUMNS_LOCAL_STORAGE_KEY = (ns: string) => `preferences.${ns}.columns`;
const VIEW_MODE_LOCAL_STORAGE_KEY = (ns: string) =>
  `preferences.${ns}.viewMode`;

export function setColumnsPreference(
  ns: string,
  visibilityState: VisibilityState,
) {
  localStorage.setItem(
    COLUMNS_LOCAL_STORAGE_KEY(ns),
    JSON.stringify(visibilityState),
  );
}

export function getColumnsPreference(
  ns: string,
  defaultPreference: VisibilityState = {},
): VisibilityState {
  const rawColumnsPreference = localStorage.getItem(
    COLUMNS_LOCAL_STORAGE_KEY(ns),
  );

  if (!rawColumnsPreference) return defaultPreference;

  try {
    return z
      .record(z.string(), z.boolean())
      .parse(JSON.parse(rawColumnsPreference));
  } catch {
    return defaultPreference;
  }
}

export function setViewModePreference(ns: string, viewMode: ViewMode) {
  localStorage.setItem(VIEW_MODE_LOCAL_STORAGE_KEY(ns), viewMode);
}

export function getViewModePreference(
  ns: string,
  defaultPreference: ViewMode = 'table',
): ViewMode {
  const viewModePreference = localStorage.getItem(
    VIEW_MODE_LOCAL_STORAGE_KEY(ns),
  );

  if (!viewModePreference) return defaultPreference;
  if (viewModePreference !== 'table' && viewModePreference !== 'grid')
    return defaultPreference;

  return viewModePreference;
}
