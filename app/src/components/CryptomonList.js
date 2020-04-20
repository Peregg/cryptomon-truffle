// @flow

import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import { DrizzleContext } from "@drizzle/react-plugin";

import CryptomonCard from 'fragments/CryptomonCard';
import Button from 'fragments/Button';

import { getUserCryptomon, catchCryptomon } from 'actions/cryptomonsActions';
import { setActiveAccount } from 'actions/activeAccountActions';
import { getCryptomonMiddleware, catchCryptomonMiddleware } from 'middlewares/cryptomonMiddlewares';
import useCryptomonsMiddleware from 'hooks/useCryptomonsMiddleware';

import { Store } from 'store';

import 'styles/CryptomonList.scss';

const CryptomonList = (): React$Element<'div'> => {
  const { drizzleState } = useContext(DrizzleContext.Context);
  const [{ activeAccount, cryptomons }, dispatch] = useContext(Store);

  useEffect(() => {
    cryptomons && !(cryptomons.length > 0) && dispatch(getUserCryptomon());
  })

  useCryptomonsMiddleware({ status: 'cryptomonsStatus', account: activeAccount, type: 'get' }, getCryptomonMiddleware);

  useCryptomonsMiddleware({ status: 'catchCryptoStatus', account: activeAccount, type: 'post' }, catchCryptomonMiddleware);

  const handleCatchCryptomon = () => {
    dispatch(catchCryptomon());
  };

  const renderCryptomons = (): React$Element<typeof CryptomonCard>[] => {
    return cryptomons.map<React$Element<typeof CryptomonCard>>((cryptomon) => (
      <CryptomonCard
        key={cryptomon.id}
        cryptomon={cryptomon}
      />
    ));
  }

  return (
    <div className="App">
      <div className="section">
        <h2>Active Account</h2>
        <p>{activeAccount}</p>
      </div>

      <div className="section">
        <h2>Cryptomon</h2>
        <p>
          Cryptomon demo using truffle and drizzle, state managed by react hooks
        </p>
        <Button handleClick={handleCatchCryptomon}>
          Attrape un cryptomon !
        </Button>
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
