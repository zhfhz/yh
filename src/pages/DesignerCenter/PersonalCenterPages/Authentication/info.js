import React, { Component } from 'react';
import { Button, Form } from 'antd';
import { connect } from 'dva';

import uuid from 'uuid';
import moment from 'moment';
import styles from './style.less';
import { VerifyState } from '../../Const';
import AuthHead from '../../Components/AuthHead';
import warningImg from '@/assets/warning.png';

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 6 },
};

const fullLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

@connect(({ designerCenterAuthentication }) => designerCenterAuthentication)
class Page extends Component {
  onClickEdit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterAuthentication/goEdit',
    })
  }

  renderReject = reason => (
    <div className={styles.reject}>
      <div>认证状态：</div>
      <div className={styles['reject-tip']}>审核被驳回</div>
      <div className={styles['reject-item']}>
        <img src={warningImg} alt="" />
        <div>驳回原因：</div>
        <div className={styles['reject-reason']}>{reason}</div>
      </div>
      <Button className={styles['reject-btn']} onClick={this.onClickEdit}>重新编辑</Button>
    </div>
  )

  renderEduItem = v => {
    const { educationStartTime, educationEndTime, majorName, schoolName } = v;
    const t1 = moment(educationStartTime).format('YYYY年');
    const t2 = moment(educationEndTime).format('YYYY年');
    return (
      <div className={styles['info-items']} key={v.educationStartTime + uuid()}>
        <Form.Item label="年份：" {...fullLayout}>
          <div className={styles['edu-info']}>{t1} - {t2}</div>
        </Form.Item>
        <Form.Item label="学校名称：" {...fullLayout}>
          <div className={styles['edu-info']}>{schoolName}</div>
        </Form.Item>
        <Form.Item label="专业名称：" {...fullLayout}>
          <div className={styles['edu-info']}>{majorName}</div>
        </Form.Item>
      </div>
    )
  }

  renderAwardItem = v => {
    const { winTime, awardsName, awardsTitleName } = v;
    return (
      <div className={styles['info-items-fix']} key={v.winTime + uuid()}>
        <Form.Item {...fullLayout}>
          <div className={styles['edu-info']}>{winTime}</div>
        </Form.Item>
        <Form.Item {...fullLayout}>
          <div className={styles['edu-info']}>{awardsName}</div>
        </Form.Item>
        <Form.Item {...fullLayout}>
          <div className={styles['edu-info']}>{awardsTitleName}</div>
        </Form.Item>
      </div>
    )
  }

  renderInfo = v => (
    <div className={styles.info}>
      <Form.Item label="姓名" {...formItemLayout}>
        {v.fullName}
      </Form.Item>
      <Form.Item label="身份证" {...formItemLayout}>
        {v.idCardNo}
      </Form.Item>
      <div className={styles.idCards}>
        <div>
          <img src={v.idCardImageFront} alt="" />
          <div className={styles['id-tip']}>身份证信息面照片</div>
        </div>
        <div>
          <img src={v.idCardImageFront} alt="" />
          <div className={styles['id-tip']}>身份证信息面照片</div>
        </div>
      </div>
    </div>
  )

  render() {
    const { verifyState, verifyInfo, rejectReason, fieldsInfo } = this.props;
    const { teachList, prizeList, fieldList } = verifyInfo;
    return (
      <div className={styles['info-present']}>
        {verifyState === VerifyState.REFUSED && this.renderReject(rejectReason)}
        <AuthHead title="实名信息" required />
        {this.renderInfo(verifyInfo)}
        <AuthHead title="教育经历" onAdd={this.onAddEdu} required />
        {teachList && teachList.map(v => this.renderEduItem(v))}
        <AuthHead title="获奖经历" onAdd={this.onAddAward} />
        {prizeList && prizeList.map(v => this.renderAwardItem(v))}
        <AuthHead title="擅长领域" onAdd={this.onAddField} required />
        {
          fieldList &&
          <div className={styles['field-info']}>
            {fieldsInfo}
          </div>
        }
      </div>
    );
  }
}

export default Page;
