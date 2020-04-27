// @flow
import Web3 from "web3";

import {
  getUserCryptomon,
  getUserCryptomonSuccess,
  getUserCryptomonFailure,
  catchCryptomonSuccess,
  catchCryptomonFailure,
  type CryptomonActionType,
} from 'actions/cryptomonsActions';

import cryptomonDB from 'db/CryptomonsDB';

import type { ActionType } from 'store';

export const getCryptomonMiddleware = async (payload: Object, next: (CryptomonActionType) => ActionType) => {
  try {
    const {
      drizzle: {
        contracts: {
          CryptomonContract,
        },
      },
    } = payload;

    const rawCryptomons = await CryptomonContract.methods.getMyCryptomons().call({ from: payload.account });

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
};

export const catchCryptomonMiddleware = async (payload: Object, next: (CryptomonActionType) => ActionType) => {
  try {
    const {
      drizzle: {
        contracts: {
          CryptomonContract,
        },
      },
    } = payload;
    const {
      name,
      _type,
      health,
      attack,
      defense,
      speed,
    } = cryptomonDB[Math.floor(Math.random() * 3) + 1] || cryptomonDB[0];

    const dna = await Web3.utils.keccak256(Web3.utils.randomHex(16));
    const gas = await CryptomonContract.methods.catchCryptomon(name, _type, dna, health, attack, defense, speed).estimateGas();

    await CryptomonContract.methods.catchCryptomon(name, _type, dna, health, attack, defense, speed).send({ from: payload.account, gas });
    next(catchCryptomonSuccess())
    next(getUserCryptomon());
  } catch (error) {
    next(catchCryptomonFailure(error));
  }
}
