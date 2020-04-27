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
import {
  openModal,
  type ModalActionType,
} from 'actions/modalActions'

const api = requestResolver('http://192.168.1.25:3001');

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

export const updateUserProfile = async ({ activeAccount, nickname, avatar }: { activeAccount: string, nickname: string, avatar: string }, dispatch: (UserActionType | ModalActionType) => void) => {
  dispatch(updateUser());

  try {
    const { data } = await api.put('/user', { address: activeAccount, nickname, avatar });

    if (data.error) {
      dispatch(updateUserFailure());
    } else {
      dispatch(updateUserSuccess(data.payload));
      dispatch(openModal(1, nickname));
    }
  } catch (error) {
    dispatch(updateUserFailure());
  }
};
