import React, { Component } from 'react';
import { Button, Steps, Divider, Form, Radio, Input, Checkbox, Row, Col } from 'antd';
import { connect } from 'dva';
import { STEPS, RegisterType } from './service';

import styles from './style.less';
import SidlerValiation from '@/components/SidlerValiation';
import background from '../../assets/background.png';
import logo from '../../assets/header_background.png';
import header from '../../assets/register_header.png'

const { Step } = Steps;
const FormItem = Form.Item;

@connect(({ register }) => register)
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valiation: false,
      count: 60,
      waitGetCode: true,
      // showTip: true,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'register/fetch',
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

  showPass = () => {
    this.setState({ valiation: true })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致，请确认密码!');
    } else {
      callback();
    }
  }

  agreement = (rule, value, callback) => {
    if (!value) {
      callback('请阅读用户协议并勾选!');
    } else {
      callback();
    }
  }

  next = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'register/registerUser',
            payload: { ...values },
          })
        }
      }
      //  else {
      //   const { mobileNumber } = err;
      //   if (!mobileNumber) {
      //     this.setState({ showTip: false });
      //   } else {
      //     this.setState({ showTip: true });
      //   }
      // }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
        <div className={styles['step-wrapper']}>
          <Steps labelPlacement="vertical">
            {STEPS.map(item => (
              <Step key={item} title={item} />
            ))}
          </Steps>
        </div>
        <div className={styles['steps-content-wrapper']}>
          <div className={styles['steps-content']}>
            <div className={styles['register-header']} style={{ backgroundImage: `url(${header})` }}>
              <a><img alt="" src={logo} /></a>
              <Divider type="vertical" className={styles.divider} />
              <span className={styles.title}>
                注册
              </span>
            </div>
            <div className={styles['register-content']}>
              <Form>
                <FormItem className={styles['register-radio']}>
                  {
                    getFieldDecorator('registerType', {
                      initialValue: RegisterType.normal,
                      rules: [
                        {
                          required: true,
                          message: '请选择用户角色！',
                        },
                      ],
                    })(<Radio.Group onChange={this.handleTypeChange}>
                      <Radio value={RegisterType.normal}>个人用户注册</Radio>
                      <Radio value={RegisterType.business}>企业用户注册</Radio>
                    </Radio.Group>)
                  }
                </FormItem>
                <FormItem extra="提示：该手机号作为登录账号，每个手机号仅能注册一个角色，请谨慎选择">
                  {
                    getFieldDecorator('mobileNumber', {
                      rules: [
                        {
                          required: true,
                          message: '请输入手机号！',
                        },
                        {
                          pattern: /^1[3-9]\d{9}$/,
                          message: '请输入正确的手机号码!',
                        },
                      ],
                    })(
                      <Input placeholder="手机号码" />,
                    )
                  }
                </FormItem>
                {/* {
                  this.state.showTip && (
                    <Row>
                      <Col><span className={styles.help}>提示：该手机号作为登录账号，每个手机号仅能注册一个角色，请谨慎选择</span></Col>
                    </Row>)
                } */}
                <FormItem>
                  <SidlerValiation onSuccess={this.showPass} />
                </FormItem>
                {
                  this.state.valiation && (
                    <>
                      <FormItem>
                        <Row>
                          <Col span={14}>
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
                                <Input placeholder="验证码" />)
                            }
                          </Col>
                          <Col span={1} />
                          <Col span={9}>
                            <Button type="primary" onClick={this.getCheckCodeHandle} disabled={!this.state.waitGetCode} className={styles['code-button']}>
                              {this.state.waitGetCode ? '发送验证码' : `${this.state.count}s后重新获取`}
                            </Button>
                          </Col>
                        </Row>
                      </FormItem>
                      <FormItem>
                        {
                          getFieldDecorator('password', {
                            rules: [
                              {
                                required: true,
                                message: '请输入密码！',
                              },
                              {
                                pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,16}$/,
                                message: '请输入 8-16位密码，字母、数字及符号至少2种!',
                              },
                            ],
                          })(
                            <Input.Password placeholder="8-16位密码，字母、数字及符号至少2种" />)
                        }
                      </FormItem>
                      <FormItem>
                        {
                          getFieldDecorator('password1', {
                            rules: [
                              {
                                required: true,
                                message: '请输入确认密码！',
                              },
                              {
                                validator: this.compareToFirstPassword,
                              },
                            ],
                          })(
                            <Input.Password placeholder="请再次输入密码确认" />)
                        }
                      </FormItem>
                    </>
                  )
                }
                <FormItem>
                  {
                    getFieldDecorator('agreement', {
                      rules: [
                        {
                          validator: this.agreement,
                        },
                      ],
                    })(
                      <Checkbox
                    className={styles.checkbox}>
                      我已阅读并接受<a href="/register/protocol" target="_blank">用户协议</a>
                  </Checkbox>)
                  }
                </FormItem>
                <FormItem className={styles.nextbutton}>
                  <Button
                    disabled={!this.state.valiation}
                    type="primary"
                    style={{ width: '270px', margin: '0 auto' }}
                    onClick={this.next}>
                    下一步
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Page);
