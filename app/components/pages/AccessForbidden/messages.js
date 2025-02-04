import { defineMessages } from 'react-intl';

const prefix = 'loyalty.app.components.pages.AccessForbidden';

export default defineMessages({
  forbiddenHeader: {
    id: `${prefix}.forbiddenHeader`,
    defaultMessage: 'Access Forbidden',
  },
  forbiddenDesc: {
    id: `${prefix}.forbiddenDesc`,
    defaultMessage: 'This page access has not been provided to you.',
  },
});
