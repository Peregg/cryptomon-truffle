// @flow

import {
  STATUS_LOADING,
  STATUS_SUCCESS,
  STATUS_FAILURE,
} from 'constants/statusConstants';

export const SET_ACTIVE_ACCOUNT = 'SET_ACTIVE_ACCOUNT';

export type SET_ACTIVE_ACCOUNT_ACTION = {
  type: 'SET_ACTIVE_ACCOUNT',
  payload: {
    account: string,
  },
};

export type ActiveAccountType =
  | SET_ACTIVE_ACCOUNT_ACTION;

export const setActiveAccount = (account: string): SET_ACTIVE_ACCOUNT_ACTION => ({
  type: SET_ACTIVE_ACCOUNT,
  payload: {
    account,
  },
});

