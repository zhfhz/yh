import request from '@/utils/request';

export function getText() {
  return request('/api/designercenter-security/text');
}

// /mms/smsCode/{version}
export function getCode(mobileNumber, smsType) {
  return request.post('/mms/smsCode/1.2', {
    data: {
      mobileNumber,
      smsType,
    },
  });
}

// /mms/modifyPwd/{version}
export function modifyPwd(code, newPwd) {
  return request.post('/mms/modifyPwd/1.2', {
    data: {
      code,
      newPwd,
    },
  })
}

// /mms/replace/{version}
export function modifyMobile(oldCode, newMobileNumber, newCode) {
  return request.post('/mms/replace/1.2', {
    data: {
      oldCode,
      newMobileNumber,
      newCode,
    },
  })
}
