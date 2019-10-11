import request from '@/utils/request';

export function retrievePwd(params) {
    return request.post('/mms/retrievePwd/1.2', { data: params });
}

export function getCheckCode(params) {
    return request.post('/mms/smsCode/1.2', { data: params });
  }
