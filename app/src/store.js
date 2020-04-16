// @flow

import React, {
  useReducer,
  // useContext, @DÉCOMMENTER si besoin du HOC
  createContext,
} from 'react';

import cryptomonsReducer, { initialState as initialCryptomonsState } from 'reducers/cryptomonsReducer';

import type { CryptomonActionType } from 'actions/cryptomonsActions';

export type ActionType =
  | CryptomonActionType;

const reducers = (state, { type, payload }) => {
  const combinedReducers = {
    ...cryptomonsReducer,
  };

  return combinedReducers[type](state, { type, payload });
};

const init = {
  ...initialCryptomonsState,
};

export const Store = createContext<Object>(reducers);

type Props = {|
  children: React$Element<*>,
|};

export const StoreProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducers, init);

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
