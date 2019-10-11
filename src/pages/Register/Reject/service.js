import request from '@/utils/request';

export function getAuthen() {
  return request('/mms/enterprise/authen/1.2');
}
