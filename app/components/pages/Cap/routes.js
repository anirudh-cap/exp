import { lazy } from 'react';
import * as path from '../../../config/path';

const { publicPath } = path;

const routes = [
  {
    exact: true,
    path: `${publicPath}/dashboard`,
    type: 'dashboard',
    component: lazy(() => import('../Dashboard')),
  },
  {
    exact: true,
    path: `${publicPath}/accessForbidden`,
    type: 'authenticationFlow',
    component: lazy(() => import('../AccessForbidden')),
  },
  {
    exact: true,
    path: `${publicPath}/profile-page`,
    type: 'profilePage',
    component: lazy(() => import('../ProfilePage')),
  },
  {
    exact: true,
    path: `${publicPath}/admin-profile-page`,
    type: 'adminProfilePage',
    component: lazy(() => import('../AdminProfilePage')),
  },
  {
    exact: true,
    path: `${publicPath}/ExpenseHome`,
    type: 'expenseHome',
    component: lazy(() => import('../ExpenseHome')),
  },
];

export default routes;
