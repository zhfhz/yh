import React, { Component } from 'react';
import { Button, Form, Input, Select, Checkbox } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import { CopyrightType } from '../Const';
import ImageView from '@/components/ImageView'
import UEditor from '@/components/Ueditor';

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
};

// eslint-disable-next-line react/prefer-stateless-function
class ImageViewWrapper extends Component {
  render() {
    const { images, onChangeImage } = this.props;
    return <ImageView images={images} total={1} onChange={onChangeImage} />
  }
}

@connect(({ designerCenterUploadWork }) => designerCenterUploadWork)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterUploadWork/fetch',
    });
  }

  onChangeImage = v => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterUploadWork/save',
      payload: {
        images: v,
      },
    });
    if (v.length > 0) {
      this.props.form.setFieldsValue({ coverImage: v[0] && v[0].server })
    } else {
      this.props.form.setFieldsValue({ coverImage: null })
    }
  }

  previewWork = e => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log('ok', values);
      } else {
        console.log('error', error, values);
      }
    });
  }

  postWork = e => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log('ok', values);
      } else {
        console.log('error', error, values);
      }
    });
  }

  saveDraft = e => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log('ok', values);
      } else {
        console.log('error', error, values);
      }
    });
  }

  renderForm = () => {
    const { form, images } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form className={styles.form} {...formItemLayout} onSubmit={this.onSubmit}>
        <div className={styles.top}>
          <div className={styles['top-left']}>
            <Form.Item label="版权">
              {
                getFieldDecorator('copyright', {
                  initialValue: CopyrightType.COMMERCIAL,
                })(
                  <Select>
                    <Select.Option value={CopyrightType.COMMERCIAL}>可直接商用</Select.Option>
                    <Select.Option value={CopyrightType.NO}>仅可演示，不可商用</Select.Option>
                    <Select.Option value={CopyrightType.BUY_COMMERCIAL}>需购买版权，可商用</Select.Option>
                  </Select>,
                )
              }
            </Form.Item>
            <Form.Item label="分类">
              {
                getFieldDecorator('category', {
                })(
                  <Select>
                  </Select>,
                )
              }
            </Form.Item>
            <Form.Item label="标签">
              {
                getFieldDecorator('tag', {
                  rules: [
                    {
                      validator(rule, value, callback) {
                        if (!value || value.length === 0) {
                          callback('请输入标签')
                        } else {
                          callback()
                        }
                      },
                    },
                  ],
                })(
                  <Input />,
                )
              }
            </Form.Item>
            <Form.Item label="参赛">
              {
                getFieldDecorator('competition', {
                })(
                  <Select>
                  </Select>,
                )
              }
            </Form.Item>
            <div className={styles.tips}>
              <div>温馨提示：</div>
              <div>1. 如果你拥有该作品的“原创著作权”请选择原创分类, 并建议在作品上打上“水印”</div>
              <div>2. 如果分享他人作品或经验，请一定注明原作者姓名或昵称，尊重其他设计师。</div>
            </div>
          </div>
          <div className={styles['top-right']}>
            <Form.Item>
              {
                getFieldDecorator('coverImage', {
                  rules: [
                    {
                      required: true,
                      message: '请上传封面！',
                    },
                  ],
                })(
                  <ImageViewWrapper images={images} total={1} onChange={this.onChangeImage} />,
                )
              }
            </Form.Item>
          </div>
        </div>
        <div className={styles.line} />
        <Form.Item label="标题">
          {
            getFieldDecorator('title', {
              rules: [
                {
                  validator(rule, value, callback) {
                    if (!value || value.length === 0) {
                      callback('请输入标题')
                    } else {
                      callback()
                    }
                  },
                },
              ],
            })(
              <Input />,
            )
          }
        </Form.Item>
        <Form.Item label="内容">
          {
            getFieldDecorator('title', {
              rules: [
                {
                  validator(rule, value, callback) {
                    if (!value || value.length === 0) {
                      callback('请输入内容')
                    } else {
                      callback()
                    }
                  },
                },
              ],
            })(
              <UEditor onReady={this.onReady} ref={this.attachEditor} />,
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('protection')(
              <Checkbox>是否愿意申请版权保护</Checkbox>,
            )
          }
        </Form.Item>
        <div>
          <Button type="ghost" onClick={this.previewWork}>
            预览作品
          </Button>
          <Button type="primary" onClick={this.postWork}>
            发布作品
          </Button>
          <Button type="link" onClick={this.saveDraft}>
            保存为草稿
          </Button>
        </div>

      </Form>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderForm()}
      </div>
    );
  }
}

export default Form.create()(Page);
