// @flow

import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import socket, { SocketHandlers } from 'api/socket';

import Button from 'fragments/Button';

import { hideModal } from 'actions/modalActions';

import { Store } from 'store';

import classnames from 'utils/classnames';

import 'styles/Modal.scss';

const Modal = () => {
  const [{ modalId, opened, data }, dispatch] = useContext(Store);
  const history = useHistory();

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const acceptChallenge = () => {
    history.push('/arena/selection');
    socket.emit('accept-challenge', data.challenger.id);
    dispatch(hideModal());
  };

  const refuseChallenge = () => {
    socket.emit('refuse-challenge', data.challenger.id, data.me);
    dispatch(hideModal());
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
            <p>Désolé ! {data.refusedBy || ''} a refusé ton défi !</p>
            <Button handleClick={handleCloseModal}>Bon...D'accord !</Button>
          </div>
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
