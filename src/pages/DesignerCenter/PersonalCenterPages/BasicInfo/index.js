import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import PersonalHeader from '../../Components/PersonalHeader';
import formItemLayout from '../../Const';

@connect(({ designerCenterBasicInfo }) => designerCenterBasicInfo)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterBasicInfo/fetch',
    });
  }

  onChangeName = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterBasicInfo/save',
      payload: {
        name: e.target.value,
      },
    });
  }

  render() {
    const { text, name, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.container}>
        <PersonalHeader title="基本资料" />
        <Form {...formItemLayout}>
          <Form.Item label="名称">
            {
              getFieldDecorator('mobileNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入XXX',
                  },
                  {
                    pattern: /^\d{4}$/,
                    message: '请输入正确的XXX',
                  },
                ],
              })(
                <Input placeholder="姓名" />,
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Page);
