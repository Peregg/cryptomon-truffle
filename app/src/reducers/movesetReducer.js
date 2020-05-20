// @flow

import {
  GET_MOVESET,
  type MovesetActionType,
} from 'actions/movesetActions';

import type { ReducerType } from 'types/reducerTypes';

export const initialState = {
  moveset: null,
  movesetError: null,
};

export type MovesetStateType = {
  moveset: ?number[],
  movesetError: ?Error,
};

const movesetReducer : ReducerType<MovesetStateType, MovesetActionType> = {
  [GET_MOVESET]: (state: MovesetStateType, action: MovesetActionType) => {
    return {
      ...state,
      moveset: action.payload.moveset,
      movesetError: action.payload.error,
    };
  },
};

export default movesetReducer;
