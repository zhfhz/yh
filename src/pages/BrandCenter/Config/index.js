import React, { Component } from 'react';
import { Button, Modal, Form, Input, Col, message } from 'antd';
import { connect } from 'dva';
import styles from './style.less';
import SliderValidation from '@/components/SidlerValiation';
import PersonalHeader from '../../DesignerCenter/Components/PersonalHeader';
import tickImg from '@/assets/setting_tick.png';
import { SMSType } from '../../DesignerCenter/Const';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

@connect(({ brandCenterConfig }) => brandCenterConfig)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterConfig/fetch',
    });
  }

  onModalCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterConfig/save',
      payload: {
        showModal: 0,
      },
    });
  }

  onMobileModalSubmit = e => {
    e.preventDefault();
    const { dispatch, form, validated } = this.props;
    const { validateFields } = form;

    if (!validated) {
      message.error('请完成滑动验证');
      return;
    }

    validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'brandCenterConfig/modifyMobile',
          oldCode: values.code11,
          newMobileNumber: values.mobile,
          newCode: values.code22,
        });
      } else {
        // console.log('error', error, values);
      }
    });
  }

  onPwdModalSubmit = e => {
    e.preventDefault();
    const { dispatch, form, validated } = this.props;
    const { validateFields } = form;

    if (!validated) {
      message.error('请完成滑动验证');
      return;
    }

    validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'brandCenterConfig/modifyPwd',
          code: values.code1,
          newPwd: values.newPwd,
        });
      } else {
        // console.log('error', error, values);
      }
    });
  }

  onValidate = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterConfig/save',
      payload: {
        validated: true,
      },
    });
  }

  onClickGetCode = smsType => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterConfig/fetchCode',
      mobileNumber: 12343432343,
      smsType,
    });
  }

  confirmCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('newPwd') &&
      form.getFieldValue('confirmPwd') &&
      form.getFieldValue('newPwd') !== form.getFieldValue('confirmPwd')) {
      callback('请输入正确的确认密码');
    } else {
      callback();
    }
  };

  renderPwdModal = () => {
    const { form, showModal } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        className={styles.modal}
        title="修改密码"
        visible={showModal === 1}
        maskClosable={false}
        onCancel={this.onModalCancel}
        footer={null}>
        <Form {...formItemLayout}>
          <Form.Item label="手机号">
            12938291823
          </Form.Item>
          <div className={styles.validation}>
            <SliderValidation onSuccess={this.onValidate} />
          </div>
          <Form.Item label="验证码" wrapperCol={{ span: 10 }} >
            <div className={styles.code}>
              {getFieldDecorator('code1', {
                rules: [
                  {
                    required: true,
                    message: '请输入验证码',
                  },
                  {
                    pattern: /^\d{6}$/,
                    message: '请输入正确的验证码',
                  },
                ],
              })(<Input autoComplete="off" placeholder="请输入验证码" />)}
              <Button className={styles['code-btn']} onClick={() => this.onClickGetCode(SMSType.PWD_MODIFY)} >
                发送验证码
              </Button>
            </div>
          </Form.Item>
          <Form.Item label="新密码">
            {getFieldDecorator('newPwd', {
              rules: [
                {
                  required: true,
                  message: '请输入新密码',
                },
                {
                  min: 6,
                  max: 18,
                  message: '请输入6-18位的密码',
                },
              ],
            })(<Input.Password autoComplete="new-password" placeholder="请输入6-18位的密码" />)}
          </Form.Item>
          <Form.Item label="确认密码">
            {getFieldDecorator('confirmPwd', {
              rules: [
                {
                  required: true,
                  message: '请输入确认密码',
                },
                {
                  validator: this.confirmCheck,
                },
              ],
            })(<Input.Password placeholder="请再次输入新的密码" />)}
          </Form.Item>
          <div className={styles.submit}>
            <Button onClick={this.onPwdModalSubmit}>重置密码</Button>
          </div>
        </Form>
        <div className={styles.tip}>
          收不到短信或其他问题请拨打 400-867-0211
        </div>
      </Modal>
    )
  }

  renderMobileModal = () => {
    const { form, showModal } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        className={styles.modal}
        title="更换手机"
        visible={showModal === 2}
        maskClosable={false}
        onCancel={this.onModalCancel}
        footer={null}>
        <Form {...formItemLayout}>
          <Form.Item label="手机号">
            12938291823
          </Form.Item>
          <div className={styles.validation}>
            <SliderValidation onSuccess={this.onValidate} />
          </div>
          <Form.Item label="验证码" wrapperCol={{ span: 10 }} >
            <div className={styles.code}>
              {getFieldDecorator('code21', {
                rules: [
                  {
                    required: true,
                    message: '请输入验证码',
                  },
                  {
                    pattern: /^\d{6}$/,
                    message: '请输入正确的验证码',
                  },
                ],
              })(<Input autoComplete="off" placeholder="请输入验证码" />)}
              <Button className={styles['code-btn']} onClick={() => this.onClickGetCode(SMSType.MOBILE)} >
                发送验证码
              </Button>
            </div>
          </Form.Item>
          <Form.Item label="新手机号">
            {getFieldDecorator('mobile', {
              rules: [
                {
                  required: true,
                  message: '请输入新手机号',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '请输入正确的手机号码',
                },
              ],
            })(<Input placeholder="请输入新手机号" />)}
          </Form.Item>
          <Form.Item label="验证码" wrapperCol={{ span: 10 }} >
            <div className={styles.code}>
              {getFieldDecorator('code22', {
                rules: [
                  {
                    required: true,
                    message: '请输入验证码',
                  },
                  {
                    pattern: /^\d{6}$/,
                    message: '请输入正确的验证码',
                  },
                ],
              })(<Input autoComplete="off" placeholder="请输入验证码" />)}
              <Button className={styles['code-btn']} onClick={() => this.onClickGetCode(SMSType.MOBILE)} >
                发送验证码
              </Button>
            </div>
          </Form.Item>
          <div className={styles.submit}>
            <Button onClick={this.onMobileModalSubmit}>重置新手机号</Button>
          </div>
        </Form>
        <div className={styles.tip}>
          收不到短信或其他问题请拨打 400-867-0211
        </div>
      </Modal>
    )
  }

  onClickItem = showModal => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterConfig/save',
      payload: {
        showModal,
        validated: false,
      },
    })
  }

  renderItem = (title, info, btnName, showModal) => (
    <div className={styles.item}>
      <div className={styles.front}>
        <img src={tickImg} alt="" />
        <div className={styles.intro}>
          <div className={styles.title}>{title}</div>
          <div className={styles.info}>{info}</div>
        </div>
      </div>
      <div className={styles.end}>
        <Button className={styles.btn} onClick={() => this.onClickItem(showModal)}>{btnName}</Button>
      </div>
    </div>
  )

  render() {
    const { showModal } = this.props;
    return (
      <div className={styles.container}>
        <PersonalHeader title="安全设置" />
        <div className={styles.main}>
          {
            this.renderItem(
              '登录密码',
              '建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位的密码',
              '修改密码',
              1)
          }
          <div className={styles.line} />
          {
            this.renderItem(
              '绑定手机',
              '绑定手机后，您可享受丰富的手机服务，如手机找回密码等',
              '更换手机',
              2)
          }
        </div>
        {showModal === 1 && this.renderPwdModal()}
        {showModal === 2 && this.renderMobileModal()}
      </div>
    );
  }
}

export default Form.create()(Page);
