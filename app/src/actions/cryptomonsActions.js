// @flow

import type { CryptomonType } from 'types/cryptomonTypes';

// actions type constants
export const GET_USER_CRYPTOMONS = 'GET_USER_CRYPTOMONS';
export const GET_USER_CRYPTOMONS_SUCCESS = 'GET_USER_CRYPTOMONS_SUCCESS';
export const GET_USER_CRYPTOMONS_FAILURE = 'GET_USER_CRYPTOMONS_FAILURE';

// action types
export type GET_USER_CRYPTOMONS_ACTION = {
  type: 'GET_USER_CRYPTOMONS',
  payload: {
    status: 'loading',
  },
};

export type GET_USER_CRYPTOMONS_SUCCESS_ACTION = {
  type: 'GET_USER_CRYPTOMONS_SUCCESS',
  payload: {
    status: 'success',
    cryptomons: CryptomonType[]
  },
};

export type GET_USER_CRYPTOMONS_FAILURE_ACTION = {
  type: 'GET_USER_CRYPTOMONS_FAILURE',
};

export type CryptomonActionType =
  | GET_USER_CRYPTOMONS_ACTION
  | GET_USER_CRYPTOMONS_SUCCESS_ACTION
  | GET_USER_CRYPTOMONS_FAILURE_ACTION;

// actions functions
export const getUserCryptomon = (): GET_USER_CRYPTOMONS_ACTION => ({
  type: GET_USER_CRYPTOMONS,
  payload: {
    status: 'loading',
  }
});

export const getUserCryptomonSuccess = (cryptomons: CryptomonType[]): GET_USER_CRYPTOMONS_SUCCESS_ACTION => {console.log('in success', cryptomons);return({
  type: GET_USER_CRYPTOMONS_SUCCESS,
  payload: {
    status: 'success',
    cryptomons: cryptomons,
  }
})};

export const getUserCryptomonFailure = (error: string): GET_USER_CRYPTOMONS_FAILURE_ACTION => ({
  type: GET_USER_CRYPTOMONS_FAILURE,
  payload: {
    status: 'failure',
    error,
  }
});
