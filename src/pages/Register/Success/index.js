import React, { Component } from 'react';
import { Steps, Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { STEPS } from '../service';

import styles from './style.less';
import { UserType } from '@/services/user';
import successPng from '../../../assets/success.png';


const { Step } = Steps;

@connect(({ registerSuccess, user }) => ({ registerSuccess, user }))
class Page extends Component {
  render() {
    const { userType } = this.props.user.currentUser;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles['step-wrapper3']}>
            <Steps labelPlacement="vertical" current={2} >
              {STEPS.map(item => (
                <Step key={item} title={item} />
              ))}
            </Steps>
          </div>
          <div className={styles.success}>
            <div className={styles.icon1}>
              <img alt="" src={successPng} />
            </div>
            <div className={styles.title}>恭喜注册成功!</div>
            {
              userType === UserType.registerfactory ?
                <>
                  <div className={styles.subtitle}>您的账号正在审核中，3个工作日内将完成审核</div>
                  <div className={styles.href}>
                    <div className={styles.buttons}>
                      <Link to="/">
                        <Button className={styles.button} onClick={this.toHome}>进入主页</Button>
                      </Link>
                    </div>
                  </div>
                </> :
                <>
                  <div className={styles.subtitle}>请妥善保管您的账户信息</div>
                  <div className={styles.href}>
                    <div className={styles.buttons}>
                      <Button type="primary" className={styles.button1}>立即认证</Button>
                      <span className={styles.span}>我是设计师</span>
                    </div>
                    <div className={styles.buttons}>
                      <Link to="/">
                        <Button className={styles.button} onClick={this.toHome}>进入主页</Button>
                      </Link>
                      <span className={styles.span}>暂不认证</span>
                    </div>
                  </div>
                </>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
