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

const BattleResults = ({ state: [ battleState ]}: Object) => {
  const [{ activeAccount, user: { nickname, avatar } }, dispatch] = useContext(Store);

  const drizzleContext = useContext(DrizzleContext.Context);
  const {
    drizzle: {
      contracts: {
        CryptomonContract,
      },
    },
   } = drizzleContext;
   const { playerOne, playerTwo, winner } = battleState;

  const history = useHistory();

  useEffect(() => {
    if (!playerOne || !playerTwo) {
      history.push('/');
    }
  }, [playerOne, playerTwo]);

  const winnerPlayer = battleState[winner];
  const looser = (winnerPlayer.id === playerOne.id && playerTwo) || playerOne;
  const title = `${winnerPlayer.cmon.name} de ${winnerPlayer.nickname} a gagné le combat contre ${looser.cmon.name} de ${looser.nickname} !`;
  const {
    baseXp,
    baseHealth,
    baseAttack,
    baseDefense,
    baseSpeed
  } = CryptomonsDB.find(({ name }) => name === looser.cmon.name);
  const { dna, level } = winnerPlayer.cmon;

  const xp = Math.floor((baseXp*(looser.cmon.level/7)));

  const handleGoHome = () => {
    history.push('/');
    socket.emit('new-player', activeAccount, nickname, avatar);
    dispatch(emptyBattleState());
  };

  const handleLevelUp = async (newLevel: number) => {
    const cryptomonIndex = CryptomonsDB.findIndex(({ name }) => name === winnerPlayer.cmon.name);
    const stats = computeCryptomonStats(cryptomonIndex, dna, newLevel);

    const gas = await CryptomonContract.methods.levelUp(winnerPlayer.cmon.id, newLevel, xp, stats).estimateGas();

    const test = await CryptomonContract.methods.levelUp(winnerPlayer.cmon.id, newLevel, xp, stats).send({ from: activeAccount, gas });
    handleGoHome();
  };

  const handleClaimXp = async () => {
    const totalXP = winnerPlayer.cmon.xp + xp;
    const possibleNewLevel = Math.trunc(Math.cbrt(totalXP));

    if (possibleNewLevel > level) {
      handleLevelUp(possibleNewLevel);
    } else {
      const gas = await CryptomonContract.methods.claimXP(winnerPlayer.cmon.id, xp).estimateGas();

      await CryptomonContract.methods.claimXP(winnerPlayer.cmon.id, xp).send({ from: activeAccount, gas });
      handleGoHome();
    }
  };

  return (
    <div className='container'>
      <div className='winner-container'>
        <h2>{title}</h2>
        <p>Pour valider la victoire de ton cryptomon et lui faire gagner de l'expérience tu dois payer le prix d'une transaction Ethereum.</p>
        {activeAccount === winnerPlayer.address && <Button handleClick={handleClaimXp}>
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
