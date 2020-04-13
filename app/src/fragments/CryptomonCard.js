// @flow

import React from 'react'
import { pick, deburr } from 'lodash';

import IndividualStat from 'fragments/IndividualStat';

import type { CryptomonType } from 'types/CryptomonTypes';

import bulbizarre from 'images/bulbizarre.png';
import salameche from 'images/salameche.svg';
import carapuce from 'images/carapuce.svg';

import 'styles/CryptomonCard.scss';

const cryptomonSvg = {
  bulbizarre,
  salameche,
  carapuce,
};

type Props = {|
  cryptomon: CryptomonType,
|};

const CryptomonCard = ({ cryptomon }: Props): React$Element<'div'> => {
  const renderIVs = (): React$Element<typeof IndividualStat>[] => {
    const stats = Object.keys(pick(cryptomon, [
      'health',
      'attack',
      'defense',
      'speed'
    ]));

    return stats.map<React$Element<typeof IndividualStat>>((key) => (
      <IndividualStat
        type={key}
        value={cryptomon[key]}
      />
    ));
  }

  const {
    dna,
    name,
  } = cryptomon;

  const style = { backgroundColor: `#${dna.substr(2, 8)}` };

  return (
    <div className='card-container'>
      <img
        className='card-image'
        style={style}
        src={cryptomonSvg[deburr(name).toLowerCase()]}
        alt='lol'
      />
      <p className='card-title'>{name}</p>
      <div className='card-stats'>
        {renderIVs()}
      </div>
    </div>
  );
}

export default CryptomonCard;
