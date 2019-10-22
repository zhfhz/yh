import request from '@/utils/request';

export function changeUserInfo(params) {
  return request.post('/mms/personal/1.2', { data: params });
}

export function getUserInfo() {
  return request.get('/mms/personal/1.2');
}
