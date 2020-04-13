// @flow

import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";
import Web3 from "web3";
import { DrizzleContext } from "@drizzle/react-plugin";

import CryptomonCard from 'fragments/CryptomonCard';

import cryptomonReducer, { initialState } from 'reducers/cryptomonsReducer';
import { getUserCryptomon } from 'actions/cryptomonsActions';
import useCryptomonsMiddleware from 'hooks/useCryptomonsMiddleware';

import cryptomonDB from 'db/CryptomonsDB';

import logo from "images/logo.png";
import 'styles/CryptomonList.scss';


const CryptomonList = (): React$Element<'div'> => {
  const { drizzle, drizzleState } = useContext(DrizzleContext.Context);

  const [account, setActiveAccount] = useState('');

  const handleMetamaskChange = (accounts) => {
    setActiveAccount(accounts[0]);
    dispatch(getUserCryptomon());
  }

  useEffect(() => {
    const { ethereum } = window;

    account === '' && setActiveAccount(drizzleState.accounts[0]);
    ethereum.on('accountsChanged', handleMetamaskChange);
  }, [account, drizzleState.accounts]);

  const [{ cryptomons, status }, dispatch] = useReducer(cryptomonReducer, initialState);

  useEffect(() => {
    cryptomons && !(cryptomons.length > 0) && dispatch(getUserCryptomon());
  })

  useCryptomonsMiddleware(status, dispatch, { account });

  const catchCryptomon = async () => {
    // @TODO : convertir en action/hook/reducer
    const {
      contracts: {
        CryptomonContract,
      },
    } = drizzle;

    const {
      name,
      _type,
      health,
      attack,
      defense,
      speed,
    } = cryptomonDB[Math.floor(Math.random() * 3) + 1] || cryptomonDB[0];
    const dna = await Web3.utils.keccak256(Web3.utils.randomHex(16));
    const gas = await CryptomonContract.methods.catchCryptomon(name, _type, dna, health, attack, defense, speed).estimateGas();

    await CryptomonContract.methods.catchCryptomon(name, _type, dna, health, attack, defense, speed).send({ from: account, gas });
    dispatch(getUserCryptomon());
  }

  const renderCryptomons = (): React$Element<typeof CryptomonCard>[] => {
    return cryptomons.map<React$Element<typeof CryptomonCard>>((cryptomon) => (
      <CryptomonCard
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
        <button onClick={catchCryptomon}>
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
