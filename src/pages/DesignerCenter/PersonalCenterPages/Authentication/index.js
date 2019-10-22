import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './style.less';
import PersonalHeader from '../../Components/PersonalHeader';
import AuthForm from './form';
import VerifiedInfo from './info';
import { VerifyState } from '../../Const';
import PageLoading from '@/components/PageLoading';
import auditingImg from '@/assets/auditing.png';

@connect(({ designerCenterAuthentication }) => designerCenterAuthentication)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterAuthentication/fetch',
    });
  }

  render() {
    const { verifyState, verifyInfo, goToEdit } = this.props;

    if (verifyState === undefined || !verifyInfo) {
      return (
        <div className={styles.container}>
          <PersonalHeader title="设计师认证" info="个人信息将由本平台进行身份验证，请放心使用" />
          <PageLoading />
        </div>
      )
    }

    return (
      <div className={styles.container}>
        <PersonalHeader title="设计师认证" info="个人信息将由本平台进行身份验证，请放心使用" />
        {
          ((verifyState === VerifyState.REFUSED && !verifyInfo.applyId) || goToEdit) &&
                <AuthForm />
        }
        {
          verifyState === VerifyState.REFUSED && verifyInfo.applyId && !goToEdit &&
            <div className={styles.refused}>
              <VerifiedInfo />
            </div>
        }
        {
          verifyState === VerifyState.VERIFYING &&
          <div className={styles.verifying}>
            <img src={auditingImg} alt="" />
            <div className={styles['verifying-text1']}>您的设计师认证正在审核中，3个工作日内将完成审核</div>
            <div className={styles['verifying-text2']}>如果遇到其他问题请拨打400-867-0211</div>
          </div>
        }
        {
          verifyState === VerifyState.PASSED &&
          <VerifiedInfo />
        }
      </div>
    );
  }
}

export default Page;
