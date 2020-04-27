// @flow

import { useEffect, useContext } from 'react';
import { DrizzleContext } from "@drizzle/react-plugin";
import { Store } from 'store';

import type { ActionType } from 'store';

export default async (payload: Object, middleware: (payload: Object, next: () => ActionType) => Promise<*>) => {
  const {
    drizzle,
    drizzleState,
  } = useContext(DrizzleContext.Context);
  const [store, dispatch] = useContext(Store);

  useEffect(
    () => {
      store[payload.status] === 'loading' && middleware({ drizzle, drizzleState, ...payload }, dispatch);
    // eslint-disable-next-line
    },
  )
}
