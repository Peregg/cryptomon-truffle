// @flow

import React, { useState, useContext, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring'
import { useHistory } from 'react-router-dom';

import Button from 'fragments/Button';

import type { FightingCryptomonType } from 'types/battleTypes';

type Props = {
  statDiff: {
    health: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number,
  },
  cryptomon: FightingCryptomonType,
  handleCloseModal: Function,
  newLevel: number,
};

const StatDiffModal = ({ statDiff, cryptomon, newLevel, handleCloseModal }: Props) => {
  console.log('jokokoiokj', statDiff);
  const [diff, setDiff] = useState({
    health: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  });
  const timer = useRef(null);
  const history = useHistory();

  const healthDiffAnimation = useSpring({ number: diff.health, from: { number: 0 } });
  const attackDiffAnimation = useSpring({ number: diff.attack, from: { number: 0 } });
  const specialAttackDiffAnimation = useSpring({ number: diff.specialAttack, from: { number: 0 } });
  const defenseDiffAnimation = useSpring({ number: diff.defense, from: { number: 0 } });
  const specialDefenseDiffAnimation = useSpring({ number: diff.specialDefense, from: { number: 0 } });
  const speedDiffAnimation = useSpring({ number: diff.speed, from: { number: 0 } });

  useEffect(() => {
    timer.current = setTimeout(() => {
      setDiff({
        health: statDiff.health,
        attack: statDiff.attack,
        specialAttack: statDiff.specialAttack,
        specialDefense: statDiff.specialDefense,
        defense: statDiff.defense,
        speed: statDiff.speed,
      });
    }, 1000);

    return () => clearTimeout(timer.current);
  }, []);

  const handleClickButton = () => {
    handleCloseModal();
    history.push('/');
  }

  return (
    <div className='modal-text'>
      <p>{cryptomon.name} monte au niveau {newLevel} ! </p>
      <animated.div> PV + <animated.span>{healthDiffAnimation.number.interpolate(num => Math.round(num))}</animated.span></animated.div>
      <animated.div> Attaque + <animated.span>{attackDiffAnimation.number.interpolate(num => Math.round(num))}</animated.span></animated.div>
      <animated.div> Defense + <animated.span>{defenseDiffAnimation.number.interpolate(num => Math.round(num))}</animated.span></animated.div>
      <animated.div> Atk. Spé + <animated.span>{specialAttackDiffAnimation.number.interpolate(num => Math.round(num))}</animated.span> </animated.div>
      <animated.div> Def. Spé + <animated.span>{specialDefenseDiffAnimation.number.interpolate(num => Math.round(num))}</animated.span> </animated.div>
      <animated.div> Vitesse + <animated.span>{speedDiffAnimation.number.interpolate(num => Math.round(num))}</animated.span></animated.div>
      <Button handleClick={handleClickButton}>Super !</Button>
    </div>
  );

};

export default StatDiffModal;
