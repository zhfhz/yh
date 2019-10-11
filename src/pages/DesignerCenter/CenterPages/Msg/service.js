import request from '@/utils/request';

// /mms/dynamic/personList/{version}
export function getData(pageIndex, pageSize) {
  return request('/mms/dynamic/personList/1.2', {
    params: {
      pageIndex,
      pageSize,
    },
  });
}
