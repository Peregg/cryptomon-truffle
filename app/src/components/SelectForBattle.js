// @flow

import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DrizzleContext } from "@drizzle/react-plugin";

import CryptomonCard from 'fragments/CryptomonCard';

import { openModal } from 'actions/modalActions';
import { updatePlayerTwo } from 'actions/battleActions';

import socket, { SocketHandlers } from 'api/socket';

import { Store } from 'store';

import { getCryptomons } from 'controllers/cryptomonControllers';

import type { CryptomonType } from 'types/cryptomonTypes';
import { initialFightingCryptomon } from 'types/battleTypes';

const SelectForBattle = () => {
  const store = useContext(Store);
  const drizzleContext = useContext(DrizzleContext.Context);
  const [ready, setReady] = useState(false);
  const history = useHistory();

  const [{ cryptomons, playerOne, playerTwo }, dispatch] = store;

  useEffect(() => {
    !cryptomons && drizzleContext && getCryptomons(store, drizzleContext);
  }, [cryptomons, drizzleContext])

  useEffect(() => {
    if (!playerOne || !playerTwo) {
      history.push('/');
    }
  }, [playerOne, playerTwo]);

  useEffect(() => {
    if (playerOne?.ready && playerTwo?.ready) {
      setReady(true);
    };
  }, [playerOne, playerTwo]);

  useEffect(() => {
    socket.on('cryptomon-chosen', (arenaId, cryptomon) => {
      dispatch(updatePlayerTwo({
        ...playerTwo,
        cmon: initialFightingCryptomon(cryptomon),
        ready: true,
      }));
    });

    return () => socket.off('cryptomon-chosen');
  }, []);

  useEffect(() => {
    ready && history.push('/arena/battle?id=1');
  }, [ready])

  const handleClickCryptomonCard = (cryptomon: CryptomonType) => {
    dispatch(openModal(4, { cryptomon }));
  }

  const renderCryptomons = (): React$Element<typeof CryptomonCard>[] => {
    return cryptomons.map<React$Element<typeof CryptomonCard>>((cryptomon) => (
      <CryptomonCard
        key={cryptomon.id}
        onClick={handleClickCryptomonCard}
        cryptomon={cryptomon}
      />
    ));
  }

  const renderOptions = () => {
    if (!cryptomons) {
      return 'Chargement...';
    }

    if (cryptomons && cryptomons.length > 0 && !playerOne.ready) {
      return (
          <div className='list-container'>
            {renderCryptomons()}
          </div>
        );
    }

    return 'En attente du joueur 2...';
  };

  return (
    <div className='container'>
      {renderOptions()}
    </div>
  );
};

export default SelectForBattle;
