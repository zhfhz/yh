import request from '@/utils/request';

export function getText() {
  // return request('/api/designercenter/text');
  return '111';
}

// 获取设计师详情
export function getUserInfo(userId) {
  return request('/dms/designer/details/1.2', {
    params: {
      userId,
      isPerson: userId ? 0 : 1,
    },
  });
}
