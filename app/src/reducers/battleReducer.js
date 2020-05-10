// @flow

import {
  SET_PLAYERS,
  FETCH_SOCKET_LIST,
  SET_ARENA_ID,
  UPDATE_PLAYER_ONE,
  UPDATE_PLAYER_TWO,
  CLEAR_BATTLE_STATE,
  FINISH_TURN,
  DISPLAY_MOVE,
  type PayloadType,
} from 'actions/battleActions';

import type { CryptomonType } from 'types/CryptomonTypes';
import type { UserType } from 'types/userTypes';
import type { PlayerType } from 'types/battleTypes';
import type { SocketType } from 'types/socketTypes';

export type BattleState = {
  playerOne: ?PlayerType,
  playerTwo: ?PlayerType,
  sockets: ?SocketType[],
  arenaId: ?number,
  moveMessage: ?string,
};

export const initialState = {
  sockets: null,
  playerOne: null,
  playerTwo: null,
  moveMessage: null,
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
  [FINISH_TURN]: (state: BattleState, { payload }: { payload: PayloadType}) => {
    return {
      ...state,
      playerOne: {
        ...state.playerOne,
        cmon: {
          ...state.playerOne.cmon,
          selectedMove: null,
        },
        isWaitingFoe: false,
      },
      playerTwo: {
        ...state.playerTwo,
        cmon: {
          ...state.playerTwo.cmon,
          selectedMove: null,
        },
        isWaitingFoe: false,
      },
      moveMessage: null,
    };
  },
  [DISPLAY_MOVE]: (state: BattleState, { payload }: { payload: PayloadType }) => {
    return {
      ...state,
      moveMessage: payload.message,
    };
  },
  [CLEAR_BATTLE_STATE]: (state: BattleState, { payload }: { payload: PayloadType }) => {
    return {
      ...state,
      playerOne: null,
      playerTwo: null,
    };
  },
};

export default battleReducer;
