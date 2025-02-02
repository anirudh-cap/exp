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
import { userIsAuthenticated } from '../../../utils/authWrapper';
// import Login from '../components/templates/Login';
import Product from '../../../src/Product';
import ProductAdd from '../../../src/ProductAdd';
import NotFoundPage from '../NotFoundPage';

import GlobalStyle from '../../../global-styles';
import { publicPath } from '../../../config/path';
import config from '../../../config/app';

import RenderRoute from '../../atoms/RenderRoute';
import { PRODUCTION } from '../Cap/constants';
import ProfilePage from '../ProfilePage';
import AdminProfilePage from '../AdminProfilePage';
import HomePage from '../HomePage/HomePage';
import NewBookRequest from '../NewBookRequest';
import LibSignup from '../Lib-Signup/LibSignup';
import LibSignin from '../Lib-Signin/LibSignin';
import AccessForbidden from '../AccessForbidden/AccessForbidden';
import ExpenseHome from '../ExpenseHome/ExpenseHome';
import ExpenseGraph from '../../organisms/ShowExpenseGraph/ExpenseGraph';

const loginUrl =
  process.env.NODE_ENV === PRODUCTION
    ? config.production.login_url
    : config.development.login_url;

const Protected = userIsAuthenticated(HomePage);

export const App = () => (
  <>
    <ConnectedRouter history={history}>
      <Switch>
        <RenderRoute
          exact
          path="/new-book-request"
          component={NewBookRequest}
        />
        <RenderRoute exact path="/libSignup" component={LibSignup} />
        <RenderRoute exact path="/libSignin" component={LibSignin} />

        {/* <RenderRoute exact path={loginUrl} component={Login} /> */}
        <RenderRoute exact path="/" component={HomePage} key={publicPath} />
        <RenderRoute exact path="/home" component={ExpenseHome} key={publicPath} />
        {/* <RenderRoute exact path="/" component={HomePage} /> */}
        <RenderRoute exact path="/show-graph" component={ExpenseGraph} />
        <RenderRoute
          exact
          path="/profile-page"
          component={ProfilePage}
          key="/profile-page"
        />
        <RenderRoute
          exact
          path="/admin"
          component={AdminProfilePage}
          key="/admin-profile-page"
        />
        <RenderRoute
          exact
          path="/AccessForbidden"
          component={AccessForbidden}
        />
        <RenderRoute exact path="/ExpenseHome" component={ExpenseHome} />
        <RenderRoute component={NotFoundPage} />
      </Switch>
    </ConnectedRouter>
    <GlobalStyle />
  </>
);

export default App;
