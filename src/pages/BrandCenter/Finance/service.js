import request from '@/utils/request';

export function getFinanceInfo() {
  return request('/pay/finance/info/1.2');
}

export function getList(params) {
  return request('/pay/finance/list/1.2', { method: 'post', data: params });
}
