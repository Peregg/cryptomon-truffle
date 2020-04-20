// @flow

import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import CryptomonList from 'components/CryptomonList';
import LandingPage from 'components/LandingPage';
import UserEdition from 'components/UserEdition';

const MainRouter = () => (
  <Switch>
    <Route
      exact
      path='/'
      component={LandingPage}
    />
    <Route
      exact
      path='/my-cryptos'
      component={CryptomonList}
    />
    <Route
      exact
      path='/me'
      component={UserEdition}
    />
  </Switch>
);

export default MainRouter;
