// @flow

import {
  SET_ACTIVE_ACCOUNT,
} from 'actions/activeAccountActions';

export const initialState = {
  activeAccount: '',
};

export type ActiveAccountStateType = { activeAccount: string };

const cryptomonsReducer = {
  [SET_ACTIVE_ACCOUNT]: (state: ActiveAccountStateType, { payload }: { payload: { account: '' } } ) => {
    return {
      ...state,
      activeAccount: payload.account,
    };
  },
};

export default cryptomonsReducer;
