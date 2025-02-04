import React, { useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { CapRow, CapTab } from '@capillarytech/cap-ui-library';
import withStyles from '../../../utils/withStyles';
import ProfilePageRequestTable from '../../organisms/ProfilePageRequestTable/ProfilePageRequestTable';
import ProfilePageBorrowTable from '../../organisms/ProfilePageBorrowTable/ProfilePageBorrowTable';
import ProfilePageNewRequestTable from '../../organisms/AdminPageNewRequestTable/AdminPageNewRequestTable';
import ProfilePageHeader from '../../organisms/ProfilePageHeader/ProfilePageHeader';
import styles from './styles';
import NavBar from '../../organisms/NavBar/NavBar';

const ProfilePage = ({ className, intl: { formatMessage } }) => {
  const panes = [
    {
      key: 'borrow',
      tab: 'Borrowed Books',
      content: <ProfilePageBorrowTable />,
    },
    {
      key: 'waiting',
      tab: 'Waiting for books',
      content: <ProfilePageRequestTable />,
    },
  ];

  return (
    <>
      <NavBar />
      <CapRow className={className}>
        <ProfilePageHeader />
        <CapRow className="p-20">
          <CapTab mode="horizontal" panes={panes} />
        </CapRow>
      </CapRow>
    </>
  );
};

ProfilePage.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

ProfilePage.defaultProps = {};

export default withStyles(injectIntl(ProfilePage), styles);
