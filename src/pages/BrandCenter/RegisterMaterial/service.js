import request from '@/utils/request';

export function getText() {
  return request('/api/brandcenter-registermaterial/text');
}

export const ReviewType = {
  /**
   * Unreviewed  (未审核)
   */
  get Unreviewed() { return 0; },

  /**
   * Passed  (审核通过)
   */
  get Passed() { return 1; },

  /**
   * Failed  (审核未通过)
   */
  get Failed() { return 2; },

};

export const SecondType = {
  /**
   * First 1 (工厂注册 完善信息 第二步的 第一部分)
   */
  get First() { return 1; },

  /**
   * Second 2  (工厂注册 完善信息 第二步的 第二部分)
   */
  get Second() { return 2; },
};

export const DicDataType = {
  /**
   * 中国地理大区
   */
  get Countries() { return 0; },

  /**
   * 省份
   */
  get Provinces() { return 1; },

  /**
   * 市
   */
  get Cities() { return 2; },

  /**
   * 买家升推客阈值
   */
  get UserTypes() { return 3; },

  /**
   * 可提现金额阈值
   */
  get Money() { return 4; },

  /**
   * 城市内部区域
   */
  get Cities1() { return 5; },

  /**
   * 设计师行业
   */
  get Industries() { return 6; },

  /**
   * 用户职业
   */
  get UserJobs() { return 7; },

  /**
   * 企业行业
   */
  get FactoryTypies() { return 8; },

  /**
   * 设计师作品类别
   */
  get DesignTypies() { return 9; },
}

export function getDic(params) {
  return request('/sc/dataDic', { data: params });
}

export function completeUser(params) {
  return request.post('/mms/perfectInfo/1.2', { data: params });
}

export function completeFactoryFirst(params) {
  return request.post('/mms/enterprise/proveWith/1.2', { data: params });
}

export function completeFactorySecond(params) {
  return request.post('/mms/enterprise/proveCool/1.2', { data: params });
}

export function getInfo() {
  return request.get('/mms/enterprise/authen/1.2');
}
