import React from 'react';
import {
  CapButton,
  CapColumn,
  CapRow,
  CapTopBar,
} from '@capillarytech/cap-ui-library';
import { useHistory } from 'react-router';
import styles from './styles';
import withStyles from '../../../utils/withStyles';
import { publicPath } from '../../../config/path';
const Navbar = ({ className }) => {
  const history = useHistory();

  const handleSignout = () => {
    localStorage.clear();
    history.push(`/libSignin`);
  };

  const menuItems = {
    items: [
      
      {
        label: 'ExpenseHome',
        link: '/ExpenseHome',
        key: 'expensehome',
      },
    ],

    onMenuItemClick: ({ link }) => {
      history.push(`${link}`);
    },
  };

  const ifUserAdmin = localStorage.getItem('userType');
  if (ifUserAdmin === 'admin') {
    menuItems.items.push({
      label: 'Admin Page',
      link: '/admin',
      key: 'administrator',
    });
  }

  menuItems.items.push({
    label: (
      <CapButton type="secondary" onClick={handleSignout}>
        Sign-out
      </CapButton>
    ),
    link: '/libSignin',
    key: 'admin',
  });

  return (
    <CapRow className={className}>
      <CapTopBar menuProps={menuItems} />
    </CapRow>
  );
};

export default withStyles(Navbar, styles);
