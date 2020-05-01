// @flow

// $FlowFixMe
import io from 'socket.io-client';

import { openModal, hideModal } from 'actions/modalActions';
import { fetchSocketList } from 'actions/battleActions';
import { setPlayers, setArenaId } from 'actions/battleActions';
import type { SocketType } from 'types/socketTypes';
import { nullTamer, type TamerType } from 'types/battleTypes';

const socket = io(`http://192.168.1.25:3001/battle`);

export function SocketHandlers(dispatch: Function, history: Object, tamers: SocketType[]) {
  return {
    players: (players: SocketType[]) => dispatch(fetchSocketList(players)),
    attack: (attack: { damages: number }) => alert(`Carapuce perd ${attack.damages} PV !`),
    challenge: (me: SocketType) => (challenger: SocketType) => {
      dispatch(openModal(2, { challenger, me }));
    },
    challengeAccepted: (challenger: SocketType, sender: SocketType, arenaId: number) => {

      const playerOne: TamerType = { ...nullTamer, ...challenger };
      const playerTwo: TamerType = { ...nullTamer, ...sender };
      console.log('les joueurs dans le socket du défieur =>', { playerOne, playerTwo });

      dispatch(setPlayers(playerOne, playerTwo));
      dispatch(setArenaId(arenaId));
      history.push('/arena/selection');
    },
    challengeRefused: (refusedBy: string) => {
      dispatch(openModal(3, { refusedBy }));
    },
  };
};

export default socket;
