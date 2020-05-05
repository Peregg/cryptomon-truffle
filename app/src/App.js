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

import { getUser } from 'controllers/userController';
import { getCryptomons } from 'controllers/cryptomonControllers';

import { StoreProvider, Store } from 'store';
import MainRouter from 'router';

import Header from 'components/Header';
import BattleTracker from 'components/BattleTracker';
import ModalProvider from 'components/ModalProvider';

import socket, { SocketHandlers } from 'api/socket';
// import { get } from 'actions/activeAccountActions';

import "styles/App.scss";

const App = () => {
  const drizzle = useContext(DrizzleContext.Context);
  const store = useContext(Store);
  const [{ activeAccount, user }, dispatch] = store;

  // Save actual web3 provider address in store context & subscribe address changes
  const handleMetamaskChange = (accounts) => {
    dispatch(setActiveAccount(accounts[0]));
    socket.emit('force-disconnect');
  };

  useEffect(() => {
    const { ethereum } = window;
    activeAccount === '' && dispatch(setActiveAccount(ethereum.selectedAddress));
    ethereum.on('accountsChanged', handleMetamaskChange);
  }, []);

  // Fetch tamer data again if account change
  useEffect(() => {
    if (activeAccount !== '') {
      getUser(store);
      getCryptomons(store, drizzle);
    }
  }, [activeAccount]);

  return (
    <Router>
      <Header />
      <MainRouter />
      {user && <BattleTracker />}
      <ModalProvider />
    </Router>
  );
}

export default App;
