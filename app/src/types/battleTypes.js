// @flow

import type { CryptomonType } from 'types/cryptomonTypes';

export type FightingCryptomonType = {|
  ...CryptomonType,
  modifiers: {
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number,
  },
  status: {
    isBurnt: boolean,
    isPoisoned: boolean,
    isSleeping: boolean,
    isConfused: boolean,
    isFrozen: boolean,
    isParalized: boolean,
    isFlinched: boolean,
    isLeeched: boolean,
  },
  selectedMove: ?MoveType,
|};

type MoveType = {
  level: number,
  name: string,
  category: string,
  type: string,
  effect: {
    applyOn: string,
    target: string,
    modifier: number,
    duration: ?number,
  },
  power: ?number,
};

export type PlayerType = {|
  id: ?string,
  address: ?string,
  nickname: ?string,
  ready: boolean,
  cmon: ?FightingCryptomonType,
  isWinner: boolean,
  isWaitingFoe: boolean,
  isChallenger: boolean,
|};

export const nullPlayer: PlayerType = {
  id: null,
  address: null,
  nickname: null,
  ready: false,
  cmon: null,
  isWinner: false,
  isWaitingFoe: false,
  isChallenger: false,
};

export const initialFightingCryptomon = (cmon: CryptomonType) => ({
  ...cmon,
  attack: parseInt(cmon.attack, 10),
  specialAttack: parseInt(cmon.specialAttack, 10),
  health: parseInt(cmon.health, 10),
  defense: parseInt(cmon.defense, 10),
  specialDefense: parseInt(cmon.specialDefense, 10),
  speed: parseInt(cmon.speed, 10),
  modifiers: {
    attack: 6,
    defense: 6,
    specialAttack: 6,
    specialDefense: 6,
    speed: 6,
  },
  status: {
    isBurnt: false,
    isPoisoned: false,
    isSleeping: false,
    isConfused: false,
    isFrozen: false,
    isParalized: false,
    isFlinched: false,
  },
  selectedMove: null,
  maxHealth: parseInt(cmon.health, 10),
});
