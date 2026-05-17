import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import projectConfig from '@/project.config';

/**
 * Supported casing formats for conversion.
 */
type CaseFormat =
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'kebab-case'
  | 'SCREAMING_SNAKE_CASE'
  | 'Title Case';

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

export function toSentenceCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function isStringValid(value: string | undefined): boolean {
  return value !== undefined && value.trim() !== '';
}

/**
 * Get the value of a nested object property
 * @author Aleksei Tsikov <@atsikov>
 */
export function getValue<T = unknown>(
  //The object to get the value from
  data: T,
  //The path to the value
  path: string,
  //The default value if the path is not found
  defaultValue?: T,
) {
  const value = path
    .split(/[.[\]]/)
    .filter(Boolean)
    // @ts-expect-error This functions is supposed to be totally agnostic, it's normal keys don't be found
    .reduce((value, key) => value?.[key], data);

  return value !== undefined ? value : defaultValue;
}

export function getDecimalPlaces(n: number) {
  const match = n.toString().match(/\.(\d+)$/);
  return match ? match[1].length : 0;
}

export function round(value: number, step: number) {
  const decimals = getDecimalPlaces(step);
  return Number(value.toFixed(decimals));
}

/**
 * Splits any camelCase, PascalCase, snake_case, or kebab-case string
 * into its constituent words (all lowercase).
 */
function tokenize(input: string): string[] {
  return (
    input
      // Insert a separator before sequences of uppercase letters followed by a lowercase letter
      // e.g. "XMLParser" → "XML_Parser", "parseHTML" → "parse_HTML"
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
      // Insert a separator before a single uppercase letter preceded by a lowercase letter or digit
      // e.g. "camelCase" → "camel_Case", "v2Ray" → "v2_Ray"
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      // Replace kebab hyphens and underscores with a uniform separator
      .replace(/[-_]+/g, '_')
      .toLowerCase()
      .split('_')
      .filter(Boolean) // remove empty segments from leading/trailing separators
  );
}

/**
 * Converts a string from any common casing to the specified target format.
 */
export function convertCase(
  input: string,
  format: CaseFormat = 'camelCase',
): string {
  if (!input) return input;

  const words = tokenize(input);

  switch (format) {
    case 'camelCase':
      return words
        .map((word, i) =>
          i === 0 ? word : word[0].toUpperCase() + word.slice(1),
        )
        .join('');

    case 'PascalCase':
      return words
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join('');

    case 'snake_case':
      return words.join('_');

    case 'kebab-case':
      return words.join('-');

    case 'SCREAMING_SNAKE_CASE':
      return words.join('_').toUpperCase();

    case 'Title Case':
      return words
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');

    default: {
      // Exhaustiveness check — TypeScript will error if a case is missing
      const _exhaustive: never = format;
      throw new Error(`Unsupported format: ${_exhaustive}`);
    }
  }
}

export function formatUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function formatPrice(price: number, showCurrency?: boolean): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: projectConfig.money.currency,
    currencyDisplay: showCurrency ? 'code' : 'symbol',
  }).format(price);
}
