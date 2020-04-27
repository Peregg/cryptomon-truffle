// @flow
import type { ActionType, PayloadlessActionType } from 'types/actionTypes';

export const OPEN_MODAL = 'OPEN_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export type ModalEnumType =
  | 'OPEN_MODAL'
  | 'HIDE_MODAL';

export type PayloadType = {
  modalId: number,
  data: mixed,
};

export type ModalActionType = ActionType<ModalEnumType, PayloadType>;

export type HideModalType = PayloadlessActionType<ModalEnumType>;

export const openModal = (modalId: number, data?: mixed): ModalActionType => ({
  type: OPEN_MODAL,
  payload: {
    modalId,
    data,
  },
});

export const hideModal = (): HideModalType => ({
  type: HIDE_MODAL,
});
