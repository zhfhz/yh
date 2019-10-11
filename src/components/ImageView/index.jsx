import React, { useState } from 'react';
import { Row, Col } from 'antd';
import _ from 'lodash';
import uuid from 'uuid/v1';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import SingleImageView from './SingleImageView';
import { defaultAccept, defaultText, ImageViewStatus } from './commons';

/**
 * @param {Boolean} editable 可编辑
 * @param {Boolean} crop 可裁剪，与 multiple 不可同时为 true
 * @param {Boolean} multiple 可多选
 * @param {Boolean} upload 是否选中即上传
 * @param {Number} size 显示图片的大小
 * @param {Number} indent 图片线框与图片的间距
 * @param {Number} col 一行显示多少个
 * @param {Number} sizeLimit 大小限制，0 则不限制
 * @param {Number} widthLimit 图片宽度限制，0 则不限制
 * @param {Number} heightLimit 图片高度限制，0 则不限制
 * @param {Number} total 选择图片多少
 * @param {String} accept 图片类型
 * @param {String} text 上传图片前显示的文字
 * @param {Array<String>} images 显示的图片
 * @param {String} fixed 固定尺寸 800x800
 * @param {(images) => void} onChange 图片集更改的回调
 */
const ImageView = ({
  editable = true,
  crop = false,
  multiple = false,
  upload = true,
  size = 120,
  indent = 16,
  col = 5,
  accept = defaultAccept,
  text = defaultText,
  sizeLimit = 0,
  widthLimit = 0,
  heightLimit = 0,
  total = 10,
  images = [],
  fixed,
  aspectRatio,
  onChange,
  children,
  type = 'none',
}) => {
  const [preview, setPreview] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  let actualImages = [...images];
  if (images.length > total) {
    actualImages = images.slice(0, total);
  }
  if (editable && actualImages.length < total) {
    actualImages.push({ status: ImageViewStatus.none });
  }

  const onImageChange = image => {
    if (!onChange) return;
    let results = [...images];
    if (image.status === ImageViewStatus.none) {
      // 删除操作
      results = images.filter(it => it.id !== image.id);
    } else {
      const handles = image instanceof Array ? image : [image];
      handles.forEach(target => {
        const index = _.findIndex(images, it => it.id === target.id);
        if (index === -1) {
          results.push(target);
        } else {
          results[index] = target;
        }
      });
    }
    onChange(results);
  };

  const getImageUrl = image => image && (image.local || image.server);
  return (
    <div>
      <Row>
        {actualImages.map((it, index) => (
          <Col key={it.id || 'newer'} span={Math.floor(24 / col)}>
            <SingleImageView
              editable={editable}
              crop={crop}
              multiple={multiple}
              upload={upload}
              size={size}
              indent={indent}
              accept={accept}
              text={text}
              sizeLimit={sizeLimit}
              widthLimit={widthLimit}
              heightLimit={heightLimit}
              aspectRatio={aspectRatio}
              image={it}
              total={total}
              currntNum={actualImages.length}
              onChange={onImageChange}
              onPreview={() => {
                setPreview(true);
                setPreviewIndex(index);
              }}
              fixed={fixed}
              type={type}
            >
              {children}
            </SingleImageView>
          </Col>
        ))}
      </Row>
      {preview && (
        <LightBox
          mainSrc={getImageUrl(images[previewIndex])}
          nextSrc={getImageUrl(images[(previewIndex + 1) % images.length])}
          prevSrc={getImageUrl(images[(previewIndex + images.length - 1) % images.length])}
          onCloseRequest={() => setPreview(false)}
          onMovePrevRequest={() =>
            setPreviewIndex((previewIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() => setPreviewIndex((previewIndex + 1) % images.length)}
        />
      )}
    </div>
  );
};

export default ImageView;
export { ImageViewStatus } from './commons';
export const urlMapper = url => ({ id: uuid(), server: url, status: ImageViewStatus.done });
