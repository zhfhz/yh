import React from 'react';
import { Input, Col, Row } from 'antd';
import './index.less';

const FormItem = ({
  children,
  label,
  labelStyle,
  placeholder,
  value,
  onChange,
  require = false,
  noChildren = false,
  fixLabel = true,
}) => {
  let body = children;
  if (!body && !noChildren) {
    body = <Input placeholder={placeholder} value={value} onChange={onChange} />;
  }

  const labelContent = (
    <div className={labelStyle ? `title ${labelStyle}` : 'title'}>
      {label}
      {require && <span style={{ color: 'red' }}>*</span>}
    </div>
  );

  return (
    <Row type="flex" align="middle" className="form-item-component-container">
      {fixLabel && <Col md={8} span={24}>
        {labelContent}
      </Col>}
      <Col md={fixLabel ? 16 : 24} span={24} className={fixLabel ? '' : 'unfix-label'}>
        {!fixLabel && labelContent}
        {body}
      </Col>
    </Row>
  );
};

export default FormItem;
