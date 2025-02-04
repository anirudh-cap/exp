/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import 'sanitize.css/sanitize.css';

// Import root app
import App from './components/pages/App';
import { IntlProvider } from 'react-intl';
import SomethingWentWrong from './components/pages/SomethingWentWrong';

/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';
import initialState from './initialState';
import { translationMessages } from './i18n';

const openSansObserver = new FontFaceObserver('Roboto', {});

// When Roboto is loaded, add a font-family using Robotot to the body
openSansObserver
  .load()
  .then(() => {
    document.body.classList.add('fontLoaded');
  })
  .catch(err => {
    Bugsnag.notify(err);
    console.log(err);
  });

// Create redux store with history
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('loyalty-app');

const bugSnagErrorCallback = event => {
  const { app: { releaseStage } = {} } = event || {};
  if (
    (releaseStage || '').includes('nightly') ||
    process.env.NODE_ENV !== 'production'
  ) {
    return false;
  }
  let userId;
  let userName;
  let userEmail;
  let orgId;
  let orgName;
  try {
    const { id, firstName, lastName, loginName, proxyOrgList } = JSON.parse(
      window.localStorage.getItem('user'),
    );
    orgId = window.localStorage.getItem('orgID');
    userId = id;
    userName = `${firstName} ${lastName}`;
    userEmail = loginName;
    orgName = proxyOrgList.find(({ orgID }) => orgID === Number(orgId)).orgName;
  } catch (error) {
    userId = '';
    userName = '';
    userEmail = '';
    orgId = '';
    orgName = '';
  }
  event.addMetadata('org', {
    name: orgName,
    id: orgId,
  });
  event.setUser(userId, userEmail, userName);
};

Bugsnag.start({
  // eslint-disable-next-line no-undef
  appVersion: BUGSNAG_APP_VERSION,
  // eslint-disable-next-line no-undef
  apiKey: BUGSNAG_API_KEY,
  releaseStage: window.location.hostname,
  plugins: [new BugsnagPluginReact()],
  onError: bugSnagErrorCallback,
});

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

export const BugsnagClient = Bugsnag;

const ErrorScreen = () => <SomethingWentWrong />;

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider messages={translationMessages['en']} locale="en">
        <ErrorBoundary FallbackComponent={ErrorScreen}>
          <App />
        </ErrorBoundary>
      </IntlProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'components/pages/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
