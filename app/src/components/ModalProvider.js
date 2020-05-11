// @flow

import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'

import socket, { SocketHandlers } from 'api/socket';

import Button from 'fragments/Button';
import StatDiffModal from 'fragments/modals/StatDiffModal';

import { openModal, hideModal } from 'actions/modalActions';
import { setArenaId, updatePlayerOne } from 'actions/battleActions';
import { setPlayers } from 'actions/battleActions';

import { Store } from 'store';

import classnames from 'utils/classnames';

import {
  type PlayerType,
  nullPlayer,
  initialFightingCryptomon
} from 'types/battleTypes';

import 'styles/Modal.scss';

const Modal = () => {
  const [{ modalId, opened, data, arenaId, playerOne, playerTwo }, dispatch] = useContext(Store);
  const history = useHistory();

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const acceptChallenge = () => {
    socket.emit('accept-challenge', data.challenger, data.me);

    const playerOne: PlayerType = { ...nullPlayer, ...data.me };
    const playerTwo: PlayerType = { ...nullPlayer, ...data.challenger, isChallenger: true };

    dispatch(setPlayers(playerOne, playerTwo));
    dispatch(setArenaId(1)); //TODO que fait-on avec les id d'arène ? Sont-ils gérés par le contrat ? La db ?
    dispatch(hideModal());

    history.push('/arena/selection');
  };

  const refuseChallenge = () => {
    socket.emit('refuse-challenge', data.challenger.id, data.me);
    dispatch(hideModal());
  };

  const goToArena = () => {
    socket.emit('cryptomon-chosen', playerTwo.id, data.cryptomon);
    dispatch(updatePlayerOne({
      ...playerOne,
      cmon: initialFightingCryptomon(data.cryptomon),
      ready: true,
    }));
    dispatch(hideModal());
  }

  const handleClaimLevelUp = () => {
    data.handleLevelUp();
    dispatch(hideModal());
    dispatch(openModal(7, { cryptomon: data.cryptomon }));
  };

  const renderModal = () => {
    switch (modalId) {
      case 1:
        return (
          <div className='modal-text'>
            <p>Ton profil a bien été mis à jour {data || ''} ;)</p>
            <Button handleClick={handleCloseModal}>Super !</Button>
          </div>
        );
      case 2:
        return (
          <div className='modal-text'>
            <p>{data.challenger.nickname || ''} souhaiterait t'affronter en duel !</p>
            {/* <p>Si tu acceptes, il te sera prélevé le montant d'une transaction Ethereum</p> */}
            <Button handleClick={acceptChallenge}>Accepter</Button>
            <Button handleClick={refuseChallenge}>Refuser</Button>
          </div>
        );
      case 3:
        return (
          <div className='modal-text'>
            <p>Désolé ! {data.refusedBy.nickname || ''} a refusé ton défi !</p>
            <Button handleClick={handleCloseModal}>Bon...D'accord !</Button>
          </div>
        );
      case 4:
        return (
          <div className='modal-text'>
            <p>Tu as choisi {data.cryptomon.name} ! </p>
            <Button handleClick={goToArena}>C'est parti !</Button>
            <Button handleClick={handleCloseModal}>Hmm...Laissez-moi une minute !</Button>
          </div>
        );
      case 5:
        return (
          <div className='modal-text'>
            <p>{data.cryptomon.name} a gagné un niveau ! </p>
            <Button handleClick={handleClaimLevelUp}>Monter d'un niveau !</Button>
          </div>
        );
      case 6:
        const [
          newHealth,
          newAttack,
          newDefense,
          newSpeAtk,
          newSpeDef,
          newSpeed,
        ] = data.newStats;

        const statDiff = {
          health: newHealth - data.cryptomon.maxHealth,
          attack: newAttack - data.cryptomon.attack,
          defense: newDefense - data.cryptomon.defense,
          specialAttack: newSpeAtk - data.cryptomon.specialAttack,
          specialDefense: newSpeDef - data.cryptomon.specialDefense,
          speed: newSpeed - data.cryptomon.speed,
        };

        return (
          <StatDiffModal
            cryptomon={data.cryptomon}
            newLevel={data.newLevel}
            handleCloseModal={handleCloseModal}
            statDiff={statDiff}
          />
        );
      default:
        return 'coucou';
    }
  };

  const overlayClassNames = classnames('modal-overlay');
  const containerClassNames = classnames('modal-container');
  opened && overlayClassNames.add('visible');
  opened && containerClassNames.add('visible');

  return (
    <div className={overlayClassNames.build()}>
      <div className={containerClassNames.build()}>
        {renderModal()}
      </div>
    </div>
  );
};

export default Modal;
