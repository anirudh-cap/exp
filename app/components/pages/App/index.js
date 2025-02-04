/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

import NotFoundPage from '../NotFoundPage';

import GlobalStyle from '../../../global-styles';


import RenderRoute from '../../atoms/RenderRoute';

import ExpenseHome from '../ExpenseHome/ExpenseHome';
import GraphView from '../GraphView/GraphView';
import DetailView from '../DetailView';
import { createStructuredSelector } from 'reselect';
import {connect} from 'react-redux';
import { makeExpensesSelector } from '../ExpenseHome/selectors';



export const App = ({expenses}) => (
  <>
    <ConnectedRouter history={history}>
      <Switch>
        
        <RenderRoute exact path="/GraphView" component={GraphView} expenses={expenses}  />
        <RenderRoute exact path="/" component={ExpenseHome} />
        <RenderRoute exact path="/ExpenseHome" component={ExpenseHome} />
        <RenderRoute exact path="/DetailView" component={DetailView} />
        <RenderRoute component={NotFoundPage} />
      </Switch>
    </ConnectedRouter>
    <GlobalStyle />
  </>
);
const mapStateToProps = createStructuredSelector({
  expenses : makeExpensesSelector(),
});

export default connect(mapStateToProps)(App);
