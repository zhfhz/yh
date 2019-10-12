import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

import styles from './style.less';

@connect(({ brandDetail }) => brandDetail)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandDetail/fetch',
    });
  }

  render() {
    const { text } = this.props;
    return (
      <div className={styles.container}>
        <section>

        </section>
        <section>
          1
        </section>
      </div>
    );
  }
}

export default Page;
