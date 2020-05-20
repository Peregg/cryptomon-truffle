// @flow

import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import { pick, deburr } from 'lodash';

import { Store } from 'store';

import Salameche from 'fragments/crytpomons/Salameche';
import Carapuce from 'fragments/crytpomons/Carapuce';
import Bulbizarre from 'fragments/crytpomons/Bulbizarre';
import HealthBar from 'fragments/HealthBar';
import BattleResults from 'components/BattleResults';
import CryptomonMove from 'fragments/CryptomonMove';

import attackDB from 'db/AttacksDB';
import cryptomonDB from 'db/CryptomonsDB';

import { updatePlayerOne, updatePlayerTwo } from 'actions/battleActions';

import { getCryptomonKnownMoves } from 'utils/cryptomonsUtils';

import socket, { SocketHandlers } from 'api/socket';

import {
  computeCmonMoveEffect,
  finishTurn,
  getfasterPlayer,
  processStatusEffect
} from 'utils/battleUtils';

import 'styles/battleground.scss';

const cryptomonSvg = {
  bulbizarre: Bulbizarre,
  salameche: Salameche,
  carapuce: Carapuce,
};

const Battleground = () => {
  const store = useContext(Store);
  const history = useHistory();

  const [{ playerOne: initialPlayerOne, playerTwo: initialPlayerTwo, arenaId, moveset }, dispatch] = store;

  const state = useState({
    playerOne: { ...initialPlayerOne },
    playerTwo: { ...initialPlayerTwo },
    moveMessage: null,
    winner: null,
  });

  const [{
      playerOne,
      playerTwo,
      playerOne: {
        cmon: myCmon,
      },
      playerTwo: {
        cmon: foeCmon,
      },
      moveMessage,
      winner,
    },
    setState
  ] = state;

  useEffect(() => {
    socket.on('attack-chosen', (selectedMove) => {
      setState(prevState => ({
        ...prevState,
        playerTwo: {
          ...prevState.playerTwo,
          cmon: {
            ...prevState.playerTwo.cmon,
            selectedMove,
          },
          isWaitingFoe: true,
        }
      }));
    });

    return () => socket.off('attack-chosen');
  }, []);

  const timer = useRef(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (!winner && playerOne.isWaitingFoe && playerTwo.isWaitingFoe) {
      const { fasterPlayer, slowerPlayer } = getfasterPlayer(playerOne, playerTwo);

      processStatusEffect(fasterPlayer, stateRef.current);

      timer.current = setTimeout(() => {
        computeCmonMoveEffect(fasterPlayer, stateRef.current, 'premier passage');
      }, 1000);

      timer.current = setTimeout(() => {
        computeCmonMoveEffect(slowerPlayer, stateRef.current, 'second passage');
      }, 2000);

      timer.current = setTimeout(() => {
        finishTurn(stateRef.current);
      }, 4000);

      return () => {
        clearTimeout(timer.current);
      }
    }

  }, [playerOne.isWaitingFoe, playerTwo.isWaitingFoe]);

  const handleSelectMove = (selectedMove) => () => {
    setState(prevState => ({
      ...prevState,
      playerOne: {
        ...prevState.playerOne,
        cmon: {
          ...prevState.playerOne.cmon,
          selectedMove,
        },
        isWaitingFoe: true,
      }
    }));

    socket.emit('attack-chosen', arenaId, selectedMove);
  };

  if (Object.keys(playerOne).length < 1 || Object.keys(playerTwo).length < 1) {
    return <Redirect to='/' />;
  }

  const MyCryptomon = cryptomonSvg[deburr(playerOne.cmon.name).toLowerCase()];
  const EnnemyCryptomon = cryptomonSvg[deburr(playerTwo.cmon.name).toLowerCase()];
  const myAttackOptions = moveset?.map(id => attackDB[id]) || getCryptomonKnownMoves(playerOne.cmon.name, playerOne.cmon.level);

  const renderMenuItems = () => {
    if (winner) {
      return <BattleResults state={state} />
    }
    if (moveMessage) {
      return (
        <div className='battleground-move'>
         <p>{moveMessage}</p>
        </div>
      );
    }
    if (playerOne.isWaitingFoe) {
      return (
        <div className='battleground-move'>
         <p>En attente du joueur 2...</p>
        </div>
      );
    }
    return myAttackOptions.map(attack => (
      <div key={attack.name} className='battleground-menu-item' onClick={handleSelectMove(attack.id)}>
        <CryptomonMove
          move={attack}
          cryptomon={playerOne.cmon}
        />
      </div>
    ));
  };

  return (
    <div className='battleground'>
      <div className='battleground-ennemy'>
        <div className='battleground-cmon'>
          <EnnemyCryptomon
            primary={`#${foeCmon.dna.substr(2, 6)}`}
          />
          <div className='battleground-lifebar'>
            <span className='battleground-text'>
              {foeCmon.name} de {playerTwo.nickname}
            </span>
            <HealthBar health={foeCmon.health} maxHealth={foeCmon.maxHealth} />
          </div>
        </div>

      </div>
      <div className='battleground-me'>
        <div className='battleground-cmon'>
          <MyCryptomon
            primary={`#${myCmon.dna.substr(2, 6)}`}
          />
          <div className='battleground-lifebar'>
            <span className='battleground-text'>
              {myCmon.name} de {playerOne.nickname}
            </span>
            <HealthBar health={myCmon.health} maxHealth={myCmon.maxHealth} />
          </div>
        </div>
        <div className='battleground-menu'>
          {renderMenuItems()}
        </div>
      </div>
    </div>
  );
}

export default Battleground;
