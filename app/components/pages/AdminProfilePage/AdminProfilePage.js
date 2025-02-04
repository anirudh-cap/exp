import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { CapRow, CapTab } from '@capillarytech/cap-ui-library';
import withStyles from '../../../utils/withStyles';
import ProfilePageNewRequestTable from '../../organisms/AdminPageNewRequestTable/AdminPageNewRequestTable';
import ProfilePageHeader from '../../organisms/ProfilePageHeader/ProfilePageHeader';
import styles from './styles';
import Navbar from '../../organisms/Navbar/Navbar';

const AdminProfilePage = ({ className, intl: { formatMessage } }) => {
  const isAdmin = true;

  const panes = [
    {
      key: 'new_request',
      tab: 'Requested Books',
      content: <ProfilePageNewRequestTable />,
    },
  ];
  return (
    <>
      <Navbar />
      <CapRow className={className}>
        <ProfilePageHeader />
        <CapRow className="p-20">
          <CapTab mode="horizontal" panes={panes} />
        </CapRow>
      </CapRow>
    </>
  );
};

AdminProfilePage.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

AdminProfilePage.defaultProps = {};

export default withStyles(injectIntl(AdminProfilePage), styles);
