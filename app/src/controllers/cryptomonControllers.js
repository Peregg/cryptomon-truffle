// @flow

import {
  getUserCryptomon,
  getCryptomonDetail as getCryptomonDetailAction,
  type CryptomonActionType,
} from 'actions/cryptomonsActions';

import { generateRandomCryptomon } from 'utils/cryptomonsUtils';
import { getIndexFromId } from 'utils/contractHelpers';

import type { ActionType } from 'store';

export const getCryptomons = async (store: Object[], drizzleContext: Object) => {
  try {
    const {
      drizzle: {
        contracts: {
          CryptomonContract,
        },
      },
    } = drizzleContext;
    const [{ activeAccount }, dispatch] = store;

    const rawCryptomons = await CryptomonContract.methods.getMyCryptomons().call({ from: activeAccount });

    const myCryptomons = rawCryptomons.map(({
      _id: id,
      name,
      _type: type,
      tamer,
      dna,
      level,
      stats: [
        health,
        attack,
        defense,
        specialAttack,
        specialDefense,
        speed,
      ],
      xp,
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
      specialAttack,
      specialDefense,
      speed,
      xp,
    }));

    dispatch(getUserCryptomon(myCryptomons));
  } catch (error) {
    console.log('getCryptomons =>', error);
  }
};

export const catchCryptomon = async (store: Object, drizzleContext: Object) => {
  try {
    const {
      drizzle: {
        contracts: {
          CryptomonContract,
        },
      },
    } = drizzleContext;
    const [{ activeAccount }, dispatch] = store;

    const { name, dna, _type, stats } = await generateRandomCryptomon();

    const gas = await CryptomonContract.methods.spawnCryptomon(name, _type, dna, stats).estimateGas();

    const cryptomonSpawned = await CryptomonContract.methods.spawnCryptomon(name, _type, dna, stats).send({ from: activeAccount, gas });

    getCryptomons(store, drizzleContext);
  } catch (error) {
    console.log('catchCryptomon error =>', error);
  }
}

export const getCryptomonDetail = async (payload: Object, store: Object, drizzleContext: Object) => {
  try {
    const {
      drizzle: {
        contracts: {
          CryptomonContract,
        },
      },
    } = drizzleContext;
    const [{ activeAccount }, dispatch] = store;
    const { id: cmonId } = payload;

    const index = getIndexFromId(cmonId);

    const {
      _id: id,
      name,
      _type: type,
      tamer,
      dna,
      level,
      stats: [
        health,
        attack,
        defense,
        specialAttack,
        specialDefense,
        speed,
      ],
      xp,
    } = await CryptomonContract.methods.getCryptomon(index).call({ from: activeAccount });

    dispatch(getCryptomonDetailAction({
        id,
        name,
        type,
        tamer,
        dna,
        level,
        health,
        attack,
        defense,
        specialAttack,
        specialDefense,
        speed,
        xp,
      }));
  } catch (error) {
    console.log('kokokokok', error);
  }
};
