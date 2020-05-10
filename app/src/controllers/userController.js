// @flow
import requestResolver from 'api/requestResolver';

import {
  getUser as getUserAction,
  postUser as postUserAction,
  updateUser as updateUserAction,
  type UserActionType,
} from 'actions/userActions';
import {
  openModal,
  type ModalActionType,
} from 'actions/modalActions'

const api = requestResolver('http://192.168.1.25:3001');

export const getUser = async (store: [Object, Function]) => {
  const [{ activeAccount }, dispatch] = store;

  try {
    const { data } = await api.get(`/user?address=${activeAccount}`);
    if (data.error) {
      return dispatch(getUserAction(null, data.error));
    }
    return dispatch(getUserAction(data.payload));
  } catch (error) {
    return dispatch(getUserAction(null, error));
  }
}

export const postUser = async (payload: Object, store: [Object, Function]) => {
  const [{ activeAccount, nickname, avatar }, dispatch] = store;

  try {
    const { data } = await api.post('/user', { address: activeAccount, nickname });
    if (data.error) {
      return dispatch(postUserAction(null, data.error));
    }
    return dispatch(postUserAction(data.payload));
  } catch (error) {
    return dispatch(postUserAction(null, error));
  }
}

export const updateUser = async (payload: Object, store: [Object, Function]) => {
  const [{ activeAccount }, dispatch] = store;
  const { nickname, avatar } = payload;

  try {
    const { data } = await api.put('/user', { address: activeAccount, nickname, avatar });

    if (data.error) {
      dispatch(updateUserAction(null, data.error));
    } else {
      dispatch(updateUserAction(data.payload));
      dispatch(openModal(1, nickname));
    }
  } catch (error) {
    dispatch(updateUserAction(null, error));
  }
};
