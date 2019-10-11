import request from '@/utils/request';


export const STEPS = ['设置手机号、密码', '完善信息', '注册完成'];

export const RegisterType = {
  /**
   * 个人用户 0
   */
  get normal() { return 0; },

  /**
   * 企业用户 1
   */
  get business() { return 1; },
};

export const SexType = {
  /**
   * 男 1
   */
  get male() { return 1; },

  /**
   * 女 2
   */
  get famale() { return 2; },

  /**
   * 保密 3
   */
  get secret() { return 2; },
};

export function getCheckCode(params) {
  return request.post('/mms/smsCode/1.2', { data: params });
}

export function registerUser(params) {
  return request.post('/mms/registerlnfo/1.2', { data: params });
}
