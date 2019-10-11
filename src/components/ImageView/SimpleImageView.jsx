import React from 'react';

/**
 * @param {String} size background-size 的值，可以为 contain|cover|百分比和具体数值
 * @param {String} position background-position 的值
 */
const SimpleImageView = ({
  className,
  width = 120,
  height = 120,
  size = 'cover',
  position = 'center',
  src = '',
  children,
}) => (
  <div
    className={className}
    style={{
      backgroundImage: `url(${src})`,
      backgroundSize: size,
      backgroundPosition: position,
      width,
      height,
    }}
  >
    {children}
  </div>
);

export default SimpleImageView;
