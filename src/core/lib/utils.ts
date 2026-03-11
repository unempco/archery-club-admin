import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Parse a string or any value to a boolean */
export function parseBoolean(value: unknown, defaultValue: unknown = false) {
  if (typeof value === 'string') {
    return value === 'true';
  }

  if (!value && typeof defaultValue === 'boolean') {
    return Boolean(defaultValue);
  }

  return Boolean(value);
}

/** Converts string form SNAKE_CASE into camelCase */
export function snakeToCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    );
}
