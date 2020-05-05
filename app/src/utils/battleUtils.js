// @flow

import {
  TYPE_ORDER,
  TYPE_CHART,
  statModifiers,
} from 'db/AttacksDB';

const computeTypeModifier = (attackType, defenderType) => {
  return TYPE_CHART[attackType][TYPE_ORDER[defenderType]];
};

export const computeCmonMoveEffect = (move, cmons, moveMessage, history, dispatch) => {
  const { category } = move;
  console.log(move, cmons, moveMessage);

  if (category === 'effect') {
    const { applyOn, target, modifier, duration } = move.effect;
    const {
      updateAttackingCmon,
      updateDefendingCmon,
      attackingCmon,
      defendingCmon,
    } = cmons;

    if (target === 'self') {
      updateAttackingCmon(prevCmon => ({
        ...prevCmon,
        modifiers: {
          ...prevCmon.modifiers,
          [applyOn]: (move.type === 'bonus'
            && prevCmon.modifiers[applyOn] + 1)
            || prevCmon.modifiers[applyOn] - 1,
        },
      }));
      moveMessage(`${attackingCmon.name} utilise ${move.name} ! Son ${applyOn} augmente !`);
    } else {
      updateDefendingCmon(prevCmon => ({
        ...prevCmon,
        modifiers: {
          ...prevCmon.modifiers,
          [applyOn]: (move.type === 'bonus'
            && prevCmon.modifiers[applyOn] + 1)
            || prevCmon.modifiers[applyOn] - 1,
        },
      }));
      moveMessage(`${attackingCmon.name} utilise ${move.name} sur ${defendingCmon.name} ! Son ${applyOn} diminue !`);
    }
  } else if (category === 'attack') {
    const {
      attackingCmon,
      attackingCmon: {
        name,
        level,
        attack,
        specialAttack,
      },
      defendingCmon,
      defendingCmon: {
        defense,
        specialDefense,
        type: defendingCmonType,
      },
      updateDefendingCmon,
    } = cmons;

    const {
      power,
      type: moveType,
      name: moveName,
    } = move;

    const typeModifier = computeTypeModifier(moveType, defendingCmonType);
    let damages;
    let effectivness;
    let attackWithModifer;
    let defenseWithModifier;

    if (move.class === 'physical') {

      attackWithModifer = attack * (statModifiers[attackingCmon.modifiers.attack] || 1);
      defenseWithModifier = defense * (statModifiers[defendingCmon.modifiers.defense] || 1);
    }

    if (move.class === 'special') {

      attackWithModifer = specialAttack * (statModifiers[attackingCmon.modifiers.specialAttack] || 1);
      defenseWithModifier = specialDefense * (statModifiers[defendingCmon.modifiers.specialDefense] || 1);
    }

    damages = Math.round(((level*0.4+2)*(attackWithModifer||1)*power/((defenseWithModifier||1)*50)+2)*typeModifier);

    effectivness = (typeModifier > 1 && 'C\'est super efficace !')
      || (typeModifier < 1 && 'Ce n\'est pas très efficace...')
      || '';

  if (cmons.defendingCmon.health - (damages || 0) <= 0) {
      dispatch(cmons.updateAttackingCmonOwner({
        ...cmons.attackingCmonOwner,
        isWinner: true,
      }));
    return history.push('/arena/results');
  }

    updateDefendingCmon(prevCmon => ({
      ...prevCmon,
      health: prevCmon.health - (damages || 0),
    }));
    moveMessage(`${name} utilise ${moveName} et inflige ${damages || 0} points de dégâts ! ${effectivness || ''}`);
  }
};
