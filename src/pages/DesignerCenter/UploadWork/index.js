import React, { Component } from 'react';
import { Button, Form, Input, Select, Checkbox, message, Modal } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import { CopyrightType, WorksStatus } from '../Const';
import ImageViewWrapper from '../Components/ImageViewWrapper';
import UEditor from '@/components/Ueditor';
import addImg from '@/assets/add.png';
import PageLoading from '@/components/PageLoading';

const formItemLayout = {
  labelCol: {
    span: 1,
  },
  wrapperCol: {
    span: 18,
  },
};

const formItemLayout2 = {
  labelCol: {
    span: 1,
  },
  wrapperCol: {
    span: 23,
  },
};

@connect(({ designerCenterUploadWork }) => designerCenterUploadWork)
class Page extends Component {
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'designerCenterUploadWork/fetch',
      worksId: location.query.id,
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

  attachEditor = ref => {
    this.editor = ref;
  };

  onReady = () => {
    const { content } = this.props;
    if (this.editor && content) {
      this.editor.setContent(content);
    }
  }

  onCategoryChange = v => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterUploadWork/save',
      payload: {
        showOther: v === -1,
      },
    })
  }

  previewWork = () => {
    this.showModal();
  }

  postWork = (e, status = WorksStatus.PUBLISH) => {
    e.preventDefault();
    this.onModalCancel();
    const {
      dispatch,
      worksId,
    } = this.props;

    this.props.form.validateFields((error, values) => {
      if (!this.editor || !this.editor.getContent()) {
        message.error('请输入作品内容');
        return;
      }
      if (!error) {
        const data = {
          worksId,
          coverImage: values.coverImage,
          copyright: values.copyright,
          categoryId: values.category,
          categoryName: values.categoryName,
          labels: values.tag,
          worksName: values.worksName,
          content: this.editor && this.editor.getContent(),
          worksStatus: status,
          copyrightProtection: values.protection ? 1 : 0,
        };
        dispatch({
          type: 'designerCenterUploadWork/uploadWork',
          data,
          isEdit: worksId,
          editor: this.editor,
        })
      }
    });
  }

  saveDraft = e => {
    this.postWork(e, WorksStatus.DRAFT);
  }

  onModalCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenterUploadWork/save',
      payload: {
        showModal: false,
      },
    })
  }

  showModal = () => {
    const { dispatch } = this.props;
    const data = this.props.form.getFieldsValue();
    dispatch({
      type: 'designerCenterUploadWork/save',
      payload: {
        tag: data.tag,
        worksName: data.worksName,
        content: this.editor && this.editor.getContent(),
        showModal: true,
      },
    });
  }

  renderModal = () => {
    const { showModal, worksName, tag } = this.props;
    return (
      <Modal
        title="预览作品"
        className={styles.modal}
        visible={showModal}
        width={878}
        footer={null}
        onCancel={this.onModalCancel}
      >
        <>
          <div className={styles.header}>
            <div className={styles['header-name']}>{worksName}</div>
            <div className={styles['header-tags']}>{tag && tag.split(',').map(v => <div className={styles.tag} key={v}>{v}</div>)}</div>
          </div>
          <article dangerouslySetInnerHTML={{ __html: this.editor && this.editor.getContent() }} />
          <div className={styles.btns}>
            <Button className={styles.btn1} onClick={this.saveDraft}>保存</Button>
            <Button className={styles.btn2} onClick={this.postWork}>发布作品</Button>
          </div>
        </>
      </Modal>
    )
  }

  renderForm = () => {
    const {
      form,
      images,
      categories,
      showOther,
      coverImage,
      copyright,
      category,
      categoryName,
      tag,
      worksName,
      protection,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form className={styles.form} {...formItemLayout}>
        <div className={styles.top}>
          <div className={styles['top-left']}>
            <Form.Item label="版权">
              {
                getFieldDecorator('copyright', {
                  initialValue: copyright || CopyrightType.COMMERCIAL,
                })(
                  <Select>
                    <Select.Option value={CopyrightType.COMMERCIAL}>可直接商用</Select.Option>
                    <Select.Option value={CopyrightType.NO}>仅可演示，不可商用</Select.Option>
                    <Select.Option value={CopyrightType.BUY_COMMERCIAL}>需购买版权，可商用</Select.Option>
                  </Select>,
                )
              }
            </Form.Item>
            <Form.Item
              label="分类"
              className={showOther && styles['item-category-other']}
              labelCol={{ span: showOther ? 8 : 1 }}
              wrapperCol={{ span: showOther ? 16 : 18 }}>
              {
                getFieldDecorator('category', {
                  initialValue: category,
                  rules: [{
                    validator(rule, value, callback) {
                      if (!value || value.length === 0) {
                        callback('请选择分类')
                      } else {
                        callback()
                      }
                    },
                  }],
                })(
                  <Select onChange={this.onCategoryChange}>
                    {categories &&
                      categories.map(item => (
                        <Select.Option key={item.dataId} value={item.dataId}>
                          {item.dataName}
                        </Select.Option>
                      ))}
                  </Select>,
                )
              }
            </Form.Item>
            {showOther && (
              <Form.Item
                className={styles['item-other']}
              >
                {getFieldDecorator('categoryName', {
                  initialValue: categoryName,
                  rules: [{
                    validator(rule, value, callback) {
                      if (!value || value.length === 0) {
                        callback('请输入其他标签的内容')
                      } else {
                        callback()
                      }
                    },
                  }],
                })(<Input />)}
              </Form.Item>
            )}
            <Form.Item label="标签">
              {
                getFieldDecorator('tag', {
                  initialValue: tag,
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
            {/* <Form.Item label="参赛">
              {
                getFieldDecorator('competition', {
                })(
                  <Select>
                  </Select>,
                )
              }
            </Form.Item> */}
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
                  initialValue: coverImage,
                  rules: [
                    {
                      required: true,
                      message: '请上传封面！',
                    },
                  ],
                })(
                  <ImageViewWrapper
                    images={images}
                    total={1}
                    onChange={this.onChangeImage}
                    type="custom">
                    <div className={styles.pic}>
                      {
                        images && images.length > 0 ?
                          <img className={styles.view}
                            src={images[0].server}
                            alt="" /> :
                          <div className={styles.view}>
                            <img src={addImg} alt="" />
                            <div className={styles.text}>点击添加封面</div>
                          </div>
                      }
                      <div className={styles.btn}>上传封面（560*240）</div>
                    </div>
                  </ImageViewWrapper>,
                )
              }
            </Form.Item>
          </div>
        </div>
        <div className={styles.line} />
        <Form.Item className={styles['title-input']} label="标题" {...formItemLayout2}>
          {
            getFieldDecorator('worksName', {
              initialValue: worksName,
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
        <div className={styles['editor-item']}>
          <div className={styles['editor-title']}>内容：</div>
          <UEditor ref={this.attachEditor} onCustomReady={this.onReady} />
        </div>
        <Form.Item className={styles.protection}>
          {
            getFieldDecorator('protection', {
              valuePropName: 'checked',
              initialValue: protection,
            })(
              <Checkbox>是否愿意申请版权保护</Checkbox>,
            )
          }
        </Form.Item>
      </Form >
    )
  }

  render() {
    const { loading } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles['bg-fix']} />
        <div className={styles.head}>
          <div className={styles['head-name']}>上传作品</div>
          <div className={styles['head-line']} />
        </div>
        {loading ? <PageLoading /> :
          <>
            {this.renderForm()}
            <div>
              <div className={styles.btns}>
                <Button className={styles.btn1} type="ghost" onClick={this.previewWork}>
                  预览作品
            </Button>
                <Button className={styles.btn2} type="primary" onClick={this.postWork}>
                  发布作品
            </Button>
              </div>
              <div className={styles['btns-fix']}>
                <Button className={styles.btn3} type="link" onClick={this.saveDraft}>
                  保存为草稿
            </Button>
              </div>
            </div>
          </>}
        {this.renderModal()}
      </div>
    );
  }
}

export default Form.create()(Page);
