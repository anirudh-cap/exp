import React from 'react';
import { FormattedMessage } from 'react-intl';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import withStyles from 'utils/withStyles';
import messages from './messages';
import styles from './style';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const AccessForbidden = ({ className }) => (
  <CapRow className={className}>
    <CapHeading type="h2">
      <FormattedMessage {...messages.forbiddenHeader} />
    </CapHeading>
    <CapHeading type="h3">
      <FormattedMessage {...messages.forbiddenDesc} />
    </CapHeading>
    <div className="cap-login-centeringDiv">
      <Link to="/">Back to Home!</Link>
    </div>
  </CapRow>
);

export default withStyles(AccessForbidden, styles);
