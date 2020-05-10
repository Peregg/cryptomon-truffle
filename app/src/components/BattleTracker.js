// @flow

import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Store } from 'store';

import socket, { SocketHandlers, unsubscribeSocket } from 'api/socket';

import sword from 'images/individualStats/sword.png';

import 'styles/BattleTracker.scss';

const BattleTracker = () => {
  const [{ activeAccount, user: { nickname = '', avatar = '' }, sockets, tamers }, dispatch] = useContext(Store);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const socketHandlers = new SocketHandlers(dispatch, history, tamers);

  useEffect(() => {
    socket.on('players', socketHandlers.players);
    nickname !== '' && socket.on('challenge', socketHandlers.challenge({ nickname, id: socket.id, address: activeAccount }));
    socket.on('challenge-accepted', socketHandlers.challengeAccepted);
    socket.on('change-room', (arenaId) => socket.emit('change-room', arenaId));
    socket.on('challenge-refused', socketHandlers.challengeRefused);

    return () => unsubscribeSocket();
  }, [nickname]);

  // handle socket connection
  useEffect(() => {
    activeAccount.length > 0 && nickname !== '' && socket.emit('new-player', activeAccount, nickname, avatar);
  }, [activeAccount.length, nickname]);

  // handle component re-rending on socket connection
  useEffect(() => {
    if (sockets) {
      setLoading(false);
    }
    socket.on('player-leave', socketHandlers.players);
  }, [sockets]);

  const renderTrackerItems = () => {
    if (loading) {
      return 'Chargement...';
    }

    return sockets
      .filter(({ id }) => id !== socket.id)
      .map<React$Element<'button'>>(({ id, address, avatar: playerAvatar, nickname: playerNickname }) => (
        <button key={id} onClick={() => socket.emit('challenge', { id: socket.id, nickname, address: activeAccount, avatar }, id)} className='menu-item'>
          <img className='avatar' src={playerAvatar} alt={playerNickname || address} />
        </button>
      ));
  }

  if (sockets && sockets.length < 1) {
    return null;
  }

  return (
    <>
      <nav className="menu">
        <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open"/>
        <label className="menu-open-button" htmlFor="menu-open">
          <span className="cross cross-1"></span>
          <span className="cross cross-2"></span>
          <img className='sword' src={sword} alt='Menu combat' />
        </label>
        {renderTrackerItems()}
      </nav>
    </>
  );
};

export default BattleTracker;
