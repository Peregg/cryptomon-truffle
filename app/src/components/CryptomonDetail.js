// @flow

import React, { useEffect, useState, useContext, useRef } from 'react';
import { DrizzleContext } from "@drizzle/react-plugin";
import { useParams } from 'react-router-dom';
import { deburr } from 'lodash';

import Salameche from 'fragments/crytpomons/Salameche';
import Carapuce from 'fragments/crytpomons/Carapuce';
import Bulbizarre from 'fragments/crytpomons/Bulbizarre';
import CryptomonMove from 'fragments/CryptomonMove';
import Button from 'fragments/Button';

import { Store } from 'store';

import { getCryptomonDetail } from 'controllers/cryptomonControllers';
import { getMoveset, createOrUpdateMoveset } from 'controllers/movesetController';

import { clearState } from 'actions/cryptomonsActions';

import attackDB from 'db/AttacksDB';
import cryptomonDB from 'db/CryptomonsDB';

import { getCryptomonKnownMoves } from 'utils/cryptomonsUtils';
import { getTypeSvg, getMoveBackground } from 'utils/typeSvgUtils';
import { createChart } from 'utils/chartUtils';

import 'styles/cryptomonDetail.scss';

const cryptomonSvg = {
  bulbizarre: Bulbizarre,
  salameche: Salameche,
  carapuce: Carapuce,
};

const CryptomonDetail = () => {
  const statsRadar = useRef(null);
  const drizzle = useContext(DrizzleContext.Context)
  const store = useContext(Store);
  const [moveset, updateMoveset] = useState([]);
  const [updateButton, showUpdateButton] = useState(false);
  const { id } = useParams();
  const [{
      cryptomonDetail,
      moveset: storedMoveset,
      movesetError,
    },
    dispatch,
  ] = store;

  useEffect(() => {
    getCryptomonDetail({ id }, store, drizzle);
    return () => dispatch(clearState());
  }, []);

  useEffect(() => {
    if (cryptomonDetail?.id) {
      const { id } = cryptomonDetail;

      getMoveset({ id }, store);
    }
  }, [cryptomonDetail?.id]);

  useEffect(() => {
    if (storedMoveset) {
      const moveset = storedMoveset.map(id => attackDB[id]);

      updateMoveset([...moveset]);
    }
  }, [storedMoveset]);

  useEffect(() => {
    if (statsRadar.current && cryptomonDetail) {
      const {
        name,
        level,
        health,
        attack,
        specialAttack,
        specialDefense,
        defense,
        speed,
        dna,
      } = cryptomonDetail;

      createChart(statsRadar.current, cryptomonDetail);

      const moves = getCryptomonKnownMoves(name, level);
      updateMoveset([...moves]);
    }
  }, [statsRadar.current, cryptomonDetail]);

  if (!cryptomonDetail || (!moveset && !movesetError)) return <>Chargement....</>;

  const {
    name,
    dna,
    level,
  } = cryptomonDetail;
  const Cryptomon = cryptomonSvg[deburr(cryptomonDetail.name).toLowerCase()];
  const style = { backgroundColor: `#${dna.substr(9, 8)}` };

  const handleChooseOption = (move, parentMove, cb) => {
    if (!(moveset.length > 4)) {
      return;
    } else {
      const movesetCopy = moveset;
      const parentMoveIndex = moveset.findIndex(mv => mv.id === parentMove.id);
      const moveIndex = moveset.findIndex(mv => mv.id === move.id);

      movesetCopy.splice(parentMoveIndex, 1, move);
      movesetCopy.splice(moveIndex, 1, parentMove);

      updateMoveset([...movesetCopy]);
      !updateButton && showUpdateButton(true);
    }
  }

  const renderMovesetItem = () => {
    const moves = [...moveset];
    const extraMoves = (moves.length > 4 && moves.splice(4)) || null;
    return moveset.map((move, i) => i < 4 && (
        <CryptomonMove
          key={move.id}
          move={move}
          cryptomon={cryptomonDetail}
          extraMoves={extraMoves}
          isDropdown={false}
          className=''
          onOptionClick={handleChooseOption}
        />
      )
    );
  };

  const submitUpdate = () => {
    const { id: cmon } = cryptomonDetail;

    const moves = moveset.map(({ id }) => id);

    createOrUpdateMoveset({ cmon, moves }, store);
  };

  return (
    <div className='container'>
      <div className='detail-header' style={style}>
        <Cryptomon
          primary={`#${dna.substr(2, 6)}`}
        />
      </div>
      <div className='detail-title'>{name}</div>
      <div className='detail-level'>Niveau {level}</div>
      <div className='detail-body'>
        <div className='detail-chart'>
          <h2>Stats.</h2>
          <canvas ref={statsRadar} width="400" height="400" />
        </div>
        <div className='detail-bio'>
          <h2 className='title'>Bio</h2>
          <p>Je suis {name} ! Un petit fdp de merde ! Je suce du chibre !</p>
        </div>
        <div className='detail-moveset'>
          <h2>Attaques de {name}</h2>
          {renderMovesetItem()}
          {updateButton && (
            <Button className='button-container detail-button' handleClick={submitUpdate}>
              Enregistrer la nouvelle config !
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptomonDetail;
