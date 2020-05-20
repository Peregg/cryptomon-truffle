// @flow

import React, { useState, useEffect } from 'react';

import classnames from 'utils/classnames';

import 'styles/Button.scss';

type Props = {
  className?: string,
  children?: React$Element<*> | string,
  disabled?: boolean,
  handleClick?: Function,
};

const Button = ({ children, className = '', handleClick = () => {}, disabled }: Props) => {
  const onClick = () => {
    handleClick();
  };

  const buttonClassNames = classnames(className);

  if (disabled) buttonClassNames.add('button-disabled');

  return (
    <button
      className={buttonClassNames.build()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: 'button-container',
  children: '',
  handleClick: () => {},
  disabled: false,
};

export default Button;
