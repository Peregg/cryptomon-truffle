// @flow

import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

import 'styles/HealthBar.scss'

type Props = {
  maxHealth: string,
  health: string,
};

function HealthBar({ maxHealth, health }: Props): React$Element<'div'> {
  const [actualHealth, setActualHealth] = useState(parseInt(health, 10));

  useEffect(() => {
    setActualHealth(health);
  }, [health])

  const width = `${parseInt(health, 10) / parseInt(maxHealth, 10) * 100}%`;

  const fill = useSpring({ width });
  const hp = useSpring({ number: actualHealth, from: { number: health } })

  return (
    <div className='health-bar'>
      <animated.div className='health-bar-fill' style={fill} />
      <animated.div className='health-bar-content'>
        <animated.span>{hp.number.interpolate(num => Math.round(num))}</animated.span> PV/{maxHealth} PV
      </animated.div>
    </div>
  )
}

export default HealthBar;
