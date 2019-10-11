import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

import styles from './style.less';

@connect(({ brandCenterRegisterMaterial }) => brandCenterRegisterMaterial)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterRegisterMaterial/fetch',
    });
  }

  render() {
    const { text } = this.props;
    return (
      <div className={styles.container}>
        <Button>{text}</Button>
      </div>
    );
  }
}

export default Page;
