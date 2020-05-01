// @flow
import Web3 from "web3";

import cryptomonDB from 'db/CryptomonsDB';

export const generateRandomCryptomon = async (): Promise<{ name: string, _type: string, dna: string, stats: number[]}> => {
  const randomIndex = Math.floor(Math.random() * 3) + 1 || 0;

  const {
    name,
    _type,
  } = cryptomonDB[randomIndex];

  const dna = await Web3.utils.keccak256(Web3.utils.randomHex(16));

  const stats = computeCryptomonStats(randomIndex, dna, 1);

  return {
    name,
    dna,
    _type,
    stats,
  };
};

export const computeCryptomonStats = (cryptomonIndex: number, dna: string, level: number): number[] => {
  const {
    health: baseHealth,
    attack: baseAttack,
    defense: baseDefense,
    specialAttack: baseSpecialAttack,
    specialDefense: baseSpecialDefense,
    speed: baseSpeed,
  } = cryptomonDB[cryptomonIndex];

  const health = Math.round(((((2*baseHealth+parseInt(dna.substr(15, 1), 16)+parseInt(dna.substr(16, 1), 16)+(0/4))*level))/100)+1+10);
  const attack = Math.round(((((2*baseAttack+parseInt(dna.substr(17, 1), 16)+parseInt(dna.substr(18, 1), 16)+(0/4))*level))/100)+5);
  const defense = Math.round(((((2*baseDefense+parseInt(dna.substr(19, 1), 16)+parseInt(dna.substr(20, 1), 16)+(0/4))*level))/100)+5);
  const specialAttack = Math.round(((((2*baseDefense+parseInt(dna.substr(21, 1), 16)+parseInt(dna.substr(22, 1), 16)+(0/4))*level))/100)+5);
  const specialDefense = Math.round(((((2*baseDefense+parseInt(dna.substr(23, 1), 16)+parseInt(dna.substr(24, 1), 16)+(0/4))*level))/100)+5);
  const speed = Math.round(((((2*baseSpeed+parseInt(dna.substr(25, 1), 16)+parseInt(dna.substr(26, 1), 16)+(0/4))*level))/100)+5);

  return [health, attack, defense, specialAttack, specialDefense, speed];
};
