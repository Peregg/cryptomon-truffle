// @flow

import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import { DrizzleContext } from "@drizzle/react-plugin";

import CryptomonCard from 'fragments/CryptomonCard';

import { getUserCryptomon, catchCryptomon } from 'actions/cryptomonsActions';
import { getCryptomonMiddleware, catchCryptomonMiddleware } from 'middlewares/cryptomonMiddlewares';
import useCryptomonsMiddleware from 'hooks/useCryptomonsMiddleware';

import { Store } from 'store';

import logo from "images/logo.png";
import 'styles/CryptomonList.scss';


const CryptomonList = (): React$Element<'div'> => {
  const { drizzleState } = useContext(DrizzleContext.Context);
  const [{ cryptomons }, dispatch] = useContext(Store);
  const [account, setActiveAccount] = useState('');

  const handleMetamaskChange = (accounts) => {
    setActiveAccount(accounts[0]);
    dispatch(getUserCryptomon());
  }

  useEffect(() => {
    const { ethereum } = window;

    account === '' && setActiveAccount(drizzleState.accounts[0]);
    ethereum.on('accountsChanged', handleMetamaskChange);
    // eslint-disable-next-line
  }, [account, drizzleState.accounts]);

  useEffect(() => {
    cryptomons && !(cryptomons.length > 0) && dispatch(getUserCryptomon());
  })

  useCryptomonsMiddleware({ status: 'cryptomonsStatus', account, type: 'get' }, getCryptomonMiddleware);

  useCryptomonsMiddleware({ status: 'catchCryptoStatus', account, type: 'post' }, catchCryptomonMiddleware);

  const handleCatchCryptomon = () => {
    console.log('kk');

    dispatch(catchCryptomon());
  };

  const renderCryptomons = (): React$Element<typeof CryptomonCard>[] => {
    return cryptomons.map<React$Element<typeof CryptomonCard>>((cryptomon) => (
      <CryptomonCard
        key={cryptomons.id}
        cryptomon={cryptomon}
      />
    ));
  }

  return (
    <div className="App">
      <div>
        <img src={logo} alt="drizzle-logo" />
        <h1>Drizzle Examples</h1>
        <p>
          Examples of how to get started with Drizzle in various situations.
        </p>
      </div>

      <div className="section">
        <h2>Active Account</h2>
        <p>{account}</p>
      </div>

      <div className="section">
        <h2>Cryptomon</h2>
        <p>
          Cryptomon demo using truffle and drizzle, state managed by react hooks
        </p>
        <button onClick={handleCatchCryptomon}>
          Catch a cryptomon
        </button>
        {cryptomons && cryptomons.length > 0 && (
          <div className='list-container'>
            {renderCryptomons()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptomonList;
