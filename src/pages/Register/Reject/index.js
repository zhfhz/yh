import React, { Component } from 'react';
import { Steps, Row, Divider, Col, Button, Tag } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { STEPS } from '../service';

import styles from './style.less';
import ImageView from '@/components/ImageView';


const { Step } = Steps;

@connect(({ reject }) => reject)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'reject/getAuthen',
    });
  }

  getRow = (title, content, require) => (
    <Row className={styles['content-row']}>
      <Col span={4} className={styles['content-left']}>
        {require && <span style={{ color: '#DA4856' }}>*</span>}
        {title}：
      </Col>
      <Col span={20} style={{ paddingLeft: '20px;' }}>
        {content}
      </Col>
    </Row>
  )

  getImageRow = (title, content, require) => (
    <Row className={styles['content-row']}>
      <Col span={4} className={styles['content-left']}>
        {require && <span style={{ color: '#DA4856' }}>*</span>}
        {title}：
      </Col>
      <Col span={20} style={{ paddingLeft: '20px;' }}>
        <img className={styles.image1} src={content} alt="图片" />
      </Col>
    </Row>
  )

  render() {
    const { data } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <Row style={{ paddingTop: '30px' }}>
            <Col span={6}>
              认证状态：<span style={{ color: '#DA4856' }}>审核被驳回</span>
            </Col>
            <Col span={16}>
              <Tag closable color="orange">
                {data && data.rejectReason}
              </Tag>
            </Col>
            <Col span={2}>
              <Link to="/register/complete">
                <Button type="primary" onClick="this.toEditPage">重新编辑</Button>
              </Link>
            </Col>
          </Row>
          <div className={styles['step-wrapper3']}>
            <Steps labelPlacement="vertical" current={1} >
              {STEPS.map(item => (
                <Step key={item} title={item} />
              ))}
            </Steps>
          </div>
          <Row>
            <span className={styles.title}>基本资料</span>
          </Row>
          <Divider />
          <Row className={styles.subcontent}>
            {data && this.getRow('企业名称', data.enterpriseName, true)}
            {data && this.getRow('店铺名称', data.shopName, true)}
            {data && this.getRow('行业', data.industry, true)}
            {data && this.getRow('地区', `${data.province}${data.city}`, true)}
            {data && this.getImageRow('企业LOGO', data.companyLogo, true)}
            {data && this.getImageRow('营业执照', data.licensePicture, true)}
            {data && this.getRow('企业简介', data.companyProfile, true)}
          </Row>
          <Row>
            <span className={styles.title}>法人信息</span>
          </Row>
          <Divider />
          <Row className={styles.subcontent}>
            {data && this.getRow('法人姓名', data.legalName, true)}
            {data && this.getRow('法人身份证号码', data.legalIdentityCard, true)}
            {data && this.getRow('法人手机号', data.legalPhone, true)}
            <Col span={20} offset={4}>
              <div className={styles.idcard1}>
                <div className={styles.idcard2}>
                  <div><img className={styles.image2} src={data && data.idFrontPhoto} alt="图片" /></div>
                  <span>身份证信息面照片</span>
                </div>
                <div className={styles.idcard2}>
                  <div><img className={styles.image2} src={data && data.idBackPhoto} alt="图片" /></div>
                  <span>身份证国徽面照片</span>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <span className={styles.title}>其他信息</span>
          </Row>
          <Divider />
          <Row className={styles.subcontent}>
            {data && this.getRow('联系人姓名', data.contactName)}
            {data && this.getRow('联系人职务', data.contactDuties)}
            {data && this.getRow('联系人手机', data.contactPhone)}
          </Row>
        </div>
      </div>
    );
  }
}

export default Page;
