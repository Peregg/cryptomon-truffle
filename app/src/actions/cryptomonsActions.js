// @flow

import type { CryptomonType } from 'types/cryptomonTypes';

// actions type constants
export const GET_USER_CRYPTOMONS = 'GET_USER_CRYPTOMONS';
export const GET_USER_CRYPTOMONS_SUCCESS = 'GET_USER_CRYPTOMONS_SUCCESS';
export const GET_USER_CRYPTOMONS_FAILURE = 'GET_USER_CRYPTOMONS_FAILURE';
export const CATCH_CRYPTOMON = 'CATCH_CRYPTOMON';
export const CATCH_CRYPTOMON_SUCCESS = 'CATCH_CRYPTOMON_SUCCESS';
export const CATCH_CRYPTOMON_FAILURE = 'CATCH_CRYPTOMON_FAILURE';

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

export type CATCH_CRYPTOMON_ACTION = {
  type: 'CATCH_CRYPTOMON',
  payload: {
    status: 'loading',
  },
};

export type CATCH_CRYPTOMON_SUCCESS_ACTION = {
  type: 'CATCH_CRYPTOMON_SUCCESS',
  payload: {
    status: 'success',
  },
};

export type CATCH_CRYPTOMON_FAILURE_ACTION = {
  type: 'CATCH_CRYPTOMON_FAILURE',
  payload: {
    status: 'failure',
  },
};

export type CryptomonActionType =
  | GET_USER_CRYPTOMONS_ACTION
  | GET_USER_CRYPTOMONS_SUCCESS_ACTION
  | GET_USER_CRYPTOMONS_FAILURE_ACTION
  | CATCH_CRYPTOMON_ACTION
  | CATCH_CRYPTOMON_SUCCESS_ACTION
  | CATCH_CRYPTOMON_FAILURE_ACTION;

// actions functions
export const getUserCryptomon = (): GET_USER_CRYPTOMONS_ACTION => ({
  type: GET_USER_CRYPTOMONS,
  payload: {
    status: 'loading',
  }
});

export const getUserCryptomonSuccess = (cryptomons: CryptomonType[]): GET_USER_CRYPTOMONS_SUCCESS_ACTION => ({
  type: GET_USER_CRYPTOMONS_SUCCESS,
  payload: {
    status: 'success',
    cryptomons: cryptomons,
  }
});

export const getUserCryptomonFailure = (error: string): GET_USER_CRYPTOMONS_FAILURE_ACTION => ({
  type: GET_USER_CRYPTOMONS_FAILURE,
  payload: {
    status: 'failure',
    error,
  }
});

export const catchCryptomon = (): CATCH_CRYPTOMON_ACTION => {console.log('llplpl');return({
  type: CATCH_CRYPTOMON,
  payload: {
    status: 'loading',
  }
})};

export const catchCryptomonSuccess = (): CATCH_CRYPTOMON_SUCCESS_ACTION => ({
  type: CATCH_CRYPTOMON_SUCCESS,
  payload: {
    status: 'success',
  }
});

export const catchCryptomonFailure = (error: string): CATCH_CRYPTOMON_FAILURE_ACTION => ({
  type: CATCH_CRYPTOMON_FAILURE,
  payload: {
    status: 'failure',
    error,
  }
});
