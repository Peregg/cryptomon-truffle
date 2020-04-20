// @flow
import requestResolver from 'api/requestResolver';

import {
  getUser,
  getUserSuccess,
  getUserFailure,
  postUser,
  postUserSuccess,
  postUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  type UserActionType,
} from 'actions/userActions';

const api = requestResolver('http://127.0.0.1:3001');

export const getUserProfile = async ({ activeAccount }: { activeAccount: string }, dispatch: (UserActionType) => void) => {
  dispatch(getUser());

  try {
    const { data } = await api.get(`/user?address=${activeAccount}`);
    if (data.error) {
      return dispatch(getUserFailure());
    }
    return dispatch(getUserSuccess(data.payload));
  } catch (error) {
    return dispatch(getUserFailure());
  }
}

export const postUserProfile = async ({ activeAccount, nickname }: { activeAccount: string, nickname: string}, dispatch: (UserActionType) => void) => {
  dispatch(postUser());

  try {
    const { data } = await api.post('/user', { address: activeAccount, nickname });
    if (data.error) {
      return dispatch(postUserFailure());
    }
    return dispatch(postUserSuccess(data.payload));
  } catch (error) {
    return dispatch(postUserFailure());
  }
}

export const updateUserProfile = async ({ activeAccount, nickname }: { activeAccount: string, nickname: string }, dispatch: (UserActionType) => void) => {
  dispatch(updateUser());

  try {
    const { data } = await api.put('/user', { address: activeAccount, nickname });

    if (data.error) {
      dispatch(updateUserFailure());
    }
    return dispatch(updateUserSuccess(data.payload));
  } catch (error) {
    dispatch(updateUserFailure());
  }
};
