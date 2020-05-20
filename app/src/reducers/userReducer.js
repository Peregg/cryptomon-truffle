// @flow

import {
  GET_USER,
  POST_USER,
  UPDATE_USER,
  type UserActionType,
} from 'actions/userActions';

import {
  STATUS_DEFAULT,
} from 'constants/statusConstants';

import { defaultUser, type UserType } from 'types/userTypes';
import type { ReducerType } from 'types/reducerTypes';

export const initialState = {
  user: {
    id: '',
    nickname: '',
    address: '',
    avatar: '',
  },
  error: null,
};

export type UserStateType = {
  user: ?UserType,
  error: ?Error,
};

const defaultAction = {
  payload: {
    user: null,
    error: null,
  },
};

const userReducer: ReducerType<UserStateType, UserActionType> = {
  [GET_USER]: (state, { payload } = defaultAction) => {
    return {
      ...state,
      user: payload.user,
      error: payload.error,
    };
  },
  [POST_USER]: (state, { payload } = defaultAction) => {
    return {
      ...state,
      user: payload.user,
      error: payload.error,
    };
  },
  [UPDATE_USER]: (state, { payload } = defaultAction) => {
    return {
      ...state,
      user: payload.user,
      error: payload.error,
    };
  },
};

export default userReducer;
