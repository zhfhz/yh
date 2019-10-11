import request from '@/utils/request';
import { FollowTabType } from '../../Const';

// /gms/enterprise/followMsg/{version}
// userId 必填
export function getEnterpriseList(userId, pageIndex, pageSize) {
  return request('/gms/enterprise/followMsg/1.2', {
    method: 'POST',
    data: {
      userId,
      pageIndex,
      pageSize,
      type: FollowTabType.Fans,
    },
  });
}

// /dms/designer/fansAndFollowList/{version}
// userId 非必填
export function getPersonalList(userId, pageIndex, pageSize) {
  return request('/dms/designer/fansAndFollowList/1.2', {
    method: 'POST',
    data: {
      userId,
      pageIndex,
      pageSize,
      type: FollowTabType.Fans,
    },
  });
}
