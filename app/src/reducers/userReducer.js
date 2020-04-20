// @flow

import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  POST_USER,
  POST_USER_SUCCESS,
  POST_USER_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from 'actions/userActions';

import {
  STATUS_DEFAULT,
  STATUS_LOADING,
  STATUS_SUCCESS,
  STATUS_FAILURE,
} from 'constants/statusConstants';

import type { UserActionType } from 'actions/userActions';
import { defaultUser, type UserType } from 'types/userTypes';
import type { ReducerType } from 'types/reducerTypes';

export const initialState = {
  postUserStatus: STATUS_DEFAULT,
  getUserStatus: STATUS_DEFAULT,
  updateUserStatus: STATUS_DEFAULT,
  user: {
    nickname: '',
  },
};

export type UserStateType = {|
  postUserStatus: string,
  getUserStatus: string,
  updateUserStatus: string,
  user: UserType,
|};

const defaultAction = {
  payload: {
    status: STATUS_DEFAULT,
    user: defaultUser,
  },
};

const userReducer: ReducerType<UserStateType, UserActionType> = {
  [GET_USER]: (state, action = defaultAction) => {
    return {
      ...state,
      getUserStatus: status,
    };
  },
  [GET_USER_SUCCESS]: (state, { payload } = defaultAction) => {
    return {
      ...state,
      getUserStatus: status,
      user: payload.user || defaultUser,
    };
  },
  [GET_USER_FAILURE]: (state, { payload } = defaultAction) => {
    return {
      ...state,
      getUserStatus: status,
    };
  },
  [POST_USER]: (state, { payload } = defaultAction) => {
    return {
      ...state,
      postUserStatus: status,
    };
  },
  [POST_USER_SUCCESS]: (state, { payload } = defaultAction) => {
    return {
      ...state,
      postUserStatus: status,
      user: payload.user || defaultUser,
    };
  },
  [POST_USER_FAILURE]: (state, { payload } = defaultAction) => {
    return {
      ...state,
      postUserStatus: status,
    };
  },
  [UPDATE_USER]: (state, { payload } = defaultAction) => {
    return {
      ...state,
      updateUserStatus: status,
    };
  },
  [UPDATE_USER_SUCCESS]: (state, { payload } = defaultAction) => {
    return {
      ...state,
      updateUserStatus: status,
      user: payload.user || defaultUser,
    };
  },
  [UPDATE_USER_FAILURE]: (state, { payload } = defaultAction) => {
    return {
      ...state,
      updateUserStatus: status,
    };
  },
};

export default userReducer;
