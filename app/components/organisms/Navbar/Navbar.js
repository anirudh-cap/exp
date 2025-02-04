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
const NavBar = ({ className }) => {
  const history = useHistory();


  const menuItems = {
    items: [
      
      {
        label: 'ExpenseHome',
        link: '/ExpenseHome',
        key: 'expensehome',
      },
      {
        label: 'GraphView',
        link: '/ExpenseGraph',
        key: 'expensegraph',
      },
      {
        label: 'DetailView',
        link: '/DetailView',
        key: 'DetailView',
      }
    ],

    onMenuItemClick: ({ link }) => {
      history.push(`${link}`);
    },
  };

  

  return (
    <CapRow className={className}>
      <CapTopBar menuProps={menuItems} />
    </CapRow>
  );
};

export default withStyles(NavBar, styles);
