import React from 'react';
import { CapHeading, CapRow, CapIcon } from '@capillarytech/cap-ui-library';
import withStyles from '../../../utils/withStyles';
import styles from './styles';

const ProfilePageHeader = ({ className }) => (
  <>
    <CapRow className="profileMain">
      <CapRow className="imageIcon">
        <CapIcon type="user" withBackground size="l" />
      </CapRow>
      <CapRow className="main">
        <CapRow>
          <CapHeading type="h3">
            Name: {localStorage.getItem('userName')}
          </CapHeading>
        </CapRow>
        <CapRow>
          <CapHeading type="h3">
            Email: {localStorage.getItem('userEmail')}
          </CapHeading>
        </CapRow>
      </CapRow>
    </CapRow>
  </>
);

export default withStyles(ProfilePageHeader, styles);
