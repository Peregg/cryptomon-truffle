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


export const carapuce = [
  {
    level: 1,
    name: 'Mimi-queue',
    category: 'effect',
    type: 'malus',
    effect: {
      applyOn: 'attack',
      target: 'ennemy',
      modifier: 1,
      duration: null,
    },
    power: null,
  },
  {
    level: 1,
    name: 'Pistolet à O',
    category: 'attack',
    type: 'water',
    effect: null,
    power: 10,
    class: 'specialc',
  },
];

export const salameche = [
  {
    level: 1,
    name: 'Griffe',
    category: 'attack',
    type: 'normal',
    effect: null,
    power: 40,
    class: 'physical'
  },
  {
    level: 1,
    name: 'Rugissement',
    category: 'effect',
    type: 'malus',
    effect: {
      applyOn: 'attack',
      target: 'ennemy',
      modifier: 1,
      duration: null,
    },
    power: null,
  },
];

export const bulbizarre = [
  {
    level: 1,
    name: 'Charge',
    category: 'attack',
    type: 'normal',
    effect: null,
    power: 15,
    class: 'physical',
  },
  {
    level: 1,
    name: 'Croissance',
    category: 'effect',
    type: 'bonus',
    effect: {
      applyOn: 'attack',
      target: 'self',
      modifier: 1,
      duration: null,
    },
    power: null,
  },
];

const attacks = {
  carapuce,
  salameche,
  bulbizarre,
};

export default attacks;
