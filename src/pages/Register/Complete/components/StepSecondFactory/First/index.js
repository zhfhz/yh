import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, Button, Divider } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import styles from './style.less';
import ImageView from '@/components/ImageView';
import camera from '../../../../../../assets/camera.png';

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

const formItemLayout1 = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

@connect(({ registerComplete }) => registerComplete)
@Form.create()
class First extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showoccupation: false,
      logoImages: [],
      images: [],
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
    dispatch({
      type: 'registerComplete/getOcc',
    });
    dispatch({
      type: 'registerComplete/getAuthen',
    });
  }

  componentDidMount() {
    const { data } = this.props;
    this.props.form.setFieldsValue({ enterpriseName: data.enterpriseName });
    this.props.form.setFieldsValue({ shopName: data.shopName })
    this.props.form.setFieldsValue({ industryId: data.industryId })
    this.props.form.setFieldsValue({ industryName: data.industryName })
    this.props.form.setFieldsValue({ province: data.province })
    this.props.form.setFieldsValue({ city: data.city })
    this.props.form.setFieldsValue({ companyLogo: data.companyLogo })
    this.props.form.setFieldsValue({ licenseNumber: data.licenseNumber })
    this.props.form.setFieldsValue({ licensePicture: data.licensePicture })
    this.props.form.setFieldsValue({ companyProfile: data.companyProfile })
    this.setState({
      logoImages: [{ server: data.companyLogo }],
    })
    this.setState({
      images: [{ server: data.licensePicture }],
    })
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
  }

  shopNameCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (!form.getFieldValue('shopName')) {
      callback();
    } else if (form.getFieldValue('shopName').length > 10) {
      callback('店铺名称请输入小于10个字!');
    } else {
      callback();
    }
  }

  industryIdCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (!form.getFieldValue('industryId') && !form.getFieldValue('industryName')) {
      callback('请选择行业!');
    } else {
      callback();
    }
  }

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
  }

  licenseNumberCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (!form.getFieldValue('licenseNumber')) {
      callback();
    } else if (form.getFieldValue('licenseNumber').length > 20) {
      callback('营业执照证件号请输入小于20个字!');
    } else {
      callback();
    }
  }

  companyProfileCheck = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('companyProfile') && form.getFieldValue('companyProfile').length > 100) {
      callback('企业简介请输入小于100个字!');
    } else {
      callback();
    }
  }

  occupationChange = value => {
    const occupationId = value;
    if (occupationId === -1) {
      this.setState({ showoccupation: true })
    } else {
      this.setState({ showoccupation: false })
    }
  }

  next = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'registerComplete/completeFactoryFirst',
            payload: { ...values },
          })
        }
      }
    });
  }

  getCity = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'registerComplete/getCity',
      payload: { ...value },
    })
  }

  onChangeLogoImage = values => {
    this.setState({
      logoImages: values,
    })
    if (values.length > 0) {
      this.props.form.setFieldsValue({ companyLogo: values[0] && values[0].server })
    } else {
      this.props.form.setFieldsValue({ companyLogo: null })
    }
  }

  onChangeImage = values => {
    this.setState({
      images: values,
    })
    if (values.length > 0) {
      this.props.form.setFieldsValue({ licensePicture: values[0] && values[0].server })
    } else {
      this.props.form.setFieldsValue({ licensePicture: null })
    }
  }

  disabledDate = current => current && current > moment();

  render() {
    const { list, cities, provinces } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container}>
        <span className={styles.title}>基本资料</span>
        <Divider />
        <Form>
          <FormItem {...formItemLayout} label="企业名称" require>
            {
              getFieldDecorator('enterpriseName', {
                rules: [
                  {
                    required: true,
                    message: '请输入公司名称!',
                  },
                  {
                    validator: this.enterpriseNameCheck,
                  },
                ],
              })(<Input placeholder="请输入公司名称" />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="店铺名称" require>
            {
              getFieldDecorator('shopName', {
                rules: [
                  {
                    required: true,
                    message: '请输入店铺名称!',
                  },
                  {
                    validator: this.shopNameCheck,
                  },
                ],
              })(<Input placeholder="用于觅货APP店铺名称展示" />)
            }
          </FormItem>
          <Form.Item style={{ display: 'inline-block', width: '50%' }} label="行业" require {...formItemLayout1}
            placeholder="请选择公司行业" >
            {
              getFieldDecorator('industryId', {
                rules: [
                  {
                    required: true,
                    message: '请选择行业！',
                  },
                  {
                    validator: this.industryIdCheck,
                  },
                ],
              })(<Select onChange={this.occupationChange}>
                {
                  list && list.length > 0 &&
                  list.map(item => <Option key={item.id} value={item.dataId}>{item.dataName}</Option>)
                }
              </Select>)
            }
          </Form.Item>
          <span style={{ display: 'inline-block', width: '12px', textAlign: 'center' }}></span>
          {
            this.state.showoccupation && <Form.Item {...formItemLayout1}
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
              {
                getFieldDecorator('industryName', {
                  rules: [
                    {
                      validator: this.industryNameCheck,
                    },
                  ],
                })(<Input />)
              }
            </Form.Item>
          }
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50%)' }} require label="所在地" {...formItemLayout1}
          >
            {
              getFieldDecorator('province', {
                rules: [
                  {
                    required: true,
                    message: '请选择省！',
                  },
                ],
              })(<Select placeholder="省" onChange={this.getCity}>
                {
                  provinces && provinces.length > 0 &&
                  provinces.map(item => <Option key={`${item.dataId}`} value={item.dataName}>{item.dataName}</Option>)
                }
              </Select>)}
          </Form.Item>
          <span style={{ display: 'inline-block', width: '12px', textAlign: 'center' }}></span>
          <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} {...formItemLayout1}>
            {
              getFieldDecorator('city', {
                rules: [
                  {
                    required: true,
                    message: '请选择市！',
                  },
                ],
              })(<Select placeholder="市">
                {
                  cities && cities.length > 0 &&
                  cities.map(item => <Option key={`${item.dataId}`} value={item.dataName}>{item.dataName}</Option>)
                }
              </Select>)}
          </Form.Item>
          <FormItem {...formItemLayout} label="企业logo">
            {
              getFieldDecorator('companyLogo', {
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
                      {
                        this.state.logoImages && this.state.logoImages.length > 0 ?
                          <img className={styles.image} src={this.state.logoImages[0].server} alt="" /> :
                          (<><img src={camera} alt="" />
                            <span>企业logo</span></>)
                      }
                    </div>
                  </div>
                </ImageView>,
              )
            }
          </FormItem>
          <FormItem {...formItemLayout} label="营业执照">
            {
              getFieldDecorator('licenseNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入营业执照证件号!',
                  },
                  {
                    validator: this.licenseNumberCheck,
                  },
                ],
              })(<Input placeholder="请输入营业执照证件号" />)
            }
          </FormItem>
          <FormItem {...imageFormItemLayout}>
            {
              getFieldDecorator('licensePicture', {
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
                      {
                        this.state.images && this.state.images.length > 0 ? <img className={styles.image} src={this.state.images[0].server} alt="" /> :
                          (<><img src={camera} alt="" /><span>营业执照</span></>)
                      }
                    </div>
                  </div>
                </ImageView>,
              )
            }
          </FormItem>
          <FormItem {...formItemLayout} label="企业简介">
            {
              getFieldDecorator('companyProfile', {
                rules: [
                  {
                    required: true,
                    message: '请输入企业简介！',
                  },
                  {
                    validator: this.companyProfileCheck,
                  },
                ],
              })(
                <TextArea rows={4} />)
            }
          </FormItem>
        </Form>
        <Row>
          <Col span={9} />
          <Col span={6}>
            <Button
              type="primary"
              className={styles.next}
              onClick={this.next}>
              下一步
            </Button>
          </Col>
          <Col span={9} />
        </Row>
      </div>
    );
  }
}

export default First;
