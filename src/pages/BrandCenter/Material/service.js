import request from '@/utils/request';

export function saveEditorInfo(params) {
  return request('/mms/enterprise/display/1.2', { method: 'post', data: params });
}

export function getEditorInfo(params) {
  return request('/mms/enterprise/displayShow/1.2', { method: 'post', data: params });
}

export function savePicture(params) {
  return request('/mms/enterprise/elegant/1.2', { method: 'post', data: params });
}

export function getPicture(params) {
  return request('/mms/enterprise/elegantList/1.2', { method: 'get', params });
}

export function getImages(data) {
  const images = data.pictures.map((it, index) => ({ elegantUrl: it.server, upSort: index + 1 }));
  return images;
}
