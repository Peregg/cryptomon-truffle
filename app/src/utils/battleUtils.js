// @flow

import { deburr } from 'lodash';

import attacks, {
  TYPE_ORDER,
  TYPE_CHART,
  statModifiers,
} from 'db/AttacksDB';

import {
  updatePlayerOne,
  updatePlayerTwo,
  displayMove,
} from 'actions/battleActions';

import type { PlayerType, FightingCryptomonType } from 'types/battleTypes';

const computeTypeModifier = (attackType, defenderType) => {
  return TYPE_CHART[attackType][TYPE_ORDER[defenderType]];
};

export const getfasterPlayer = (playerOne: PlayerType, playerTwo: PlayerType) => {
  let slowerPlayer;
  let fasterPlayer;
  if (playerOne.cmon?.speed === playerTwo.cmon?.speed) {
    fasterPlayer = playerOne.isChallenger ? 'playerOne' : 'playerTwo';
    slowerPlayer = playerOne.isChallenger ? 'playerTwo' : 'playerOne';
  } else {
    fasterPlayer = (playerOne.cmon?.speed || 0) > (playerTwo.cmon?.speed || 0) ? 'playerOne' : 'playerTwo';
    slowerPlayer = (playerOne.cmon?.speed || 0) > (playerTwo.cmon?.speed || 0) ? 'playerTwo' : 'playerOne';
  }
  return {
    fasterPlayer,
    slowerPlayer,
  };
};

const whoAttackFirst = (attackEmitter: string, state: Object): { attackingPlayer: PlayerType, defendingPlayer: PlayerType, defender: string }  => {
  const defendingPlayer = (attackEmitter === 'playerOne' && 'playerTwo' )|| 'playerOne';
  const updatePlayers = {
    updateAttackingPlayer: attackEmitter === 'playerOne' ? updatePlayerOne : updatePlayerTwo,
    updateDefendingPlayer: attackEmitter === 'playerOne' ? updatePlayerTwo : updatePlayerOne,
  };

  return {
    attackingPlayer: state[attackEmitter],
    defendingPlayer: state[defendingPlayer],
    defender: defendingPlayer,
  };
};

export const processStatusEffect = (fasterPlayer: string, props: Object): ?{ target: FightingCryptomonType, source: FightingCryptomonType, message: string } => {
  const [state, setState] = props;

  const {
    attackingPlayer: {
      cmon: attackingCmon,
    },
    defendingPlayer: {
      cmon: defendingCmon,
    },
    defender,
  } = whoAttackFirst(fasterPlayer, state);

  const statuses = [];
  const leech = (defendingCmon?.health || 0) * 1/8 < 1 && 1 || (defendingCmon?.health || 0) * 1/8;

  Object.keys(defendingCmon?.status || {}).forEach(status => {
    if (defendingCmon?.status[status]) {
      statuses.push(status);
    }
  });

  if (statuses.length < 0) {
    return;
  }

  statuses.forEach(status => {
    switch (status) {
      case 'isLeeched':
        setState(prevState => ({
          ...prevState,
          [fasterPlayer]: {
            ...prevState[fasterPlayer],
            cmon: {
              ...prevState[fasterPlayer].cmon,
              health: prevState[fasterPlayer].cmon.health + leech > prevState[fasterPlayer].cmon.maxHealth && prevState[fasterPlayer].cmon.maxHealth || (prevState[fasterPlayer].cmon.health + leech),
            },
          },
          [defender]: {
            ...prevState[defender],
            cmon: {
              ...prevState[defender].cmon,
              health: prevState[defender].cmon.health - leech <= 0 && 0 || (prevState[defender].cmon.health - leech),
            },
          },
          moveMessage: `La vie de ${prevState[defender].cmon.name} est vampirisée !`,
        }));
        break;
      default:
        break;
      }
    }
  );
};

export const computeCmonMoveEffect = (attackEmitter: string, store: Object, debug: string) => {
  const [state, setState] = store;
  const {
    attackingPlayer,
    defendingPlayer,
    attackingPlayer: {
      cmon: attackingCmon,
      cmon: {
        level,
        attack,
        specialAttack,
      }
    },
    defendingPlayer: {
      cmon: defendingCmon,
      cmon: {
        defense,
        specialDefense,
        type: defendingCmonType,
      }
    },
    defender,
  } = whoAttackFirst(attackEmitter, state);

  if (state.winner) {
    return;
  }

  const {
    id: moveId,
    name: moveName,
    category,
    type: moveType,
    power,
    class: moveClass,
    effect,
    message,
  } = attacks[attackingCmon?.selectedMove];

  if (category === 'effect') {
    setState(prevState => {
      const {
        user,
        foe,
      } = effect(prevState[attackEmitter].cmon, prevState[defender].cmon);
      const moveMessage = message(prevState[attackEmitter], prevState[defender]);

      return {
        ...prevState,
        [attackEmitter]: {
          ...prevState[attackEmitter],
          cmon: {
            ...prevState[attackEmitter].cmon,
            ...user,
          }
        },
        [defender]: {
          ...prevState[defender],
          cmon: {
            ...prevState[defender].cmon,
            ...foe,
          },
        },
        moveMessage,
      };
    })
  } else if (category === 'attack') {
    const typeModifier = computeTypeModifier(moveType, defendingCmonType);

    let efficiency;
    let attackWithModifer;
    let defenseWithModifier;
    const stab = moveType === attackingCmon?.type && 2 || (1);

    if (moveClass === 'physical') {

      attackWithModifer = attack * (statModifiers[attackingCmon?.modifiers.attack] || 1);
      defenseWithModifier = defense * (statModifiers[defendingCmon?.modifiers.defense] || 1);
    }

    if (moveClass === 'special') {

      attackWithModifer = specialAttack * (statModifiers[attackingCmon?.modifiers.specialAttack] || 1);
      defenseWithModifier = specialDefense * (statModifiers[defendingCmon?.modifiers.specialDefense] || 1);
    }

    const damages = Math.round(((level*0.4+2)*(attackWithModifer||1)*power/((defenseWithModifier||1)*50)+2)*typeModifier*stab);

    efficiency = (typeModifier > 1 && 'C\'est super efficace !')
      || (typeModifier < 1 && 'Ce n\'est pas très efficace...')
      || '';

    setState(prevState => {
      const health = prevState[defender].cmon.health - damages < 0 ? 0 : prevState[defender].cmon.health - damages;

      return ({
        ...prevState,
        [defender]: {
          ...prevState[defender],
          cmon: {
            ...prevState[defender].cmon,
            health,
          },
        },
        moveMessage: `${attackingCmon?.name || ''} de ${attackingPlayer?.nickname || ''} utilise ${moveName} et inflige ${damages || 0} points de dégâts ! ${efficiency || ''}.`,
        winner: (health === 0 && attackEmitter) || null,
      });
    });
  }
};

export const finishTurn = (state: [Object, Function]) => {
  const [actualState, setState] = state;

  setState(prevState => {
    return ({
      ...prevState,
      playerOne: {
        ...prevState.playerOne,
        cmon: {
          ...prevState.playerOne.cmon,
          selectedMove: null,
        },
        isWaitingFoe: false,
      },
      moveMessage: null,
      playerTwo: {
        ...prevState.playerTwo,
        cmon: {
          ...prevState.playerTwo.cmon,
          selectedMove: null,
        },
        isWaitingFoe: false,
      },
      moveMessage: null,
    });
  });
};
