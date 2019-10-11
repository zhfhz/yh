import request from '@/utils/request';
import { FollowState } from '@/pages/DesignerCenter/Const';

export const UserType = {
  get normal() { return 5; }, // 普通平台用户
  get central() { return 4; }, // 总部用户
  get registerNormal() { return 6; }, // 普通用户
  get registerDesign() { return 7; }, // 设计师用户
  get registerfactory() { return 8; }, // 工厂用户
};

export const isCentral = userType => UserType.central === userType;

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(account, password) {
  return request.post('/mms/consoleUserLogin', { data: { account, password } });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryMenus(token) {
  return request('/ac/menu/mine', token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
}

export async function logoutToken(token) {
  return request('/logout', token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
}

// 关注/取关
export function followUser(userId, isFollow) {
  return request('/mms/follow/care/1.2', {
    method: 'POST',
    data: {
      followUserId: userId,
      followStatus: isFollow ? FollowState.YES : FollowState.NO,
    },
  });
}
