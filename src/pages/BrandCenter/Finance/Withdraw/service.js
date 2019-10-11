import request from '@/utils/request';

export function saveData(params) {
  return request.post('/pay/withdraw/apply/', { data: params });
}

export function getFinanceInfo() {
  return request('/pay/finance/info/1.2');
}
