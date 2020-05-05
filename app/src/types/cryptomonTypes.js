// @flow

export type CryptomonType = {|
  id: number,
  name: string,
  type: string,
  tamer: string,
  dna: string,
  level: number,
  health: number,
  attack: number,
  defense: number,
  specialAttack: number,
  specialDefense: number,
  speed: number,
|};
export type CryptomonMoveType = Object;

export const defaultCryptomon = {
  id: 0,
  name: '',
  type: '',
  tamer: '',
  dna: '',
  level: 0,
  health: 0,
  attack: 0,
  defense: 0,
  speed: 0,
};
