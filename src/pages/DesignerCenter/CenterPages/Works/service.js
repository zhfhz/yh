import request from '@/utils/request';

export function getText() {
  // return request('/api/designercenter/text');
  return '111';
}

export function getWorksList(userId, pageSize, pageIndex) {
  return request('/dms/works/worksList/1.2', {
    method: 'POST',
    data: {
      userId,
      pageIndex,
      pageSize,
      isPerson: userId,
    },
  });
}

// /dms/works/worksInfo/{version}
export function delWorks(worksId) {
  return request('/dms/works/worksInfo/1.2', {
    method: 'DELETE',
    params: {
      worksId,
    },
  });
}
