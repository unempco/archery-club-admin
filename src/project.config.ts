import { DateFormat } from '@/core/constants/dates';

// Some of this configs will be user decisions
export default {
  name: 'Administrator de Arquería BC',
  version: 'v1.0.0',
  brand: {
    name: 'Arquería BC',
    logoSrc: '/logo.png',
  },
  time: {
    timeZone: 'America/Tijuana',
    dateTimeFormat: `${DateFormat.INT_ABBR} hh:mm A`,
    dateFormat: DateFormat.INT_ABBR,
  },
  money: {
    currency: 'USD',
  },
  baseApi: {
    url: import.meta.env?.VITE_BASE_API_URL,
    path: '/api',
  },
} as const;
