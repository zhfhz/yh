import request from '@/utils/request';

export function getText() {
  // return request('/api/designercenter/text');
  return '111';
}

// 收藏列表
// /dms/works/collectionWorksList/{version}
export function getWorksList(userId, pageSize, pageIndex) {
  return request('/dms/works/collectionWorksList/1.2', {
    method: 'POST',
    data: {
      userId,
      pageIndex,
      pageSize,
    },
  });
}

export function cancelFavWorks(worksId) {
  return request('/mms/works/collect/1.2', {
    method: 'POST',
    params: {
      worksId,
      collectionStatus: 1, // 1 取消收藏
    },
  });
}
