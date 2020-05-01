// @flow

import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Store } from 'store';

import socket, { SocketHandlers } from 'api/socket';

import sword from 'images/individualStats/sword.png';

import 'styles/BattleTracker.scss';

const BattleTracker = () => {
  const [{ activeAccount, user: { nickname, avatar = '' }, sockets, tamers }, dispatch] = useContext(Store);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const socketHandlers = new SocketHandlers(dispatch, history, tamers);

  useEffect(() => {
    socket.on('players', socketHandlers.players);
    nickname !== '' && socket.on('challenge', socketHandlers.challenge({ nickname, id: socket.id, address: activeAccount }));
    socket.on('challenge-accepted', socketHandlers.challengeAccepted);
    socket.on('change-room', (arenaId) => socket.emit('change-room', arenaId));
    socket.on('challenge-refused', socketHandlers.challengeRefused);
  }, [nickname]);

  // handle socket connection
  useEffect(() => {
    console.count('acct')
    console.log(`acct`, activeAccount)
    activeAccount.length > 0 && nickname !== '' && socket.emit('new-player', activeAccount, nickname, avatar);
  }, [activeAccount.length, nickname]);

  // handle component re-rending on socket connection
  useEffect(() => {
    console.count('loading')
    console.log(`loading`, sockets)
    if (sockets) {
      setLoading(false);
    }
    socket.on('player-leave', socketHandlers.players);
  }, [sockets]);

  const renderTrackerItems = () => {
    if (loading) {
      return 'Chargement...';
    }
    console.log(sockets.filter(({id}) => id !== socket.id));

    return sockets
      .filter(({ id }) => id !== socket.id)
      .map<React$Element<'button'>>(({ address, id, avatar: playerAvatar, nickname: playerNickname }) => (
        <button key={id} onClick={() => socket.emit('challenge', { id: socket.id, nickname, address, avatar }, id)} className='menu-item'>
          <img className='avatar' src={playerAvatar} alt={playerNickname || address} />
        </button>
      ));
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
      {/* Garder ça ou pas ? */}
      {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="shadowed-goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
              <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
              <feOffset in="shadow" dx="1" dy="1" result="shadow" />
              <feComposite in2="shadow" in="goo" result="goo" />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg> */}
    </>
  );
};

export default BattleTracker;
