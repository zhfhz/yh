import React, { Component } from 'react';
import { Button, Form, Divider, Input, Row, Col, Checkbox, Tabs } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import background from '../../assets/background.png';
import logo from '../../assets/header_background.png';
import header from '../../assets/register_header.png'
import SidlerValiation from '@/components/SidlerValiation';

const FormItem = Form.Item;
const { TabPane } = Tabs;
@connect(({ loginAccount }) => loginAccount)
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valiation: false,
      count: 60,
      waitGetCode: true,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/fetch',
    });
  }

  getCheckCodeHandle = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields(['mobileNumber'], (err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'loginAccount/getCheckCode',
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

  loginAccount = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'loginAccount/pwdLogin',
            payload: { ...values },
          })
        }
      }
    });
  }

  login = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'loginAccount/codeLogin',
            payload: { ...values },
          })
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
        <div className={styles['steps-content-wrapper']}>
          <div className={styles['steps-content']}>
            <div className={styles['register-header']} style={{ backgroundImage: `url(${header})` }}>
              <a><img alt="" src={logo} /></a>
              <Divider type="vertical" className={styles.divider} />
              <span className={styles.title}>
                登录
              </span>
            </div>
            <div className={styles['register-content']}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="密码登录" key="1">
                  <Form>
                    <FormItem>
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
                    <FormItem>
                      {
                        getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: '请输入密码！',
                            },
                          ],
                        })(
                          <Input.Password placeholder="密码" />)
                      }
                    </FormItem>
                    <FormItem>
                      <Row>
                        <Col span={12}>
                          {
                            getFieldDecorator('remember', {
                              valuePropName: 'checked',
                              initialValue: false,
                            })(
                              <Checkbox
                                className={styles.checkbox}
                                onChange={this.changeCheck}>
                                下次自动登录
                        </Checkbox>)
                          }
                        </Col>
                        <Col span={12} className={styles.other}>
                          <a href="/login/forget" className={styles.ahref}>忘记密码</a>
                          <Divider type="vertical" className={styles.divider1} />
                          <a href="/register" className={styles.ahref}>注册</a>
                        </Col>
                      </Row>
                    </FormItem>
                    <FormItem className={styles.nextbutton}>
                      <Button
                        type="primary"
                        style={{ width: '270px', margin: '0 auto' }}
                        onClick={this.loginAccount}>
                        登录
                    </Button>
                    </FormItem>
                  </Form>
                </TabPane>
                <TabPane tab="短信登录" key="2">
                  <Form>
                    <FormItem>
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
                        </>
                      )}
                    <FormItem>
                      <Row>
                        <Col className={styles.other}>
                          <a href="/login/forget" className={styles.ahref}>忘记密码</a>
                          <Divider type="vertical" className={styles.divider1} />
                          <a href="/register" className={styles.ahref}>注册</a>
                        </Col>
                      </Row>
                    </FormItem>
                    <FormItem className={styles.nextbutton}>
                      <Button
                        disabled={!this.state.valiation}
                        type="primary"
                        style={{ width: '270px', margin: '0 auto' }}
                        onClick={this.login}>
                        登录
                      </Button>
                    </FormItem>
                  </Form>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Page);
