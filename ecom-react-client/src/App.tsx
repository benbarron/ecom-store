import React, { FC, Fragment, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { loadUser } from './redux/auth-actions';
import { useAction, useAppSelector } from './redux/redux-hooks';
import { RootState } from './redux/store';

import Login from './components/auth/login';
import Verify from './components/auth/verify';
import Register from './components/auth/register';
import Checkout from './components/checkout';
import Home from './components/home';
import Search from './components/search';
import Product from './components/product';
import Account from './components/account';

const App: FC = () => {
  const loadUserAction = useAction(loadUser);
  const auth = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    loadUserAction();
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path={'/login'}
          // component={React.lazy(() => import('./components/auth/login'))}
          component={Login}
        />
        <Route
          exact
          path={'/register'}
          // component={React.lazy(() => import('./components/auth/register'))}
          component={Register}
        />
        <Route
          exact
          path={'/verify'}
          // component={React.lazy(() => import('./components/auth/verify'))}
          component={Verify}
        />
        <Route
          exact
          path={'/checkout'}
          // render={React.lazy(() => import('./components/checkout'))}
          component={Checkout}
        />
        <Route
          exact
          path={'/'}
          // component={React.lazy(() => import('./components/home'))}
          component={Home}
        />
        <Route
          exact
          path={'/product/:id'}
          // component={React.lazy(() => import('./components/product'))}
          component={Product}
        />
        <Route
          exact
          path={'/search'}
          // component={React.lazy(() => import('./components/search'))}
          component={Search}
        />
        <Route
          exact
          path={'/account'}
          // component={React.lazy(() => import('./components/account'))}
          component={Account}
        />
        <Route path={'*'} render={() => <Redirect to='/' />} />
      </Switch>
    </Fragment>
  );
};

export default App;
