// @flow

import {
  STATUS_LOADING,
  STATUS_SUCCESS,
  STATUS_FAILURE,
} from 'constants/statusConstants';

import type { UserType } from 'types/userTypes';
import type { ActionType } from 'types/actionTypes';

export const GET_USER = 'GET_USER';
export const POST_USER = 'POST_USER';
export const UPDATE_USER = 'UPDATE_USER';

export type UserActionEnumType =
| 'GET_USER'
| 'POST_USER'
| 'UPDATE_USER';

type PayloadType = {
  user: ?UserType,
  error: ?Error,
};

export type UserActionType = ActionType<UserActionEnumType, PayloadType>;

export const postUser = (user: ?UserType, error: ?Error = null): UserActionType => ({
  type: POST_USER,
  payload: {
    user,
    error,
  },
});

export const getUser = (user: ?UserType, error: ?Error = null): UserActionType => ({
  type: GET_USER,
  payload: {
    user,
    error,
  },
});


export const updateUser = (user: ?UserType, error: ?Error = null): UserActionType => ({
  type: UPDATE_USER,
  payload: {
    user,
    error,
  },
});
