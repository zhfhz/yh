import request from '@/utils/request';

export function getOcc(params) {
  return request('/sc/dataDic1', { data: params });
}
