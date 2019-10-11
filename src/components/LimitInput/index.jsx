import React from 'react';
import { Input } from 'antd';
import './index.less';

const LInput = ({ max, after, value, ...rest }) => {
  if (!max) return <Input className="c-limit-input" value={value} {...rest} />;
  return (
    <div className="c-limit-input">
      <Input maxLength={max} value={value} {...rest} />
      <span
        style={after ? { right: '60px' } : { right: '10px' }}
        className={`statistic ${value && value.length > max ? 'error' : ''}`}
      >
        {value ? value.length : 0}/{max}
      </span>
    </div>
  );
};

export default LInput;
