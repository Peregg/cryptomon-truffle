// @flow

import {
  GET_USER_CRYPTOMONS,
  GET_USER_CRYPTOMONS_SUCCESS,
  GET_USER_CRYPTOMONS_FAILURE,
  CATCH_CRYPTOMON,
  CATCH_CRYPTOMON_SUCCESS,
  CATCH_CRYPTOMON_FAILURE,
} from 'actions/cryptomonsActions';

import { defaultCryptomon, type CryptomonType } from 'types/cryptomonTypes';
import type { ReducerType } from 'types/reducerTypes';
import type { CryptomonActionType } from 'actions/cryptomonsActions';

import {
  STATUS_DEFAULT,
} from 'constants/statusConstants';

export const initialState = {
  cryptomonsStatus: 'default',
  cryptomons: [],
  catchCryptoStatus: 'default',
};

export type CryptomonStateType = {|
  cryptomonsStatus: string,
  catchCryptoStatus: string,
  cryptomons: CryptomonType[],
|};

const defaultPayload = {
  payload: {
    status: STATUS_DEFAULT,
    cryptomons: [defaultCryptomon],
  },
};

const cryptomonsReducer: ReducerType<CryptomonStateType, CryptomonActionType> = {
  [GET_USER_CRYPTOMONS]: (state: CryptomonStateType, { payload } = defaultPayload) => {
    return {
      ...state,
      cryptomonsStatus: payload.status,
    };
  },
  [GET_USER_CRYPTOMONS_SUCCESS]: (state: CryptomonStateType, { payload } = defaultPayload) => {
    return {
      ...state,
      cryptomonsStatus: payload.status,
      cryptomons: payload.cryptomons || [],
    };
  },
  [GET_USER_CRYPTOMONS_FAILURE]: (state: CryptomonStateType, { payload } = defaultPayload) => {
    return {
      ...state,
      cryptomonsStatus: payload.status,
    };
  },
  [CATCH_CRYPTOMON]: (state: CryptomonStateType, { payload } = defaultPayload) => {
    return {
      ...state,
      catchCryptoStatus: payload.status,
    };
  },
  [CATCH_CRYPTOMON_SUCCESS]: (state: CryptomonStateType, { payload } = defaultPayload) => {
    return {
      ...state,
      catchCryptoStatus: payload.status,
    };
  },
  [CATCH_CRYPTOMON_FAILURE]: (state: CryptomonStateType, { payload } = defaultPayload) => {
    return {
      ...state,
      catchCryptoStatus: payload.status,
    };
  },
};

export default cryptomonsReducer;
