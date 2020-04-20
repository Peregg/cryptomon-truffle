// @flow

export type ActionType<ActionType, PayloadType> = {
  type: ActionType,
  payload: PayloadType,
};
