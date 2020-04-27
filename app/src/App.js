import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { DrizzleContext } from "@drizzle/react-plugin";
import Web3 from 'web3';

import { setActiveAccount } from 'actions/activeAccountActions';
import { getUserCryptomon } from 'actions/cryptomonsActions';
import { getUserProfile } from 'middlewares/userApiMiddleware';

import { StoreProvider, Store } from 'store';
import MainRouter from 'router';

import Header from 'components/Header';
import BattleTracker from 'components/BattleTracker';
import ModalProvider from 'components/ModalProvider';

import socket, { SocketHandlers } from 'api/socket';
// import { get } from 'actions/activeAccountActions';

import "styles/App.scss";

const App = () => {
  const { drizzleState } = useContext(DrizzleContext.Context);
  const [{ activeAccount }, dispatch] = useContext(Store);

  // Save actual web3 provider address in store context & subscribe address changes
  const handleMetamaskChange = (accounts) => {
    console.count('api call to usre')
    dispatch(setActiveAccount(accounts[0]));
    dispatch(getUserCryptomon());
    socket.emit('force-disconnect');
  };

  useEffect(() => {
    const { ethereum } = window;
    console.log('eth addr', ethereum.selectedAddress);
    activeAccount === '' && dispatch(setActiveAccount(ethereum.selectedAddress));
    ethereum.on('accountsChanged', handleMetamaskChange);
  }, []);

  // Fetch tamer data again if account change
  useEffect(() => {
    if (activeAccount !== '') {
      getUserProfile({ activeAccount }, dispatch);
    }
  }, [activeAccount]);

  return (
    <Router>
      <Header />
      <MainRouter />
      <BattleTracker />
      <ModalProvider />
    </Router>
  );
}

export default App;
