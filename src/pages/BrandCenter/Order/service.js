import _ from 'lodash';
import request from '@/utils/request';
import { orderSateList } from './model';

export function getData(param) {
  return request('/oms/order/orderList', { data: param, method: 'post' });
}
export function getDetail(param) {
  return request(`/oms/order/orderInfo?id=${param.id}`, { method: 'get' });
}
export function sentItemGood(param) {
  return request('/oms/order/delivery', { data: param, method: 'put' });
}
export function setCancel(param) {
  return request('/oms/order/orderCancel', { data: param, method: 'put' });
}
export function changePayGoodsPrice(param) {
  return request('/oms/order/orderInfo', { data: param, method: 'put' });
}
export function getOrderState(val) {
  const v = _.find(orderSateList, { value: val });
  return v ? v.label : '';
}
export function getInvoiceType(val) {
  const list = [
    { value: 0, label: '不需要发票' },
    { value: 1, label: '需要发票' },
    { value: 2, label: '已开发票' },
  ];
  const v = _.find(list, { value: val });
  return v ? v.label : '';
}
export function getRefundStatus(val) {
  let str = '';
  if (val === 0) {
    str = '退款中';
  }
  if (val === 1) {
    str = '已到账';
  }
  return str;
}
export function getPayType(val) {
  let str = '';
  if (val === 0) {
    str = '微信支付';
  }
  if (val === 1) {
    str = '支付宝支付';
  }
  return str;
}
export function getAscriptionData() {
  return request('/mms/ascription', { method: 'get' });
}
export function setGroupCancel(param) {
  return request(`/oms-pay/refund?orderNo=${param.orderNo}&remakes=${param.remakes}`, {
    method: 'get',
  });
}
