import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Divider } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import ImageView from '@/components/ImageView';
import { SecondType } from '../../../service';

import front from '../../../../../../assets/id_front.png';
import back from '../../../../../../assets/id_back.png';


const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const imageFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 4 },
};

@connect(({ registerComplete }) => registerComplete)
@Form.create()
class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showoccupation: false,
      frontImages: [],
      backImages: [],
      waitGetCode: true,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'registerComplete/getProvince',
    });
    dispatch({
      type: 'registerComplete/getCity',
    });
    // dispatch({
    //   type: 'registerComplete/getOcc',
    // });
  }

  legalNameCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (!form.getFieldValue('legalName')) {
      callback();
    } else if (form.getFieldValue('legalName').length > 20) {
        callback('法人姓名请输入小于20个字!');
      } else {
        callback();
      }
  }

  getCheckCodeHandle = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields(['mobileNumber'], (err, values) => {
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
  }

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
            type: 'registerComplete/completeFactorySecond',
            payload: { ...values },
          })
        }
      }
    });
  }

  prev = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: 'registerComplete/updateStep',
      payload: SecondType.First,
    })
  }

  getCity = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'registerComplete/getCity',
      payload: { ...value },
    })
  }

  onChangeFontImage = values => {
    this.setState({
      frontImages: values,
    })
    if (values.length > 0) {
      this.props.form.setFieldsValue({ idFrontPhoto: values[0] && values[0].server })
    } else {
      this.props.form.setFieldsValue({ idFrontPhoto: null })
    }
  }

  onChangeBackImage = values => {
    this.setState({
      backImages: values,
    })
    if (values.length > 0) {
      this.props.form.setFieldsValue({ idBackPhoto: values[0] && values[0].server })
    } else {
      this.props.form.setFieldsValue({ idBackPhoto: null })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container}>
        <span className={styles.title}>法人信息</span>
        <Divider />
        <Form>
          <FormItem {...formItemLayout} label="法人姓名" require>
            {
              getFieldDecorator('legalName', {
                rules: [
                  {
                    required: true,
                    message: '请输入法人姓名!',
                  },
                  {
                    validator: this.legalNameCheck,
                  },
                ],
              })(<Input placeholder="请输入法人姓名" />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="法人手机号" require>
            {
              getFieldDecorator('legalPhone', {
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
              })(<Input placeholder="请输入法人手机号" />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="短信验证码" require>
            <Row>
              <Col span={16}>
                {
                  getFieldDecorator('code', {
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
                  })(
                    <Input placeholder="请输入短信验证码" />)
                }
              </Col>
              <Col span={1} />
              <Col span={7}>
                <Button type="primary" onClick={this.getCheckCodeHandle} disabled={!this.state.waitGetCode} className={styles['code-button']}>
                  {this.state.waitGetCode ? '发送验证码' : `${this.state.count}s后重新获取`}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="法人身份证号" require>
            {
              getFieldDecorator('legalIdentityCard', {
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
              })(<Input placeholder="请输入法人身份证号" />)
            }
          </FormItem>
          <FormItem {...imageFormItemLayout} extra={<span>1. 请上传本人手持身份证信息面照片，照片中含有本人头部或上半身<br/>
                                                    2. 照片中本人形象需为免冠且并未化妆，五官清晰<br/>
                                                    3. 身份证国徽面与信息面信息应为同一身份证的信息且在有效期内，照片清晰且未遮挡，无需手持拍照<br/>
                                                    4. 拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡<br/>
                                                    5. 文件为数码照片，请勿进行美化和修改，以免申请失败<br/>
                                                    6. 上传文件格式支持png，jpg和bmp<br/>
                                                    7. 文件大小不超过3MB，文件尺寸最小为500px * 500px</span>}>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)' }}>
              {
                getFieldDecorator('idFrontPhoto', {
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
                    <div className={styles.images}>
                      <span>手持身份证正面</span>
                      {
                        this.state.frontImages && this.state.frontImages.length > 0 ? <img className={styles.image} src={this.state.frontImages[0].server} alt="" /> :
                        <img src={front} alt="" />
                      }
                    </div>
                  </div>
                </ImageView>,
                )
              }
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50%)' }}>
              {
                getFieldDecorator('idBackPhoto', {
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
                    <div className={styles.images}>
                      <span>身份证背面</span>
                        {this.state.backImages && this.state.backImages.length > 0 ? <img className={styles.image} src={this.state.backImages[0].server} alt="" /> :
                        <img src={back} alt="" />}
                    </div>
                  </div>
                </ImageView>,
                )
              }
            </Form.Item>
          </FormItem>
          <span className={styles.title}>其他信息</span>
          <Divider />
          <FormItem {...formItemLayout} label="联系人姓名" require>
            {
              getFieldDecorator('contactName', {
                rules: [
                  {
                    validator: this.shopNameCheck,
                  },
                ],
              })(<Input placeholder="请输入联系人姓名（非必填）" />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="联系人职务" require>
            {
              getFieldDecorator('contactDuties', {
                rules: [
                  {
                    validator: this.shopNameCheck,
                  },
                ],
              })(<Input placeholder="请输入联系人职务（非必填）" />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="联系人手机" require>
            {
              getFieldDecorator('contactPhone', {
                rules: [
                  {
                    pattern: /^1[3-9]\d{9}$/,
                    message: '请输入正确的手机号码!',
                  },
                ],
              })(<Input placeholder="请输入联系人手机号（非必填，仅作为联系使用，不作为登录账号）" />)
            }
          </FormItem>
        </Form>
        <Row>
          <Col span={6} />
          <Col span={12} className={styles.button}>
            <Button
              onClick={this.prev}
              className={styles.prev}
              >
              上一步
            </Button>
            <Button
              type="primary"
              className={styles.next}
              onClick={this.next}>
              开启都市智造之旅
            </Button>
          </Col>
          <Col span={6} />
        </Row>
      </div>
    );
  }
}

export default Second;
