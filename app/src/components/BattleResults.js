// @flow

import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DrizzleContext } from "@drizzle/react-plugin";

import Button from 'fragments/Button';

import { Store } from 'store';

import { emptyBattleState } from 'actions/battleActions';
import { openModal } from 'actions/modalActions';

import CryptomonsDB from 'db/CryptomonsDB';

import { computeCryptomonStats } from 'utils/cryptomonsUtils';

import socket from 'api/socket';

const BattleResults = () => {
  const [{ activeAccount, playerOne, playerTwo, user: { nickname, avatar } }, dispatch] = useContext(Store);
  const {
    drizzle: {
      contracts: {
        CryptomonContract,
      },
    },
   } = useContext(DrizzleContext.Context);

  const history = useHistory();

  useEffect(() => {
    if (!playerOne || !playerTwo) {
      history.push('/');
    }
  }, [playerOne, playerTwo]);

  const winner = (playerOne?.isWinner && playerOne) || playerTwo;
  const looser = (playerOne?.isWinner && playerTwo) || playerOne;
  const title = `${winner.cryptomon.name} de ${winner.nickname} a gagné le combat contre ${looser.cryptomon.name} de ${looser.nickname} !`;
  const {
    baseXp,
    baseHealth,
    baseAttack,
    baseDefense,
    baseSpeed
  } = CryptomonsDB.find(({ name }) => name === looser.cryptomon.name);
  const { dna, level } = winner.cryptomon;
  console.log({ baseXp, looser });

  const xp = Math.floor((baseXp*(looser.cryptomon.level/7)));

  const handleGoHome = () => {
    history.push('/');
    socket.emit('new-player', activeAccount, nickname, avatar);
    dispatch(emptyBattleState());
  };

  const handleLevelUp = async () => {
    const cryptomonIndex = CryptomonsDB.findIndex(({ name }) => name === winner.cryptomon.name);
    const stats = computeCryptomonStats(cryptomonIndex, dna, level);

    const gas = await CryptomonContract.methods.levelUp(winner.cryptomon.id, xp, stats).estimateGas();

    await CryptomonContract.methods.levelUp(winner.cryptomon.id, xp, stats).send({ from: activeAccount, gas });
  };

  const handleClaimXp = async () => {
    if (xp >= Math.pow(winner.cryptomon.level, 3)) {
      handleLevelUp();
    } else {
      const gas = await CryptomonContract.methods.claimXP(winner.cryptomon.id, xp).estimateGas();

      await CryptomonContract.methods.claimXP(winner.cryptomon.id, xp).send({ from: activeAccount, gas });
    }
  };

  return (
    <div className='container'>
      <div className='winner-container'>
        <h2>{title}</h2>
        <p>Pour valider la victoire de ton cryptomon et lui faire gagner de l'expérience tu dois payer le prix d'une transaction Ethereum.</p>
        {activeAccount === winner.address && <Button handleClick={handleClaimXp}>
          <p>Recevoir {xp} points d'expérience</p>
        </Button>}
        <Button handleClick={handleGoHome}>
          <p>Retourner sur la page d'accueil</p>
        </Button>
      </div>
    </div>
  );
};

export default BattleResults;
