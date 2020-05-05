// @flow

import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import CryptomonList from 'components/CryptomonList';
import LandingPage from 'components/LandingPage';
import UserEdition from 'components/UserEdition';
import SelectForBattle from 'components/SelectForBattle';
import Battleground from 'components/Battleground';
import BattleResults from 'components/BattleResults';

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
    <Route
      exact
      path='/arena/selection'
      component={SelectForBattle}
    />
    <Route
      exact
      path='/arena/battle'
      component={Battleground}
    />
    <Route
      exact
      path='/arena/results'
      component={BattleResults}
    />
  </Switch>
);

export default MainRouter;
