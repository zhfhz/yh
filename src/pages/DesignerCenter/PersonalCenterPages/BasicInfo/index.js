import React, { Component } from 'react';
import { Button, Form, Input, Select, Radio, Col, DatePicker, Row } from 'antd';
import { connect } from 'dva';

import moment from 'moment';
import styles from './style.less';
import PersonalHeader from '../../Components/PersonalHeader';
import ImageViewWrapper from '../../Components/ImageViewWrapper';
import { SexType } from '../../Const';
import userImg from '@/assets/user_complete.png';
import PageLoading from '@/components/PageLoading';

// const formItemLayout = {
//   labelCol: {
//     span: 4,
//   },
//   wrapperCol: {
//     span: 20,
//   },
// };

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const formItemLayout1 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const formItemLayout3 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
};

@connect(({ designerCenterBasicInfo }) => designerCenterBasicInfo)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterBasicInfo/fetch',
    });
    dispatch({
      type: 'designerCenterBasicInfo/getProvince',
    });
    dispatch({
      type: 'designerCenterBasicInfo/getCity',
    });
    dispatch({
      type: 'designerCenterBasicInfo/getOcc',
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

  // value: occupationId
  occupationChange = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterBasicInfo/save',
      payload: {
        showOccupation: value === -1,
      },
    })
  };

  getCity = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterBasicInfo/getCity',
      payload: { ...value },
    });
  };

  onChangeImage = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterBasicInfo/save',
      payload: {
        images: values,
      },
    })

    if (values.length > 0) {
      this.props.form.setFieldsValue({ headImage: values[0] && values[0].server });
    } else {
      this.props.form.setFieldsValue({ headImage: null });
    }
  };

  disabledDate = current => current && current > moment();

  onSubmit = e => {
    e.preventDefault();
    const {
      dispatch,
      form,
    } = this.props;
    const { validateFields } = form;
    validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'designerCenterBasicInfo/changeInfo',
          params: {
            nickName: values.nickName,
            headImage: values.headImage,
            sex: values.sex,
            birthday: values.birthday.format('YYYY-MM-DD HH:mm:ss'),
            occupationId: values.occupationId,
            occupation: values.occupation,
            province: values.province,
            city: values.city,
            autograph: values.autograph,
          },
        });
      } else {
        // console.log('error', error, values);
      }
    });
  }

  renderForm = () => {
    const {
      form,
      showOccupation,
      images,
      list,
      cities,
      provinces,
      nickName,
      headImage,
      sex,
      birthday,
      occupationId,
      occupation,
      province,
      city,
      autograph,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form className={styles.form} onSubmit={this.onSubmit}>
        <Row>
          <Col span={16}>
            <Form.Item {...formItemLayout} label="昵称" require>
              {getFieldDecorator('nickName', {
                initialValue: nickName,
                rules: [
                  {
                    required: true,
                    message: '请输入昵称！',
                  },
                  {
                    validator: this.nickNameCheck,
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="性别" require>
              {getFieldDecorator('sex', {
                initialValue: sex || SexType.MALE,
                rules: [
                  {
                    required: true,
                    message: '请选择性别！',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={SexType.MALE}>男</Radio>
                  <Radio value={SexType.FEMALE}>女</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="生日" require>
              {getFieldDecorator('birthday', {
                initialValue: birthday,
                rules: [
                  {
                    required: true,
                    message: '请选择生日！',
                  },
                ],
              })(<DatePicker style={{ width: '100%' }} disabledDate={this.disabledDate} />)}
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50%)' }}
              label="职业"
              {...formItemLayout1}
              placeholder="请选择职业"
              require
            >
              {getFieldDecorator('occupationId', {
                initialValue: occupationId,
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
                    list.map(item => (
                      <Select.Option key={item.dataId} value={item.dataId}>
                        {item.dataName}
                      </Select.Option>
                    ))}
                </Select>,
              )}
            </Form.Item>
            <span style={{ display: 'inline-block', width: '12px', textAlign: 'center' }}></span>
            {showOccupation && (
              <Form.Item
                {...formItemLayout1}
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                {getFieldDecorator('occupation', {
                  initialValue: occupation,
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
                initialValue: province,
                rules: [
                  {
                    required: true,
                    message: '请选择省！',
                  },
                ],
              })(
                <Select placeholder="省" onChange={this.getCity}>
                  {provinces &&
                    provinces.map(item => (
                      <Select.Option key={item.dataId} value={item.dataName}>
                        {item.dataName}
                      </Select.Option>
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
                initialValue: city,
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
                      <Select.Option key={item.dataId} value={item.dataName}>
                        {item.dataName}
                      </Select.Option>
                    ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="个性签名">
              {getFieldDecorator('autograph', {
                initialValue: autograph,
                rules: [
                  {
                    validator: this.signCheck,
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={8} push={2}>
            <Form.Item {...formItemLayout3} label="头像">
              {getFieldDecorator('headImage', {
                rule: {
                  initialValue: headImage,
                },
              })(
                <ImageViewWrapper
                  images={images}
                  total={1}
                  sizeLimit={2048}
                  onChange={this.onChangeImage}
                  type="custom"
                >
                  <div>
                    <div className={styles.images}>
                      <img className={styles.images}
                        src={images && images.length > 0 ? images[0].server : userImg}
                        alt="" />
                    </div>
                    <div className={styles.upButton}>上传头像</div>
                    <div className={styles.info}>请上传小于2M的图片</div>
                  </div>
                </ImageViewWrapper>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Button className={styles.btn} type="primary" htmlType="submit">保存</Button>
        </Row>
      </Form>

    )
  }

  // 因为是编辑，当前nickName不可能为空，第一次进来一定有值，
  // 所以将nickName用作页面刷新，nickName为空时为正在刷新状态。
  // 在提交修改信息后，用nickName刷新表单，保证initialValue正常工作，设置初始值。
  render() {
    const { nickName } = this.props;
    return (
      <div className={styles.container}>
        <PersonalHeader title="基本资料" />
        {nickName ? this.renderForm() : <PageLoading />}
      </div>
    );
  }
}

export default Form.create()(Page);
