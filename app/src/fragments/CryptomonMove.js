// @flow

import React, { useEffect, useState, useContext, useRef } from 'react';

import Tooltip from 'fragments/Tooltip';

import { getTypeSvg, getMoveBackground } from 'utils/typeSvgUtils';

import type { CryptomonType } from 'types/cryptomonTypes';
import type { MoveType } from 'types/battleTypes';

import classnames from 'utils/classnames';

import 'styles/CryptomonMove.scss';

type Props = {
  move: MoveType,
  cryptomon: CryptomonType,
  extraMoves?: ?MoveType[],
  className?: string,
  parentMove?: ?MoveType,
  closeOnClick?: Function,
  onOptionClick?: Function,
};

const CryptomonMove = (props: Props) => {
  const {
    move,
    move: {
      name,
      power,
      type,
      description,
    },
    cryptomon,
    extraMoves,
    className = '',
    onOptionClick,
    parentMove,
    closeOnClick
  } = props;
  const [opened, open] = useState(false);
  const style = { backgroundColor: getMoveBackground(type) };

  const handleClick = () => {
    onOptionClick && !extraMoves && onOptionClick(move, parentMove, open);
    open(prevState => !prevState);
    closeOnClick && closeOnClick(prevState => !prevState);
  }

  const renderDropdownItems = () => {
    return extraMoves?.map(mv => (
        <CryptomonMove
          move={mv}
          cryptomon={cryptomon}
          extraMoves={null}
          className='no-tooltip'
          onOptionClick={onOptionClick}
          parentMove={move}
          closeOnClick={open}
        />
    ));
  };
  const containerClasses = classnames('tooltip-container');
  const dropdownClasses = classnames('dropdown');
  opened && containerClasses.add('no-tooltip');
  opened && dropdownClasses.add('is-opened')

  return (
    <div className={containerClasses.build()}>
      <Tooltip>
        <div className='move-description'>
          <p>{name}</p>
          <div>
            <img src={getTypeSvg(type)} alt={`icon-${type}`} width='30' height='30' />
            {power && <p>Puissance : {power}</p>}
          </div>
          <p>{description(cryptomon.name)}</p>
        </div>
      </Tooltip>
      <div className='detail-move' style={style} onClick={handleClick}>
        <img className='type-icon' src={getTypeSvg(type)} alt={`type-${type}`} />
        <span className='move-wording'>{name}</span>
      </div>
      <div className={dropdownClasses.build()}>
        {renderDropdownItems()}
      </div>
    </div>
  );
};

CryptomonMove.defaultProps = {
  closeOnClick: () => {},
  onOptionClick: () => {},
  parentMove: null,
  className: '',
  extraMoves: null,
};

export default CryptomonMove;
