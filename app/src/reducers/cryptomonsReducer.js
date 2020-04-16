import {
  GET_USER_CRYPTOMONS,
  GET_USER_CRYPTOMONS_SUCCESS,
  GET_USER_CRYPTOMONS_FAILURE,
  CATCH_CRYPTOMON,
  CATCH_CRYPTOMON_SUCCESS,
  CATCH_CRYPTOMON_FAILURE,
} from 'actions/cryptomonsActions';

export const initialState = {
  cryptomonsStatus: 'default',
  cryptomons: [],
  catchCryptoStatus: 'default',
};

const cryptomonsReducer = {
  [GET_USER_CRYPTOMONS]: (state, { type, payload }) => {
    return {
      ...state,
      cryptomonsStatus: payload.status,
    };
  },
  [GET_USER_CRYPTOMONS_SUCCESS]: (state, { type, payload }) => {
    return {
      ...state,
      cryptomonsStatus: payload.status,
      cryptomons: payload.cryptomons,
    };
  },
  [GET_USER_CRYPTOMONS_FAILURE]: (state, { type, payload }) => {
    return {
      ...state,
      cryptomonsStatus: payload.status,
    };
  },
  [CATCH_CRYPTOMON]: (state, { type, payload }) => {
    return {
      ...state,
      catchCryptoStatus: payload.status,
    };
  },
  [CATCH_CRYPTOMON_SUCCESS]: (state, { type, payload }) => {
    return {
      ...state,
      catchCryptoStatus: payload.status,
    };
  },
  [CATCH_CRYPTOMON_FAILURE]: (state, { type, payload }) => {
    return {
      ...state,
      catchCryptoStatus: payload.status,
    };
  },
};

export default cryptomonsReducer;
