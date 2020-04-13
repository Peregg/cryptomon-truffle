// @flow

import { useContext, useEffect } from 'react';

import {
  getUserCryptomonSuccess,
  getUserCryptomonFailure,
  type CryptomonActionType,
} from 'actions/cryptomonsActions';
import { DrizzleContext } from "@drizzle/react-plugin";

export default async (status: string, next: (CryptomonActionType) => void, { account }: { account: string }) => {
  const {
    drizzle: {
      contracts: {
        CryptomonContract,
      },
    }
  } = useContext(DrizzleContext.Context);


  useEffect(
    () => {
  const middleware = async () => {
    try {
      const rawCryptomons = await CryptomonContract.methods.getMyCryptomons().call({ from: account });

      const myCryptomons = rawCryptomons.map(({
        _id: id,
        name,
        _type: type,
        tamer,
        dna,
        level,
        health,
        attack,
        defense,
        speed,
      }) => ({
        id,
        name,
        type,
        tamer,
        dna,
        level,
        health,
        attack,
        defense,
        speed,
      }));

      next(getUserCryptomonSuccess(myCryptomons));
    } catch (error) {
      next(getUserCryptomonFailure(error.message));
    }
  }
      status !== 'default' && middleware();
    },
    // eslint-disable-next-line
    [status]
  )
}
