import request from '@/utils/request';

export function getCompanyInfo() {
  return request('/mms/enterprise/curinfo/1.2');
}

export function getAmountInfo() {
  return request('/pay/enterprise/amountInfo/1.2');
}
