import React, { Component } from 'react';
import { Tabs, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import Breadcrumb from '@/components/Breadcrumb';
import UEditor from '@/components/Ueditor';
import ImageView from '@/components/ImageView';

import styles from './style.less';

const { TabPane } = Tabs;

@connect(({ brandCenterMaterial }) => brandCenterMaterial)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterMaterial/fetch',
    });
  }

  onPanelChanged = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterMaterial/updateState',
      payload: { displayType: e },
    });
    dispatch({
      type: 'brandCenterMaterial/fetch',
    });
  };

  attachIntroductionEditor = ref => {
    this.introductionEditor = ref;
    this.onIntroductionReady();
  };

  attachHonorEditor = ref => {
    this.honorEditor = ref;
    this.onHonorReady();
  };

  attachServiceEditor = ref => {
    this.serviceEditor = ref;
    this.onServiceReady();
  };

  onIntroductionReady = () => {
    const { introduction } = this.props;
    if (this.introductionEditor && introduction.length > 0) {
      this.introductionEditor.setContent(introduction);
    }
  };

  onHonorReady = () => {
    const { honor } = this.props;
    if (this.honorEditor && honor.length > 0) {
      this.honorEditor.setContent(honor);
    }
  };

  onServiceReady = () => {
    const { service } = this.props;
    if (this.serviceEditor && service.length > 0) {
      this.serviceEditor.setContent(service);
    }
  };

  updateIntroErr = () => {
    const { dispatch } = this.props;
    const introContent = this.introductionEditor.getContent();
    if (introContent) {
      dispatch({
        type: 'brandCenterMaterial/updateIntroErr',
        payload: { show: false },
      });
    } else {
      dispatch({
        type: 'brandCenterMaterial/updateIntroErr',
        payload: { show: true },
      });
    }
  };

  updateHonorErr = () => {
    const { dispatch } = this.props;
    const content = this.honorEditor.getContent();
    if (content) {
      dispatch({
        type: 'brandCenterMaterial/updateHonorErr',
        payload: { show: false },
      });
    } else {
      dispatch({
        type: 'brandCenterMaterial/updateHonorErr',
        payload: { show: true },
      });
    }
  };

  updateServiceErr = () => {
    const { dispatch } = this.props;
    const content = this.serviceEditor.getContent();
    if (content) {
      dispatch({
        type: 'brandCenterMaterial/updateServiceErr',
        payload: { show: false },
      });
    } else {
      dispatch({
        type: 'brandCenterMaterial/updateServiceErr',
        payload: { show: true },
      });
    }
  };

  handleIntroductionSubmit = () => {
    const { dispatch } = this.props;
    const content = this.introductionEditor.getContent();
    this.updateIntroErr();
    if (content) {
      dispatch({
        type: 'brandCenterMaterial/saveEditorInfo',
        payload: content,
      });
    }
  };

  handleHonorSubmit = () => {
    const { dispatch } = this.props;
    const content = this.honorEditor.getContent();
    this.updateHonorErr();
    if (content) {
      dispatch({
        type: 'brandCenterMaterial/saveEditorInfo',
        payload: content,
      });
    }
  };

  handleServiceSubmit = () => {
    const { dispatch } = this.props;
    const content = this.serviceEditor.getContent();
    this.updateServiceErr();
    if (content) {
      dispatch({
        type: 'brandCenterMaterial/saveEditorInfo',
        payload: content,
      });
    }
  };

  updatePictureValue = images => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterMaterial/updatePictureValue',
      payload: { images },
    });
  };

  updatePictureErr = () => {
    const { dispatch, pictures } = this.props;
    if (pictures.length > 0) {
      dispatch({
        type: 'brandCenterMaterial/updatePictureErr',
        payload: { show: false },
      });
    } else {
      dispatch({
        type: 'brandCenterMaterial/updatePictureErr',
        payload: { show: true },
      });
    }
  };

  handlePictureSubmit = () => {
    const { dispatch } = this.props;
    this.updatePictureErr();
    dispatch({
      type: 'brandCenterMaterial/savePicture',
    });
  };

  renderImageView = () => {
    const { pictures, pictureErr } = this.props;
    return (
      <div>
        <ImageView
          fixed="600x408"
          sizeLimit={1}
          total={12}
          images={pictures}
          onChange={images => this.updatePictureValue(images)}
        />
        <div style={{ color: '#666666', fontSize: '12px', marginTop: '10px' }}>
          请上传店铺展示图，在都市智造APP您的品牌店铺展示，尺寸建议宽600PX*高408PX，大小限制在1M以内，文件格式支持JPG、PNG等
        </div>
        {pictureErr.show && <span style={{ color: 'red' }}>{pictureErr.content}</span>}
        <div className={styles.button} style={{ marginTop: '60px' }}>
          <Button className={styles.save} onClick={() => this.handlePictureSubmit()}>
            保存
          </Button>
        </div>
      </div>
    );
  };

  render() {
    const { displayType, introductionErr, serviceErr, honorErr } = this.props;

    return (
      <div className={styles.container}>
        <Breadcrumb title="企业介绍" />
        <Tabs defaultActiveKey={displayType} onChange={this.onPanelChanged}>
          <TabPane tab="企业简介" key="1">
            <Row>
              <Col span={20} style={{ marginLeft: '10px' }}>
                <UEditor onReady={this.onIntroductionReady()} ref={this.attachIntroductionEditor} />
              </Col>
              <Col span={20} style={{ marginLeft: '10px' }}>
                {introductionErr.show && (
                  <span style={{ color: 'red' }}>{introductionErr.content}</span>
                )}
              </Col>
            </Row>
            <div className={styles.button}>
              <Button className={styles.save} onClick={() => this.handleIntroductionSubmit()}>
                保存
              </Button>
            </div>
          </TabPane>
          <TabPane tab="荣誉资质" key="2">
            <Row>
              <Col span={20} style={{ marginLeft: '10px' }}>
                <UEditor onReady={this.onHonorReady()} ref={this.attachHonorEditor} />{' '}
              </Col>
            </Row>
            {honorErr.show && <span style={{ color: 'red' }}>{honorErr.content}</span>}
            <div className={styles.button}>
              <Button className={styles.save} onClick={() => this.handleHonorSubmit()}>
                保存
              </Button>
            </div>
          </TabPane>
          <TabPane tab="产品服务" key="3">
            <Row>
              <Col span={20} style={{ marginLeft: '10px' }}>
                <UEditor onReady={this.onServiceReady()} ref={this.attachServiceEditor} />{' '}
              </Col>
            </Row>
            {serviceErr.show && <span style={{ color: 'red' }}>{serviceErr.content}</span>}
            <div className={styles.button}>
              <Button className={styles.save} onClick={() => this.handleServiceSubmit()}>
                保存
              </Button>
            </div>
          </TabPane>
          <TabPane tab="企业风采" key="4">
            {this.renderImageView()}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Page;
