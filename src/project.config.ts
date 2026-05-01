import { DateFormat } from '@/core/constants/dates';

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
  baseApi: {
    url: import.meta.env?.VITE_BASE_API_URL,
  },
} as const;
