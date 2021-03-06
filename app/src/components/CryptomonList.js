// @flow

import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import { useHistory } from 'react-router-dom';
import { DrizzleContext } from "@drizzle/react-plugin";

import CryptomonCard from 'fragments/CryptomonCard';
import Button from 'fragments/Button';

import { getCryptomons, catchCryptomon } from 'controllers/cryptomonControllers';

import wording from 'constants/wording';

import { Store } from 'store';

import 'styles/CryptomonList.scss';

const CryptomonList = (): React$Element<'div'> => {
  const drizzleContext = useContext(DrizzleContext.Context);
  const store = useContext(Store);
  const history = useHistory();

  const { drizzleState } = drizzleContext;
  const [{ activeAccount, cryptomons }, dispatch] = store;

  useEffect(() => {
    getCryptomons(store, drizzleContext);
  }, [])

  const handleCatchCryptomon = () => {
    catchCryptomon(store, drizzleContext)
  };

  const handlePushToDetail = (id: string) => () => {
    history.push(`cryptomons/${id}`);
  }

  const renderCryptomons = (): React$Element<typeof CryptomonCard>[] => {
    return cryptomons.map<React$Element<typeof CryptomonCard>>((cryptomon) => (
      <CryptomonCard
        key={cryptomon.id}
        cryptomon={cryptomon}
        onClick={handlePushToDetail(cryptomon.id)}
      />
    ));
  }

  return (
    <div className='App'>
      <div className='section'>
        <div className='section-text-box'>
          <h2>{wording.your_cryptomons}</h2>
          <p>{wording.details_coming_soon}</p>
          <Button handleClick={handleCatchCryptomon}>
            {wording.catch_a_cryptomon}
          </Button>
        </div>
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
