import request from '@/utils/request';

export function getText() {
  return request('/api/brandcenter-material/text');
}
