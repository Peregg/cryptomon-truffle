import health from 'images/individualStats/health.png';
import defense from 'images/individualStats/shield.png';
import attack from 'images/individualStats/sword.png';
import speed from 'images/individualStats/speed.svg';
import wizardStaff from 'images/individualStats/wizardStaff.svg';
import wizardHat from 'images/individualStats/wizardHat.svg';

export const STATS = {
  health: {
    icon: health,
    wording: 'PV.'
  },
  attack: {
    icon: attack,
    wording: 'Atk.'
  },
  defense: {
    icon: defense,
    wording: 'Def.'
  },
  speed: {
    icon: speed,
    wording: 'Vit.'
  },
  specialAttack: {
    icon: wizardStaff,
    wording: 'Spe.Atk.'
  },
  specialDefense: {
    icon: wizardHat,
    wording: 'Spe.Def',
  }
};
