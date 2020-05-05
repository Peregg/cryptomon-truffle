export const statModifiers = {
  '12': 4,
  '11': 3.5,
  '10': 3,
  '9': 2.5,
  '8': 2,
  '7': 1.5,
  '6': 1,
  '5': 0.66,
  '4': 0.5,
  '3': 0.4,
  '2': 0.33,
  '1': 0.28,
  '0': 0.25,
};

export const TYPE_ORDER = {
  normal: 0,
  fire: 1,
  water: 2,
  electric: 3,
  grass: 4,
  ice: 5,
  fighting: 6,
  poison: 7,
  ground: 8,
  flying: 9,
  psychic: 10,
  bug: 11,
  rock: 12,
  ghost: 13,
  dragon: 14,
  dark: 15,
  steel: 16
};

export const TYPE_CHART = {
  normal: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5],
  fire: [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2],
  water: [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1],
  electric: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1],
  grass: [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5],
  ice: [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5],
  fighting: [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2],
  poison: [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0],
  ground: [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2],
  flying: [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5],
  psychic: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5],
  bug: [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5],
  rock: [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5],
  ghost: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5],
  dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5],
  dark: [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5],
  steel: [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5],
};


export const moves = {
  101: {
    id: 101,
    name: 'Mimi-queue',
    category: 'effect',
    type: 'malus',
    effect: (user, foe) => {
      return {
        user,
        foe: {
          ...foe,
          modifiers: {
            ...foe.modifiers,
            attack: foe.modifiers.attack -= 1,
          },
        },
      };
    },
    message: (user, foe) => `${user.cmon.name} de ${user.nickname} utilise Mimi-queue sur ${foe.cmon.name} ! Son attaque diminue !`,
    power: null,
  },
  102: {
    id: 102,
    name: 'Pistolet à O',
    category: 'attack',
    type: 'water',
    effect: null,
    power: 10,
    class: 'special',
  },
  103: {
    id: 103,
    name: 'Tour rapide',
    category: 'attack',
    type: 'normal',
    effect: (user, foe) => {
      return {
        user: {
          ...user,
          modifiers: {
            ...user.modifiers,
            speed: user.modifiers.speed += 1,
          },
        },
        foe,
      };
    },
    power: 20,
    class: 'special',
  },
  201: {
    id: 201,
    name: 'Griffe',
    category: 'attack',
    type: 'normal',
    effect: null,
    power: 40,
    class: 'physical'
  },
  202: {
    id: 202,
    name: 'Rugissement',
    category: 'effect',
    type: 'malus',
    effect: (user, foe) => {
      return {
        user,
        foe: {
          ...foe,
          modifiers: {
            ...foe.modifiers,
            attack: foe.modifiers.attack -= 1,
          },
        },
      };
    },
    message: (user, foe) => `${user.cmon.name} de ${user.nickname} utilise Rugissment sur ${foe.cmon.name} ! Son attaque diminue !`,
    power: null,
  },
  203: {
    id: 203,
    name: 'Flammèche',
    category: 'attack',
    type: 'fire',
    effect: null,
    message: null,
    power: 40,
  },
  301: {
    id: 301,
    name: 'Charge',
    category: 'attack',
    type: 'normal',
    effect: null,
    power: 15,
    class: 'physical',
  },
  302: {
    id: 302,
    name: 'Croissance',
    category: 'effect',
    type: 'bonus',
    effect: (user, foe) => {
      return {
        user: {
          ...user,
          modifiers: {
            ...user.modifiers,
            attack: user.modifiers.attack += 1,
          },
        },
        foe,
      };
    },
    message: (user, foe) => `${user.cmon.name} de ${user.nickname} utilise Croissance ! Son attaque augmente !`,
  },
  303: {
    id: 303,
    name: 'Vampi-graine',
    category: 'effect',
    type: 'bonus',
    effect: (user, foe) => {
      return {
        user: {
          ...user,
          health: user.health += foe.health * 1/8,
        },
        foe: {
          ...foe,
          health: foe.health -= foe.health * 1/8,
          status: {
            ...foe.status,
            isLeeched: true,
          },
        },
      };
    },
    message: (user, foe) => `${foe.cmon.name} de ${foe.nickname} est vampirisé par ${user.cmon.name} de ${user.nickname} !`,
    power: null,
  },
};

export default moves;
