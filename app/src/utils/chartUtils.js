// @flow
import Chart from 'chart.js';

import type { CryptomonType } from 'types/cryptomonTypes';

export const createChart = (ctx: React$Element<'canvas'>, cryptomon: CryptomonType) => {
  const {
    health,
    attack,
    specialAttack,
    specialDefense,
    defense,
    speed,
    dna,
  } = cryptomon;

  return new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [`PV : ${health}`, `Attaque : ${attack}` ,`Défense : ${defense}`, `Spe.Attaque : ${specialAttack}`, `Spe.Défense : ${specialDefense}`, `Vitesse : ${speed}`],
      datasets: [{
          label: 'I.V',
          data: [
            parseInt(dna.substr(15, 1), 16) + parseInt(dna.substr(16, 1), 16),
            parseInt(dna.substr(17, 1), 16) + parseInt(dna.substr(18, 1), 16),
            parseInt(dna.substr(19, 1), 16) + parseInt(dna.substr(20, 1), 16),
            parseInt(dna.substr(21, 1), 16) + parseInt(dna.substr(22, 1), 16),
            parseInt(dna.substr(23, 1), 16) + parseInt(dna.substr(24, 1), 16),
            parseInt(dna.substr(25, 1), 16) + parseInt(dna.substr(26, 1), 16),
          ],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
      }],
    },
    options: {
      scale: {
        angleLines: {
          display: false,
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 30,
        }
      }
    },
  });
};
