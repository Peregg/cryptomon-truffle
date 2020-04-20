// @flow
import React, { useState, useEffect } from 'react';

import classnames from 'utils/classnames';

import 'styles/Input.scss'

type Props = {
  id: string,
  initialValue: string,
  label: string,
  inputClass?: string,
  labelClass?: string,
  containerClass?: string,
  onError?: boolean,
  handleChange?: (value: string) => void,
};

const Input = ({
    id,
    label,
    initialValue,
    containerClass = 'input-container',
    inputClass = 'input-body',
    labelClass = 'input-label',
    handleChange,
    onError,
  }: Props) => {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    handleChange && handleChange(value)
  }, [value])

  const onChange = (event: SyntheticInputEvent<EventTarget>) => {
    const { value } = event.target;

    setValue(value);
  }

  const inputClassNames = classnames(inputClass);
  const inputContainerClassNames = classnames(containerClass);
  const inputLabelClassNames = classnames(labelClass);

  (onError && inputClassNames.add('input-error'));
  (focused && inputContainerClassNames.add('active'));
  value && inputContainerClassNames.add('filled');
  value && inputLabelClassNames.add('fixed');

  const onFocus = () => {
    setFocused(true);
  }

  const onBlur = () => {
    setFocused(false);
  }

  return (
    <div className={inputContainerClassNames.build()}>
      <label className={inputLabelClassNames.build()} htmlFor={id}>{label}</label>
      <input
        value={value}
        className={inputClassNames.build()}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

Input.defaultProps = {
  containerClass: 'input-container',
  labelClass: 'input-label',
  inputClass: 'input-body',
  handleChange: () => {},
  onError: false,
};

export default Input;
