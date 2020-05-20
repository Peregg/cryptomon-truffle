// @flow

import React, { useEffect, useState, useContext, useRef } from 'react';

import 'styles/Tooltip.scss';

type Props = {
  children: React$Element<'div'>,
};

const Tooltip = ({ children }: Props) => {
  return (
    <div className='tooltip'>
     {children}
    </div>
  );
};

export default Tooltip;
