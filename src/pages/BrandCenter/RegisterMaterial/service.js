import request from '@/utils/request';

export function getText() {
  return request('/api/brandcenter-registermaterial/text');
}
