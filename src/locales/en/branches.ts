export const branches = {
  name: 'Branches',
  name_one: 'Branch',
  name_other: 'Branches',
  fields: {
    closedAt: 'Closed At',
    maintenanceThreshold: 'Maximum Target Usage (sessions)',
    maintenanceWarningOffset: 'Warning Sessions',
  },
  actions: {
    viewCycles: 'View Cycles',
    viewTargets: 'View Targets',
  },
  messages: {},
  filters: {},
  dialogs: {
    create: {
      title: 'Create Branch',
    },
    update: {
      title: 'Edit Branch',
    },
  },
  forms: {
    placeholders: {
      name: 'e.g. "San Felipe"',
    },
  },
};
