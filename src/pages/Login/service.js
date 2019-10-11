import request from '@/utils/request';

export const AuditStatus = {
  get unAudit() { return 0; }, // 未审核
  get success() { return 1; }, // 已通过
  get faliure() { return 2; }, // 未通过
};

export function pwdLogin(params) {
  return request.post('/mms/pwdSign/1.2', { data: params });
}

export function codeLogin(params) {
  return request.post('/mms/codeSign/1.2', { data: params });
}

export function getCheckCode(params) {
  return request.post('/mms/smsCode/1.2', { data: params });
}
