import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getUserInfo } from './service';
import { CenterRoute } from './Const';

export default {
  namespace: 'designerCenter',
  state: {
    text: 'loading...',
    tabSelectIndex: CenterRoute.Work,
    userId: null, // 查看自己为null
  },

  effects: {
    *fetch({ userId }, { call, put }) {
      yield put({ type: 'save', payload: { userId } });
      yield put({ type: 'fetchUserInfo', userId });
    },
    *fetchUserInfo({ userId }, { call, put }) {
      const { ok, data } = yield call(getUserInfo, userId);
      if (!ok) {
        message.error('获取个人信息失败');
        return;
      }
      if (data.birthday) {
        data.birthday = data.birthday.substring(0, 10).replace(/-/g, '.');
      }
      yield put({
        type: 'save',
        payload: {
          userInfo: data,
        },
      });
    },
    *follow({ userId, isFollow }, { put }) {
      yield put({ type: 'user/follow', userId, isFollow });
      yield put({ type: 'fetchUserInfo', userId });
    },
    *jumpTo({ path, userId }, { put }) {
      yield put(routerRedux.push({
        pathname: path,
        query: { id: userId },
      }));
    },

  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
