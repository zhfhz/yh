import request from '@/utils/request';

export function getCompanyList({ catelogId, sort, ...rest }) {
  const newParams = { ...rest };
  if (catelogId) {
    newParams.industryId = catelogId
  }
  if (sort) {
    newParams.sortRule = sort
  }
  return request('/mms/enterprise/list/1.2', {
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
