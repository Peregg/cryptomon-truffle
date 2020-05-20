// @flow

import type { CryptomonType } from 'types/cryptomonTypes';
import type { ActionType } from 'types/actionTypes';

// actions type constants
export const GET_USER_CRYPTOMONS = 'GET_USER_CRYPTOMONS';
export const CATCH_CRYPTOMON = 'CATCH_CRYPTOMON';
export const GET_CRYPTOMON_DETAIL = 'GET_CRYPTOMON_DETAIL';
export const CLEAR_CRYPTOMON_STATE = 'CLEAR_CRYPTOMON_STATE';

// action types
export type CryptomonActionEnumType =
  | 'GET_USER_CRYPTOMONS'
  | 'CATCH_CRYPTOMON'
  | 'GET_CRYPTOMON_DETAIL';

type PayloadType =
  | { cryptomons: CryptomonType[] }
  | { cryptomonDetail: CryptomonType };

export type CryptomonActionType = ActionType<CryptomonActionEnumType, PayloadType>;

// actions functions
export const getUserCryptomon = (cryptomons: CryptomonType[]): CryptomonActionType => ({
  type: GET_USER_CRYPTOMONS,
  payload: {
    cryptomons,
  }
});

export const getCryptomonDetail = (cryptomonDetail: CryptomonType): CryptomonActionType => ({
  type: GET_CRYPTOMON_DETAIL,
  payload: {
    cryptomonDetail,
  },
});

export const clearState = () => ({
  type: CLEAR_CRYPTOMON_STATE,
});
