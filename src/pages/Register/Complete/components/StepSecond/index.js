import React, { Component } from 'react';
import { Row, Col, Form, Input, Radio, DatePicker, Select, Button, Divider } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import styles from './style.less';
import ImageView from '@/components/ImageView';
import user from '../../../../../assets/user_complete.png';

const { Option } = Select;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const formItemLayout1 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const SexType = {
  /**
   * 男 1
   */
  get male() {
    return 1;
  },

  /**
   * 女 2
   */
  get famale() {
    return 2;
  },

  /**
   * 保密 3
   */
  get secret() {
    return 2;
  },
};

@connect(({ registerComplete }) => registerComplete)
@Form.create()
class StepSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showoccupation: false,
      images: [],
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'registerComplete/getProvince',
    });
    dispatch({
      type: 'registerComplete/getCity',
    });
    dispatch({
      type: 'registerComplete/getOcc',
    });
  }

  nickNameCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (!form.getFieldValue('nickName')) {
      callback();
    } else if (form.getFieldValue('nickName').length > 20) {
      callback('昵称请输入小于20个字!');
    } else {
      callback();
    }
  };

  occupationIdCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (!form.getFieldValue('occupationId') && !form.getFieldValue('occupation')) {
      callback();
    } else {
      callback();
    }
  };

  occupationCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('occupationId')) {
      if (!form.getFieldValue('occupation')) {
        callback('请输入职业!');
      } else if (form.getFieldValue('occupation').length > 20) {
        callback('职业请输入小于20个字!');
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  signCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('autograph') && form.getFieldValue('autograph').length > 100) {
      callback('个性签名请输入小于100个字!');
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

  next = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'registerComplete/completeUser',
            payload: { ...values },
          });
        }
      }
    });
  };

  getCity = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'registerComplete/getCity',
      payload: { ...value },
    });
  };

  onChangeImage = values => {
    this.setState({
      images: values,
    });
    if (values.length > 0) {
      this.props.form.setFieldsValue({ headImage: values[0] && values[0].server });
    } else {
      this.props.form.setFieldsValue({ headImage: null });
    }
  };

  disabledDate = current => current && current > moment();

  render() {
    const { list, cities, provinces } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container}>
        <span className={styles.title}>基本资料</span>
        <Divider />
        <Row>
          <Form>
            <Col span={16}>
              <FormItem {...formItemLayout} label="昵称" require>
                {getFieldDecorator('nickName', {
                  rules: [
                    {
                      required: true,
                      message: '请输入昵称！',
                    },
                    {
                      validator: this.nickNameCheck,
                    },
                  ],
                })(<Input placeholder="给自己取个昵称吧" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="性别" require>
                {getFieldDecorator('sex', {
                  initialValue: SexType.male,
                  rules: [
                    {
                      required: true,
                      message: '请选择性别！',
                    },
                  ],
                })(
                  <Radio.Group>
                    <Radio value={SexType.male}>男</Radio>
                    <Radio value={SexType.famale}>女</Radio>
                  </Radio.Group>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="生日" require>
                {getFieldDecorator('birthday', {
                  rules: [
                    {
                      required: true,
                      message: '请选择生日！',
                    },
                  ],
                })(<DatePicker style={{ width: '100%' }} disabledDate={this.disabledDate} />)}
              </FormItem>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(50%)' }}
                label="职业"
                {...formItemLayout1}
                placeholder="请选择职业"
                require
              >
                {getFieldDecorator('occupationId', {
                  rules: [
                    {
                      required: true,
                      message: '请选择职业！',
                    },
                    {
                      validator: this.occupationIdCheck,
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
                  {getFieldDecorator('occupation', {
                    rules: [
                      {
                        validator: this.occupationCheck,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              )}
              <Form.Item
                require
                {...formItemLayout1}
                label="所在地"
                style={{ display: 'inline-block', width: 'calc(50%)' }}
              >
                {getFieldDecorator('province', {
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
              <FormItem {...formItemLayout} label="个性签名">
                {getFieldDecorator('autograph', {
                  rules: [
                    {
                      validator: this.signCheck,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout} label="头像">
                {getFieldDecorator('headImage', {
                  rules: [
                    {
                      required: true,
                      message: '请选择头像！',
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
                        <img className={styles.images} src={this.state.images && this.state.images.length > 0 ? this.state.images[0].server : user} alt="" />
                      </div>
                      <div className={styles.upButton}>上传头像</div>
                    </div>
                  </ImageView>,
                )}
              </FormItem>
            </Col>
          </Form>
        </Row>
        <Row>
          <Col span={9} />
          <Col span={6}>
            <Button type="primary" className={styles.next} onClick={this.next}>
              下一步
            </Button>
          </Col>
          <Col span={9} />
        </Row>
      </div>
    );
  }
}

export default StepSecond;
