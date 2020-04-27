// @flow

import {
  STATUS_LOADING,
  STATUS_SUCCESS,
  STATUS_FAILURE,
} from 'constants/statusConstants';

import type { UserType } from 'types/userTypes';
import type { ActionType } from 'types/actionTypes';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
export const POST_USER = 'POST_USER';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export type UserActionEnumType =
| 'GET_USER'
| 'GET_USER_SUCCESS'
| 'GET_USER_FAILURE'
| 'POST_USER'
| 'POST_USER_SUCCESS'
| 'POST_USER_FAILURE'
| 'UPDATE_USER'
| 'UPDATE_USER_SUCCESS'
| 'UPDATE_USER_FAILURE';

type PayloadType = {
  status: string,
  user?: UserType,
};

export type UserActionType = ActionType<UserActionEnumType, PayloadType>;

export const postUser = (): UserActionType => ({
  type: POST_USER,
  payload: {
    status: STATUS_LOADING,
  },
});

export const postUserSuccess = (user: UserType): UserActionType => ({
  type: POST_USER_SUCCESS,
  payload: {
    status: STATUS_SUCCESS,
    user,
  },
});

export const postUserFailure = (): UserActionType => ({
  type: POST_USER_FAILURE,
  payload: {
    status: STATUS_FAILURE,
  },
});

export const getUser = (): UserActionType => ({
  type: GET_USER,
  payload: {
    status: STATUS_LOADING,
  },
});

export const getUserSuccess = (user: UserType): UserActionType => ({
  type: GET_USER_SUCCESS,
  payload: {
    status: STATUS_SUCCESS,
    user,
  },
});

export const getUserFailure = (): UserActionType => ({
  type: GET_USER_FAILURE,
  payload: {
    status: STATUS_FAILURE,
  },
});

export const updateUser = (): UserActionType => ({
  type: UPDATE_USER,
  payload: {
    status: STATUS_LOADING,
  },
});

export const updateUserSuccess = (user: UserType): UserActionType => ({
  type: UPDATE_USER_SUCCESS,
  payload: {
    status: STATUS_SUCCESS,
    user,
  },
});

export const updateUserFailure = (): UserActionType => ({
  type: UPDATE_USER_FAILURE,
  payload: {
    status: STATUS_FAILURE,
  },
});
