// @flow
import type { ActionType, PayloadlessActionType } from 'types/actionTypes';
import type { CryptomonType } from 'types/cryptomonTypes';
import type { UserType } from 'types/userTypes';
import type { SocketType } from 'types/socketTypes';
import type { TamerType } from 'types/battleTypes';

export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_ARENA_ID = 'SET_ARENA_ID';
export const FETCH_SOCKET_LIST = 'FETCH_SOCKET_LIST';
export const UPDATE_PLAYER_ONE = 'UPDATE_PLAYER_ONE';
export const UPDATE_PLAYER_TWO = 'UPDATE_PLAYER_TWO';
export const CLEAR_BATTLE_STATE = 'CLEAR_BATTLE_STATE';

export type BattleActionEnumType =
  | 'FETCH_SOCKET_LIST'
  | 'SET_PLAYERS'
  | 'SET_ARENA_ID'
  | 'UPDATE_PLAYER_ONE'
  | 'UPDATE_PLAYER_TWO';

export type PayloadType =
  | { playerOne: TamerType }
  | { playerTwo: TamerType }
  | { arenaId: number }
  | { sockets: SocketType[] };

export type BattleActionType = ActionType<BattleActionEnumType, PayloadType>;

export const setPlayers = (playerOne: TamerType, playerTwo: TamerType): BattleActionType => ({
  type: SET_PLAYERS,
  payload: {
    playerOne,
    playerTwo,
  },
});

export const updatePlayerOne = (playerOne: TamerType): BattleActionType => ({
  type: UPDATE_PLAYER_ONE,
  payload: {
    playerOne,
  },
});

export const updatePlayerTwo = (playerTwo: TamerType): BattleActionType => ({
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

export const emptyBattleState = () => ({
  type: CLEAR_BATTLE_STATE,
});
