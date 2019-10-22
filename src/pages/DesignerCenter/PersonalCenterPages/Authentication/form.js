import React, { Component } from 'react';
import { Button, Form, Input, DatePicker } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import frontImg from '@/assets/id_front.png';
import backImg from '@/assets/id_back.png';
import minusImg from '@/assets/minus.png';
import ImageViewWrapper from '../../Components/ImageViewWrapper';
import AuthHead from '../../Components/AuthHead';

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 6 },
};

const imageFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 2 },
};

const itemLayout = {
  wrapperCol: { span: 24 },
};

@connect(({ designerCenterAuthentication }) => designerCenterAuthentication)
class Page extends Component {
  onSubmit = () => {
    const { dispatch, form, frontImages, backImages } = this.props;
    const { validateFields } = form;
    validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'designerCenterAuthentication/verify',
          params: {
            mobileNumber: 13623878291,
            fullName: values.name,
            idCardNo: values.idCard,
            idCardImageFront: frontImages[0].server,
            idCardImageBack: backImages[0].server,
            teachList: values.eduList,
            prizeList: values.awardList,
            fieldList: values.fieldList,
          },
        });
      }
    });
  }

  onAddEdu = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterAuthentication/addEdu',
    });
  }

  onAddAward = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterAuthentication/addAward',
    });
  }

  onAddField = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterAuthentication/addField',
    });
  }

  onDelEdu = index => {
    const { dispatch, form } = this.props;
    const { getFieldsValue, setFieldsValue } = form;
    const { eduList } = getFieldsValue();

    dispatch({
      type: 'designerCenterAuthentication/delEdu',
      index,
      decoratorList: eduList,
      setFieldsValue,
    });
  }

  onDelAward = index => {
    const { dispatch, form } = this.props;
    const { getFieldsValue, setFieldsValue } = form;
    const { eduList } = getFieldsValue();

    dispatch({
      type: 'designerCenterAuthentication/delAward',
      index,
      decoratorList: eduList,
      setFieldsValue,
    });
  }

  onDelField = index => {
    const { dispatch, form } = this.props;
    const { getFieldsValue, setFieldsValue } = form;
    const { fieldList } = getFieldsValue();

    dispatch({
      type: 'designerCenterAuthentication/delField',
      index,
      decoratorList: fieldList,
      setFieldsValue,
    });
  }

  onChangeFontImage = values => {
    const { dispatch, form } = this.props;
    const { setFieldsValue } = form;
    dispatch({
      type: 'designerCenterAuthentication/save',
      payload: {
        frontImages: values,
      },
    });

    if (values.length > 0) {
      setFieldsValue({ idFrontPhoto: values[0] && values[0].server })
    } else {
      setFieldsValue({ idFrontPhoto: null })
    }
  }

  onChangeBackImage = values => {
    const { dispatch, form } = this.props;
    const { setFieldsValue } = form;
    dispatch({
      type: 'designerCenterAuthentication/save',
      payload: {
        backImages: values,
      },
    });

    if (values.length > 0) {
      setFieldsValue({ idBackPhoto: values[0] && values[0].server })
    } else {
      setFieldsValue({ idBackPhoto: null })
    }
  }

  renderEduItem = index => {
    const { form, eduList } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form.Item className={styles['item-set']} key={index}>
        <Form.Item className={styles['item-small']} {...itemLayout}>
          {getFieldDecorator(`eduList[${index}].educationStartTime`, {
            initialValue: eduList[index].educationStartTime,
            rules: [
              {
                required: true,
                message: '请输入开始时间',
              },
            ],
          })(<DatePicker placeholder="开始时间" />)}
        </Form.Item>
        <div className={styles.divide}>-</div>
        <Form.Item className={styles['item-small']} {...itemLayout}>
          {getFieldDecorator(`eduList[${index}].educationEndTime`, {
            initialValue: eduList[index].educationEndTime,
            rules: [
              {
                required: true,
                message: '请输入结束时间',
              },
            ],
          })(<DatePicker placeholder="结束时间" />)}
        </Form.Item>
        <Form.Item className={styles['item-big']} {...itemLayout}>
          {getFieldDecorator(`eduList[${index}].schoolName`, {
            initialValue: eduList[index].schoolName,
            rules: [
              {
                required: true,
                message: '请输入学校名称',
              },
            ],
          })(<Input placeholder="学校名称" />)}
        </Form.Item>
        <Form.Item className={styles['item-normal']} {...itemLayout}>
          {getFieldDecorator(`eduList[${index}].majorName`, {
            initialValue: eduList[index].majorName,
            rules: [
              {
                required: true,
                message: '请输入专业名称',
              },
            ],
          })(<Input placeholder="专业名称" />)}
        </Form.Item>
        <img className={styles.minus} onClick={() => this.onDelEdu(index)} src={minusImg} alt="" />
      </Form.Item>
    )
  }

  renderAwardItem = index => {
    const { form, awardList } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form.Item className={styles['item-set']} key={index}>
        <Form.Item className={styles['item-small']} {...itemLayout}>
          {getFieldDecorator(`awardList[${index}].winTime`, {
            initialValue: awardList[index].winTime,
            rules: [
              {
                required: true,
                message: '请输入获奖时间',
              },
            ],
          })(<DatePicker placeholder="获奖时间" />)}
        </Form.Item>
        <Form.Item className={styles['item-big']} {...itemLayout}>
          {getFieldDecorator(`awardList[${index}].awardsName`, {
            initialValue: awardList[index].awardsName,
            rules: [
              {
                required: true,
                message: '请输入获奖奖项',
              },
            ],
          })(<Input placeholder="获奖奖项" />)}
        </Form.Item>
        <Form.Item className={styles['item-normal']} {...itemLayout}>
          {getFieldDecorator(`awardList[${index}].awardsTitleName`, {
            initialValue: awardList[index].awardsTitleName,
            rules: [
              {
                required: true,
                message: '请输入获奖作品名称',
              },
            ],
          })(<Input placeholder="获奖作品名称" />)}
        </Form.Item>
        <img className={styles.minus} onClick={() => this.onDelAward(index)} src={minusImg} alt="" />
      </Form.Item>
    )
  }

  renderFieldItem = index => {
    const { form, fieldList } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form.Item className={styles['item-set']} key={index} {...itemLayout}>
        <Form.Item className={styles['item-small']} {...itemLayout}>
          {getFieldDecorator(`fieldList[${index}].fieldName`, {
            initialValue: fieldList[index].fieldName,
            rules: [
              {
                required: true,
                message: '请输入擅长领域',
              },
            ],
          })(<Input placeholder="请输入您擅长的领域" />)}
        </Form.Item>
        <img className={styles.minus} onClick={() => this.onDelField(index)} src={minusImg} alt="" />
      </Form.Item>
    )
  }

  render() {
    const {
      form,
      name,
      idCard,
      frontImages,
      backImages,
      eduList,
      awardList,
      fieldList,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles['form-container']}>
        <Form {...formItemLayout}>
          <AuthHead title="实名信息" required />
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="身份证">
            {getFieldDecorator('idCard', {
              initialValue: idCard,
              rules: [
                {
                  required: true,
                  message: '请输入身份证号码',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            {...imageFormItemLayout}
            extra={<div className={styles.info}>1. 请上传本人手持身份证信息面照片，照片中含有本人头部或上半身<br />
              2. 照片中本人形象需为免冠且并未化妆，五官清晰<br />
              3. 身份证国徽面与信息面信息应为同一身份证的信息且在有效期内，照片清晰且未遮挡，无需手持拍照<br />
              4. 拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡<br />
              5. 文件为数码照片，请勿进行美化和修改，以免申请失败<br />
              6. 上传文件格式支持png，jpg和bmp<br />
              7. 文件大小不超过3MB，文件尺寸最小为500px * 500px</div>}>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50%)' }}>
              {
                getFieldDecorator('idFrontPhoto', {
                  initialValue: frontImages,
                  rules: [
                    {
                      required: true,
                      message: '请上传身份证正面照片！',
                    },
                  ],
                })(
                  <ImageViewWrapper
                    images={frontImages}
                    total={1}
                    onChange={this.onChangeFontImage}
                    type="custom"
                    sizeLimit={3072}
                  >
                    <div>
                      <div className={styles.images}>
                        <span>手持身份证正面</span>
                        {
                          frontImages && frontImages.length > 0 ? <img className={styles.image} src={frontImages[0].server} alt="" /> :
                            <img src={frontImg} alt="" />
                        }
                      </div>
                      <div className={styles['images-bottom']}>
                        <div className={styles['upload-btn']}>点击上传</div>
                      </div>
                    </div>
                  </ImageViewWrapper>,
                )
              }
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50%)' }}>
              {
                getFieldDecorator('idBackPhoto', {
                  initialValue: backImages,
                  rules: [
                    {
                      required: true,
                      message: '请上传身份证背面照片！',
                    },
                  ],
                })(
                  <ImageViewWrapper
                    images={backImages}
                    total={1}
                    onChange={this.onChangeBackImage}
                    sizeLimit={3072}
                    type="custom"
                  >
                    <div>
                      <div className={styles.images}>
                        <span>身份证背面</span>
                        {backImages && backImages.length > 0 ? <img className={styles.image} src={backImages[0].server} alt="" /> :
                          <img src={backImg} alt="" />}
                      </div>
                      <div className={styles['images-bottom']}>
                        <div className={styles['upload-btn']}>点击上传</div>
                      </div>
                    </div>
                  </ImageViewWrapper>,
                )
              }
            </Form.Item>
          </Form.Item>
          <div className={styles.line} />
          <AuthHead title="教育经历" onAdd={this.onAddEdu} required />
          {eduList && eduList.map((v, index) => this.renderEduItem(index))}
          <AuthHead title="获奖经历" onAdd={this.onAddAward} />
          {awardList && awardList.map((v, index) => this.renderAwardItem(index))}
          <AuthHead title="擅长领域" onAdd={this.onAddField} required />
          <div className={styles.fields}>
            {fieldList && fieldList.map((v, index) => this.renderFieldItem(index))}
          </div>
          <div className={styles.save}>
            <Button onClick={this.onSubmit}>保存</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Page);
