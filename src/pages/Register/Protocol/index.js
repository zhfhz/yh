import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './style.less';


@connect(({ registerSuccess, user }) => ({ registerSuccess, user }))
class Page extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.head}>
            用户协议
          </div>
          <div className={styles.body}>
          并按照注册程序成功注册为易设计用户，或您以其他易设计允许的方式实际使用易设计服务时，即表示您已充分阅读、理解并接受本协议的全部内容，并与易设计达成协议。请您务必审慎阅读、
          充分理解各条款内容，特别是免除或者限制责任的条款，请您重点阅读并理解加粗提示条款。如您对本协议项下任何条款有异议，请停止使用站酷服务。
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
