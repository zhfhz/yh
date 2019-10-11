import request from '@/utils/request';

export const PayMapper = { 0: '线下打款' };

export const PayOptions = [
  { value: 0, label: '线下打款' },
];

export const StatusMessageMapper = {
  0: '待审核',
  1: '审核通过待打款',
  2: '审核通过已打款',
  3: '审核驳回',
};

export const StatusOptions = [
  { value: null, label: '全部' },
  { value: 0, label: '待审核' },
  { value: 1, label: '审核通过待打款' },
  { value: 2, label: '审核通过已打款' },
  { value: 3, label: '审核驳回' },
];

export const PayStatus = {
  /**
   * 线下打款
   */
  get offline() { return 0; },
};

export const ReivewStatus = {
  /**
   * 待审核
   */
  get pending() { return 0; },

  /**
   * 审核通过待打款
   */
  get reviewed() { return 1; },

  /**
   * 审核通过已打款
   */
  get paid() { return 2; },
  /**
   * 审核驳回
   */
  get rejected() { return 3; },
};

export function getData(params) {
  return request.get('/pay/withdraw/list/1.2', { params });
}

export function review(params) {
  return request.put('/pay/cashout/apply', { data: params });
}

export function doPay(params) {
  return request.put('/pay/cashout/makeMoney', { data: params });
}

export function getPayInfo(params) {
  return request(`/pay/cashout/makeMoney/${params.id}`);
}
