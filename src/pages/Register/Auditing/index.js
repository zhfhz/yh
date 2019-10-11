import React, { Component } from 'react';
import { connect } from 'dva';
import auditingPng from '../../../assets/auditing.png';

import styles from './style.less';

@connect(({ auditing }) => auditing)
class Page extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.success}>
            <div className={styles.icon1}>
              <img alt="" src={auditingPng} />
            </div>
            <div className={styles.subtitle}>您的账号正在审核中，3个工作日内将完成审核</div>
            <div className={styles.subtitle1}>收不到短信或其他问题请拨打400-867-0211</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
