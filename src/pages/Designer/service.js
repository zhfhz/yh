import request from '@/utils/request';

export function getDesignerList({ catelogId, ...rest }) {
  const newParams = { ...rest };
  if (catelogId) {
    newParams.occupationId = catelogId
  }
  return request('/dms/designer/designerList/1.2', {
    method: 'POST',
    params: newParams,
  });
}

export function getCatelogs(params) {
  return request('/sc/dataDic', {
    method: 'GET',
    params,
  })
}
