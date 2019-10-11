import request from '@/utils/request';

export function getData(params) {
  return request.get('/pay/taxRefund/list/1.2', { params });
}
