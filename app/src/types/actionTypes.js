// @flow

export type ActionType<ActionType, PayloadType> = {|
  type: ActionType,
  payload: PayloadType,
|};

export type PayloadlessActionType<ActionType> = {|
  type: ActionType,
|};
