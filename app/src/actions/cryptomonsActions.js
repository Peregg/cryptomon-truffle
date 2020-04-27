// @flow

import type { CryptomonType } from 'types/cryptomonTypes';
import type { ActionType } from 'types/actionTypes';

// actions type constants
export const GET_USER_CRYPTOMONS = 'GET_USER_CRYPTOMONS';
export const GET_USER_CRYPTOMONS_SUCCESS = 'GET_USER_CRYPTOMONS_SUCCESS';
export const GET_USER_CRYPTOMONS_FAILURE = 'GET_USER_CRYPTOMONS_FAILURE';
export const CATCH_CRYPTOMON = 'CATCH_CRYPTOMON';
export const CATCH_CRYPTOMON_SUCCESS = 'CATCH_CRYPTOMON_SUCCESS';
export const CATCH_CRYPTOMON_FAILURE = 'CATCH_CRYPTOMON_FAILURE';

// action types
export type CryptomonActionEnumType =
  | 'GET_USER_CRYPTOMONS'
  | 'GET_USER_CRYPTOMONS_SUCCESS'
  | 'GET_USER_CRYPTOMONS_FAILURE'
  | 'CATCH_CRYPTOMON'
  | 'CATCH_CRYPTOMON_SUCCESS'
  | 'CATCH_CRYPTOMON_FAILURE';

type PayloadType = {
  status: string,
  cryptomons?: CryptomonType[],
};

export type CryptomonActionType = ActionType<CryptomonActionEnumType, PayloadType>;

// actions functions
export const getUserCryptomon = (): CryptomonActionType => ({
  type: GET_USER_CRYPTOMONS,
  payload: {
    status: 'loading',
  }
});

export const getUserCryptomonSuccess = (cryptomons: CryptomonType[]): CryptomonActionType => ({
  type: GET_USER_CRYPTOMONS_SUCCESS,
  payload: {
    status: 'success',
    cryptomons,
  }
});

export const getUserCryptomonFailure = (error: string): CryptomonActionType => ({
  type: GET_USER_CRYPTOMONS_FAILURE,
  payload: {
    status: 'failure',
    error,
  }
});

export const catchCryptomon = (): CryptomonActionType => ({
  type: CATCH_CRYPTOMON,
  payload: {
    status: 'loading',
  }
});

export const catchCryptomonSuccess = (): CryptomonActionType => ({
  type: CATCH_CRYPTOMON_SUCCESS,
  payload: {
    status: 'success',
  }
});

export const catchCryptomonFailure = (error: string): CryptomonActionType => ({
  type: CATCH_CRYPTOMON_FAILURE,
  payload: {
    status: 'failure',
    error,
  }
});
