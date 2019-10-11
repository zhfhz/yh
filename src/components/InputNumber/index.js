import React from 'react';
import { Input } from 'antd';
import { testMoney } from '@/utils/utils';

export default function InputNumber({
  style,
  className = '',
  value,
  onChange,
  precision = 2,
  placeholder,
  maxLength = 9,
  disabled,
}) {
  const onChangeText = e => {
    const { value: num } = e.target;
    if (onChange && testMoney(num, precision)) {
      onChange(num);
    } else if (onChange && !testMoney(value)) {
      onChange('');
    }
  };
  const onBlur = () => {
    const v = `${value || ''}`;
    const index = v.indexOf('.');
    if (onChange && index === v.length - 1) {
      onChange(v.substring(0, index));
    }
  };

  return (
    <Input
      style={style}
      className={className}
      onBlur={onBlur}
      value={value}
      onChange={onChangeText}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
    />
  );
}
