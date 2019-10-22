import request from '@/utils/request';

// /dms/designer/trial/{version}
export function getVerifyState() {
  return request('/dms/designer/trial/1.2');
}

// /dms/designer/authen/{version}
export function getVerifyInfo() {
  return request('/dms/designer/authen/1.2');
}

// /dms/designer/designProve/{version}
export function verify(params) {
  return request.post('/dms/designer/designProve/1.2', {
    data: {
      ...params,
    },
  });
}
