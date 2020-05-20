// @flow

import bug from 'images/icons/bug.svg'
import dark from 'images/icons/dark.svg'
import dragon from 'images/icons/dragon.svg'
import electric from 'images/icons/electric.svg'
import fairy from 'images/icons/fairy.svg'
import fighting from 'images/icons/bug.svg'
import fire from 'images/icons/fire.svg'
import flying from 'images/icons/flying.svg'
import ghost from 'images/icons/ghost.svg'
import grass from 'images/icons/grass.svg'
import ground from 'images/icons/ground.svg'
import ice from 'images/icons/ice.svg'
import normal from 'images/icons/normal.svg'
import poison from 'images/icons/poison.svg'
import psychic from 'images/icons/psychic.svg'
import rock from 'images/icons/rock.svg'
import steel from 'images/icons/steel.svg'
import water from 'images/icons/water.svg'

const iconDictionnary = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};

const backgrounds = {
  water: '#1ae8c2ad',
  normal: '#d2dad9ad',
  fire: '#e07d43cf',
  grass: '#4caf50e0',
}

export const getTypeSvg = (type: string) => iconDictionnary[type] || iconDictionnary.normal;

export const getMoveBackground = (type: string) => backgrounds[type] || backgrounds.normal;
