// @flow

import type { ActionType } from 'types/actionTypes';

export const GET_MOVESET = 'GET_MOVESET';

export type MovesetEnumType =
  | 'GET_MOVESET';

type PayloadType = {
  moveset: ?number[],
  error: ?Error,
};

export type MovesetActionType = ActionType<MovesetEnumType, PayloadType>;

export const getMoveset = (moveset: ?number[], error: ?Error = null): MovesetActionType => {
  console.log('action', moveset, error);

  return ({
    type: GET_MOVESET,
    payload: {
      moveset,
      error,
    },
  })
};
