import request from '@/utils/request';

export function getDesignList(params) {
  return request('/dms/works/worksList/1.2', {
    method: 'POST',
    params,
  })
}

export function getCatelogs(params) {
  return request('/sc/dataDic', {
    method: 'GET',
    params,
  })
}
