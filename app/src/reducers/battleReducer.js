// @flow

import {
  SET_PLAYERS,
  FETCH_SOCKET_LIST,
  SET_ARENA_ID,
  UPDATE_PLAYER_ONE,
  UPDATE_PLAYER_TWO,
  CLEAR_BATTLE_STATE,
  type PayloadType,
} from 'actions/battleActions';

import type { CryptomonType } from 'types/CryptomonTypes';
import type { UserType } from 'types/userTypes';
import type { TamerType } from 'types/battleTypes';
import type { SocketType } from 'types/socketTypes';

export type BattleState = {
  chosenCryptomon: ?CryptomonType,
  playerOne: ?TamerType,
  playerTwo: ?TamerType,
  sockets: ?SocketType[],
  arenaId: ?number,
};

export const initialState = {
  chosenCryptomon: null,
  sockets: null,
  playerOne: null,
  playerTwo: null,
};

const battleReducer = {
  [SET_PLAYERS]: (state: BattleState, { payload }: { payload: PayloadType }) => {
    return {
      ...state,
      playerOne: payload.playerOne || null,
      playerTwo: payload.playerTwo || null,
    };
  },
  [UPDATE_PLAYER_ONE]: (state: BattleState, { payload }: { payload: PayloadType }) => {
    return {
      ...state,
      playerOne: {
        ...state.playerOne,
        ...payload.playerOne,
      },
    };
  },
  [UPDATE_PLAYER_TWO]: (state: BattleState, { payload }: { payload: PayloadType }) => {
    return {
      ...state,
      playerTwo: {
        ...state.playerTwo,
        ...payload.playerTwo,
      },
    };
  },
  [FETCH_SOCKET_LIST]: (state: BattleState, { payload }: { payload: PayloadType }) => {
    return {
      ...state,
      sockets: payload.sockets || null,
    };
  },
  [SET_ARENA_ID]: (state: BattleState, { payload }: { payload: PayloadType }) => {
    return {
      ...state,
      arenaId: payload.arenaId || null,
    };
  },
  [CLEAR_BATTLE_STATE]: (state: BattleState, { payload }: { payload: PayloadType }) => {
    return {
      ...state,
      chosenCryptomon: null,
      playerOne: null,
      playerTwo: null,
    };
  },
};

export default battleReducer;
