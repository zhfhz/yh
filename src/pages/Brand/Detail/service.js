import request from '@/utils/request';

export function getCompanyInfo(id) {
  return request('/mms/enterprise/pointOne/1.2', { method: 'GET', params: { enterpriseId: id } });
}

/**
 * 企业简介
 * @param {*} id
 */
export function getCompanyInfo0(id) {
  return request('/mms/enterprise/displayShow/1.2', { method: 'GET', params: { enterpriseId: id, reqType: 1 } });
}


/**
 * 企业资质
 * @param {*} id
 */
export function getCompanyInfo1(id) {
  return request('/mms/enterprise/displayShow/1.2', { method: 'GET', params: { enterpriseId: id, reqType: 2 } });
}


/**
 * 产品服务
 * @param {*} id
 */
export function getCompanyInfo2(id) {
  return request('/mms/enterprise/displayShow/1.2', { method: 'GET', params: { enterpriseId: id, reqType: 3 } });
}

/**
 * 企业风采
 * @param {*} id
 */
export function getCompanyInfo3(id) {
  return request('/mms/enterprise/elegantList/1.2', { method: 'GET', params: { enterpriseId: id } });
}