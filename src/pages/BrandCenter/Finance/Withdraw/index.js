import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Col, Row } from 'antd';
import InputNumber from '@/components/InputNumber';
import styles from './style.less';

@connect(({ financeWithdraw }) => financeWithdraw)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financeWithdraw/getFinanceInfo',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financeWithdraw/destory',
    });
  }

  checkNumber = (rule, value, callback) => {
    const { financeInfo } = this.props;

    if (value <= 0) {
      callback('数值需为正数！');
      return;
    }

    if (value > financeInfo.withdrawableBalance) {
      callback('数值不能大于可提现金额！');
      return;
    }

    callback();
  };

  // 表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'financeWithdraw/updateAllData',
          payload: { values },
        });
        dispatch({
          type: 'financeWithdraw/saveData',
        });
      }
    });
  };

  renderHeader = () => (
    <Row>
      <Col push={1} span={21} className={styles.header}>
        <div className={styles.title}>当前可提现金额：￥{this.props.data.withdrawableBalance}（成功提现：￥5000 冻结中：￥2000）</div>
      </Col>
    </Row>
  );

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 22 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 22 },
        sm: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { children, route, location, data } = this.props;
    const { getFieldDecorator } = this.props.form;

    if (route.path !== location.pathname) return children;

    return (
      <div className={styles.container}>
        <div style={{ fontSize: '18px', marginLeft: '22px', marginTop: '30px' }}>申请提现</div>
        {this.renderHeader()}
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="提现金额（元）" required>
            {getFieldDecorator('withdrawAmount', {
              initialValue: data.withdrawAmount || '',
              rules: [{ validator: this.checkNumber }],
            })(<Input placeholder="请输入提现金额" />)}
          </Form.Item>
          <Form.Item label="提现户名">
            {getFieldDecorator('withdrawAccountName', {
              rules: [
                { required: true, message: '请输入提现户名' },
                { max: 30, message: '不能超过30字符！' },
              ],
              initialValue: data.withdrawAccountName,
            })(<Input placeholder="请输入提现户名" />)}
          </Form.Item>
          <Form.Item label="提现账户">
            {getFieldDecorator('withdrawCardNo', {
              rules: [
                { required: true, message: '请输入提现账户' },
                { max: 20, min: 12, message: '最少12位，最多20位！' },
              ],
              initialValue: data.withdrawCardNo,
            })(<Input placeholder="请输入提现账户" />)}
          </Form.Item>
          <Form.Item label="提现银行">
            {getFieldDecorator('withdrawBankName', {
              rules: [{ required: true, message: '请输入提现银行' }],
              initialValue: data.withdrawBankName,
            })(<Input placeholder="请输入提现银行" />)}
          </Form.Item>
          <Form.Item label="开户行">
            {getFieldDecorator('depositBankName', {
              rules: [{ required: true, message: '请输入开户行' }],
              initialValue: data.depositBankName,
            })(<Input placeholder="请输入开户行" />)}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('telephone', {
              rules: [
                {
                  required: true,
                  message: '请输入联系电话！',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '请输入正确的手机号码!',
                },
              ],
              initialValue: data.telephone,
            })(<Input placeholder="请输入联系电话" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button className={styles.button} type="primary" htmlType="submit">
              确认申请
            </Button>
            <Button
              style={{ marginLeft: '20px', backgroundColor: '#AFB4C6' }}
              className={styles.button}
              htmlType="submit"
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Page);
