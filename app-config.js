module.exports = {
  appName: 'Expense Tracker App',
  prefix: '/',
  isHostedOnPlatform: true,
  appType: 'native',
  bugsnag: {
    useBugsnag: false,
    apiKey: null,
    retainSourceMaps: false,
  },
  useSourceMaps: false,
  i18n: {
    useI18n: false,
    customI18n: false,
    locales: [],
    defaultLocale: null,
  },
  gtm: {
    useGTM: false,
    trackingId: null,
    projectId: null,
  },
  useNavigationComponent: true,
};
