import React, {
  useContext,
  useEffect,
} from "react";
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { DrizzleContext } from "@drizzle/react-plugin";

import { setActiveAccount } from 'actions/activeAccountActions';
import { getUserCryptomon } from 'actions/cryptomonsActions';
import { getUserProfile } from 'middlewares/userApiMiddleware';

import { StoreProvider, Store } from 'store';
import MainRouter from 'router';

import Header from 'components/Header';

// import { get } from 'actions/activeAccountActions';

import "styles/App.scss";

const App = () => {
  const { drizzleState } = useContext(DrizzleContext.Context);
  const [{ activeAccount }, dispatch] = useContext(Store);

  const handleMetamaskChange = (accounts) => {
    console.count('api call to usre')
    dispatch(setActiveAccount(accounts[0]));
    dispatch(getUserCryptomon());
    getUserProfile({ activeAccount: accounts[0] }, dispatch);
  }

  useEffect(() => {
    const { ethereum } = window;
    console.log('eth addr', ethereum.selectedAddress);

    activeAccount === '' && dispatch(setActiveAccount(ethereum.selectedAddress));
    ethereum.on('accountsChanged', handleMetamaskChange);
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Header />
      <MainRouter />
    </Router>
  );
}

export default App;
