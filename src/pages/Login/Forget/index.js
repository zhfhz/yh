import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Form, Input, Row, Col, Button } from 'antd';

import styles from './style.less';
import SidlerValiation from '@/components/SidlerValiation';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

@connect(({ forget }) => forget)
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valiation: false,
      count: 60,
      waitGetCode: true,
    }
  }

  showPass = () => {
    this.setState({ valiation: true })
  }

  getCheckCodeHandle = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields(['mobileNumber'], (err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'forget/getCheckCode',
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

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPwd')) {
      callback('两次输入的密码不一致，请确认密码!');
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
            type: 'forget/retrievePwd',
            payload: { ...values },
          })
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.title}>找回密码</span>
          <Divider />
          <div className={styles.success}>
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
                  getFieldDecorator('newPwd', {
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
              <FormItem className={styles.nextbutton} {...formItemLayout}>
                <Row>
                  <Col span={6} />
                  <Col span={12}>
                    <Button
                      disabled={!this.state.valiation}
                      type="primary"
                      style={{ width: '260px' }}
                      onClick={this.next}>
                      重置密码
                  </Button>
                  </Col>
                </Row>
              </FormItem>
              <div style={{ textAlign: 'center' }}>收不到短信或其他问题请拨打400-867-0211</div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Page);
