import request from '@/utils/request';

export function getProductionDeital(id) {
  return request('/dms/works/details/1.2', {
    method: 'GET',
    params: id,
  });
}

export function collectThisDeital(id, isCollect) {
  const HAS_COLLECT = 0;
  const NOT_COLLECT = 1;
  return request('/mms/works/collect/1.2', {
    method: 'POST',
    params: {
      worksId: id,
      collectionStatus: isCollect ? HAS_COLLECT : NOT_COLLECT,
    },
  });
}

export function likeThisDetail(id) {
  return request('/mms/fabulous/spotFabulous/1.2', {
    method: 'GET',
    params: {
      worksId: id,
    },
  });
}

export function getOtherDesignsOfTheUser(id) {
  return request('/dms/works/heWorks/1.2', {
    method: 'GET',
    params: {
      worksId: id,
    },
  });
}
