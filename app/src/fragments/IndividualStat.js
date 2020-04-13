// @flow

import React from 'react';

import { STATS } from 'constants/individualStatConstants';

import 'styles/IndividualStat.scss';

type Props = {|
  value: string,
  type: string,
|};

const IndividualStat = ({ value, type }: Props): React$Element<'div'> => {
  return (
    <div className='stat-container'>
      <img className='stat-icon' src={STATS[type].icon} alt={STATS[type].wording} />
      <span className='stat-value'>{value}</span>
    </div>
  );
}

export default IndividualStat;
