// @flow
import type { ActionType, PayloadlessActionType } from 'types/actionTypes';
import type { CryptomonType } from 'types/cryptomonTypes';
import type { UserType } from 'types/userTypes';
import type { SocketType } from 'types/socketTypes';
import type { PlayerType } from 'types/battleTypes';

export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_ARENA_ID = 'SET_ARENA_ID';
export const FETCH_SOCKET_LIST = 'FETCH_SOCKET_LIST';
export const UPDATE_PLAYER_ONE = 'UPDATE_PLAYER_ONE';
export const UPDATE_PLAYER_TWO = 'UPDATE_PLAYER_TWO';
export const FINISH_TURN = 'FINISH_TURN';
export const DISPLAY_MOVE = 'DISPLAY_MOVE';
export const CLEAR_BATTLE_STATE = 'CLEAR_BATTLE_STATE';

export type BattleActionEnumType =
  | 'FETCH_SOCKET_LIST'
  | 'SET_PLAYERS'
  | 'SET_ARENA_ID'
  | 'UPDATE_PLAYER_ONE'
  | 'UPDATE_PLAYER_TWO'
  | 'DISPLAY_MOVE'
  | 'CLEAR_BATTLE_STATE'
  | 'FINISH_TURN';

export type PayloadType =
  | { playerOne: PlayerType }
  | { playerTwo: PlayerType }
  | { arenaId: number }
  | { message: string }
  | { sockets: SocketType[] };

export type BattleActionType = ActionType<BattleActionEnumType, PayloadType>;
export type PayloadlessBattleActionType = PayloadlessActionType<BattleActionEnumType>;

export const setPlayers = (playerOne: PlayerType, playerTwo: PlayerType): BattleActionType => ({
  type: SET_PLAYERS,
  payload: {
    playerOne,
    playerTwo,
  },
});

export const updatePlayerOne = (playerOne: PlayerType): BattleActionType => ({
  type: UPDATE_PLAYER_ONE,
  payload: {
    playerOne,
  },
});

export const updatePlayerTwo = (playerTwo: PlayerType): BattleActionType => ({
  type: UPDATE_PLAYER_TWO,
  payload: {
    playerTwo,
  },
});

export const fetchSocketList = (sockets: SocketType[]): BattleActionType => ({
  type: FETCH_SOCKET_LIST,
  payload: {
    sockets,
  }
});

export const setArenaId = (arenaId: number): BattleActionType => ({
  type: SET_ARENA_ID,
  payload: {
    arenaId,
  },
});

export const finishTurn = (): PayloadlessBattleActionType => ({
  type: FINISH_TURN,
});

export const displayMove = (message: string): BattleActionType => ({
  type: DISPLAY_MOVE,
  payload: {
    message,
  },
});

export const emptyBattleState = (): PayloadlessBattleActionType => ({
  type: CLEAR_BATTLE_STATE,
});
