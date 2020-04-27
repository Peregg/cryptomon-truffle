// @flow

// $FlowFixMe
import io from 'socket.io-client';

import { openModal, hideModal } from 'actions/modalActions';

const socket = io(`http://192.168.1.25:3001/battle`);

export function SocketHandlers(dispatch: Function, history: Object) {
  return {
    attack: (attack: { damages: number }) => alert(`Carapuce perd ${attack.damages} PV !`),
    challenge: (me: string) => (challenger: { nickname: string, id: string }) => dispatch(openModal(2, { challenger, me })),
    challengeAccepted: () => history.push('/arena'),
    challengeRefused: (refusedBy: string) => dispatch(openModal(3, { refusedBy })),
  };
};

export default socket;
