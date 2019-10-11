import request from '@/utils/request';

export function getDynamicList() {
  return request('/mms/dynamic/personList/1.2');
}

export function getOrderTrade(params) {
  return request('/oms/enterprise/orderTrade/1.2', { method: 'get', params });
}
