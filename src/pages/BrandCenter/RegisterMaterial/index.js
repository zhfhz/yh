import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, Button, Icon } from 'antd';
import { connect } from 'dva';

import moment from 'moment';
import Breadcrumb from '@/components/Breadcrumb';
import ImageView from '@/components/ImageView';
import styles from './style.less';

import camera from '@/assets/camera.png';
import front from '@/assets/id_front.png';
import back from '@/assets/id_back.png';

import { ReviewType } from './service';

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const imageFormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14, offset: 6 },
};

const cardImageFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 4 },
};

const formItemLayout1 = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};
@connect(({ brandCenterRegisterMaterial }) => brandCenterRegisterMaterial)
@Form.create()
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showoccupation: false,
      logoImages: [],
      images: [],
      frontImages: [],
      backImages: [],
      waitGetCode: true,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterRegisterMaterial/getProvince',
    });
    dispatch({
      type: 'brandCenterRegisterMaterial/getCity',
    });
    dispatch({
      type: 'brandCenterRegisterMaterial/getOcc',
    });
    dispatch({
      type: 'brandCenterRegisterMaterial/fetch',
    });
  }

  enterpriseNameCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (!form.getFieldValue('enterpriseName')) {
      callback();
    } else if (form.getFieldValue('enterpriseName').length > 20) {
      callback('公司名称请输入小于20个字!');
    } else {
      callback();
    }
  };

  shopNameCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (!form.getFieldValue('shopName')) {
      callback();
    } else if (form.getFieldValue('shopName').length > 10) {
      callback('店铺名称请输入小于10个字!');
    } else {
      callback();
    }
  };

  industryIdCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (!form.getFieldValue('industryId') && !form.getFieldValue('industryName')) {
      callback('请选择行业!');
    } else {
      callback();
    }
  };

  industryNameCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('industryId')) {
      if (!form.getFieldValue('industryName')) {
        callback('请输入行业!');
      } else if (form.getFieldValue('industryName').length > 20) {
        callback('行业请输入小于20个字!');
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  licenseNumberCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (!form.getFieldValue('licenseNumber')) {
      callback();
    } else if (form.getFieldValue('licenseNumber').length > 20) {
      callback('营业执照证件号请输入小于20个字!');
    } else {
      callback();
    }
  };

  companyProfileCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('companyProfile') && form.getFieldValue('companyProfile').length > 100) {
      callback('企业简介请输入小于100个字!');
    } else {
      callback();
    }
  };

  occupationChange = value => {
    const occupationId = value;
    if (occupationId === -1) {
      this.setState({ showoccupation: true });
    } else {
      this.setState({ showoccupation: false });
    }
  };

  getCity = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterRegisterMaterial/getCity',
      payload: { ...value },
    });
  };

  onChangeLogoImage = values => {
    this.setState({
      logoImages: values,
    });
    if (values.length > 0) {
      this.props.form.setFieldsValue({ companyLogo: values[0] && values[0].server });
    } else {
      this.props.form.setFieldsValue({ companyLogo: null });
    }
  };

  onChangeImage = values => {
    this.setState({
      images: values,
    });
    if (values.length > 0) {
      this.props.form.setFieldsValue({ licensePicture: values[0] && values[0].server });
    } else {
      this.props.form.setFieldsValue({ licensePicture: null });
    }
  };

  disabledDate = current => current && current > moment();

  legalNameCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (!form.getFieldValue('legalName')) {
      callback();
    } else if (form.getFieldValue('legalName').length > 20) {
      callback('法人姓名请输入小于20个字!');
    } else {
      callback();
    }
  };

  getCheckCodeHandle = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields(['legalPhone'], (err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'register/getCheckCode',
            payload: { ...values },
          });
          this.setState({ waitGetCode: false, count: 60 });
          this.interval = setInterval(() => {
            const { count } = this.state;
            if (this.state.count > 0) {
              this.setState({ count: count - 1 });
            } else {
              this.setState({ waitGetCode: true });
              clearInterval(this.interval);
            }
          }, 1000);
        }
      }
    });
  };

  // occupationChange = value => {
  //   const occupationId = value;
  //   if (occupationId === -1) {
  //     this.setState({ showoccupation: true })
  //   } else {
  //     this.setState({ showoccupation: false })
  //   }
  // }

  next = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'brandCenterRegisterMaterial/completeFactoryFirst',
            payload: { ...values },
          });
        }
        if (dispatch) {
          dispatch({
            type: 'brandCenterRegisterMaterial/completeFactorySecond',
            payload: { ...values },
          });
        }
      }
    });
  };

  getCity = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterRegisterMaterial/getCity',
      payload: { ...value },
    });
  };

  onChangeFontImage = values => {
    this.setState({
      frontImages: values,
    });
    if (values.length > 0) {
      this.props.form.setFieldsValue({ idFrontPhoto: values[0] && values[0].server });
    } else {
      this.props.form.setFieldsValue({ idFrontPhoto: null });
    }
  };

  onChangeBackImage = values => {
    this.setState({
      backImages: values,
    });
    if (values.length > 0) {
      this.props.form.setFieldsValue({ idBackPhoto: values[0] && values[0].server });
    } else {
      this.props.form.setFieldsValue({ idBackPhoto: null });
    }
  };

  renderHeader = name => (
    <div
      style={{
        marginLeft: '42px',
        height: '40px',
        backgroundColor: '#F2F2F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#666666',
        marginBottom: '10px',
      }}
    >
      &nbsp;&nbsp;{name}
    </div>
  );

  render() {
    const { list, cities, provinces, factoryInfo } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container}>
        <Breadcrumb title="注册资料" />
        <div className={styles.header}>
          <div>
            <span className={styles.title}>认证状态：</span>
            {ReviewType.Unreviewed === factoryInfo.approvalStatus && <span className={styles.state}>未审核</span>}
            {ReviewType.Passed === factoryInfo.approvalStatus && <span className={styles.state}>审核通过</span>}
            {ReviewType.Failed === factoryInfo.approvalStatus && <span className={styles.state}>审核未通过</span>}
          </div>
          <div className={styles.tips}>
            <div>
              <Icon
                className={styles.icon}
                type="info-circle"
                theme="twoTone"
                twoToneColor="#597EF7"
              />
              <span className={styles.description}>
                个人信息仅供本平台进行身份验证，请放心填写。
              </span>
            </div>
            <div className={styles.close}>
              <Icon className={styles.image} type="close" />
            </div>
          </div>
        </div>

        {this.renderHeader('基本信息')}
        <Form>
          <FormItem {...formItemLayout} label="企业名称" require>
            {getFieldDecorator('enterpriseName', {
              initialValue: factoryInfo.enterpriseName,
              rules: [
                {
                  required: true,
                  message: '请输入公司名称!',
                },
                {
                  validator: this.enterpriseNameCheck,
                },
              ],
            })(<Input placeholder="请输入公司名称" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="店铺名称" require>
            {getFieldDecorator('shopName', {
              initialValue: factoryInfo.shopName,
              rules: [
                {
                  required: true,
                  message: '请输入店铺名称!',
                },
                {
                  validator: this.shopNameCheck,
                },
              ],
            })(<Input placeholder="用于觅货APP店铺名称展示" />)}
          </FormItem>
          <Form.Item
            style={{ display: 'inline-block', width: '50%' }}
            label="行业"
            require
            {...formItemLayout1}
            placeholder="请选择公司行业"
          >
            {getFieldDecorator('industryId', {
              rules: [
                {
                  required: true,
                  message: '请选择行业！',
                },
                {
                  validator: this.industryIdCheck,
                },
              ],
            })(
              <Select onChange={this.occupationChange}>
                {list &&
                  list.length > 0 &&
                  list.map(item => (
                    <Option key={item.id} value={item.dataId}>
                      {item.dataName}
                    </Option>
                  ))}
              </Select>,
            )}
          </Form.Item>
          <span style={{ display: 'inline-block', width: '12px', textAlign: 'center' }}></span>
          {this.state.showoccupation && (
            <Form.Item
              {...formItemLayout1}
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              {getFieldDecorator('industryName', {
                rules: [
                  {
                    validator: this.industryNameCheck,
                  },
                ],
              })(<Input />)}
            </Form.Item>
          )}
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50%)' }}
            require
            label="所在地"
            {...formItemLayout1}
          >
            {getFieldDecorator('province', {
              initialValue: factoryInfo.province,
              rules: [
                {
                  required: true,
                  message: '请选择省！',
                },
              ],
            })(
              <Select placeholder="省" onChange={this.getCity}>
                {provinces &&
                  provinces.length > 0 &&
                  provinces.map(item => (
                    <Option key={`${item.dataId}`} value={item.dataName}>
                      {item.dataName}
                    </Option>
                  ))}
              </Select>,
            )}
          </Form.Item>
          <span style={{ display: 'inline-block', width: '12px', textAlign: 'center' }}></span>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            {...formItemLayout1}
          >
            {getFieldDecorator('city', {
              initialValue: factoryInfo.city,
              rules: [
                {
                  required: true,
                  message: '请选择市！',
                },
              ],
            })(
              <Select placeholder="市">
                {cities &&
                  cities.length > 0 &&
                  cities.map(item => (
                    <Option key={`${item.dataId}`} value={item.dataName}>
                      {item.dataName}
                    </Option>
                  ))}
              </Select>,
            )}
          </Form.Item>
          <FormItem {...formItemLayout} label="企业logo">
            {getFieldDecorator('companyLogo', {
              rules: [
                {
                  required: true,
                  message: '请选择企业logo！',
                },
              ],
            })(
              <ImageView
                images={this.state.logoImages}
                total={1}
                onChange={this.onChangeLogoImage}
                type="custom"
              >
                <div>
                  <div className={styles.images}>
                    {this.state.logoImages && this.state.logoImages.length > 0 ? (
                      <img className={styles.image} src={this.state.logoImages[0].server} alt="" />
                    ) : (
                      <>
                        <img src={camera} alt="" />
                        <span>企业logo</span>
                      </>
                    )}
                  </div>
                </div>
              </ImageView>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="营业执照">
            {getFieldDecorator('licenseNumber', {
              initialValue: factoryInfo.licenseNumber,
              rules: [
                {
                  required: true,
                  message: '请输入营业执照证件号!',
                },
                {
                  validator: this.licenseNumberCheck,
                },
              ],
            })(<Input placeholder="请输入营业执照证件号" />)}
          </FormItem>
          <FormItem {...imageFormItemLayout}>
            {getFieldDecorator('licensePicture', {
              rules: [
                {
                  required: true,
                  message: '请选择营业执照！',
                },
              ],
            })(
              <ImageView
                images={this.state.images}
                total={1}
                onChange={this.onChangeImage}
                type="custom"
              >
                <div>
                  <div className={styles.images}>
                    {this.state.images && this.state.images.length > 0 ? (
                      <img className={styles.image} src={this.state.images[0].server} alt="" />
                    ) : (
                      <>
                        <img src={camera} alt="" />
                        <span>营业执照</span>
                      </>
                    )}
                  </div>
                </div>
              </ImageView>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="企业简介">
            {getFieldDecorator('companyProfile', {
              initialValue: factoryInfo.companyProfile,
              rules: [
                {
                  required: true,
                  message: '请输入企业简介！',
                },
                {
                  validator: this.companyProfileCheck,
                },
              ],
            })(<TextArea rows={4} />)}
          </FormItem>
        </Form>
        {this.renderHeader('法人信息')}
        <Form>
          <FormItem {...formItemLayout} label="法人姓名" require>
            {getFieldDecorator('legalName', {
              initialValue: factoryInfo.legalName,
              rules: [
                {
                  required: true,
                  message: '请输入法人姓名!',
                },
                {
                  validator: this.legalNameCheck,
                },
              ],
            })(<Input placeholder="请输入法人姓名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="法人手机号" require>
            {getFieldDecorator('legalPhone', {
              initialValue: factoryInfo.legalPhone,
              rules: [
                {
                  required: true,
                  message: '请输入法人手机号!',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '请输入正确的手机号码!',
                },
              ],
            })(<Input placeholder="请输入法人手机号" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="短信验证码" require>
            <Row>
              <Col span={16}>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                    {
                      pattern: /^\d{6}$/,
                      message: '请输入正确的验证码!',
                    },
                  ],
                })(<Input placeholder="请输入短信验证码" />)}
              </Col>
              <Col span={1} />
              <Col span={7}>
                <Button
                  type="primary"
                  onClick={this.getCheckCodeHandle}
                  disabled={!this.state.waitGetCode}
                  className={styles['code-button']}
                >
                  {this.state.waitGetCode ? '发送验证码' : `${this.state.count}s后重新获取`}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="法人身份证号" require>
            {getFieldDecorator('legalIdentityCard', {
              initialValue: factoryInfo.legalIdentityCard,
              rules: [
                {
                  required: true,
                  message: '请输入法人身份证号!',
                },
                {
                  pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                  message: '请输入正确的身份证号!',
                },
              ],
            })(<Input placeholder="请输入法人身份证号" />)}
          </FormItem>
          <FormItem
            {...cardImageFormItemLayout}
            extra={
              <span>
                1. 请上传本人手持身份证信息面照片，照片中含有本人头部或上半身
                <br />
                2. 照片中本人形象需为免冠且并未化妆，五官清晰
                <br />
                3.
                身份证国徽面与信息面信息应为同一身份证的信息且在有效期内，照片清晰且未遮挡，无需手持拍照
                <br />
                4. 拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡
                <br />
                5. 文件为数码照片，请勿进行美化和修改，以免申请失败
                <br />
                6. 上传文件格式支持png，jpg和bmp
                <br />
                7. 文件大小不超过3MB，文件尺寸最小为500px * 500px
              </span>
            }
          >
            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)' }}>
              {getFieldDecorator('idFrontPhoto', {
                rules: [
                  {
                    required: true,
                    message: '请上传身份证正面照片！',
                  },
                ],
              })(
                <ImageView
                  images={this.state.frontImages}
                  total={1}
                  onChange={this.onChangeFontImage}
                  type="custom"
                >
                  <div>
                    <div className={styles['card-images']}>
                      <span>手持身份证正面</span>
                      {this.state.frontImages && this.state.frontImages.length > 0 ? (
                        <img
                          className={styles['card-image']}
                          src={this.state.frontImages[0].server}
                          alt=""
                        />
                      ) : (
                        <img src={front} alt="" />
                      )}
                    </div>
                  </div>
                </ImageView>,
              )}
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)' }}>
              {getFieldDecorator('idBackPhoto', {
                rules: [
                  {
                    required: true,
                    message: '请上传身份证背面照片！',
                  },
                ],
              })(
                <ImageView
                  images={this.state.backImages}
                  total={1}
                  onChange={this.onChangeBackImage}
                  type="custom"
                >
                  <div>
                    <div className={styles['card-images']}>
                      <span>身份证背面</span>
                      {this.state.backImages && this.state.backImages.length > 0 ? (
                        <img
                          className={styles['card-image']}
                          src={this.state.backImages[0].server}
                          alt=""
                        />
                      ) : (
                        <img src={back} alt="" />
                      )}
                    </div>
                  </div>
                </ImageView>,
              )}
            </Form.Item>
          </FormItem>
          {this.renderHeader('其他信息')}
          <FormItem {...formItemLayout} label="联系人姓名" require>
            {getFieldDecorator('contactName', {
              initialValue: factoryInfo.contactName,
              rules: [
                {
                  validator: this.shopNameCheck,
                },
              ],
            })(<Input placeholder="请输入联系人姓名（非必填）" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="联系人职务" require>
            {getFieldDecorator('contactDuties', {
              initialValue: factoryInfo.contactDuties,
              rules: [
                {
                  validator: this.shopNameCheck,
                },
              ],
            })(<Input placeholder="请输入联系人职务（非必填）" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="联系人手机" require>
            {getFieldDecorator('contactPhone', {
              initialValue: factoryInfo.contactPhone,
              rules: [
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '请输入正确的手机号码!',
                },
              ],
            })(
              <Input placeholder="请输入联系人手机号（非必填，仅作为联系使用，不作为登录账号）" />,
            )}
          </FormItem>
        </Form>
        <Row>
          <Col span={6} />
          <Col span={12} className={styles.button}>
            <Button onClick={this.next} className={styles.confirm}>
              申请变更
            </Button>
          </Col>
          <Col span={6} />
        </Row>
      </div>
    );
  }
}

export default Page;
