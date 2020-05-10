// @flow

// $FlowFixMe
import io from 'socket.io-client';

import { openModal, hideModal } from 'actions/modalActions';
import { fetchSocketList } from 'actions/battleActions';
import { setPlayers, setArenaId } from 'actions/battleActions';
import type { SocketType } from 'types/socketTypes';
import { nullPlayer, type PlayerType } from 'types/battleTypes';

const socket = io(`http://192.168.1.25:3001/battle`, {
  rememberTransport: false,
  transports: ['websocket', 'polling'],
});

export function SocketHandlers(dispatch: Function, history: Object, tamers: SocketType[]) {
  return {
    players: (players: SocketType[]) => dispatch(fetchSocketList(players)),
    attack: (attack: { damages: number }) => alert(`Carapuce perd ${attack.damages} PV !`),
    challenge: (me: SocketType) => (challenger: SocketType) => {
      dispatch(openModal(2, { challenger, me }));
    },
    challengeAccepted: (challenger: SocketType, sender: SocketType, arenaId: number) => {
      const playerOne: PlayerType = { ...nullPlayer, ...challenger, isChallenger: true };
      const playerTwo: PlayerType = { ...nullPlayer, ...sender };

      dispatch(setPlayers(playerOne, playerTwo));
      dispatch(setArenaId(arenaId));
      history.push('/arena/selection');
    },
    challengeRefused: (refusedBy: string) => {
      dispatch(openModal(3, { refusedBy }));
    },
  };
};

export const unsubscribeSocket = () => {
  socket.off('players');
  socket.off('challenge');
  socket.off('change-room');
  socket.off('challenge-refused');
};

export default socket;
