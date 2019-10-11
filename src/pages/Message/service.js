import request from '@/utils/request';

// /mms/dynamic/newsList/{version}
export function getData(pageIndex, pageSize) {
  return request('/mms/dynamic/newsList/1.2', {
    method: 'POST',
    data: {
      pageIndex,
      pageSize,
    },
  });
}
