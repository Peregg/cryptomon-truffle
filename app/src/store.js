// @flow

import React, {
  useReducer,
  // useContext, @DÉCOMMENTER si besoin du HOC
  createContext,
} from 'react';

import cryptomonsReducer, {
  initialState as initialCryptomonsState,
  type CryptomonStateType,
} from 'reducers/cryptomonsReducer';
import activeAccountReducer, {
  initialState as initialActiveAccountState,
  type ActiveAccountStateType,
} from 'reducers/activeAccountReducer';
import userReducer, {
  initialState as initialUserState,
  type UserStateType,
} from 'reducers/userReducer';
import modalReducer, {
  initialState as initiaModalState,
  type ModalState,
} from 'reducers/modalReducer';

import type { CryptomonActionType, CryptomonActionEnumType } from 'actions/cryptomonsActions';
import type { ActiveAccountType } from 'actions/activeAccountActions';
import type { UserActionType, UserActionEnumType } from 'actions/userActions';
import type { ModalActionType, ModalEnumType } from 'actions/modalActions';
import type { ReducerType } from 'types/reducerTypes';

export type ActionType =
  | UserActionType
  | CryptomonActionType
  | ActiveAccountType
  | ModalActionType;

type CombinedReducerStateType =
  & CryptomonStateType
  & ActiveAccountStateType
  & UserStateType;

type ActionEnumsType =
| CryptomonActionEnumType
| UserActionEnumType
| ModalEnumType
| 'SET_ACTIVE_ACCOUNT';

const reducers = (state, { type, payload }: ActionType) => {
  // $FlowFixMe
  const combinedReducers: ReducerType<CombinedReducerStateType, *> = {
    ...userReducer,
    ...cryptomonsReducer,
    ...activeAccountReducer,
    ...modalReducer,
  };

  return combinedReducers[type](state, { type, payload });
};

const init = {
  ...initialCryptomonsState,
  ...initialActiveAccountState,
  ...initialUserState,
  ...initiaModalState,
};

export const Store = createContext<Object>(reducers);

type Props = {|
  children: React$Element<*>,
|};

export const StoreProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducers, init);
  // console.log(state);

  return (
    <Store.Provider value={[state, dispatch]}>
      {props.children}
    </Store.Provider>
  );
}

// HOC pour injecter le contexte directement dans le composant encapsulé
// const withStoreContext = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (props) => {
//   const [store, dispatch] = useContext(Store);
//   let allProps = {
//     ...props,
//   };

//   if (mapStateToProps) {
//     allProps = {
//       ...allProps,
//       ...mapStateToProps(store),
//     };
//   }

//   console.log(mapDispatchToProps);

//   if (mapDispatchToProps) {
//     allProps = {
//       ...allProps,
//       ...mapDispatchToProps(dispatch),
//     };
//   };

//   return (
//     <WrappedComponent
//       {...allProps}
//     />
//   );
// };

// export { withStoreContext };
