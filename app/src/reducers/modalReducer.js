// @flow

import {
  OPEN_MODAL,
  HIDE_MODAL,
  type ModalActionType,
  type HideModalType,
} from 'actions/modalActions';

export type ModalState = {
  opened: boolean,
  modalId: 0,
  data: ?mixed,
};

export const initialState = {
  opened: false,
  data: null,
};

const modalReducer = {
  [OPEN_MODAL]: (state: ModalState, { payload }: ModalActionType) => ({
    ...state,
    opened: true,
    modalId: payload.modalId || 0,
    data: payload.data || null,
  }),
  [HIDE_MODAL]: (state: ModalState) => ({
    ...state,
    opened: false,
  }),
};
 export default modalReducer;
