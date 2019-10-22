import React, { Component } from 'react';
import { message, notification, Progress } from 'antd';
import ReactUeditor from 'ifanrx-react-ueditor';
import oss from '@/utils/upload';
import { isDev } from '@/utils/utils';

import './index.less';

class Ueditor extends React.Component {
  attachEditor = ref => {
    this.editor = ref;
  };

  updateEditorContent = content => {
    // this.props.onChange(content);
    this.editorContent = content;
  };

  onReady = () => {
    // console.log(this.editor);
    // console.log(this.props.content);
    if (this.editor && this.initialContent) {
      // this.editor.setHeight(300);
      this.editor.setContent(this.initialContent);
    }
  };

  getContent = () => this.editorContent;

  setContent = content => {
    if (this.editor && this.editor.isReady) {
      this.editor.setContent(content);
    }
    this.initialContent = content;
    // console.log(this.initialContent);
  };

  uploadImage = async e => {
    const file = e.target.files[0];
    if (file) {
      try {
        const res = await oss.putImageMultipart(file);
        return res.url;
      } catch (error) {
        message.error('上传图片失败');
        throw error;
      }
    }
    return null;
  };

  render() {
    const { onCustomReady } = this.props;
    return (
      <ReactUeditor
        plugins={[
          'insertCode',
          'uploadImage',
          // 'uploadAudio',
          'insertLink',
          // uploadImagePlugin,
        ]}
        getRef={this.attachEditor}
        uploadImage={this.uploadImage}
        onChange={this.updateEditorContent}
        onReady={onCustomReady || this.onReady}
        ueditorPath={`${window.location.origin}/ueditor`}
      />
    );
  }
}
export default Ueditor;
