import request from '@/utils/request';

// /dms/works/personDetails/{version}
export function getWorkInfo(worksId) {
  return request('/dms/works/personDetails/1.2', {
    params: {
      worksId,
    },
  });
}

// /dms/works/worksInfo/{version}
export function postWork(data) {
  return request.post('/dms/works/worksInfo/1.2', {
    data,
  });
}
