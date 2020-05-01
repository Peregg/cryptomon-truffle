// @flow

import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { pick, deburr } from 'lodash';

import { Store } from 'store';

import Salameche from 'fragments/crytpomons/Salameche';
import Carapuce from 'fragments/crytpomons/Carapuce';
import Bulbizarre from 'fragments/crytpomons/Bulbizarre';
import HealthBar from 'fragments/HealthBar';

import attackDB from 'db/AttacksDB';

import { updatePlayerOne, updatePlayerTwo } from 'actions/battleActions';

import socket, { SocketHandlers } from 'api/socket';

import { computeCmonMoveEffect } from 'utils/battleUtils';

import 'styles/battleground.scss';

const cryptomonSvg = {
  bulbizarre: Bulbizarre,
  salameche: Salameche,
  carapuce: Carapuce,
};

const modifiers = {
  attack: 6,
  defense: 6,
  specialAttack: 6,
  specialDefense: 6,
  speed: 6,
};

const Battleground = () => {
  const [{ playerOne, playerTwo }, dispatch] = useContext(Store);
  const [battleState, setBattleState] = useState({
    myCmon: {
      ...playerOne.cryptomon,
      modifiers,
    },
    ennemyCmon: {
      ...playerTwo.cryptomon,
      modifiers,
    },
    playerOneMove: {
      move: null,
      waiting: false,
    },
    playerTwoMove: {
      move: null,
      waiting: false,
    },
    moveMessage: null,
  });

  const [myCmon, updateCmon] = useState({
    ...playerOne.cryptomon,
    modifiers,
  });
  const [ennemyCmon, updateEnnemy] = useState({
    ...playerTwo.cryptomon,
    modifiers,
  });
  const [playerOneMove, savePlayerOneMove] = useState({
    move: null,
    waiting: false,
  });
  const [playerTwoMove, savePlayerTwoMove] = useState({
    move: null,
    waiting: false,
  });
  const [moveMessage, displayMoveMessage] = useState(null);
  const history = useHistory();

  const MyCryptomon = cryptomonSvg[deburr(myCmon.name).toLowerCase()];
  const EnnemyCryptomon = cryptomonSvg[deburr(ennemyCmon.name).toLowerCase()];
  const myAttackOptions = attackDB[deburr(myCmon.name).toLowerCase()];

  useEffect(() => {
    socket.on('attack-chosen', (move) => {
      console.log('cc attack ---->', move);
      savePlayerTwoMove({
        move,
        waiting: true,
      });
    });
  }, []);

  const timer = useRef(null);

  useEffect(() => {
    if (playerOneMove.waiting && playerTwoMove.waiting) {
      const fasterCmon = (myCmon.speed > ennemyCmon.speed && myCmon) || ennemyCmon;
      const slowerCmon = (fasterCmon.id === myCmon.id && ennemyCmon) || myCmon;
      const updateFasterCmon = (fasterCmon.id === myCmon.id && updateCmon) || updateEnnemy;
      const updateSlowerCmon = (slowerCmon.id === myCmon.id && updateCmon) || updateEnnemy;
      const fasterMove = (fasterCmon.id === myCmon.id && playerOneMove.move) || playerTwoMove.move;
      const slowerMove = (slowerCmon.id === myCmon.id && playerOneMove.move) || playerTwoMove.move;
      const fasterCmonOwner = (fasterCmon.id === myCmon.id && playerOne) || playerTwo;
      const updateFasterCmonOwner = (fasterCmon.id === myCmon.id && updatePlayerOne) || updatePlayerTwo;
      const slowerCmonOwner = (fasterCmon.id === myCmon.id && playerTwo) || playerOne;
      const updateSlowerCmonOwner = (fasterCmon.id === myCmon.id && updatePlayerTwo) || updatePlayerOne;

      computeCmonMoveEffect(fasterMove, {
          attackingCmon: fasterCmon,
          defendingCmon: slowerCmon,
          updateAttackingCmon: updateFasterCmon,
          updateDefendingCmon: updateSlowerCmon,
          attackingCmonOwner: fasterCmonOwner,
          updateAttackingCmonOwner: updateFasterCmonOwner,
        },
        displayMoveMessage,
        history,
        dispatch,
      );

      timer.current = setTimeout(() => {
        computeCmonMoveEffect(slowerMove, {
            attackingCmon: slowerCmon,
            defendingCmon: fasterCmon,
            updateAttackingCmon: updateSlowerCmon,
            updateDefendingCmon: updateFasterCmon,
            attackingCmonOwner: slowerCmonOwner,
            updateAttackingCmonOwner: updateSlowerCmonOwner,
          },
          displayMoveMessage,
          history,
          dispatch,
        );
      }, 2000);

      timer.current = setTimeout(() => {
        displayMoveMessage(null);

        savePlayerOneMove({
          move: null,
          waiting: false,
        });
        savePlayerTwoMove({
          move: null,
          waiting: false,
        });
      }, 4000);

      return () => {
        clearTimeout(timer.current);
      }
    }

  }, [playerOneMove, playerTwoMove]);

  const handleUseAttack = (attack) => () => {
    savePlayerOneMove({
      move: attack,
      waiting: true,
    });
    socket.emit('attack-chosen', playerTwo.id, attack);
  };

  const renderMenuItems = () => {
    if (moveMessage) {
      return (
        <div className='battleground-move'>
         <p>{moveMessage}</p>
        </div>
      );
    }
    if (playerOneMove.waiting) {
      return <>En attente du joueur 2 !</>
    }
    return myAttackOptions.map(attack => (
      <div className='battleground-menu-item' onClick={handleUseAttack(attack)}>
        {attack.name}
      </div>
    ));
  };

  return (
    <div className='battleground'>
      <div className='battleground-ennemy'>
        <div className='battleground-cmon'>
          <EnnemyCryptomon
            primary={`#${ennemyCmon.dna.substr(2, 6)}`}
          />
          <div className='battleground-lifebar'>
            <span className='battleground-text'>
              {ennemyCmon.name} de {playerTwo.nickname}
            </span>
            <HealthBar health={ennemyCmon.health} maxHealth={playerTwo.cryptomon.health} />
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
            <HealthBar health={myCmon.health} maxHealth={playerOne.cryptomon.health} />
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
