export const ImageViewStatus = {
  get none() {
    return 'none';
  }, // 暂无图片，显示上传按钮
  get uploading() {
    return 'uploading';
  }, // 上传图片ing
  get done() {
    return 'done';
  }, // 展示图片
  get failed() {
    return 'failed';
  }, // 上传图片失败
};

export const defaultAccept = 'image/jpeg,image/png,image/gif';

export const defaultText = '添加图片';
