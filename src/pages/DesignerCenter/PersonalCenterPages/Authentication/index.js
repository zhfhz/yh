import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

import styles from './style.less';

@connect(({ designerCenterAuthentication }) => designerCenterAuthentication)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterAuthentication/fetch',
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
