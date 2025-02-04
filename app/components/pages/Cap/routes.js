import { lazy } from 'react';
import * as path from '../../../config/path';

const { publicPath } = path;

const routes = [

  {
    exact: true,
    path: `${publicPath}/accessForbidden`,
    type: 'authenticationFlow',
    component: lazy(() => import('../AccessForbidden')),
  },
  {
    exact: true,
    path: `${publicPath}/ExpenseHome`,
    type: 'expenseHome',
    component: lazy(() => import('../ExpenseHome')),
  },
  {
    exact: true,
    path: `${publicPath}/GraphView`,
    type: 'graphView',
    component: lazy(() => import('../GraphView')),
  },
  {
    exact: true,
    path: `${publicPath}/DetailView`,
    type: 'detailView',
    component: lazy(() => import('../DetailView')),
  },
];

export default routes;
