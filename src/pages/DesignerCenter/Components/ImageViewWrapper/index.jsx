import React, { Component } from 'react';
import ImageView from '@/components/ImageView';

// eslint-disable-next-line react/prefer-stateless-function
class ImageViewWrapper extends Component {
  render() {
    const { images, onChange, sizeLimit, type, children } = this.props;
    return <ImageView
      images={images}
      total={1}
      onChange={onChange}
      sizeLimit={sizeLimit || 0}
      type={type || 'none'}>
      {children}
    </ImageView>
  }
}

export default ImageViewWrapper;
