// @flow

export type ReducerType<StateType, ActionType> = {
  [type: string]: (state: StateType, action: ActionType) => StateType,
};
