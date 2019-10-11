import React, { Component } from 'react';
import { Steps, Form } from 'antd';
import { connect } from 'dva';
import { STEPS } from '../service';
import StepSecond from './components/StepSecond';

import styles from './style.less';
import { UserType } from '@/services/user';
import StepSecondFactory from './components/StepSecondFactory';

const { Step } = Steps;

@connect(({ registerComplete, user }) => ({ registerComplete, user }))
class Page extends Component {
  // componentWillMount() {
  //   const { dispatch } = this.props;
  // }

  render() {
    const { currentUser } = this.props.user;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles['step-wrapper1']}>
            <Steps labelPlacement="vertical" current={1} >
              {STEPS.map(item => (
                <Step key={item} title={item} />
              ))}
            </Steps>
          </div>
          {
            currentUser.userType === UserType.registerfactory ? <StepSecondFactory /> : <StepSecond />
          }
        </div>
      </div>
    );
  }
}

export default Form.create()(Page);
