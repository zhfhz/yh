import React, { useState, useRef, useEffect } from 'react';
import { notification, Modal, Spin, Icon, Progress } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css';
import uuid from 'uuid/v1';
import Cropper from 'react-cropper';

import SimpleImageView from './SimpleImageView';
import { defaultAccept, defaultText, ImageViewStatus } from './commons';
import oss from '@/utils/oss';

import styles from './index.less';

const SingleImageView = ({
  editable = true,
  crop = false,
  multiple = false,
  upload = true,
  size = 120,
  indent = 16,
  accept = defaultAccept,
  text = defaultText,
  sizeLimit = 0,
  widthLimit = 0,
  heightLimit = 0,
  aspectRatio,
  fixed,
  image,
  onChange,
  onPreview,
  children,
  type,
  total,
  currntNum,
}) => {
  const [cropVisible, setCropVisible] = useState(false);
  const [cropSrc, setCropSrc] = useState('');
  const [progress, setProgress] = useState(0);
  const cropper = useRef(null);
  useEffect(() => {
    let unmounted = false;
    if (upload && image && image.file && image.status === ImageViewStatus.uploading) {
      oss
        .putImageMultipart(image.file, fraction => {
          if (!unmounted) {
            setProgress(Math.floor(fraction * 100));
          }
        })
        .then(res => {
          if (!unmounted && onChange) {
            onChange({
              ...image,
              status: ImageViewStatus.done,
              file: undefined,
              server: res.url,
            });
          }
        })
        .catch(() => {
          if (!unmounted && onChange) {
            onChange({
              ...image,
              status: ImageViewStatus.failed,
            });
          }
        });
    }
    return () => {
      unmounted = true;
    };
  }, [image && image.status]);

  let status = ImageViewStatus.none;
  if (image) {
    ({ status } = image);
    if (!status) {
      status = ImageViewStatus.done;
    }
  }
  if (!editable && status !== ImageViewStatus.done) {
    throw new Error('图片不存在，不能显示');
  }
  if (crop && multiple) {
    throw new Error('crop 与 multiple 不能同时为 true');
  }

  // 图片选择完成后的处理
  const onImageFinished = result => {
    if (!onChange) return;
    const resultObj = {
      id: (image && image.id) || uuid(),
      status: upload ? ImageViewStatus.uploading : ImageViewStatus.done,
      local: URL.createObjectURL(result),
      file: result,
    };
    // 图片大小过滤
    if (sizeLimit && result.size > sizeLimit) {
      notification.error({ message: '图片过大，请重新选择' });
      return;
    }

    // 图片尺寸过滤
    if (widthLimit || heightLimit || fixed) {
      const imgLoader = new Image();
      imgLoader.src = URL.createObjectURL(result);
      const measured = () => {
        if (fixed && fixed !== `${imgLoader.width}x${imgLoader.height}`) {
          notification.error({ message: `图片尺寸不符合固定尺寸${fixed}，请重新选择` });
          return;
        }
        if (
          (widthLimit && imgLoader.width !== widthLimit) ||
          (heightLimit && imgLoader.height !== heightLimit)
        ) {
          notification.error({ message: '图片尺寸不符合要求，请重新选择' });
          return;
        }
        onChange(resultObj);
      };
      if (imgLoader.complete) {
        measured();
      } else {
        imgLoader.onload = measured;
      }
    } else {
      onChange(resultObj);
    }
  };

  // 图片选择后，判断是否需要裁切/多选
  const onImageSelected = e => {
    if (multiple) {
      // TODO: 多选状态待处理
    } else {
      const file = e.target.files[0];
      if (crop) {
        setCropVisible(true);
        setCropSrc(URL.createObjectURL(file));
      } else {
        onImageFinished(file);
      }
    }
    e.target.value = '';
  };

  let cropComponent;
  if (crop) {
    if (fixed) {
      throw new Error('固定尺寸图片不支持裁剪');
    }
    cropComponent = (
      <Modal
        title="剪切图片"
        maskClosable={false}
        className={styles['crop-modal']}
        visible={cropVisible}
        onCancel={() => setCropVisible(false)}
        onOk={() => {
          cropper.current.getCroppedCanvas().toBlob(blob => {
            setCropVisible(false);
            onImageFinished(blob);
          });
        }}
      >
        {cropSrc ? (
          <Cropper
            ref={cropper}
            style={{ width: 470, height: 380 }}
            viewMode={1}
            aspectRatio={aspectRatio}
            src={cropSrc}
          />
        ) : (
          <Spin />
        )}
      </Modal>
    );
  }

  return (
    <>
      {type !== 'custom' && (
        <div
          className={
            {
              [ImageViewStatus.none]: styles['single-image-picker'],
              [ImageViewStatus.uploading]: styles['single-image-normal'],
              [ImageViewStatus.failed]: styles['single-image-failed'],
              [ImageViewStatus.done]: styles['single-image-container'],
            }[status]
          }
          style={{ width: size, height: size }}
          onClick={
            status === ImageViewStatus.failed
              ? () =>
                  onChange &&
                  onChange({
                    ...image,
                    status: ImageViewStatus.uploading,
                  })
              : undefined
          }
        >
          {
            {
              [ImageViewStatus.none]: (
                <label className="file-label">
                  <input
                    type="file"
                    accept={accept}
                    style={{ display: 'none' }}
                    onChange={onImageSelected}
                    multiple={multiple}
                  />
                  <Icon type="plus" className="add-icon" />
                  <div className="file-des">
                    <div>{text}</div>
                    {total > 1 && <div>{`(${currntNum - 1}/${total})`}</div>}
                  </div>
                </label>
              ),
              [ImageViewStatus.uploading]: (
                <>
                  <span>上传中({progress}%)</span>
                  <Progress percent={progress} size="small" status="active" showInfo={false} />
                </>
              ),
              [ImageViewStatus.failed]: (
                <>
                  <span>上传失败</span>
                  <span>点击重新上传</span>
                </>
              ),
              [ImageViewStatus.done]: (
                <SimpleImageView
                  className="viewer"
                  width={size - indent}
                  height={size - indent}
                  src={image && (image.local || image.server)}
                >
                  <div className="layer">
                    <Icon onClick={onPreview} type="eye" />
                    {editable && (
                      <Icon
                        onClick={() =>
                          onChange &&
                          onChange({
                            id: image.id,
                            status: ImageViewStatus.none,
                          })
                        }
                        type="delete"
                      />
                    )}
                  </div>
                </SimpleImageView>
              ),
            }[status]
          }
          {cropComponent}
        </div>
      )}
      {type === 'custom' && (
        <div
          onClick={
            status === ImageViewStatus.failed
              ? () =>
                  onChange &&
                  onChange({
                    ...image,
                    status: ImageViewStatus.uploading,
                  })
              : undefined
          }
        >
          <label className="file-label">
            <input
              type="file"
              accept={accept}
              style={{ display: 'none' }}
              onChange={onImageSelected}
              multiple={multiple}
            />
            {children}
          </label>
        </div>
      )}
    </>
  );
};

export default SingleImageView;
