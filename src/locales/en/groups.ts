export const groups = {
  name: 'Groups',
  name_one: 'Group',
  name_other: 'Groups',
  fields: {
    weekday: 'Weekday',
    startTime: 'Start Time',
    duration: 'Duration (minutes)',
    cycle: 'Cycle',
  },
  actions: {
    viewSessions: 'View Sessions',
  },
  constants: {
    weekdays: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  },
  messages: {},
  filters: {},
  dialogs: {
    create: {
      title: 'Create Group',
    },
    update: {
      title: 'Edit Group',
    },
  },
  forms: {
    placeholders: {
      name: 'e.g. "Group A"',
      cycle: 'Select a cycle',
    },
  },
};
