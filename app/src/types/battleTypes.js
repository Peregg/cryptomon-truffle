// @flow

import type { CryptomonType } from 'types/cryptomonTypes';

export type TamerType = {|
  id: ?string,
  address: ?string,
  nickname: ?string,
  ready: boolean,
  cryptomon: ?CryptomonType,
  isWinner: boolean,
|};

export const nullTamer: TamerType = {
  id: null,
  address: null,
  nickname: null,
  ready: false,
  cryptomon: null,
  isWinner: false,
};
