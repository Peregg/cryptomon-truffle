// @flow

import React from 'react'
import { pick, deburr } from 'lodash';

import IndividualStat from 'fragments/IndividualStat';

import type { CryptomonType } from 'types/CryptomonTypes';

import Salameche from 'fragments/crytpomons/Salameche';
import Carapuce from 'fragments/crytpomons/Carapuce';
import Bulbizarre from 'fragments/crytpomons/Bulbizarre';
import Separator from 'fragments/Separator';

import pokeball from 'images/pokeball.png';
import 'styles/CryptomonCard.scss';

const cryptomonSvg = {
  bulbizarre: Bulbizarre,
  salameche: Salameche,
  carapuce: Carapuce,
};

type Props = {|
  cryptomon: CryptomonType,
  onClick?: (cryptomon: CryptomonType) => void,
|};

const CryptomonCard = ({ cryptomon, onClick }: Props): React$Element<'div'> => {
  const renderIVs = (): React$Element<typeof IndividualStat>[] => {
    const stats = Object.keys(pick(cryptomon, [
      'health',
      'attack',
      'defense',
      'speed',
      'specialAttack',
      'specialDefense'
    ]));

    return stats.map<React$Element<typeof IndividualStat>>((key) => (
      <IndividualStat
        key={key}
        type={key}
        value={cryptomon[key]}
      />
    ));
  }

  const handleClick = () => {
    onClick && onClick(cryptomon);
  };

  const {
    dna,
    name,
  } = cryptomon;

  const style = { backgroundColor: `#${dna.substr(9, 8)}` };
  const Cryptomon = cryptomonSvg[deburr(name).toLowerCase()];

  return (
    <div className='card-container' onClick={handleClick}>
      <div className='card-image' style={style}>
        <Cryptomon
          primary={`#${dna.substr(2, 6)}`}
        />
      </div>
      <div className='card-body'>
        <img
          className='card-body-picto'
          src={pokeball}
          alt='pokeball'
        />
        <div className='card-body-stats'>
          <p className='card-title'>{name}</p>
          <Separator />
          <div className='card-stats'>
            {renderIVs()}
          </div>
        </div>
      </div>
    </div>
  );
}

CryptomonCard.defaultProps = {
  onClick: () => {},
};

export default CryptomonCard;
