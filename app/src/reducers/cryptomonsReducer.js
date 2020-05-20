// @flow

import {
  GET_USER_CRYPTOMONS,
  GET_CRYPTOMON_DETAIL,
  CATCH_CRYPTOMON,
  CLEAR_CRYPTOMON_STATE,
} from 'actions/cryptomonsActions';

import { defaultCryptomon, type CryptomonType } from 'types/cryptomonTypes';
import type { ReducerType } from 'types/reducerTypes';
import type { CryptomonActionType } from 'actions/cryptomonsActions';

import {
  STATUS_DEFAULT,
} from 'constants/statusConstants';

export const initialState = {
  cryptomons: null,
  cryptomonDetail: null,
};

export type CryptomonStateType = {
  cryptomons: ?CryptomonType[],
  cryptomonDetail: ?CryptomonType,
};


const cryptomonsReducer: ReducerType<CryptomonStateType, CryptomonActionType> = {
  [GET_USER_CRYPTOMONS]: (state: CryptomonStateType, action: CryptomonActionType) => {
    const { payload } = action;
    return {
      ...state,
      cryptomons: payload.cryptomons,
    };
  },
  [GET_CRYPTOMON_DETAIL]: (state: CryptomonStateType, action: CryptomonActionType) => {
    const { payload } = action;
    return {
      ...state,
      cryptomonDetail: payload.cryptomonDetail,
    };
  },
  [CLEAR_CRYPTOMON_STATE]: (state: CryptomonStateType, action: CryptomonActionType) => {
    const { payload } = action;
    return {
      ...state,
      cryptomonDetail: null,
    };
  },
};

export default cryptomonsReducer;
