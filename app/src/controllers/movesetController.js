// @flow

import api from 'api/http';

import { getMoveset as getMovesetAction } from 'actions/movesetActions';

export const getMoveset = async (payload: Object, store: [Object, Function]) => {
  const { id } = payload;
  const [_, dispatch] = store;
  const { data: { success, payload: res, error } } = await api.get(`/moves?cmon=${id}`);

  if (!success) {
    dispatch(getMovesetAction(null, error));
  } else {
    dispatch(getMovesetAction(res.set));
  }
};

export const createOrUpdateMoveset = async (payload: Object, store: [Object, Function]) => {
  const { cmon, moves } = payload;
  const [{ moveset }, dispatch] = store;
  let data;
  if (!moveset) {
    data = await api.post(`/moves`, { cmon, moves });
  } else {
    data = await api.put(`/moves`, { cmon, moves });
  }

  console.log(data, 'mdr lplpeodk');
};
