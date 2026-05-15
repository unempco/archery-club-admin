export const groups = {
  name: 'Grupos',
  name_one: 'Grupo',
  name_other: 'Grupos',
  fields: {
    weekday: 'Día de la semana',
    startTime: 'Hora de inicio',
    duration: 'Duración (minutos)',
    cycle: 'Ciclo',
  },
  actions: {
    viewSessions: 'Ver sesiones',
  },
  constants: {
    weekdays: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
  },
  messages: {},
  filters: {},
  dialogs: {
    create: {
      title: 'Crear grupo',
    },
    update: {
      title: 'Editar grupo',
    },
  },
  forms: {
    placeholders: {
      name: 'Ej. "Grupo A"',
      cycle: 'Selecciona un ciclo',
    },
  },
};
