// @flow

import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

import 'styles/HealthBar.scss'

type Props = {
  maxHealth: string,
  health: string,
};

function HealthBar({ maxHealth, health }: Props): React$Element<'div'> {

  const width = `${parseInt(health, 10) / parseInt(maxHealth, 10) * 100}%`;
  const fill = useSpring({ width });
  const hp = useSpring({ number: health, from: { number: maxHealth } })

  return (
    <div class='health-bar'>
      <animated.div class='health-bar-fill' style={fill} />
      <animated.div class='health-bar-content'>
        <animated.span>{hp.number.interpolate(num => Math.round(num))}</animated.span> PV/{maxHealth} PV
      </animated.div>
    </div>
  )
}

export default HealthBar;
